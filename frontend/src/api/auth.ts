import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchApi, methods } from './fetchApi';
import { AccessToken } from '../types/auth/types';

export interface MutationLoginArgs {
  email: string;
  password: string;
  onSuccess?: (successCallbackData: string) => void;
  onError?: (error: Error) => void;
}

export interface MutationRegisterArgs extends MutationLoginArgs {
  name: string;
}


const uri = '/auth';

// export const useGetExample = () => {
//   const query = useQuery<any, Error>({
//     queryKey: [uri],
//     queryFn: async (): Promise<any> => {
//       return fetchApi({
//         uri: `${uri}/example`,
//         method: methods.GET,
//       });
//     },
//   });
//   return { ...query, exampleData: query.data };
// };

export const useMutationLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AccessToken,
    Error,
    MutationLoginArgs
  >({
    mutationFn: async ({ email, password }: MutationLoginArgs): Promise<AccessToken> =>
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
        onSuccess(data.access_token);
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

  const mutation = useMutation<
    AccessToken,
    Error,
    MutationRegisterArgs
  >({
    mutationFn: async ({ email, password, name }: MutationRegisterArgs): Promise<AccessToken> =>
      fetchApi({
        uri: `${uri}/register`,
        method: methods.POST,
        body: {
          email,
          password,
          name
        },
      }),
    onSuccess: (data, { onSuccess }) => {
      if (onSuccess) {
        onSuccess(data.access_token);
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
