import { useCallback, useState } from 'react';
import { TableHeadType } from '../../global';
import TableHeadItem from './TableHeadItem';
import TableRowItem from './TableRowItem';

interface ITableProps {
  headers: TableHeadType[];
  data: any[];
  showStatusChip?: boolean;
  emptyStateData: {
    icon: string;
    title: string;
    subtitle: string;
  };
  statusTypes?:
    | {
        label: string;
      }[]
    | null;
}

const Table = ({ headers, data, emptyStateData, showStatusChip, statusTypes }: ITableProps) => {
  const [filteredData, setFilteredData] = useState(data);

  const onSortOptionClick = useCallback(
    (dataType: string, columnName: string, order: string) => {
      switch (dataType) {
        case 'STATUS':
          break;
        case 'NUMBER':
          setFilteredData([
            ...filteredData.sort((row, next) => {
              const a = row[columnName].value,
                b = next[columnName].value;
              if (order === 'ASC') return a - b;
              else return b - a;
            }),
          ]);
          break;
        case 'STRING':
          setFilteredData([
            ...filteredData.sort((row, next) => {
              const a = next[columnName].value,
                b = row[columnName].value;
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
        default:
          break;
      }
    },
    [filteredData],
  );

  return (
    <div
      className={`h-full text-icon-white text-sm relative overflow-x-auto ${
        data.length ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div className='inline-block min-w-full'>
        <table className='min-w-full text-left font-light'>
          <thead className='font-semibold'>
            <tr>
              {headers.map((data) => (
                <TableHeadItem
                  key={data.title}
                  {...data}
                  onSortOptionClick={onSortOptionClick}
                  sortingOptions={data.dataType === 'STATUS' ? statusTypes : null}
                />
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
