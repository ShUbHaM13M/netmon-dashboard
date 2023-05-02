import { useCallback, useRef, useState } from 'react';
import { TableHeadType } from '../../global';

interface ITableHeadItemProps extends TableHeadType {
  onSortOptionClick: (dataType: string, columnName: string, order: string) => void;
}

const TableHeadItem = ({
  title,
  sortable = true,
  data_type,
  property,
  onSortOptionClick,
}: ITableHeadItemProps) => {
  const containerRef = useRef<HTMLTableHeaderCellElement | null>(null);
  const [currentSortOption, setCurrentSortOption] = useState('');

  const onClick = useCallback(() => {
    if (!sortable) return;
    let sortOrder = '';

    if (currentSortOption === '') sortOrder = 'ASC';
    else if (currentSortOption === 'ASC') sortOrder = 'DESC';
    else if (currentSortOption === 'DESC') sortOrder = '';

    setCurrentSortOption(sortOrder);
    onSortOptionClick(data_type, property, sortOrder);
  }, [currentSortOption, data_type, onSortOptionClick, sortable, property]);

  return (
    <th
      ref={containerRef}
      onClick={onClick}
      scope='col'
      className={
        'px-4 py-3 caps-2 cursor-pointer relative transition-colors ease-out duration-150 whitespace-nowrap'
      }
    >
      <span className='caps-2-bold flex justify-between items-center gap-2.5 text-icon-grey'>
        {title}
        {sortable ? (
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6 7.5C6 7.5 9.8932 4.5 10 4.5C10.1068 4.5 14 7.5 14 7.5'
              strokeLinecap='round'
              className={`${
                currentSortOption === 'ASC' ? 'stroke-icon-white' : 'stroke-icon-dark-grey'
              }
              ${currentSortOption === '' ? 'opacity-0' : 'opacity-100'}
              transition-all ease-out duration-150`}
            />
            <path
              d='M14 12.5C14 12.5 10.1068 15.5 10 15.5C9.8932 15.5 6 12.5 6 12.5'
              strokeLinecap='round'
              className={`${
                currentSortOption === 'DESC' ? 'stroke-icon-white' : 'stroke-icon-dark-grey'
              }
              ${currentSortOption === '' ? 'opacity-0' : 'opacity-100'}
              transition-colors ease-out duration-150`}
            />
          </svg>
        ) : (
          ''
        )}
      </span>
    </th>
  );
};

export default TableHeadItem;
