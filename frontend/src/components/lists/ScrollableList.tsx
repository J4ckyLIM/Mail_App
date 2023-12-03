import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ScrollableListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

const ScrollableList = <T extends Object>({
  items,
  renderItem,
}: ScrollableListProps<T>) => {
  return (
    <Box h="full" overflowY="auto" w="full">
      {items.map(item => renderItem(item))}
    </Box>
  );
};

export default ScrollableList;
