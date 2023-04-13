import { IconCritical, IconSafe } from '../../assets/icons';
import { Criticality } from '../../global';

interface ITableRowItemProps {
  showBorder?: boolean;
  data: any[];
  showStatusChip?: boolean;
}

const TableRowItemFormatter = ({
  data,
  showStatusChip = false,
}: {
  data: any;
  showStatusChip: boolean;
}) => {
  switch (data.type) {
    case 'STATUS':
      return (
        <span
          className={`uppercase py-1.5 px-3 rounded-full 
          flex gap-1 items-center 
          border-2 border-solid text-icon-white max-w-fit font-semibold text-[10px]
				${
          data.criticality === Criticality.CRITICAL
            ? showStatusChip
              ? 'bg-status-critical border-transparent'
              : 'border-transparent text-status-critical text-xs'
            : ''
        }
				${
          data.criticality === Criticality.SAFE
            ? showStatusChip
              ? 'bg-status-safe bg-opacity-10 border-status-safe text-status-safe'
              : 'border-transparent text-status-safe text-xs'
            : ''
        }
        ${
          data.criticality === Criticality.MAJOR
            ? showStatusChip
              ? 'bg-status-major bg-opacity-10 border-status-major text-status-major'
              : 'border-transparent text-status-major text-xs'
            : ''
        }
        ${
          data.criticality === Criticality.MEDIUM
            ? showStatusChip
              ? 'bg-status-medium bg-opacity-10 border-status-medium text-status-medium'
              : 'border-transparent text-status-medium text-xs'
            : ''
        }
			`}
        >
          {showStatusChip && data.criticality === Criticality.CRITICAL && <IconCritical />}
          {showStatusChip && data.criticality === Criticality.SAFE && <IconSafe />}
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

const TableRowItem = ({ showBorder = false, data, showStatusChip = false }: ITableRowItemProps) => {
  return (
    <tr
      className={` ${
        showBorder
          ? 'bg-card-light border-b border-dashed border-icon-dark-grey'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {Object.entries(data).map(([key, value]) => (
        <td className='whitespace-nowrap px-4 py-2' key={key}>
          <TableRowItemFormatter data={value} showStatusChip={showStatusChip} />
        </td>
      ))}
    </tr>
  );
};

export default TableRowItem;
