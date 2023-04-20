import { useCallback, useEffect, useRef, useState } from 'react';
import { IconDropdownArrow, IconSearch } from '../../assets/icons';
import DropDownOption from './DropDownOption';
import { createPortal } from 'react-dom';
import DropDownModal from './DropDownModal';

export interface IMultiSelectDropdownOption {
  Text: string;
  Value: any;
}

interface IDropdownProps {
  label: string;
  options: IMultiSelectDropdownOption[];
  defaultValue?: IMultiSelectDropdownOption;
  width?: number;
  placeholder?: string;
  onValueChange: (values: IMultiSelectDropdownOption[]) => void;
  disabled?: boolean;
}

const MultiSelectDropdown = ({
  options,
  defaultValue,
  label,
  width,
  placeholder,
  onValueChange,
  disabled,
}: IDropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<IMultiSelectDropdownOption[]>(
    defaultValue ? [defaultValue] : [options[0]],
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mobileModalRef = useRef<HTMLDivElement | null>(null);

  const [modalFullScreen, setModalFullScreen] = useState(false);

  const selectedOptionLabel = selectedOption.reduce((acc, curr) => {
    if (acc) {
      return `${acc}, ${curr?.Text}`;
    }
    return curr?.Text;
  }, '');

  const toggleDropdown = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  }, []);

  const clickOutsideHandler = useCallback(() => {
    setShowDropdown(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileModalRef.current && mobileModalRef.current.contains(event.target as Node)) {
        event.preventDefault();
        return;
      }
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        clickOutsideHandler();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [clickOutsideHandler]);

  const onOptionClick = useCallback(
    (item: IMultiSelectDropdownOption) => {
      if (selectedOption.includes(item)) {
        setSelectedOption((prev) => {
          return prev.filter((option) => option !== item);
        });
      } else {
        setSelectedOption((prev) => [...prev, item]);
      }
    },
    [selectedOption],
  );

  useEffect(() => {
    onValueChange(selectedOption);
  }, [onValueChange, selectedOption]);

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
      <label className='caps-1 text-icon-dark-grey'>{label}</label>
      <button
        title={selectedOptionLabel ? selectedOptionLabel : placeholder || 'Select an option'}
        type='button'
        disabled={disabled}
        onClick={toggleDropdown}
        className='bg-card-light rounded-sm py-1 pl-2 text-icon-grey w-full flex justify-between text-xs sm:text-sm items-center font-normal hover:bg-[#3E404D]
        stroke-icon-grey transition-colors duration-200 ease-out disabled:bg-opacity-50 disabled:bg-card-light disabled:text-icon-dark-grey disabled:stroke-icon-dark-grey'
      >
        <span className='w-4/5 truncate text-left'>
          {selectedOptionLabel ? selectedOptionLabel : placeholder || 'Select an option'}
        </span>
        <IconDropdownArrow rotate={showDropdown} />
      </button>

      {showDropdown ? (
        <div
          style={{
            height: 210,
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

          <DropDownOption
            label='Select all'
            showCheckbox
            isSelected={selectedOption.length === options.length}
            onClick={() => {
              if (selectedOption.length < options.length) setSelectedOption(options);
              else setSelectedOption([]);
            }}
            bgTransparent
          />

          <div className='overflow-y-auto hide-scrollbar'>
            {filteredOptions.map((item) => {
              return (
                <DropDownOption
                  onClick={() => onOptionClick(item)}
                  key={item.Text}
                  label={item.Text}
                  isSelected={selectedOption.includes(item)}
                  showCheckbox
                />
              );
            })}
          </div>
        </div>
      ) : (
        ''
      )}

      {/* Mobile dropdown */}
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
            <DropDownOption
              label='Select all'
              showCheckbox
              isSelected={selectedOption.length === options.length}
              onClick={() => {
                if (selectedOption.length < options.length) setSelectedOption(options);
                else setSelectedOption([]);
              }}
              bgTransparent
            />
            {filteredOptions.map((item) => {
              return (
                <DropDownOption
                  onClick={() => onOptionClick(item)}
                  label={item.Text}
                  isSelected={selectedOption.includes(item)}
                  key={item.Value}
                  bgTransparent
                  showCheckbox
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

export default MultiSelectDropdown;
