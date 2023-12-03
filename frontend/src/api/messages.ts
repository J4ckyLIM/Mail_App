import { useMutation, useQuery } from '@tanstack/react-query';

import { Message } from '../types/messages/types';

import { fetchApi, methods } from './fetchApi';

export interface MutationUpdateArgs {
  id: string;
  hasBeenRead: boolean;
  onSuccess?: (successCallbackData: Message) => void;
  onError?: (error: Error) => void;
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
  return {
    ...query,
    messages: query.data?.map(message => ({
      ...message,
      sentAt: new Date(message.sentAt),
    })),
  };
};

export const useGetMessageById = (id: string) => {
  const query = useQuery<Message, Error>({
    queryKey: [uri, id],
    queryFn: async (): Promise<Message> => {
      return fetchApi({
        uri: `${uri}/${id}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, message: query.data };
};

export const useUpdateMessageStatus = () => {
  const mutation = useMutation<Message, Error, MutationUpdateArgs>({
    mutationFn: async ({
      id,
      hasBeenRead,
    }: MutationUpdateArgs): Promise<Message> =>
      fetchApi({
        uri: `${uri}/${id}`,
        method: methods.PATCH,
        body: {
          hasBeenRead,
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

  return { ...mutation, update: mutation.mutate };
};
