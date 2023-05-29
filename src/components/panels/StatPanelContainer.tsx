import { useState } from 'react';
import Tooltip from './Tooltip';
import { IconAlertCritical, IconArrowRight, IconInfo } from '../../assets/icons';
import LoadingSpinner from '../../assets/icons/loading.gif';

interface IStatPanelProps {
  label: string;
  subtitle?: string;
  description: string;
  children: React.ReactNode;
  showError?: boolean;
  loading?: boolean;
  hasData?: boolean;
}

const StatPanelContainer = ({
  label,
  subtitle,
  description,
  children,
  showError = false,
  loading = false,
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
            <IconInfo />
            <Tooltip
              setShow={setShowTooltip}
              show={showTooltip}
              title={label}
              description={description}
            />
          </button>

          <div>{label}</div>
          <IconArrowRight />
        </div>
        {loading && (
          <img className='h-5 w-5' src={LoadingSpinner} alt='loading' role='presentation' />
        )}
        {!loading && showError && <IconAlertCritical size={16} />}
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
