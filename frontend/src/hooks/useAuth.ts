import { useContext } from 'react';

import { AuthenticationContext } from '../contexts/AuthenticationProvider';

export const useAuth = () => {
  const { accessToken, login, register } = useContext(AuthenticationContext);
  return {
    accessToken,
    login,
    register,
  };
};
