import { useEffect, useState } from 'react';

const DEFAULT_DEBOUNCE_DURATION = 1000;

function useDebouce(value: any, delay = DEFAULT_DEBOUNCE_DURATION) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearInterval(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebouce;
