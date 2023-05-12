import IconAdd from '../../assets/icons/add';
import IconRemove from '../../assets/icons/remove';
import { Row } from '../table/Table';

const ActionFormatter = (value: any, _dataType: string, row: Row) => {
  return (
    <button
      onClick={row.actionEvent}
      type='button'
      className='stroke-icon-white hover:stroke-brand-orange w-10 h-8 flex items-center justify-center'
    >
      {value === 'Add' ? <IconAdd /> : <IconRemove />}
    </button>
  );
};

export default ActionFormatter;
