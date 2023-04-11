import { useEffect, useState } from 'react';
import { IconArrowDown, IconHam, IconRefresh, IconSignout } from '../../assets/icons';
import Logo from '../../assets/images/logo.svg';
import Datepicker from '../datapicker/Datepicker';
import SingleSelectDropdown, { IDropdownOption } from '../dropdown/SingleSelectDropdown';
import NotificationAlert from './NotificationAlert';
import SideMenu from './SideMenu';

interface INavProps {
  client: string;
}

const navLinks = [
  {
    label: 'Monitoring',
  },
  {
    label: 'Reporting',
  },
  {
    label: 'Static Data',
  },
  {
    label: 'User guide',
  },
];

const autoRefreshOptions: IDropdownOption[] = [
  { label: '3 m', value: '3' },
  { label: '5 m', value: '5' },
  { label: '8 m', value: '8' },
  { label: '12 m', value: '12' },
];

const Nav = ({ client }: INavProps) => {
  const [showSideMenu, setShowSideMenu] = useState(false);

  useEffect(() => {
    if (showSideMenu) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'auto';
  }, [showSideMenu]);

  return (
    <header className='bg-card-grey text-icon-white'>
      <nav className='flex px-4 sm:px-8 py-3 sm:py-0 sm:justify-center w-full'>
        <img className='py-3 hidden md:block' src={Logo} alt='Inniti' />

        <button
          title='Toggle menu'
          className='block sm:hidden mr-1.5'
          onClick={() => setShowSideMenu(true)}
        >
          <IconHam />
        </button>

        <div className='flex flex-col gap-1.5 sm:gap-2 border-l-2 sm:border-x-2 border-card-light sm:ml-6 px-1.5 sm:px-3 sm:py-2.5 my-1'>
          <span className='caps-1-bold'>{client}</span>
          <span className='text-icon-grey text-[10px] sm:text-xs'>24/4/23, 16:23</span>
        </div>
        <div className='hidden md:flex self-center'>
          {navLinks.map((link) => (
            <div
              className='px-1.5 py-[17px] flex text-icon-grey stroke-icon-white uppercase text-sm cursor-pointer items-center
              hover:stroke-brand-orange hover:text-brand-orange 
              transition-colors ease-out duration-150'
              key={link.label}
            >
              <span>{link.label}</span>
              <IconArrowDown />
            </div>
          ))}
        </div>
        <div className='flex px-1.5 sm:px-2 sm:my-1 ml-auto sm:ml-0 sm:py-2.5 border-l-0 border-r-2 sm:border-x-2 border-card-light items-center'>
          <NotificationAlert totalCriticalAlerts={9} />
        </div>

        <Datepicker />

        <div className='flex items-center gap-1 sm:gap-2 border-l-2 sm:border-x-2 border-card-light sm:my-1 px-1.5'>
          <button>
            <IconRefresh />
          </button>
          <div className='w-[60px] sm:w-[70px]'>
            <SingleSelectDropdown
              label='Refresh rate'
              showLabelInDesktop={false}
              showSearchbar={false}
              onValueChange={(value) => console.log(value)}
              options={autoRefreshOptions}
              defaultValue={autoRefreshOptions[0]}
            />
          </div>
        </div>

        <div className='hidden md:flex px-4 items-center'>
          <button>
            <IconSignout />
          </button>
        </div>
      </nav>
      <SideMenu navLinks={navLinks} setShowMenu={setShowSideMenu} showMenu={showSideMenu} />
    </header>
  );
};

export default Nav;
