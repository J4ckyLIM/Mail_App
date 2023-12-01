import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import AuthenticationForm from '../../components/forms/AuthenticationForm';
import { useAuth } from '../../hooks/useAuth';
import { AuthenticationType } from '../../types/auth/types';

export interface AuthenticationFormHandlerProps {
  email: string;
  password: string;
  name: string;
  type: AuthenticationType;
}

const AuthenticationView: FC = () => {
  const { login, register } = useAuth();

  const onSubmitHandler = ({email, password, name, type}: AuthenticationFormHandlerProps) => {
    if (type === AuthenticationType.LOGIN) {
      login(email, password);
    } else {
      console.log('register my friend')
      register(email, password, name);  
    }
  };

  return (
    <Flex height={'100vh'} width={'100%'}>
      <VStack flex="40%">
        <HStack>LOGO</HStack>
        <AuthenticationForm onSubmit={onSubmitHandler} />
      </VStack>
      <Box flex="60%" backgroundImage={'url(/assets/login-background.png)'} backgroundSize={'cover'} backgroundPosition={'center'} height={'100vh'} />
    </Flex>
  );
};

export default AuthenticationView;

// Mica test warp c'est un terminal pas mal je trouve