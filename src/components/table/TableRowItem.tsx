import { IconCritical, IconSafe } from '../../assets/icons';
import {
  Criticality,
  TableDataType,
  TableHeadType,
  getCriticalityFromValue,
  stringToCriticality,
} from '../../global';

interface ITableRowItemProps {
  showBorder?: boolean;
  data: any[];
  showStatusChip?: boolean;
  showStatus?: boolean;
  status?: { [key: string]: string };
  showPercentage?: boolean;
  headers?: TableHeadType[];
}

const TableRowItemFormatter = ({
  data,
  showStatusChip = false,
  data_type: data_type,
  showPercentage,
}: {
  data: any;
  showStatusChip: boolean;
  data_type?: TableDataType;
  showPercentage: boolean;
}) => {
  switch (data_type) {
    case 'STATUS': {
      let statusStyles = '';
      if (data.criticality === Criticality.CRITICAL) {
        if (showStatusChip) {
          statusStyles = 'bg-status-critical border-transparent';
        } else {
          statusStyles = 'border-transparent text-status-critical text-xs';
        }
      } else if (data.criticality === Criticality.SAFE) {
        if (showStatusChip) {
          statusStyles = 'bg-status-safe bg-opacity-10 border-status-safe text-status-safe';
        } else {
          statusStyles = 'border-transparent text-status-safe text-xs';
        }
      } else if (data.criticality === Criticality.MAJOR) {
        if (showStatusChip)
          statusStyles = 'bg-status-major bg-opacity-10 border-status-major text-status-major';
        else statusStyles = 'border-transparent text-status-major text-xs';
      } else if (data.criticality === Criticality.MEDIUM) {
        if (showStatusChip) {
          statusStyles = 'bg-status-medium bg-opacity-10 border-status-medium text-status-medium';
        } else statusStyles = 'border-transparent text-status-major text-xs';
      } else {
        statusStyles = 'border-transparent text-sm';
      }

      return (
        <span
          className={`uppercase py-1.5 px-3 rounded-full 
          flex gap-1 items-center 
          border-2 border-solid text-icon-white max-w-fit font-semibold text-[10px]
          ${statusStyles}
			`}
        >
          {showStatusChip && data.criticality === Criticality.CRITICAL && <IconCritical />}
          {showStatusChip && data.criticality === Criticality.SAFE && <IconSafe />}
          {data.value}
          {showPercentage ? '%' : ''}
        </span>
      );
    }
    case 'INT':
      return <>{data.value}</>;
    case 'FLOAT':
      return <span>{(data.value as number).toFixed(2)}</span>;
    case 'STRING':
      return <>{data.value}</>;
    case 'EPOCH_MS':
      return <>{data.value}</>;
    default:
      return <>{data.value}</>;
  }
};

const TableRowItem = ({
  showBorder = false,
  data,
  showStatusChip = false,
  showStatus = true,
  status,
  showPercentage = false,
  headers,
}: ITableRowItemProps) => {
  return (
    <tr
      className={` ${
        showBorder
          ? 'bg-card-light border-b border-dashed border-icon-dark-grey'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {Object.entries(data).map(([key, value], index) => {
        const data_type = headers?.find((h) => key === h.property)?.data_type.toUpperCase();
        return (
          <td className='whitespace-nowrap px-4 py-2' key={key}>
            <TableRowItemFormatter
              data_type={showStatus && index === 0 ? 'STATUS' : data_type}
              data={{
                value,
                criticality: status
                  ? stringToCriticality(status[value])
                  : getCriticalityFromValue(value),
              }}
              showStatusChip={showStatusChip}
              showPercentage={showPercentage}
            />
          </td>
        );
      })}
    </tr>
  );
};

export default TableRowItem;
