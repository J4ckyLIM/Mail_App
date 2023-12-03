import { Box, Checkbox, HStack, Text, VStack } from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';

import { EmptyMailIcon } from '../../assets';
import { useGetAllReceivedMessage, useUpdateMessageStatus } from '../../api/messages';
import { Message } from '../../types/messages/types';
import MessageItem from '../../components/lists/items/MessageItem';
import ScrollableList from '../../components/lists/ScrollableList';
import MessageDetailView from './MessageDetailView';

const HomeView: FC = () => {
  const [displayOnlyUnread, setDisplayOnlyUnread] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const { messages, refetch } = useGetAllReceivedMessage();

  const { update } = useUpdateMessageStatus();

  const filteredMessages = useMemo(() => {
    if (displayOnlyUnread) {
      return messages?.filter(message => !message.hasBeenRead);
    }
    return messages;
  }, [messages, displayOnlyUnread]);

  const handleOnClickMessage = (message: Message) => {
    setSelectedMessage(message);
    update({ hasBeenRead: true, id: message.id, onSuccess: () => {
      refetch();
    } });
  };

  const renderMessageItem = (message: Message) => <MessageItem key={message.id} message={message} onClick={handleOnClickMessage} />;

  return (
    <Box border="1px solid green" w="full" h="full" display="flex">
      <VStack flex="34%" alignItems="flex-start" h="full">
        <HStack w="full" justifyContent="space-between" p="2" borderBottom="1px solid gray" borderColor="gray.200">
          <Text fontWeight="semibold" fontSize="sm">
            Boîte de réception ({filteredMessages?.length ?? 0})
          </Text>
          <Checkbox size='md' colorScheme="blue" isChecked={displayOnlyUnread} onChange={(event) => setDisplayOnlyUnread(event.target.checked)}>
            <Text fontSize="xs" color="gray" fontWeight="normal">
              Afficher uniquement les messages non lus
            </Text>
          </Checkbox>
        </HStack>
        {filteredMessages && (
          <ScrollableList<Message> items={filteredMessages} renderItem={renderMessageItem} />
        )}
      </VStack>
      {selectedMessage ? (
        <VStack flex="66%" p="12" backgroundColor="#F1F1F1">
          <MessageDetailView message={selectedMessage} />
        </VStack>
      ) : (
        <HStack
          flex="66%"
          height="100%"
          w="full"
          border="1px solid blue"
          backgroundColor="#F1F1F1"
          justifyContent="center"
        >
          <img src={EmptyMailIcon} />
        </HStack>
      )}
    </Box>
  );
};

export default HomeView;