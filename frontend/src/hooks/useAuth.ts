import { useContext } from 'react';

import { AuthenticationContext } from '../contexts/AuthenticationProvider';

export const useAuth = () => {
  const { accessToken, user, login, register, logout } = useContext(
    AuthenticationContext,
  );
  return {
    accessToken,
    user,
    login,
    register,
    logout,
  };
};
