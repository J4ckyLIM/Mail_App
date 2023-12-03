import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { AuthResult } from '../types/auth/types';

import { fetchApi, methods } from './fetchApi';

export interface MutationLoginArgs {
  email: string;
  password: string;
  onSuccess?: (successCallbackData: AuthResult) => void;
  onError?: (error: Error) => void;
}

export interface MutationRegisterArgs extends MutationLoginArgs {
  name: string;
}

const uri = '/auth';

export const useMutationLogin = () => {
  const mutation = useMutation<AuthResult, Error, MutationLoginArgs>({
    mutationFn: async ({
      email,
      password,
    }: MutationLoginArgs): Promise<AuthResult> =>
      fetchApi({
        uri: `${uri}/login`,
        method: methods.POST,
        body: {
          email,
          password,
        },
      }),
    onSuccess: (data, { onSuccess }) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error, { onError }) => {
      if (onError) {
        onError(error);
      }
    },
  });

  return { ...mutation, login: mutation.mutate };
};

export const useMutationRegister = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<AuthResult, Error, MutationRegisterArgs>({
    mutationFn: async ({
      email,
      password,
      name,
    }: MutationRegisterArgs): Promise<AuthResult> =>
      fetchApi({
        uri: `${uri}/register`,
        method: methods.POST,
        body: {
          email,
          password,
          name,
        },
      }),
    onSuccess: (data, { onSuccess }) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error, { onError }) => {
      if (onError) {
        console.error(error);
        onError(error);
      }
    },
  });

  return { ...mutation, register: mutation.mutate };
};
