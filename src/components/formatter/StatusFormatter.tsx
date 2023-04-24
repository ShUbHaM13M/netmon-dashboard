import { IconCritical, IconSafe } from '../../assets/icons';
import { Row } from '../table/NewTable';

const StatusFormatter = (value: any, _dataType: string, _row: Row) => {
  let statusStyles = 'bg-status-safe bg-opacity-10 border-status-safe text-status-safe'; // Safe Style
  let criticality = 'safe';
  if (value === 'Down' || value === 'unreachable') {
    criticality = 'critical';
    statusStyles = 'bg-status-critical border-transparent';
  }

  return (
    <span
      className={`uppercase py-0.5 px-3 rounded-full 
    flex gap-1 items-center 
    border-2 border-solid text-icon-white max-w-fit font-semibold text-[10px]
    ${statusStyles}
      `}
    >
      {criticality === 'critical' && <IconCritical />}
      {criticality === 'safe' && <IconSafe />}
      {value}
    </span>
  );
};

export default StatusFormatter;
