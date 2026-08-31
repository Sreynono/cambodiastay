import { reactive } from 'vue';

// 1. Create a reactive object that holds our state
const authState = reactive({
  isLoggedIn: localStorage.getItem('is_logged_in') === 'true'
});

export function useAuthStore() {
  
  const login = () => {
    authState.isLoggedIn = true;
    localStorage.setItem('is_logged_in', 'true');
  };

  const logout = () => {
    authState.isLoggedIn = false;
    localStorage.removeItem('is_logged_in'); // Completely remove it to be safe
  };

  return {
    authState,
    login,
    logout
  };
}