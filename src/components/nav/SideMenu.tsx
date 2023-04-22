import { Link } from 'wouter';
import { IconArrowDown, IconClose, IconSignout } from '../../assets/icons';
import Logo from '../../assets/images/logo.svg';
import { RouteType } from '../../dashboards';
import { useState } from 'react';

interface ISideMenuProps {
  navLinks: RouteType[];
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenu = ({ setShowMenu, showMenu, navLinks }: ISideMenuProps) => {
  const [activeSublinkIndex, setActiveSublinkIndex] = useState(-1);

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
        {navLinks.map((route, index) => (
          <div
            key={route.label}
            className='flex flex-col
            border-b border-icon-dark-grey border-opacity-50 last:border-transparent'
          >
            <div
              className={`flex justify-between px-1.5 py-4 w-full
              uppercase text-sm cursor-pointer
              hover:stroke-brand-orange hover:text-brand-orange
              transition-colors ease-out duration-150
              ${
                activeSublinkIndex === index
                  ? 'text-brand-orange stroke-brand-orange'
                  : 'text-icon-grey stroke-icon-white'
              }`}
            >
              <Link href={route.url} onClick={() => setShowMenu(false)}>
                {route.label}
              </Link>

              <button
                title='Show Sublinks'
                type='button'
                onClick={() => {
                  setActiveSublinkIndex((prev) => (prev !== index ? index : -1));
                }}
                className={`${
                  index === activeSublinkIndex ? 'rotate-180' : 'rotate-0'
                } transition-transform ease-out duration-200`}
              >
                <IconArrowDown />
              </button>
            </div>
            {route.sublinks ? (
              <div
                className={`flex flex-col gap-2 overflow-hidden transition-all ease-out duration-200 ${
                  activeSublinkIndex === index ? 'max-h-screen' : 'max-h-0'
                }`}
              >
                {route.sublinks.map((subLink) => (
                  <Link
                    onClick={() => setShowMenu(false)}
                    className='pl-4 pr-2 py-3 text-icon-grey text-sm w-full'
                    href={`${route.url}${subLink.url}`}
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
        ))}
      </div>

      <hr className='my-3 border-icon-grey bg-icon-grey opacity-50' />

      <button className='flex uppercase text-icon-white px-2 py-5 gap-2 font-semibold text-lg items-center'>
        <IconSignout /> Logout
      </button>
    </div>
  );
};

export default SideMenu;
