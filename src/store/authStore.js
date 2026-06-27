import { useState, useEffect } from 'react';

export const useAuthStore = () => {
  const [user, setUser] = useState(() => {
    try {
      const userString = localStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (e) {
      return null;
    }
  });

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, logout };
};
