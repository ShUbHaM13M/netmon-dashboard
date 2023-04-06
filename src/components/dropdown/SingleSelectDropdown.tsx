import { useCallback, useEffect, useRef, useState } from 'react';
import { IconDropdownArrow, IconSearch } from '../../assets/icons';
import DropDownOption from './DropDownOption';
import { createPortal } from 'react-dom';
import DropDownModal from './DropDownModal';

export interface IDropdownOption {
  label: string;
  value: string;
}

interface IDropdownProps {
  label: string;
  options: IDropdownOption[];
  defaultValue: IDropdownOption;
  width?: number;
  onValueChange: (value: IDropdownOption) => void;
  disabled?: boolean;
}

const SingleSelectDropdown = ({
  options,
  defaultValue,
  label,
  width,
  onValueChange,
  disabled,
}: IDropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<IDropdownOption>(defaultValue || options[0]);
  const [modalFullScreen, setModalFullScreen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mobileModalRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  }, []);

  const clickOutsideHandler = useCallback(() => {
    setShowDropdown(false);
  }, []);

  const onOptionClick = useCallback(
    (item: IDropdownOption) => {
      setSelectedOption(item);
      setShowDropdown(false);
      setModalFullScreen(false);
      onValueChange(item);
    },
    [onValueChange],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileModalRef.current && mobileModalRef.current.contains(event.target as Node)) {
        event.preventDefault();
        return;
      }
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        clickOutsideHandler && clickOutsideHandler();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [clickOutsideHandler]);

  const onSearchInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value) {
        setFilteredOptions(
          options.filter((item) => {
            return item.label.includes(value) || item.value.includes(value);
          }),
        );
        return;
      }
      setFilteredOptions(options);
    },
    [options],
  );

  return (
    <div
      ref={containerRef}
      style={{
        width: width || 140,
      }}
      className='flex flex-col text-white place-items-start gap-2.5 relative'
    >
      <label className='caps-1 text-icon-dark-grey'>{label}</label>
      <button
        type='button'
        onClick={toggleDropdown}
        disabled={disabled}
        className='bg-card-light rounded-sm py-1 pl-2 text-icon-grey w-full flex justify-between text-sm items-center font-normal hover:bg-[#3E404D]
        transition-colors duration-200 ease-out disabled:bg-opacity-50 disabled:bg-card-light'
      >
        {selectedOption.label}
        <IconDropdownArrow rotate={showDropdown} />
      </button>
      {showDropdown ? (
        <div
          style={{
            height: 172,
          }}
          className='flex-col bg-card-grey rounded-lg w-full p-2.5 pb-0 absolute top-full gap-1.5 shadow-medium hidden md:flex'
        >
          <div className='bg-card-light px-2 py-2.5 rounded-sm border-disabled border flex gap-1 items-center'>
            <IconSearch />
            <input
              className='bg-transparent w-full focus:outline-none text-sm'
              type='text'
              onInput={onSearchInput}
              onChange={(e) => setQuery(e.currentTarget.value)}
              value={query}
            />
          </div>

          <div className='overflow-y-auto hide-scrollbar'>
            {filteredOptions.map((item) => {
              return (
                <DropDownOption
                  onClick={() => onOptionClick(item)}
                  label={item.label}
                  isSelected={selectedOption.value === item.value}
                  key={item.value}
                />
              );
            })}
          </div>
        </div>
      ) : (
        ''
      )}

      {/* Creating a portal for mobile dropdown */}
      {createPortal(
        <DropDownModal
          ref={mobileModalRef}
          fullScreen={modalFullScreen}
          setFullScreen={setModalFullScreen}
          title={label}
          setShowModal={setShowDropdown}
          showModal={showDropdown}
        >
          <div className='px-2 py-2.5 rounded-sm border-disabled border flex gap-1 items-center bg-card-light'>
            <IconSearch />
            <input
              onClick={() => setModalFullScreen(true)}
              className='bg-transparent w-full focus:outline-none text-sm text-white'
              type='text'
              onInput={onSearchInput}
              onChange={(e) => setQuery(e.currentTarget.value)}
              value={query}
            />
          </div>

          <div className='overflow-y-auto hide-scrollbar flex flex-col gap-1.5'>
            {filteredOptions.map((item) => {
              return (
                <DropDownOption
                  onClick={() => onOptionClick(item)}
                  label={item.value}
                  isSelected={selectedOption.value === item.value}
                  key={item.value}
                  bgTransparent
                />
              );
            })}
          </div>
        </DropDownModal>,
        document.body,
      )}
    </div>
  );
};

export default SingleSelectDropdown;
