import { useCallback, useRef, useState } from 'react';
import { TableHeadType } from '../../global';
import TableHeadItem from './TableHeadItem';
import TableRowItem from './TableRowItem';

interface ITableProps {
  headers: TableHeadType[];
  data: any[];
  showStatusChip?: boolean;
  showStatus?: boolean;
  emptyStateData: {
    icon: string;
    title: string;
    subtitle: string;
  };
  status?: { [key: string]: string };
  showPercentage?: boolean;
}

const Table = ({
  headers,
  data,
  emptyStateData,
  showStatusChip,
  showStatus,
  status,
  showPercentage = false,
}: ITableProps) => {
  const [filteredData, setFilteredData] = useState(data);
  const cachedData = useRef(data);

  const onSortOptionClick = useCallback(
    (data_type: string, columnName: string, order: string) => {
      if (!order) {
        setFilteredData(cachedData.current);
        return;
      }
      switch (data_type) {
        case 'NUMBER':
          setFilteredData([
            ...data.sort((row, next) => {
              const a = row[columnName],
                b = next[columnName];
              if (order === 'ASC') return a - b;
              else return b - a;
            }),
          ]);
          break;
        default:
          setFilteredData([
            ...data.sort((row, next) => {
              const a = next[columnName],
                b = row[columnName];
              if (order === 'ASC') {
                if (a < b) return 1;
                if (a > b) return -1;
              } else {
                if (a < b) return -1;
                if (a > b) return 1;
              }
              return 0;
            }),
          ]);
          break;
      }
    },
    [data],
  );

  return (
    <div
      className={`h-full flex-1 text-icon-white text-sm relative overflow-x-auto ${
        data.length ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div className='inline-block min-w-full'>
        <table className='min-w-full text-left font-light'>
          <thead className='font-semibold'>
            <tr>
              {headers.map((data) => (
                <TableHeadItem key={data.title} {...data} onSortOptionClick={onSortOptionClick} />
              ))}
            </tr>
          </thead>
          {filteredData.length ? (
            <tbody className='mt-2'>
              {filteredData.map((row, index) => (
                <TableRowItem
                  showStatusChip={showStatusChip}
                  data={row}
                  key={index}
                  showBorder={index % 2 === 0}
                  showStatus={showStatus}
                  status={status}
                  showPercentage={showPercentage}
                  data_type={headers[index]?.data_type.toUpperCase()}
                />
              ))}
            </tbody>
          ) : (
            ''
          )}
        </table>
      </div>
      {!data.length && (
        <div className='flex min-h-fit sticky flex-col gap-1 sm:gap-5 items-center left-2/4 -translate-x-2/4 translate-y-1/4'>
          <img className='h-12 sm:h-20' src={emptyStateData.icon} alt={emptyStateData.title} />
          <div>
            <h5>{emptyStateData.title}</h5>
            <p className='mt-1.5 text-icon-grey'>{emptyStateData.subtitle}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;