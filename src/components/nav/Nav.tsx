import { useCallback, useEffect, useMemo, useState } from 'react';
import { IconHam, IconRefresh, IconSignout } from '../../assets/icons';
import Logo from '../../assets/images/logo.svg';
import Datepicker from '../datapicker/Datepicker';
import SingleSelectDropdown, { IDropdownOption } from '../dropdown/SingleSelectDropdown';
import NotificationAlert from './NotificationAlert';
import SideMenu from './SideMenu';
import useFetch from '../../hooks/useFetch';
import { API_URL, FetchData, headers } from '../../global';
import { useUserContext } from '../../context/UserContext';
import { routes as _routes } from '../../dashboards';
import NavLink from './NavLink';
import { useLocation } from 'wouter';
import { setItem as setCookie } from '../../hooks/useCookie';
import Clock from './Clock';

const autoRefreshOptions: IDropdownOption[] = [
  { Text: '1 m', Value: 1 },
  { Text: '3 m', Value: 3 },
  { Text: '5 m', Value: 5 },
  { Text: '8 m', Value: 8 },
  { Text: '12 m', Value: 12 },
];

const clientDataURL = `${API_URL}/vars?name=config&filter-value=cust_shortname`;

const Nav = () => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const { setRefetch, setRefetchInterval, setCurrentUser, currentUser } = useUserContext();
  const [location] = useLocation();

  const routes = useMemo(() => {
    if (!currentUser) return _routes;
    return _routes.filter((route) => {
      let currentPath = route.url.split('/')[1];
      currentPath = currentPath ? currentPath : 'monitoring';
      return currentUser.allowed_dashboards.includes(currentPath);
    });
  }, [currentUser]);

  const { data: clientData } = useFetch<FetchData[]>(clientDataURL, {
    headers,
  });

  const handleSignout = useCallback(() => {
    setCurrentUser(null);
    setCookie('xAuthToken', null);
  }, [setCurrentUser]);

  useEffect(() => {
    if (showSideMenu) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'auto';
  }, [showSideMenu]);

  return (
    <header className='sticky top-0 z-50 bg-card-grey text-icon-white w-full'>
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
          <Clock />
        </div>
        <div className='hidden xl:flex self-center'>
          {routes.map((link) => {
            if (link.hidden) return null;
            return (
              <NavLink
                key={link.label}
                {...link}
                selected={location.includes(typeof link.url === 'string' ? link.url : link.url[1])}
              />
            );
          })}
        </div>
        <div className='flex px-1.5 xl:px-2 sm:my-1 ml-auto sm:ml-0 sm:py-2.5 border-l-0 border-r-2 xl:border-x-2 border-card-light items-center'>
          <NotificationAlert />
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
          <button onClick={handleSignout}>
            <IconSignout />
          </button>
        </div>
      </nav>
      <SideMenu navLinks={routes} setShowMenu={setShowSideMenu} showMenu={showSideMenu} />
    </header>
  );
};

export default Nav;
