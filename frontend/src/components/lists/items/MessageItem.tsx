import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { Message } from '../../../types/messages/types';
import { convertDateToReadable } from '../../../utils/convertDateToReadable';

interface MessageItemProps {
  message: Message;
  onClick: (message: Message) => void;
}

const MessageItem: FC<MessageItemProps> = ({ message, onClick }) => {
  const badgeColor = message.hasBeenRead ? '#DDDDDD' : '#6EB6F8';
  const opacity = message.hasBeenRead ? '0.7' : '1';

  const titleFontWeight = message.hasBeenRead ? 'normal' : 'semibold';

  return (
    <HStack
      borderRadius={'4px'}
      p="4"
      py="6"
      w="full"
      borderBottom="1px solid gray"
      borderColor="gray.200"
      spacing="2"
      _hover={{
        cursor: 'pointer',
        backgroundColor: '#F5F5F5',
      }}
      onClick={() => onClick(message)}
    >
      <Box borderRadius="full" backgroundColor={badgeColor} w="16px" h="16px" />
      <VStack
        flex="60%"
        alignItems="flex-start"
        spacing="0"
        pl="2"
        opacity={opacity}
      >
        <Text fontWeight="bold" fontSize="md">
          {message.writtenBy}
        </Text>
        <Text fontWeight={titleFontWeight} fontSize="sm">
          {message.title}
        </Text>
      </VStack>
      <Text
        flex="20%"
        opacity={opacity}
        pr="2"
        fontSize="sm"
        fontWeight="semibold"
        textAlign="right"
      >
        {convertDateToReadable(message.sentAt)}
      </Text>
    </HStack>
  );
};

export default MessageItem;
