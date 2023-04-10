import { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { TableHeadType, TableRowDataType } from '../../global';

interface ITableHeadItemProps extends TableHeadType {
  setSortedList: React.Dispatch<React.SetStateAction<TableRowDataType[]>>;
}

const sortingOptions = [{ label: 'ASC' }, { label: 'DESC' }];

const TableHeadItem = ({ label, sortable, dataType, setSortedList }: ITableHeadItemProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const containerRef = useRef<HTMLTableHeaderCellElement | null>(null);

  const onSortOptionClicked = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const sortType = e.currentTarget.getAttribute('data-sort-type');

      if (!sortType) return;

      switch (dataType) {
        case 'STATUS':
          break;
        case 'NUMBER':
          switch (sortType) {
            case 'ASC':
              // TODO: Not yet implemented
              break;
          }
          break;
        case 'STRING':
          break;
        default:
          break;
      }
    },
    [dataType],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <th
      ref={containerRef}
      onClick={() => {
        if (!sortable) return;
        setShowOptions((prev) => !prev);
      }}
      scope='col'
      className={`px-4 py-3 caps-2 cursor-pointer relative transition-colors ease-out duration-150
        ${showOptions ? 'text-icon-white bg-card-light' : 'text-icon-grey bg-transparent'}`}
    >
      <span className={`flex justify-between items-center gap-2.5`}>
        {label}
        {sortable ? (
          <svg
            width='18'
            height='14'
            viewBox='0 0 18 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12.375 3.79167L8.625 0.875L4.875 3.79167M4.875 9.625L8.625 12.5417L12.375 9.625'
              className={`transition-colors ease-out duration-150 ${
                showOptions ? 'stroke-icon-white' : 'stroke-icon-grey'
              }`}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        ) : (
          ''
        )}
      </span>
      {showOptions ? (
        <div className='absolute top-full -translate-y-1 left-0 w-44 bg-card-light flex flex-col text-left'>
          {sortingOptions.map((option, index) => (
            <button
              onClick={onSortOptionClicked}
              className={`px-4 py-3 text-left border-b text-sm text-icon-grey hover:bg-card-dark hover:text-icon-white transition-colors ease-out duration-150 ${
                index === sortingOptions.length - 1 ? 'border-transparent' : 'border-icon-dark-grey'
              }`}
              data-sort-type={option.label}
              key={option.label}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </th>
  );
};

export default TableHeadItem;
