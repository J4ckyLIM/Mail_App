import { useContext } from 'react';

import { ExampleContext } from '../contexts/ExampleProvider';

export const useExample = () => {
  const { value } = useContext(ExampleContext);
  return {
    value,
  };
};
