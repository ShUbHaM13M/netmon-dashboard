import { Row } from '../table/NewTable';

const DurationFormatter = (minutes: any, _dataType: string, _row: Row) => {
  const week = 7 * 24 * 60;
  const day = 24 * 60;
  const hr = 60;

  let readableDuration = `${minutes.toFixed(0)} min`;
  if (minutes >= week) {
    readableDuration = `${(minutes / week).toFixed(2)} week`;
  } else if (minutes >= day) {
    readableDuration = `${(minutes / day).toFixed(2)} day`;
  } else if (minutes >= hr) {
    readableDuration = `${(minutes / hr).toFixed(2)} hr`;
  }

  return <>{readableDuration}</>;
};

export default DurationFormatter;
