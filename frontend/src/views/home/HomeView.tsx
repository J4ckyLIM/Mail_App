import { Box, Checkbox, HStack, Text, VStack } from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';

import { EmptyMailIcon } from '../../assets';
import { useGetAllReceivedMessage } from '../../api/messages';

const HomeView: FC = () => {
  const [displayOnlyUnread, setDisplayOnlyUnread] = useState<boolean>(false);

  const { isLoading, isError, messages } = useGetAllReceivedMessage();

  const filteredMessages = useMemo(() => {
    if (displayOnlyUnread) {
      return messages?.filter(message => !message.hasBeenRead);
    }
    return messages;
  }, [messages, displayOnlyUnread]);

  console.log(filteredMessages);

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
        <Text>Mail</Text>
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
