import { Avatar, Badge, Box, HStack, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { User } from '../../types/auth/types';

interface MainAvatarProps {
  user: User;
  numberOfUnreadMessages: number;
}

const MainAvatar: FC<MainAvatarProps> = ({
  user,
  numberOfUnreadMessages = 10,
}) => {
  return (
    <HStack spacing="2">
      <Box position="relative" display="inline-block">
        <Avatar
          name={user.name}
          size="md"
          bgGradient="linear(to-r, #2580B4, #2FD8D8)"
        />
        {numberOfUnreadMessages > 0 && (
          <Badge
            borderRadius="full"
            position="absolute"
            bottom="0"
            bg="white"
            right="0"
            color="black"
            fontSize="xs"
            w="24px"
            h="24px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {numberOfUnreadMessages}
          </Badge>
        )}
      </Box>
      <VStack alignItems="flex-start" spacing="0">
        <Box fontWeight="bold">{user.name}</Box>
        <Box fontSize="sm" color="gray.600">
          {user.email}
        </Box>
      </VStack>
    </HStack>
  );
};

export default MainAvatar;
