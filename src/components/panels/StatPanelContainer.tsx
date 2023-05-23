import { useState } from 'react';
import Tooltip from './Tooltip';

interface IStatPanelProps {
  label: string;
  subtitle?: string;
  description: string;
  children: React.ReactNode;
  showError?: boolean;
}

const StatPanelContainer = ({
  label,
  subtitle,
  description,
  children,
  showError = false,
}: IStatPanelProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className='rounded-xl bg-card-grey h-full flex flex-col'>
      <div
        className='flex justify-between items-center gap-0.5 w-full
      px-4 py-3
      text-white stroke-icon-dark-grey fill-none 
      hover:text-brand-orange hover:fill-brand-orange hover:stroke-brand-orange
      transition-colors ease-out duration-150'
      >
        <div className='flex items-center gap-0.5 '>
          <button onClick={() => setShowTooltip((prev) => !prev)} className='relative'>
            <svg
              width='16'
              height='17'
              viewBox='0 0 16 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6.99996 7.49996H7.66663V10.8333M6.99996 10.8333H8.33329M7.99996 5.83329C7.99996 6.01729 7.85063 6.16663 7.66663 6.16663C7.48263 6.16663 7.33329 6.01729 7.33329 5.83329C7.33329 5.64929 7.48263 5.49996 7.66663 5.49996C7.85063 5.49996 7.99996 5.64929 7.99996 5.83329ZM7.66663 14.1666C4.35263 14.1666 1.66663 11.4806 1.66663 8.16663C1.66663 4.85263 4.35263 2.16663 7.66663 2.16663C10.9806 2.16663 13.6666 4.85263 13.6666 8.16663C13.6666 11.4806 10.9806 14.1666 7.66663 14.1666Z'
                stroke='#595D66'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <Tooltip
              setShow={setShowTooltip}
              show={showTooltip}
              title={label}
              description={description}
            />
          </button>

          <div>{label}</div>
          <svg
            width='16'
            height='17'
            viewBox='0 0 16 17'
            xmlns='http://www.w3.org/2000/svg'
            fill='inherit'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              fill='inherit'
              d='M5 14.1504L11 8.15039L5 2.15039V14.1504Z'
              stroke='inherit'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='transition-colors ease-out duration-150'
            />
          </svg>
        </div>
        {showError ? (
          <svg
            width='17'
            height='16'
            viewBox='0 0 17 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8.66671 7V9.66667M8.66671 11.3333C8.48271 11.3333 8.33337 11.4827 8.33337 11.6667C8.33337 11.8507 8.48271 12 8.66671 12C8.85071 12 9.00004 11.8507 9.00004 11.6667C9.00004 11.4827 8.85071 11.3333 8.66671 11.3333ZM8.66671 1L16 14.3333H1.33337L8.66671 1Z'
              stroke='#ED3445'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        ) : (
          ''
        )}
      </div>
      <hr className='border-card-light' />
      {subtitle ? (
        <div className='p-4 flex gap-1 items-center'>
          {/* <span className='caps-2-bold text-icon-dark-grey'>Duration</span> */}
          <h6 className='text-icon-grey'>{subtitle}</h6>
        </div>
      ) : (
        ''
      )}
      {children}
    </div>
  );
};

export default StatPanelContainer;
