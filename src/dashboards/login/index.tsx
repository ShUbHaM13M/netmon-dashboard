import { FormEvent, useCallback, useRef } from 'react';
import { Button } from '../../components';
import { API_BASE, User, headers } from '../../global';
import { useUserContext } from '../../context/UserContext';
import { useLocation } from 'wouter';
import { setItem as setCookie } from '../../hooks/useCookie';

const loginURL = `${API_BASE}/login`;

const Login = () => {
  const { setCurrentUser } = useUserContext();
  const [_, setLocation] = useLocation();

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const loginUser = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!usernameInputRef.current || !passwordInputRef.current) return;

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
        setCurrentUser(data);
        if (data.allowed_dashboards.length) setLocation('/');
      }
    },
    [setCurrentUser, setLocation],
  );

  return (
    <div className='flex flex-col pb-6 h-screen sm:items-center justify-center'>
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
            type='password'
            name='password'
            className='mt-1.5 w-full bg-card-light rounded-sm py-1.5 pl-2 hover:bg-[#3E404D] text-sm text-icon-grey outline-none placeholder:text-icon-dark-grey'
            id='password'
            placeholder='Enter password'
          />
        </div>
        <Button primary type='submit' title='Login'>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
