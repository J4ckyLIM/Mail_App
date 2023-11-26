import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchApi, methods } from './fetchApi';

export interface MutationExampleArgs {
  onSuccess?: (successCallbackData: any) => void;
  onError?: (error: Error) => void;
}

const uri = '/example';

export const useGetExample = () => {
  const query = useQuery<any, Error>({
    queryKey: [uri],
    queryFn: async (): Promise<any> => {
      return fetchApi({
        uri: `${uri}/example`,
        method: methods.GET,
      });
    },
  });
  return { ...query, exampleData: query.data };
};

export const useMutationExample = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    { message: string; mutationResult: any },
    Error,
    MutationExampleArgs
  >({
    mutationFn: async (): Promise<{ message: string; mutationResult: any }> =>
      fetchApi({
        uri: `${uri}/mutation-example`,
        method: methods.POST,
      }),
    onSuccess: (data, { onSuccess }) => {
      queryClient.invalidateQueries([uri]);
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

  return { ...mutation, mutationFunction: mutation.mutate };
};
