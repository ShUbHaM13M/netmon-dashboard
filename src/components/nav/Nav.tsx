import { useEffect, useState } from 'react';
import { IconArrowDown, IconHam, IconRefresh, IconSignout } from '../../assets/icons';
import Logo from '../../assets/images/logo.svg';
import Datepicker from '../datapicker/Datepicker';
import SingleSelectDropdown, { IDropdownOption } from '../dropdown/SingleSelectDropdown';
import NotificationAlert from './NotificationAlert';
import SideMenu from './SideMenu';
import useFetch from '../../hooks/useFetch';
import { API_URL, FetchData, headers } from '../../global';
import { useUserContext } from '../../context/UserContext';

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
  { Text: '1 m', Value: 1 },
  { Text: '3 m', Value: 3 },
  { Text: '5 m', Value: 5 },
  { Text: '8 m', Value: 8 },
  { Text: '12 m', Value: 12 },
];

const URL = `${API_URL}/vars?name=config&filter-value=cust_shortname`;

const Nav = () => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const { refetch, setRefetch, setRefetchInterval } = useUserContext();

  const { data: clientData } = useFetch<FetchData[]>(
    URL,
    {
      headers,
    },
    refetch,
  );

  useEffect(() => {
    if (showSideMenu) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'auto';
  }, [showSideMenu]);

  return (
    <header className='bg-card-grey text-icon-white w-full'>
      <nav className='flex px-4 xl:px-8 py-3 sm:py-0 sm:justify-center w-full'>
        <img className='py-3 hidden xl:block' src={Logo} alt='Inniti' />

        <button
          title='Toggle menu'
          className='block xl:hidden mr-1.5'
          onClick={() => setShowSideMenu(true)}
        >
          <IconHam />
        </button>

        <div className='flex flex-col gap-1.5 xl:gap-2 border-l-2 sm:border-x-2 border-card-light sm:ml-6 px-1.5 sm:px-3 sm:py-2.5 my-1'>
          <span className='caps-1-bold'>{clientData ? clientData[0].Value : ''}</span>
          <span className='text-icon-grey text-[10px] xl:text-xs'>24/4/23, 16:23</span>
        </div>
        <div className='hidden xl:flex self-center'>
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
        <div className='flex px-1.5 xl:px-2 sm:my-1 ml-auto sm:ml-0 sm:py-2.5 border-l-0 border-r-2 xl:border-x-2 border-card-light items-center'>
          <NotificationAlert totalCriticalAlerts={9} />
        </div>

        <Datepicker />

        <div className='flex items-center gap-1 xl:gap-2 border-l-2 sm:border-x-2 border-card-light sm:my-1 px-1.5'>
          <button onClick={() => setRefetch((prev) => !prev)}>
            <IconRefresh />
          </button>
          <div className='w-[60px] xl:w-[70px]'>
            <SingleSelectDropdown
              label='Refresh rate'
              showLabelInDesktop={false}
              showSearchbar={false}
              onValueChange={(data) => setRefetchInterval(data.Value * 60000)}
              options={autoRefreshOptions}
              defaultValue={autoRefreshOptions[0]}
            />
          </div>
        </div>

        <div className='hidden xl:flex px-4 items-center'>
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
