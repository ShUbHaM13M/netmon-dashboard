import { IconCalendar } from '../../assets/icons';

const Datepicker = () => {
  return (
    <div className='px-2 flex items-center gap-1.5'>
      <IconCalendar />
      <div className='hidden sm:flex p-2 bg-card-light rounded-sm items-center'>
        <span className=' text-icon-grey text-sm'>24/04/23, 16:23 - 25/04/23, 16:23</span>
        <svg
          width='20'
          height='21'
          viewBox='0 0 20 21'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12.0834 9.25L9.58337 11.75L7.08337 9.25'
            stroke='#9CA3B2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </div>
  );
};

export default Datepicker;
