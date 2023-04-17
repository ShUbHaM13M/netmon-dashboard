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
      status: { value: 'Down', criticality: Criticality.CRITICAL },
      downtime: { value: 13963 },
      color: { value: 'biz-internet' },
      hostname: { value: 'DEVICE-1' },
      provider: { value: 'ISP 1' },
      site_name: { value: 'Site-100' },
      device_id: { value: '172.16.85.1' },
      start_time: { value: '2023-04-01T00:00:00+05:30' },
      end_time: { value: 'NA' },
      rank: { value: 0 },
    },
    {
      status: { value: 'Resolved', criticality: Criticality.SAFE },
      downtime: { value: 69420 },
      color: { value: 'public-internet' },
      hostname: { value: 'DEVICE-1' },
      provider: { value: 'ISP 2' },
      site_name: { value: 'Site-100' },
      device_id: { value: '172.16.85.1' },
      start_time: { value: '2023-04-01T00:00:00+05:30' },
      end_time: { value: '2023-07-01 00:00:00' },
      rank: { value: 1 },
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
      subtitle={linkDownDetails.sub_title}
      description='Data about link down details'
      label={linkDownDetails.title}
      showError={hasError}
    >
      <Table
        data={linkDownDetails.data}
        headers={linkDownDetails.columns}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
        showStatusChip
      ></Table>
    </StatPanelContainer>
  );
};

export default LinkDownDetailsPanel;
