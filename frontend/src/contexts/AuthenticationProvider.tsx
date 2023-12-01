import { createContext, useEffect, useMemo, useState } from 'react';
import { useMutationLogin, useMutationRegister } from '../api/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface AuthenticationConfig {
  accessToken: string | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
}

export const AuthenticationContext = createContext<AuthenticationConfig>({
  accessToken: null,
  login: () => {},
  register: () => {},
});

export const AuthenticationProvider = ({ children }: { children: any }) => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();

  const { login: loginFunction } = useMutationLogin();

  const { register: registerFunction } = useMutationRegister();

  const saveToken = (token: string) => {
    localStorage.setItem('token', token);
    setAccessToken(token);
  }

  const onLoginError = (error: Error) => {
    toast.error(error.message);
  }

  const onRegisterError = (error: Error) => {
    toast.error(error.message);
  }

  const login = async (email: string, password: string) => {
    loginFunction({ email, password, onSuccess: saveToken, onError: onLoginError });
  }

  const register = async (email: string, password: string, name: string) => {
    registerFunction({ email, password, name, onSuccess: saveToken, onError: onRegisterError });
  }

  const contextValues = useMemo(() => {
    return {
      accessToken,
      login,
      register
    };
  }, [accessToken, login]);

  useEffect(() => {
    if (!accessToken) {
      navigate('/auth');
    } else {
      navigate('/');
    }
  }, [accessToken, navigate]);

  return (
    <AuthenticationContext.Provider value={contextValues}>
      {children}
    </AuthenticationContext.Provider>
  );
};
