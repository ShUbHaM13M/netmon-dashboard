import { useState } from 'react';

interface IToggleButtonProps {
  label: string;
  defaultValue?: boolean;
  onValueChange: (value: boolean) => void;
}

const ToggleButton = ({ label, defaultValue = false, onValueChange }: IToggleButtonProps) => {
  const [active, setActive] = useState(defaultValue);

  const onToggleClick = () => {
    onValueChange(!active);
    setActive((prev) => !prev);
  };

  return (
    <div className='flex gap-1 items-center relative'>
      <p
        className={`${
          active ? 'text-brand-orange' : 'text-icon-grey'
        } font-semibold text-sm transition-colors ease-out duration-200`}
      >
        {label}
      </p>

      <button
        className={`relative h-3 w-5 border rounded-full ${
          active ? 'border-brand-orange' : 'border-icon-grey'
        }`}
        onClick={onToggleClick}
      >
        <div
          style={{
            width: 7.2,
            height: 7.2,
            top: 2,
            left: 2,
          }}
          className={`rounded-full w-1.5 h-1.5 absolute 
          transition-all ease-out duration-150
            ${active ? 'translate-x-full bg-brand-orange' : 'translate-x-0 bg-icon-grey'}
          `}
        ></div>
      </button>
    </div>
  );
};

export default ToggleButton;
