import { Row } from '../table/Table';

const ActiveStatusFormatter = (value: string, _dataType: string, _row: Row) => {
  return <span>{value ? 'Active' : 'Inactive'}</span>;
};

export default ActiveStatusFormatter;
