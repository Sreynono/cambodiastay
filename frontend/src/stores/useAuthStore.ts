import { reactive, computed } from 'vue';

export interface User {
  id: number;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  profilePhoto?: string;
  role: 'guest' | 'host' | 'admin';
}

// Initial auth state from localStorage (only persisted active login session)
const token = localStorage.getItem('auth_token');
const savedUser = localStorage.getItem('auth_user');

export const authState = reactive<{
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
}>({
  isLoggedIn: !!token && !!savedUser,
  token: token || null,
  user: savedUser ? (JSON.parse(savedUser) as User) : null,
});

// Self-healing: verify if token belongs to the active logged-in user
// If a previous moderation session overwrote auth_token, retrieve correct token for this user
if (authState.user) {
  let needsSync = false;
  if (!authState.token) {
    needsSync = true;
  } else {
    try {
      const parts = authState.token.split('.');
      if (parts.length === 3 && parts[1]) {
        const payload = JSON.parse(atob(parts[1]));
        const tokenSub = payload.sub || payload.id || payload.userId;
        if (tokenSub && authState.user.id && Number(tokenSub) !== Number(authState.user.id)) {
          needsSync = true;
        }
      } else {
        needsSync = true;
      }
    } catch {
      needsSync = true;
    }
  }

  if (needsSync) {
    fetch('http://localhost:3000/auth/token-for-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: authState.user.id, email: authState.user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        const freshToken = data.access_token || data.accessToken;
        if (freshToken) {
          authState.token = freshToken;
          localStorage.setItem('auth_token', freshToken);
        }
      })
      .catch(() => {});
  }
}

export function useAuthStore() {
  const accessToken = computed(() => authState.token);
  const user = computed(() => authState.user);
  const isLoggedIn = computed(() => authState.isLoggedIn);

  const login = (tokenString: string, userData: any) => {
    const normalizedRole = ((userData.role || 'guest').toLowerCase()) as 'guest' | 'host' | 'admin';
    const fullName = userData.name || userData.full_name || 'User';
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = userData.firstName || nameParts[0] || 'User';
    const lastName = userData.lastName || nameParts.slice(1).join(' ') || '';

    const loggedInUser: User = {
      id: userData.id || userData.user_id || 0,
      email: userData.email || '',
      name: fullName,
      firstName,
      lastName,
      phone: userData.phone || userData.phone_number || '',
      bio: userData.bio || '',
      profilePhoto: userData.profilePhoto || '',
      role: normalizedRole,
    };

    authState.isLoggedIn = true;
    authState.token = tokenString;
    authState.user = loggedInUser;

    localStorage.setItem('auth_token', tokenString);
    localStorage.setItem('auth_user', JSON.stringify(loggedInUser));
  };

  const register = async (data: {
    email: string;
    password_raw: string;
    full_name: string;
    role?: string;
    phone?: string;
  }): Promise<{ success: boolean; message?: string; user?: User }> => {
    const cleanEmail = data.email.trim().toLowerCase();

    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          password: data.password_raw,
          password_raw: data.password_raw,
          name: data.full_name,
          full_name: data.full_name,
          role: data.role || 'guest',
          phone_number: data.phone || '',
        }),
      });

      const resData = await res.json().catch(() => ({}));

      if (res.ok) {
        return await loginWithCredentials(cleanEmail, data.password_raw);
      } else {
        return {
          success: false,
          message: resData.message || 'Registration failed. Email might already be registered.',
        };
      }
    } catch (err: any) {
      return {
        success: false,
        message: 'Could not connect to the backend server. Please verify the API is running.',
      };
    }
  };

  const loginWithCredentials = async (
    emailInput: string,
    passwordInput: string
  ): Promise<{ success: boolean; message?: string; user?: User }> => {
    const cleanEmail = emailInput.trim().toLowerCase();

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          password: passwordInput,
          password_raw: passwordInput,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        const token = data.access_token || data.accessToken;
        const userInfo = data.user_info || data.user;
        login(token, userInfo);
        return { success: true, user: authState.user as User };
      } else {
        return {
          success: false,
          message: data.message || 'Invalid email or password.',
        };
      }
    } catch (err) {
      return {
        success: false,
        message: 'Unable to connect to authentication service. Please check backend status.',
      };
    }
  };

  const updateUserProfile = async (updatedData: Partial<User>) => {
    if (!authState.user) return;

    const token = authState.token;
    const mergedUser: User = {
      ...authState.user,
      ...updatedData,
      name:
        updatedData.firstName && updatedData.lastName
          ? `${updatedData.firstName} ${updatedData.lastName}`.trim()
          : updatedData.name || authState.user.name,
    };

    authState.user = mergedUser;
    localStorage.setItem('auth_user', JSON.stringify(mergedUser));

    // Persist to backend
    if (token) {
      try {
        await fetch('http://localhost:3000/users/profile', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            full_name: mergedUser.name,
            phone_number: mergedUser.phone,
          }),
        });
      } catch (err) {
        console.error('Failed to update profile on backend:', err);
      }
    }
  };

  const logout = () => {
    authState.isLoggedIn = false;
    authState.token = null;
    authState.user = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  return {
    authState,
    accessToken,
    user,
    isLoggedIn,
    login,
    register,
    loginWithCredentials,
    updateUserProfile,
    logout,
  };
}
