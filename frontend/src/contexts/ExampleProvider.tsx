import { createContext, useMemo, useState } from 'react';

interface ExampleConfig {
  value: string;
}

export const ExampleContext = createContext<ExampleConfig>({
  value: 'hello',
});

export const ExampleProvider = ({ children }: { children: any }) => {
  const [value] = useState<string>('example');

  const contextValues = useMemo(() => {
    return {
      value,
    };
  }, [value]);

  return (
    <ExampleContext.Provider value={contextValues}>
      {children}
    </ExampleContext.Provider>
  );
};
