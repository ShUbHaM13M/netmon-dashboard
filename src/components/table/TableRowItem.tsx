import { IconCritical, IconSafe } from '../../assets/icons';
import { Criticality, TableRowItemType } from '../../global';

interface ITableRowItemProps {
  showBorder?: boolean;
  data: TableRowItemType[];
}

const TableRowItemFormatter = ({ data }: { data: TableRowItemType }) => {
  switch (data.type) {
    case 'STATUS':
      return (
        <span
          className={`uppercase py-1.5 px-3 rounded-full flex gap-1 items-center border-2 border-solid text-icon-white max-w-fit font-semibold text-[10px]
				${data.criticality === Criticality.CRITICAL ? 'bg-status-critical border-transparent' : ''}
				${
          data.criticality === Criticality.SAFE
            ? 'bg-status-safe bg-opacity-10 border-status-safe text-status-safe'
            : ''
        }
			`}
        >
          {data.criticality === Criticality.CRITICAL && <IconCritical />}
          {data.criticality === Criticality.SAFE && <IconSafe />}
          {data.value}
        </span>
      );
    case 'NUMBER':
      return <>{data.value}</>;
    case 'STRING':
      return <>{data.value}</>;
    default:
      return <>{data.value}</>;
  }
};

const TableRowItem = ({ showBorder = false, data }: ITableRowItemProps) => {
  return (
    <tr
      className={` ${
        showBorder
          ? 'bg-card-light border-b border-dashed border-icon-dark-grey'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {data.map((item) => (
        <td className='whitespace-nowrap px-4 py-2' key={item.value}>
          <TableRowItemFormatter data={item} />
        </td>
      ))}
    </tr>
  );
};

export default TableRowItem;
