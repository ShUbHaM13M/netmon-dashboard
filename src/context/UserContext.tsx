import { createContext, useContext, useState } from 'react';
import useInterval from '../hooks/useInterval';

interface DefaultProps {
  refetchInterval: number;
  setRefetchInterval: React.Dispatch<React.SetStateAction<number>>;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<DefaultProps>({
  refetch: false,
  refetchInterval: 0,
  setRefetch: () => ({}),
  setRefetchInterval: () => ({}),
});

export function useUserContext() {
  return useContext(UserContext);
}

const defaultRefrestInterval = 60000;
export default function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [refetchInterval, setRefetchInterval] = useState(defaultRefrestInterval);
  const [refetch, setRefetch] = useState(false);

  useInterval(() => {
    setRefetch((prev) => !prev);
  }, refetchInterval);

  const value = {
    refetchInterval,
    setRefetchInterval,
    refetch,
    setRefetch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
