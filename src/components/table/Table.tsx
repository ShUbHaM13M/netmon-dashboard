import { useState } from 'react';
import { TableHeadType, TableRowDataType } from '../../global';
import TableHeadItem from './TableHeadItem';
import TableRowItem from './TableRowItem';

interface ITableProps {
  headers: TableHeadType[];
  data: TableRowDataType[];
}

const Table = ({ headers, data }: ITableProps) => {
  const [filteredData, setFilteredData] = useState(data);

  return (
    <div className='overflow-x-auto text-icon-white text-sm'>
      <div className='inline-block min-w-full py-2'>
        <table className='min-w-full text-left font-light'>
          <thead className='font-semibold'>
            <tr>
              {headers.map((data) => (
                <TableHeadItem key={data.label} {...data} setSortedList={setFilteredData} />
              ))}
            </tr>
          </thead>
          <tbody className='mt-2'>
            {filteredData.map((row, index) => (
              <TableRowItem data={row} key={index} showBorder={index % 2 === 0} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
