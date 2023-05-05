import { useEffect, useRef, useState } from 'react';

const dateTimeFormatter = new Intl.DateTimeFormat('en', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const Clock = () => {
  const [dateTime, setDateTime] = useState(dateTimeFormatter.format(new Date()));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDateTime(dateTimeFormatter.format(new Date()));
    }, 1000);
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, []);

  return <span className='text-icon-grey text-[10px] xl:text-xs'>{dateTime}</span>;
};

export default Clock;
