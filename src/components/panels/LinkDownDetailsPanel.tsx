import Table from '../table/Table';
import Like from '../../assets/images/like.svg';
import StatPanelContainer from './StatPanelContainer';
import { Criticality } from '../../global';

const linkDownDetails = {
  title: 'Link Down Details',
  sub_title: 'Today: 09:00:00 to 21:00:00',
  columns: [
    { title: 'status', dataType: 'STATUS' },
    { title: 'downtime', dataType: 'NUMBER' },
    { title: 'color', dataType: 'STRING' },
    { title: 'hostname', dataType: 'STRING' },
    { title: 'provider', dataType: 'STRING' },
    { title: 'site_name', dataType: 'STRING' },
    { title: 'device_id', dataType: 'STRING' },
    { title: 'start_time', dataType: 'STRING' },
    { title: 'end_time', dataType: 'STRING' },
    { title: 'rank', dataType: 'NUMBER' },
  ],
  data: [
    {
      status: { value: 'Down', type: 'STATUS', criticality: Criticality.CRITICAL },
      downtime: { value: 13963, type: 'NUMBER' },
      color: { value: 'biz-internet', type: 'STRING' },
      hostname: { value: 'DEVICE-1', type: 'STRING' },
      provider: { value: 'ISP 1', type: 'STRING' },
      site_name: { value: 'Site-100', type: 'STRING' },
      device_id: { value: '172.16.85.1', type: 'STRING' },
      start_time: { value: '2023-04-01T00:00:00+05:30', type: 'STRING' },
      end_time: { value: 'NA', type: 'STRING' },
      rank: { value: 0, type: 'NUMBER' },
    },
    {
      status: { value: 'Resolved', type: 'STATUS', criticality: Criticality.SAFE },
      downtime: { value: 69420, type: 'NUMBER' },
      color: { value: 'public-internet', type: 'STRING' },
      hostname: { value: 'DEVICE-1', type: 'STRING' },
      provider: { value: 'ISP 2', type: 'STRING' },
      site_name: { value: 'Site-100', type: 'STRING' },
      device_id: { value: '172.16.85.1', type: 'STRING' },
      start_time: { value: '2023-04-01T00:00:00+05:30', type: 'STRING' },
      end_time: { value: '2023-07-01 00:00:00', type: 'STRING' },
      rank: { value: 1, type: 'NUMBER' },
    },
  ],
};

const LinkDownDetailsPanel = () => {
  const hasError = linkDownDetails.data.reduce((acc, curr) => {
    if (acc) return acc;
    return curr.status.criticality == Criticality.CRITICAL ? true : false;
  }, false);

  return (
    <StatPanelContainer
      description='Data about link down details'
      label={linkDownDetails.title}
      showError={hasError}
    >
      <div className='p-4 flex gap-1 items-center mb-4 sm:mb-6'>
        <span className='caps-2-bold text-icon-dark-grey'>Duration</span>
        <h6 className='text-icon-grey'>{linkDownDetails.sub_title}</h6>
      </div>
      <Table
        data={linkDownDetails.data}
        headers={linkDownDetails.columns}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
        statusTypes={[{ label: 'Down' }, { label: 'Resolved' }]}
        showStatusChip
      ></Table>
    </StatPanelContainer>
  );
};

export default LinkDownDetailsPanel;
