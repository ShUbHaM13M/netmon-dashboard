import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../../components';
import { API_BASE, Criticality, User, headers } from '../../global';
import { useUserContext } from '../../context/UserContext';
import { useLocation } from 'wouter';
import { setItem as setCookie } from '../../hooks/useCookie';

const loginURL = `${API_BASE}/login`;

type Message = {
  text: string;
  criticality: Criticality;
};

const Login = () => {
  const { setCurrentUser } = useUserContext();
  const [_, setLocation] = useLocation();

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (message)
      setTimeout(() => {
        setMessage(null);
      }, 3000);
  }, [message]);

  const onInputChange = useCallback(() => {
    if (!usernameInputRef.current || !passwordInputRef.current) return;
    if (usernameInputRef.current.value.length && passwordInputRef.current.value.length)
      setSubmitDisabled(false);
    else setSubmitDisabled(true);
  }, []);

  const loginUser = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!usernameInputRef.current || !passwordInputRef.current) return;
      try {
        const res = await fetch(loginURL, {
          method: 'POST',
          body: JSON.stringify({
            username: usernameInputRef.current.value,
            password: passwordInputRef.current.value,
          }),
          headers,
        });
        if (res.ok) {
          const xAuthToken = res.headers.get('x-auth-token')!;
          setCookie('xAuthToken', xAuthToken);
          const data = (await res.json()) as User;
          setMessage({
            text: 'Logged in',
            criticality: Criticality.SAFE,
          });
          setTimeout(() => {
            if (data.allowed_dashboards.length) setLocation('/');
            setCurrentUser(data);
          }, 3000);
          return;
        }
        if (res.status === 401) {
          setMessage({
            text: 'User not Authorized, username or password may be incorrect',
            criticality: Criticality.CRITICAL,
          });
          return;
        }
      } catch {
        setMessage({ text: 'An Internal Server error occured', criticality: Criticality.CRITICAL });
      }
    },
    [setCurrentUser, setLocation],
  );

  return (
    <div className='flex flex-col pb-6 h-screen sm:items-center justify-center relative'>
      <form
        onSubmit={loginUser}
        className='bg-card-grey p-6 rounded-md flex flex-col gap-6 shadow-medium'
      >
        <h3 className='text-icon-white text-center'>Login</h3>
        <hr className='border-icon-dark-grey bg-icon-dark-grey' />
        <div className='w-full sm:w-[340px]'>
          <label htmlFor='username' className='caps-1 text-icon-dark-grey whitespace-nowrap'>
            Username
          </label>
          <input
            onChange={onInputChange}
            ref={usernameInputRef}
            className='mt-1.5 w-full bg-card-light rounded-sm py-1.5 pl-2 hover:bg-[#3E404D] text-sm text-icon-grey outline-none placeholder:text-icon-dark-grey'
            id='username'
            placeholder='Enter username'
            name='username'
          />
        </div>
        <div className='w-full sm:w-[340px]'>
          <label htmlFor='password' className='caps-1 text-icon-dark-grey whitespace-nowrap'>
            Password
          </label>
          <input
            ref={passwordInputRef}
            onChange={onInputChange}
            type='password'
            name='password'
            className='mt-1.5 w-full bg-card-light rounded-sm py-1.5 pl-2 hover:bg-[#3E404D] text-sm text-icon-grey outline-none placeholder:text-icon-dark-grey'
            id='password'
            placeholder='Enter password'
          />
        </div>
        <Button primary type='submit' title='Login' disabled={submitDisabled}>
          Login
        </Button>
      </form>

      <div
        style={{
          borderColor: message?.criticality,
          backgroundColor: message?.criticality + '1A',
        }}
        className={`absolute w-full sm:w-2/4 right-0 border p-2 sm:right-4 rounded-md transition-all text-sm ease-out duration-200 text-icon-white select-none ${
          message ? 'bottom-16 opacity-100' : '-bottom-6 opacity-0'
        }`}
      >
        {message?.text}
      </div>
    </div>
  );
};

export default Login;
