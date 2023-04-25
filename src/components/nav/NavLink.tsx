import { Link } from 'wouter';
import { IconArrowDown } from '../../assets/icons';
import { RouteType } from '../../dashboards';
import { useEffect, useState } from 'react';

interface NavLinkProps extends RouteType {
  selected?: boolean;
}

const NavLink = ({ label, url, sublinks, selected }: NavLinkProps) => {
  const [showSublinks, setShowSublinks] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowSublinks(false);
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div
      className={`relative px-1.5 py-[17px] flex text-sm cursor-pointer items-center
    hover:stroke-brand-orange hover:text-brand-orange 
      transition-colors ease-out duration-150
      ${selected ? 'text-brand-orange stroke-brand-orange' : 'text-icon-grey stroke-icon-white'}`}
    >
      <Link className='uppercase' href={typeof url === 'string' ? url : url[1]}>
        {label}
      </Link>
      <button
        title='Show Sublinks'
        type='button'
        onClick={() => {
          setShowSublinks((prev) => {
            return !prev;
          });
        }}
        className={`${
          showSublinks ? 'rotate-180' : 'rotate-0'
        } transition-transform ease-out duration-200`}
      >
        <IconArrowDown />
      </button>
      {sublinks && showSublinks ? (
        <div
          style={{
            top: `calc(100% + 8px)`,
          }}
          className='absolute left-0 bg-card-light p-2.5 z-20 
					grid grid-cols-2 gap-x-[18px] gap-y-1 min-w-[530px]'
        >
          {sublinks.map((subLink) => {
            return (
              <Link
                className='px-2 h-10 inline-flex items-center w-fit text-icon-grey hover:bg-icon-dark-grey hover:text-icon-white min-w-full transition-colors ease-out duration-150'
                href={`${typeof url === 'string' ? url : url[1]}${subLink.url}`}
                key={subLink.label}
              >
                {subLink.label}
              </Link>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default NavLink;
