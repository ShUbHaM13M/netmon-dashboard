import { Link } from 'wouter';
import { IconArrowDown, IconClose, IconSignout } from '../../assets/icons';
import Logo from '../../assets/images/logo.svg';
import { RouteType } from '../../dashboards';
import { useCallback, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { setItem as setCookie } from '../../hooks/useCookie';

interface ISideMenuProps {
  navLinks: RouteType[];
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenu = ({ setShowMenu, showMenu, navLinks }: ISideMenuProps) => {
  const [activeSublinkIndex, setActiveSublinkIndex] = useState(-1);
  const { setCurrentUser } = useUserContext();

  const handleSignout = useCallback(() => {
    setCurrentUser(null);
    setCookie('xAuthToken', null);
    setShowMenu(false);
  }, [setCurrentUser, setShowMenu]);

  return (
    <div
      className={`flex flex-col lg:hidden h-[100dvh] w-full bg-card-dark p-4
			fixed inset-0 z-30
			transition-transform ease-out duration-200
			${showMenu ? 'translate-x-0' : '-translate-x-full'}
	`}
    >
      <div className='flex items-center justify-between w-full'>
        <img src={Logo} alt='Inniti' />
        <button onClick={() => setShowMenu(false)}>
          <IconClose />
        </button>
      </div>

      <hr className='my-6 border-icon-grey bg-icon-grey opacity-50' />

      <div className='flex flex-col flex-1 overflow-y-auto hide-scroll'>
        {navLinks.map((route, index) => {
          if (route.hidden) return null;
          return (
            <div
              key={route.label}
              className={`flex flex-col
              border-b border-icon-dark-grey border-opacity-50 last:border-transparent
              uppercase text-sm cursor-pointer
              hover:stroke-brand-orange hover:text-brand-orange
              transition-colors ease-out duration-150
              ${
                activeSublinkIndex === index
                  ? 'text-brand-orange stroke-brand-orange'
                  : 'text-icon-grey stroke-icon-white'
              }
            `}
            >
              {route.sublinks ? (
                <button
                  title='Show Sublinks'
                  type='button'
                  onClick={() => {
                    setActiveSublinkIndex((prev) => (prev !== index ? index : -1));
                  }}
                  className='flex justify-between px-1.5 py-4 w-full uppercase'
                >
                  {route.label}
                  <div
                    className={`${
                      activeSublinkIndex === index ? 'rotate-180' : 'rotate-0'
                    } transition-transform ease-out duration-200`}
                  >
                    <IconArrowDown />
                  </div>
                </button>
              ) : (
                <Link
                  onClick={() => setShowMenu(false)}
                  href={route.url}
                  className='uppercase px-1.5 py-4 w-full text-sm'
                >
                  {route.label}
                </Link>
              )}

              {route.sublinks ? (
                <div
                  className={`flex flex-col gap-2 overflow-hidden transition-all ease-out duration-200 capitalize ${
                    activeSublinkIndex === index ? 'max-h-screen' : 'max-h-0'
                  }`}
                >
                  {route.sublinks.map((subLink) => (
                    <Link
                      onClick={() => setShowMenu(false)}
                      className='pl-4 pr-2 py-3 text-icon-grey text-sm w-full'
                      href={route.url + subLink.url}
                      key={subLink.label}
                    >
                      {subLink.label}
                    </Link>
                  ))}
                </div>
              ) : (
                ''
              )}
            </div>
          );
        })}
      </div>

      <hr className='my-3 border-icon-grey bg-icon-grey opacity-50' />

      <button
        onClick={handleSignout}
        className='flex uppercase text-icon-white px-2 py-5 gap-2 font-semibold text-lg items-center'
      >
        <IconSignout /> Logout
      </button>
    </div>
  );
};

export default SideMenu;
