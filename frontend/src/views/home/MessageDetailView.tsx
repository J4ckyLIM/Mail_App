import { HStack, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { Message } from '../../types/messages/types';
import { convertDateToReadable } from '../../utils/convertDateToReadable';

interface MessageDetailViewProps {
  message: Message;
}

const MessageDetailView: FC<MessageDetailViewProps> = ({
  message: { title, sentAt, writtenBy, writtenTo, content },
}) => {
  return (
    <VStack w="full" backgroundColor="white" py="10" px="8">
      <HStack w="full" justifyContent="space-between">
        <Text fontWeight="bold" fontSize="lg">
          {title}
        </Text>
        <Text fontWeight="normal" fontSize="sm" color="gray.400">
          {convertDateToReadable(sentAt)}
        </Text>
      </HStack>
      <HStack w="full" mt="6 !important">
        <Text fontWeight="semibold" fontSize="md">
          Someone
        </Text>
        <Text
          fontWeight="normal"
          fontSize="sm"
          color="#666666"
        >{`<${writtenBy}>`}</Text>
      </HStack>
      <HStack w="full" color="#6EB6F8" mt="0 !important">
        <Text fontWeight="normal" fontSize="md" mr="2">
          à
        </Text>
        <Text fontWeight="bold" fontSize="md">
          The sender
        </Text>
        <Text fontWeight="normal" fontSize="sm">{`<${writtenTo}>`}</Text>
      </HStack>
      <HStack
        justifyContent="center"
        alignItems="center"
        w="70%"
        mt="16 !important"
      >
        <Text fontWeight="normal" fontSize="sm" lineHeight="6">
          {content}
        </Text>
      </HStack>
    </VStack>
  );
};

export default MessageDetailView;
