import { IconArrowDown, IconClose, IconSignout } from '../../assets/icons';
import Logo from '../../assets/images/logo.svg';

interface ISideMenuProps {
  navLinks: { label: string }[];
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenu = ({ setShowMenu, showMenu, navLinks }: ISideMenuProps) => {
  return (
    <div
      className={`flex flex-col sm:hidden h-[100dvh] w-full bg-card-dark p-4
			fixed inset-0
			z-30
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

      <div className='flex flex-col flex-1'>
        {navLinks.map((link) => (
          <div
            key={link.label}
            className='px-1.5 py-[17px] flex text-icon-grey stroke-icon-white uppercase text-sm cursor-pointer items-center justify-between
            hover:stroke-brand-orange hover:text-brand-orange 
            transition-colors ease-out duration-150 
            border-b border-icon-dark-grey border-opacity-50 last:border-transparent'
          >
            <span>{link.label}</span>
            <IconArrowDown />
          </div>
        ))}
      </div>

      <hr className='my-3 border-icon-grey bg-icon-grey opacity-50' />

      <button className='flex uppercase text-icon-white px-2 py-5 gap-2 font-semibold text-sm items-center'>
        <IconSignout /> Logout
      </button>
    </div>
  );
};

export default SideMenu;
