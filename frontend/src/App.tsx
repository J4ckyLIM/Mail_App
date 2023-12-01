import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Toaster } from 'sonner';

import routes from './router';
import { AuthenticationProvider } from './contexts/AuthenticationProvider';

const App = () => {
  const elements = useRoutes(routes);
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <Suspense>{elements}</Suspense>
        </AuthenticationProvider>
      </QueryClientProvider>
      <Toaster
        position="top-right"
        richColors
      />
    </ChakraProvider>
  );
};

export default App;
