import { Heading, VStack } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface PageProps {
  title: string;
  children: ReactNode;
}

export const Page: FC<PageProps> = ({ title, children }) => {
  return (
    <VStack>
      <Heading size="lg">{title}</Heading>
      {children}
    </VStack>
  );
};
