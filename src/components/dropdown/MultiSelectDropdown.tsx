import { useCallback, useEffect, useRef, useState } from 'react';
import { IconDropdownArrow, IconSearch } from '../../assets/icons';
import DropDownOption from './DropDownOption';
import { createPortal } from 'react-dom';
import DropDownModal from './DropDownModal';

export interface IMultiSelectDropdownOption {
  label: string;
  value: string;
}

interface IDropdownProps {
  label: string;
  options: IMultiSelectDropdownOption[];
  defaultValue: IMultiSelectDropdownOption;
  width?: number;
  placeholder?: string;
  onValueChange: React.Dispatch<React.SetStateAction<IMultiSelectDropdownOption[]>>;
}

const MultiSelectDropdown = ({
  options,
  defaultValue,
  label,
  width,
  placeholder,
  onValueChange,
}: IDropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<IMultiSelectDropdownOption[]>(
    [defaultValue] || [options[0]],
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [modalFullScreen, setModalFullScreen] = useState(false);

  const selectedOptionLabel = selectedOption.reduce((acc, curr) => {
    if (acc) {
      return `${acc}, ${curr.label}`;
    }
    return curr.label;
  }, '');

  const toggleDropdown = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  }, []);

  const clickOutsideHandler = useCallback(() => {
    setShowDropdown(false);
  }, []);

  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler);
    return () => document.removeEventListener('click', clickOutsideHandler);
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
        title={selectedOptionLabel ? selectedOptionLabel : placeholder || 'Select an option'}
        type='button'
        onClick={toggleDropdown}
        className='bg-card-light rounded-sm py-1 pl-2 text-icon-grey w-full flex justify-between text-sm items-center font-normal hover:bg-[#3E404D]
				transition-colors duration-200 ease-out'
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
                  key={item.label}
                  label={item.label}
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
                  label={item.label}
                  isSelected={selectedOption.includes(item)}
                  key={item.value}
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
