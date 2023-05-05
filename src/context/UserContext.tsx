import { createContext, useContext, useEffect, useState } from 'react';
import useInterval from '../hooks/useInterval';
import { User, setHeaders } from '../global';
import { useLocation } from 'wouter';
import useCookie, { getItem as getCookie } from '../hooks/useCookie';

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
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  userLoggedIn: boolean;
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
  currentUser: null,
  setCurrentUser: () => ({}),
  userLoggedIn: false,
});

export function useUserContext() {
  return useContext(UserContext);
}

type Timestamp = {
  from: Date;
  to: Date;
};

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [_, setLocation] = useLocation();
  const [currentUser, setCurrentUser] = useCookie('user', null);
  const [refetchInterval, setRefetchInterval] = useState(defaultRefrestInterval);
  const [refetch, setRefetch] = useState(false);

  const userLoggedIn = !!currentUser;

  useEffect(() => {
    if (!userLoggedIn) {
      setLocation('/login');
    }
    getCookie('xAuthToken') && setHeaders('X-Auth-Token', getCookie('xAuthToken'));
  }, [userLoggedIn, setLocation]);

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
    currentUser,
    setCurrentUser,
    userLoggedIn,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
