import {
  Box,
  Flex,
  HStack,
  IconButton,
} from '@chakra-ui/react';

import { LogoIcon, LogoutIcon } from '../../../assets';
import { useAuth } from '../../../hooks/useAuth';
import MainAvatar from '../../avatars/MainAvatar';

const TopBar = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <Box px="6" py="2">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <img src={LogoIcon} />
          </Flex>
          <HStack display="flex" alignItems="center" justify="flex-end" spacing="4">
            {user && (<MainAvatar user={user} numberOfUnreadMessages={10} />)}
            <IconButton aria-label="Déconnexion" icon={<img src={LogoutIcon}/>} bgColor="transparent" onClick={logout} />
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default TopBar;
