import { useContext } from 'react';

import { AuthenticationContext } from '../contexts/AuthenticationProvider';

export const useAuth = () => {
  const { accessToken, user, login, register } = useContext(
    AuthenticationContext,
  );
  return {
    accessToken,
    user,
    login,
    register,
  };
};
