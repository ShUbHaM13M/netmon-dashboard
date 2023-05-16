import { TableHeadType, getFormatedDate } from '../../global';
import { ColumnFormatter, Row } from './Table';

interface ITableRowItemProps {
  headers: TableHeadType[];
  row: Row;
  showBorder: boolean;
  columnFormatters?: { [columnName: string]: ColumnFormatter };
  onRowClick?: (row: Row) => void;
}

const defaultFormatter = (value: any, dataType: string) => {
  let formattedValue = value;
  if (dataType === 'epoch_ms') {
    formattedValue = getFormatedDate(value);
  }
  return <>{formattedValue}</>;
};

const getColumnFormatter = (
  header: TableHeadType,
  columnFormatters?: { [columnName: string]: ColumnFormatter },
) => {
  return columnFormatters
    ? columnFormatters[header.property] === undefined
      ? defaultFormatter
      : columnFormatters[header.property]
    : defaultFormatter;
};

const TableRowItem = ({
  headers,
  row,
  showBorder = false,
  columnFormatters,
  onRowClick,
}: ITableRowItemProps) => {
  return (
    <tr
      onClick={() => onRowClick && onRowClick(row)}
      className={` ${
        showBorder
          ? 'bg-card-light border-b border-dashed border-icon-dark-grey'
          : 'bg-transparent border-b border-transparent'
      } ${onRowClick ? 'cursor-pointer' : 'cursor-auto'}`}
    >
      {headers.map((header, _i) => {
        const colFormatter = getColumnFormatter(header, columnFormatters);
        return (
          <td className='whitespace-nowrap px-4 py-2' key={header.property}>
            {colFormatter(row[header.property], header.data_type, row)}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRowItem;
