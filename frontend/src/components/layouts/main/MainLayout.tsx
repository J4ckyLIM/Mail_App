import { Box, VStack } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import TopBar from '../navbar/TopBar';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = () => {
  return (
    <VStack h="100vh" w="full">
      <TopBar />
      <Box ml={{ base: 0 }} border="1px solid blue" flexGrow="1 !important" flex="0 0 auto" w="full">
        <Outlet />
      </Box>
    </VStack>
  );
};

export default MainLayout;
