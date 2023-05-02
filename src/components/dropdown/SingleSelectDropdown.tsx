import { useCallback, useEffect, useRef, useState } from 'react';
import { IconDropdownArrow, IconSearch } from '../../assets/icons';
import DropDownOption from './DropDownOption';
import { createPortal } from 'react-dom';
import DropDownModal from './DropDownModal';

export interface IDropdownOption {
  Text: string;
  Value: any;
}

interface IDropdownProps {
  label: string;
  showSearchbar?: boolean;
  options: IDropdownOption[];
  defaultValue?: IDropdownOption;
  width?: number;
  onValueChange: (value: IDropdownOption) => void;
  disabled?: boolean;
  showLabelInDesktop?: boolean;
}

const SingleSelectDropdown = ({
  options,
  defaultValue,
  label,
  width,
  onValueChange,
  disabled,
  showSearchbar = true,
  showLabelInDesktop = true,
}: IDropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<IDropdownOption>(defaultValue || options[0]);
  const [modalFullScreen, setModalFullScreen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mobileModalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedOption(options[0]);
    setFilteredOptions(options);
  }, [options]);

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
            return item.Text.includes(value) || item.Value.includes(value);
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
        width: width,
      }}
      className='flex flex-col text-white place-items-start gap-2.5 relative'
    >
      {showLabelInDesktop ? <label className='caps-1 text-icon-dark-grey'>{label}</label> : ''}
      <button
        type='button'
        onClick={toggleDropdown}
        disabled={disabled}
        className='bg-card-light rounded-sm py-1 pl-2 text-icon-grey w-full flex justify-between text-xs sm:text-sm items-center font-normal hover:bg-[#3E404D]
        stroke-icon-grey transition-colors duration-200 ease-out disabled:bg-opacity-50 disabled:bg-card-light disabled:text-icon-dark-grey disabled:stroke-icon-dark-grey'
      >
        {selectedOption?.Text}
        <IconDropdownArrow rotate={showDropdown} />
      </button>
      {showDropdown ? (
        <div
          style={{
            maxHeight: 210,
          }}
          className={`flex-col bg-card-grey rounded-lg w-full pb-0 absolute top-full gap-1.5 shadow-medium hidden md:flex z-10
          ${showSearchbar ? 'p-2.5' : 'p-0'}`}
        >
          {showSearchbar ? (
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
          ) : (
            ''
          )}

          <div className='overflow-y-auto hide-scrollbar z-30'>
            {filteredOptions.map((item) => {
              return (
                <DropDownOption
                  onClick={() => onOptionClick(item)}
                  label={item.Text}
                  isSelected={selectedOption.Value === item.Value}
                  key={item.Value}
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
          {showSearchbar ? (
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
          ) : (
            ''
          )}

          <div className='overflow-y-auto hide-scrollbar flex flex-col gap-1.5'>
            {filteredOptions.map((item) => {
              return (
                <DropDownOption
                  onClick={() => onOptionClick(item)}
                  label={item.Text}
                  isSelected={selectedOption?.Value === item.Value}
                  key={item.Value}
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
