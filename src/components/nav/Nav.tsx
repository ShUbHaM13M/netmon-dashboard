import { IconArrowDown, IconRefresh, IconSignout } from '../../assets/icons';
import Logo from '../../assets/images/logo.svg';
import Datepicker from '../datapicker/Datepicker';
import NotificationAlert from './NotificationAlert';

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

const Nav = ({ client }: INavProps) => {
  return (
    <header className='bg-card-grey text-icon-white'>
      <nav className='flex px-4 sm:px-8 py-3 sm:py-0 sm:justify-center w-full'>
        <img className='py-3 hidden md:block' src={Logo} alt='Inniti' />

        <button title='Toggle menu' className='block sm:hidden mr-1.5'>
          <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6.5 10.5H24.5M6.5 15.5H24.5M6.5 20.5H24.5'
              stroke='#FEFEFE'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
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
        <div className='flex px-1.5 sm:px-2 sm:my-1 sm:py-2.5 border-l-0 border-r-2 sm:border-x-2 border-card-light items-center'>
          <NotificationAlert totalCriticalAlerts={9} />
        </div>

        <Datepicker />

        <div className='flex items-center border-l-2 sm:border-x-2 border-card-light sm:my-1 px-1.5'>
          <button>
            <IconRefresh />
          </button>
        </div>

        <div className='hidden md:flex px-4 items-center'>
          <button>
            <IconSignout />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
