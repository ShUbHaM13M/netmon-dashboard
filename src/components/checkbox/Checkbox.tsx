import { useEffect, useState } from 'react';

interface ICheckboxProps {
  label: string;
  defaultValue?: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

const Checkbox = ({ defaultValue = false, onValueChange, label, disabled }: ICheckboxProps) => {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    onValueChange(state);
  }, [onValueChange, state]);

  return (
    <div className='flex gap-1 items-center'>
      <button
        type='button'
        id={label}
        onClick={() => setState((prev) => !prev)}
        disabled={disabled}
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6.5 4H16.5C18.1569 4 19.5 5.34315 19.5 7V17C19.5 18.6569 18.1569 20 16.5 20H6.5C4.84315 20 3.5 18.6569 3.5 17V7C3.5 5.34315 4.84315 4 6.5 4Z'
            fill={`${state ? '#F37821' : 'transparent'}`}
            stroke={`${state ? '#F37821' : '#9CA3B3'}`}
            className={`transition-all duration-150 ease-out ${
              disabled ? 'stroke-icon-dark-grey' : 'stroke-icon-white'
            }`}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6.354 12.2286L9.60059 15.4766L16.1006 8.97656'
            stroke='#FEFEFE'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='transition-all duration-150 ease-out'
            opacity={state ? 1 : 0}
          />
        </svg>
      </button>
      <label className={`${disabled ? 'text-icon-dark-grey' : 'text-icon-white'}`} htmlFor={label}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
