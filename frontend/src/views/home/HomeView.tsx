import { Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { Page } from '../../components/layouts/page/Page';

const HomeView: FC = () => {
  return (
    <Page title="Home">
      <VStack>
        <Text>Home view</Text>
      </VStack>
    </Page>
  );
};

export default HomeView;
