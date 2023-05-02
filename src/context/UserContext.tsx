import { createContext, useContext, useState } from 'react';
import useInterval from '../hooks/useInterval';

const defaultRefrestInterval = 60000;

const TOTAL_SECONDS_IN_DAY = 864e5;
const defaultFrom = new Date(Date.now() - TOTAL_SECONDS_IN_DAY);
const defaultTo = new Date();

interface DefaultProps {
  refetchInterval: number;
  setRefetchInterval: React.Dispatch<React.SetStateAction<number>>;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  timestamp: Timestamp;
  setTimestamp: React.Dispatch<React.SetStateAction<Timestamp>>;
}

const UserContext = createContext<DefaultProps>({
  refetch: false,
  refetchInterval: 0,
  setRefetch: () => ({}),
  setRefetchInterval: () => ({}),
  timestamp: {
    from: defaultFrom,
    to: defaultTo,
  },
  setTimestamp: () => ({}),
});

export function useUserContext() {
  return useContext(UserContext);
}

type Timestamp = {
  from: Date;
  to: Date;
};

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [refetchInterval, setRefetchInterval] = useState(defaultRefrestInterval);
  const [refetch, setRefetch] = useState(false);

  const [timestamp, setTimestamp] = useState<Timestamp>({
    from: defaultFrom,
    to: defaultTo,
  });

  useInterval(() => {
    setRefetch((prev) => !prev);
  }, refetchInterval);

  const value = {
    refetchInterval,
    setRefetchInterval,
    refetch,
    setRefetch,
    timestamp,
    setTimestamp,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
