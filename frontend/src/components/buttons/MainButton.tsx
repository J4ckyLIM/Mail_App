import { Button, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

interface MainButtonProps {
  props: ButtonProps;
  title: string;
  onClick: () => void;
}

const MainButton: FC<MainButtonProps> = ({ title, onClick, props }) => {
  return (
    <Button
      {...props}
      borderRadius={'4px'}
      width={'164px'}
      height={'48px'}
      bgColor={'#333333'}
      onClick={onClick}
      color={'white'}
      fontSize={'14px'}
    >
      {title}
    </Button>
  );
};

export default MainButton;
