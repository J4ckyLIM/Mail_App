import { Box, Checkbox, HStack, Text, VStack } from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';

import { EmptyMailIcon } from '../../assets';
import { useGetAllReceivedMessage } from '../../api/messages';
import { Message } from '../../types/messages/types';
import MessageItem from '../../components/lists/items/MessageItem';
import ScrollableList from '../../components/lists/ScrollableList';

const HomeView: FC = () => {
  const [displayOnlyUnread, setDisplayOnlyUnread] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const { isLoading, isError, messages } = useGetAllReceivedMessage();

  const filteredMessages2: Message[] = [
    {
      id: '1',
      title: 'Message 1',
      content: 'Contenu du message 1',
      writtenBy: 'truc@gmail.com',
      writtenTo: 'plop@gmail.com',
      hasBeenRead: false,
      sentAt: new Date(),
    },
    {
      id: '2',
      title: 'Message 2',
      content: 'Contenu du message 2',
      writtenBy: 'truc@gmail.com',
      writtenTo: 'plop@gmail.com',
      hasBeenRead: false,
      sentAt: new Date(),
    },
    {
      id: '3',
      title: 'Message 3',
      content: 'Contenu du message 3',
      writtenBy: 'truc@gmail.com',
      writtenTo: 'plop@gmail.com',
      hasBeenRead: false,
      sentAt: new Date(),
    },
    {
      id: '4',
      title: 'Message 4',
      content: 'Contenu du message 4',
      writtenBy: 'truc@gmail.com',
      writtenTo: 'plop@gmail.com',
      hasBeenRead: true,
      sentAt: new Date('2023-02-22T13:42:00'),
    }
  ]

  const filteredMessages = useMemo(() => {
    const msgToFilter = messages?.length ? messages : filteredMessages2;
    if (displayOnlyUnread) {
      return msgToFilter?.filter(message => !message.hasBeenRead);
    }
    return msgToFilter;
  }, [messages, displayOnlyUnread]);

  const renderMessageItem = (message: Message) => <MessageItem key={message.id} message={message} onClick={setSelectedMessage} />;

  return (
    <Box border="1px solid green" w="full" h="full" display="flex">
      <VStack flex="34%" alignItems="flex-start" h="full">
        <HStack w="full" justifyContent="space-between" p="2" borderBottom="1px solid gray" borderColor="gray.200">
          <Text fontWeight="semibold" fontSize="sm">
            Boîte de réception ({filteredMessages?.length ?? 0})
          </Text>
          <Checkbox size='md' colorScheme='red' isChecked={displayOnlyUnread} onChange={(event) => setDisplayOnlyUnread(event.target.checked)}>
            <Text fontSize="xs" color="gray" fontWeight="normal">
              Afficher uniquement les messages non lus
            </Text>
          </Checkbox>
        </HStack>
        {filteredMessages && (
          <ScrollableList<Message> items={filteredMessages} renderItem={renderMessageItem} />
        )}
      </VStack>
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
    </Box>
  );
};

export default HomeView;