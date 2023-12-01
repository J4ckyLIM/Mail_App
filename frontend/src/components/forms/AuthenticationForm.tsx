import { AtSignIcon } from '@chakra-ui/icons';
import { Box, HStack, Tab, TabList, Tabs, VStack } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';

import { KeyIcon, PersonIcon } from '../../assets';
import { AuthenticationType } from '../../types/auth/types';
import { AuthenticationFormHandlerProps } from '../../views/auth/AuthenticationView';
import MainButton from '../buttons/MainButton';
import FormInput from '../inputs/FormInput';

interface AuthenticationFormProps {
  onSubmit: (props: AuthenticationFormHandlerProps) => void;
}

const AuthenticationForm: FC<AuthenticationFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<AuthenticationType>(
    AuthenticationType.LOGIN,
  );

  const handleSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      onSubmit({ email, password, name, type });
    },
    [email, password, type],
  );

  const handleTabsChange = (index: AuthenticationType) => {
    setType(index);
  };

  return (
    <Box w="full" m="auto" p={4}>
      <VStack spacing={4} w="full" alignItems="flex-start">
        <Tabs index={type} onChange={handleTabsChange}>
          <TabList>
            <Tab fontWeight="semibold" fontSize="3xl">
              Connexion
            </Tab>
            <Tab fontWeight="semibold" fontSize="3xl">
              Inscription
            </Tab>
          </TabList>
        </Tabs>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {type === AuthenticationType.REGISTER && (
            <FormInput
              label="Nom"
              inputType="string"
              placeholder="John Doe"
              isRequired
              onChange={event => setName(event.target.value)}
              value={name}
              icon={<img src={PersonIcon} />}
            />
          )}

          <FormInput
            label="Mail"
            inputType="email"
            placeholder="john.doe@email.com"
            isRequired
            onChange={event => setEmail(event.target.value)}
            value={email}
            icon={<AtSignIcon color="gray.500" />}
          />

          <FormInput
            label="Mot de passe"
            inputType="password"
            placeholder="****************"
            isRequired
            onChange={event => setPassword(event.target.value)}
            value={password}
            icon={<img src={KeyIcon} />}
          />

          <HStack mt="8">
            {type === AuthenticationType.LOGIN ? (
              <MainButton
                props={{ type: 'submit' }}
                title="Login"
                onClick={() => setType(AuthenticationType.LOGIN)}
              />
            ) : (
              <MainButton
                props={{ type: 'submit' }}
                title="Register"
                onClick={() => setType(AuthenticationType.REGISTER)}
              />
            )}
          </HStack>
        </form>
      </VStack>
    </Box>
  );
};

export default AuthenticationForm;
