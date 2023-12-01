import { Box } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../footer/Footer';
import TopBar from '../navbar/TopBar';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = () => {
  return (
    <Box minH="100vh">
      <TopBar />
      <Box ml={{ base: 0 }} p="4">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
