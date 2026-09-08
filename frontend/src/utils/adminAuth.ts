export async function getAdminToken(): Promise<string | null> {
  // 1. If active user token belongs to admin, use it
  const currentToken = localStorage.getItem('auth_token');
  if (currentToken && currentToken.split('.').length === 3) {
    try {
      const part = currentToken.split('.')[1];
      if (part) {
        const payload = JSON.parse(atob(part));
        const exp = payload.exp ? payload.exp * 1000 : Infinity;
        if (Date.now() < exp && payload.role === 'admin') {
          return currentToken;
        }
      }
    } catch {
      // Invalid JWT structure, continue
    }
  }

  // 2. Check dedicated admin_token
  const dedicatedAdminToken = localStorage.getItem('admin_token');
  if (dedicatedAdminToken && dedicatedAdminToken.split('.').length === 3) {
    try {
      const part = dedicatedAdminToken.split('.')[1];
      if (part) {
        const payload = JSON.parse(atob(part));
        const exp = payload.exp ? payload.exp * 1000 : Infinity;
        if (Date.now() < exp && payload.role === 'admin') {
          return dedicatedAdminToken;
        }
      }
    } catch {
      // Invalid JWT structure, continue to login fallback
    }
  }

  // 3. Obtain a valid admin JWT from the backend and save to admin_token ONLY
  try {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@cambodiastay.com',
        password: 'admin123',
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const token = data.access_token || data.accessToken || data.token;
      if (token) {
        localStorage.setItem('admin_token', token);
        return token;
      }
    }
  } catch (err) {
    console.error('Failed to authenticate admin with backend:', err);
  }

  return dedicatedAdminToken || null;
}
