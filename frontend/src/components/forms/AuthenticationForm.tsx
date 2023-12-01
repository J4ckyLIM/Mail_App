import { Box, Text, ChakraProvider, Input, FormControl, FormLabel, VStack, HStack } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import MainButton from '../buttons/MainButton';
import { AuthenticationType } from '../../types/auth/types';
import { AuthenticationFormHandlerProps } from '../../views/auth/AuthenticationView';

interface AuthenticationFormProps {
  onSubmit: (props :AuthenticationFormHandlerProps) => void;
}

const AuthenticationForm: FC<AuthenticationFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<AuthenticationType>(AuthenticationType.LOGIN);

  const handleSubmit = useCallback((event: any) => {
    event.preventDefault();
    onSubmit({ email, password, name, type });
  }, [email, password, type]);

  return (
    <Box maxW="md" m="auto" p={4}>
      <ChakraProvider>
        <VStack spacing={4}>
          <Text>Connexion</Text>
          <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name</FormLabel>
              <Input type="string" placeholder="Enter your name" isRequired value={name} onChange={(event) => setName(event.target.value)}/>
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" isRequired value={email} onChange={(event) => setEmail(event.target.value)}/>
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" isRequired value={password} onChange={(event) => setPassword(event.target.value)}/>
            </FormControl>

            <HStack>
              <MainButton props={{ type: 'submit' }} title='Login' onClick={() => setType(AuthenticationType.LOGIN)} />
              <MainButton props={{ type: 'submit' }} title='Register' onClick={() => setType(AuthenticationType.REGISTER)} />
            </HStack>
          </form>
        </VStack>
      </ChakraProvider>
    </Box>
  );
};

export default AuthenticationForm;
