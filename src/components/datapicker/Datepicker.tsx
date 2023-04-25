import { useState } from 'react';
import { IconCalendar } from '../../assets/icons';
import { useUserContext } from '../../context/UserContext';
import DateInput from './DateInput';
import { createPortal } from 'react-dom';

const Datepicker = () => {
  const { timestamp, setTimestamp } = useUserContext();
  const [showMobileDatePicker, setShowMobileDatePicker] = useState(false);

  return (
    <div className='px-2 flex items-center gap-1.5'>
      <button className='' onClick={() => setShowMobileDatePicker((prev) => !prev)}>
        <IconCalendar />
      </button>
      <div className='hidden sm:flex p-2 bg-card-light rounded-sm items-center'>
        <div className='flex flex-row text-icon-grey text-sm gap-1'>
          <DateInput
            date={timestamp.from}
            onDateChange={(date) => setTimestamp((prev) => ({ ...prev, from: date }))}
          />
          -
          <DateInput
            date={timestamp.to}
            onDateChange={(date) => setTimestamp((prev) => ({ ...prev, to: date }))}
          />
        </div>
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
      {createPortal(
        showMobileDatePicker ? (
          <div
            role='presentation'
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowMobileDatePicker(false);
            }}
            className='flex md:hidden fixed h-screen w-full top-0 left-0 z-30 bg-[#2E2F33CC] text-icon-white items-center justify-center'
          >
            <div
              role='presentation'
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              className='flex flex-row text-icon-grey text-base gap-1'
            >
              <DateInput
                date={timestamp.from}
                onDateChange={(date) => setTimestamp((prev) => ({ ...prev, from: date }))}
              />
              -
              <DateInput
                date={timestamp.to}
                onDateChange={(date) => setTimestamp((prev) => ({ ...prev, to: date }))}
              />
            </div>
          </div>
        ) : null,
        document.body,
      )}
    </div>
  );
};

export default Datepicker;
