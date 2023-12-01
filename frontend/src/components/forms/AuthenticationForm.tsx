import { Box, Text, ChakraProvider, Input, FormControl, FormLabel, VStack, HStack } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import MainButton from '../buttons/MainButton';
import { AuthenticationType } from '../../types/auth/types';
import { AuthenticationFormHandlerProps } from '../../views/auth/AuthenticationView';
import FormInput from '../inputs/FormInput';
import { AtSignIcon, PhoneIcon } from '@chakra-ui/icons';
import { KeyIcon, PersonIcon } from '../../assets';

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
            <FormInput 
              label="Name" 
              inputType="string" 
              placeholder="Enter your name" 
              isRequired 
              onChange={(event) => setName(event.target.value)} 
              value={name} 
              icon={<img src={PersonIcon} />}
            />

            <FormInput 
              label="Email" 
              inputType="email" 
              placeholder="Enter your email" 
              isRequired 
              onChange={(event) => setEmail(event.target.value)} 
              value={email} 
              icon={<AtSignIcon color="gray.500" />}
            />

            <FormInput 
              label="Password" 
              inputType="password" 
              placeholder="Enter your password" 
              isRequired 
              onChange={(event) => setPassword(event.target.value)} 
              value={password} 
              icon={<img src={KeyIcon} />}
            />

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
