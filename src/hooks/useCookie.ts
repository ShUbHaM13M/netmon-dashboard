import { useState } from 'react';

const cookieDefaultFlags = 'SameSite=None; Secure;';

export const getItem = (key: string) =>
  document.cookie.split('; ').reduce((total, currentCookie) => {
    const item = currentCookie.split('=');
    const storedKey = item[0];
    const storedValue = item[1];
    if (key === storedKey) {
      try {
        return JSON.parse(decodeURIComponent(storedValue));
      } catch {
        return decodeURIComponent(storedValue);
      }
    }
    return total;
  }, '');

export const setItem = (key: string, value: any) => {
  document.cookie = `${key}=${value}; path=/; ${cookieDefaultFlags}`;
};

const useCookie = (key: string, defaultValue: any) => {
  const getCookie = () => getItem(key) || defaultValue;
  const [cookie, setCookie] = useState(getCookie());

  const updateCookie = (value: string) => {
    setCookie(value);
    setItem(key, JSON.stringify(value));
  };

  return [cookie, updateCookie];
};

export default useCookie;
