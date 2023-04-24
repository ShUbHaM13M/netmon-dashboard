import { Row } from '../table/Table';

const PercentFormatter = (value: any, _dataType: string, _row: Row) => {
  const styles = `uppercase py-1.5 px-3 rounded-full 
    flex gap-1 items-center 
    border-2 border-solid text-icon-white max-w-fit font-semibold text-[10px]
    border-transparent text-xs `;

  if (value > 80) {
    return <span className={`${styles} text-status-critical`}>{value}%</span>;
  } else if (value > 60) {
    return <span className={`${styles} text-status-major`}>{value}%</span>;
  } else if (value > 40) {
    return <span className={`${styles} text-status-medium`}>{value}%</span>;
  } else {
    return <span className={`${styles} text-status-safe`}>{value}%</span>;
  }
};

export default PercentFormatter;
