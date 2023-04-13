interface IDropDownOptionProps {
  onClick: () => void;
  label: string;
  isSelected?: boolean;
  showCheckbox?: boolean;
  bgTransparent?: boolean;
}

const DropDownOption = ({
  onClick,
  isSelected,
  showCheckbox,
  label,
  bgTransparent,
}: IDropDownOptionProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`text-sm px-2 py-[7.5px] w-full text-left  
			flex gap-1 items-center
			transition-colors ease-out duration-200
				${isSelected ? 'text-icon-white' : 'text-icon-grey'}
				${bgTransparent ? 'bg-transparent' : 'bg-card-light hover:bg-icon-dark-grey hover:text-icon-white'}
			`}
    >
      {showCheckbox ? (
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
            fill={`${isSelected ? '#F37821' : 'transparent'}`}
            stroke={`${isSelected ? '#F37821' : '#9CA3B3'}`}
            className='transition-all duration-150 ease-out'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6.354 12.2286L9.60059 15.4766L16.1006 8.97656'
            stroke='#FEFEFE'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='transition-all duration-150 ease-out'
            opacity={isSelected ? 1 : 0}
          />
        </svg>
      ) : (
        ''
      )}
      {label}
    </button>
  );
};
export default DropDownOption;
