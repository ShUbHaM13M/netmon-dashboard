import { useEffect, useRef, useState } from 'react';
import { IconAlertCritical, IconArrowRight, IconInfo } from '../../assets/icons';

interface INotificationAlertProps {
  totalCriticalAlerts: number;
}

const NotificationAlert = ({ totalCriticalAlerts }: INotificationAlertProps) => {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const width = (totalCriticalAlerts * 100) / 100;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={containerRef} className='z-20'>
      <button className='block md:hidden' onClick={() => setShow((prev) => !prev)}>
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='32' height='32' rx='2' fill='#32333D' />
          <path
            d='M13.5 21.5C13.5 22.6 14.4 23.5 15.5 23.5C16.6 23.5 17.5 22.6 17.5 21.5M24.499 21.499C22.579 19.579 21.5 16.974 21.5 14.258V13.5C21.5 10.876 19.812 8.651 17.466 7.836C17.484 7.727 17.5 7.615 17.5 7.5C17.5 6.395 16.604 5.5 15.5 5.5C14.395 5.5 13.5 6.395 13.5 7.5C13.5 7.615 13.516 7.727 13.534 7.836C11.187 8.651 9.5 10.876 9.5 13.5V14.258C9.5 16.974 8.421 19.579 6.501 21.499L6.5 21.5H24.5L24.499 21.499Z'
            stroke='#9CA3B3'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <rect
            x='18.25'
            y='7.25'
            width='6.5'
            height='6.5'
            rx='3.25'
            fill='#ED3445'
            fillOpacity={totalCriticalAlerts ? 1 : 0}
            className='transition-opacity ease-out duration-150'
          />
          <path
            d='M21.3893 8.63965V11.2646M21.4987 11.9209C21.4987 11.9813 21.4497 12.0303 21.3893 12.0303C21.3289 12.0303 21.2799 11.9813 21.2799 11.9209C21.2799 11.8605 21.3289 11.8115 21.3893 11.8115C21.4497 11.8115 21.4987 11.8605 21.4987 11.9209Z'
            stroke='#FEFEFE'
            strokeWidth='0.4375'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`transition-opacity ease-out duration-150 ${
              totalCriticalAlerts ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <rect
            x='18.25'
            y='7.25'
            width='6.5'
            height='6.5'
            rx='3.25'
            stroke='#32333D'
            className={`transition-opacity ease-out duration-150 ${
              totalCriticalAlerts ? 'opacity-100' : 'opacity-0'
            }`}
            strokeWidth='0.5'
          />
        </svg>
      </button>

      <div
        className={`absolute top-16 left-0 md:static w-full flex flex-col 
        gap-2 p-4 md:p-0 border-t sm:border-t-0 border-card-light bg-card-grey
        ${show ? 'block' : 'hidden md:block'}`}
      >
        <div className='flex md:hidden gap-0.5 items-center justify-between'>
          <div className='flex items-center'>
            <IconInfo />
            <span className='caps-1 text-icon-dark-grey'>Active alarms</span>
            <span className='caps-1 text-icon-grey'>({totalCriticalAlerts})</span>
            <IconArrowRight />
          </div>
          <IconAlertCritical />
        </div>

        <div className='py-2 px-3 md:w-48 rounded-sm bg-card-light flex gap-2.5 items-center justify-between'>
          <div className='relative h-2 w-[156px] md:w-full'>
            <div className='absolute top-0 left-0 w-full h-full border border-status-medium rounded-full'></div>
            <div className='absolute top-0 left-0 w-3/4 h-full border border-status-major rounded-full'></div>
            <div
              style={{
                width: `${width}%`,
              }}
              className='absolute top-0 left-0 w-1/4 h-full border border-status-critical bg-status-critical rounded-full transition-all ease-out duration-150'
            ></div>
          </div>
          <div className='flex gap-1 items-center'>
            <span className='w-1.5 h-1.5 rounded-full bg-status-critical'></span>
            <h6 className='text-status-critical'>Critical</h6>
            <span className='text-md font-semibold text-icon-white'>{totalCriticalAlerts}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationAlert;
