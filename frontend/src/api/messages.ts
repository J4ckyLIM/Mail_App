import { useQuery } from '@tanstack/react-query';

import { AuthResult } from '../types/auth/types';

import { fetchApi, methods } from './fetchApi';
import { Message } from '../types/messages/types';

export interface MutationLoginArgs {
  email: string;
  password: string;
  onSuccess?: (successCallbackData: AuthResult) => void;
  onError?: (error: Error) => void;
}

export interface MutationRegisterArgs extends MutationLoginArgs {
  name: string;
}

const uri = '/messages';

export const useGetAllReceivedMessage = () => {
  const query = useQuery<Message[], Error>({
    queryKey: [uri],
    queryFn: async (): Promise<Message[]> => {
      return fetchApi({
        uri: `${uri}/all`,
        method: methods.GET,
      });
    },
  });
  return { ...query, messages: query.data };
};
