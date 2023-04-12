import { Criticality } from '../../global';
import Table from '../table/Table';
import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';

const deviceDownDetails = {
  title: 'Device down details',
  sub_title: 'Today: 09:00:00 to 21:00:00',
  columns: [
    { title: 'reachability', dataType: 'STATUS' },
    { title: 'hostname', dataType: 'STRING' },
    { title: 'system_ip', dataType: 'STRING' },
    { title: 'sitename', dataType: 'STRING' },
    { title: 'device_model', dataType: 'STRING' },
    { title: 'bfd_sessions', dataType: 'STRING' },
    { title: 'omp_peers', dataType: 'STRING' },
    { title: 'control', dataType: 'NUMBER`' },
    { title: 'version', dataType: 'STRING' },
    { title: 'chassis_no', dataType: 'STRING' },
    { title: 'serial_no', dataType: 'STRING' },
    { title: 'update_time', dataType: 'STRING' },
    { title: 'last_updated', dataType: 'STRING' },
  ],
  data: [
    {
      reachability: { value: 'Unreachable', type: 'STATUS', criticality: Criticality.CRITICAL },
      hostname: { value: 'vsmart', type: 'STRING' },
      system_ip: { value: '10.10.1.5', type: 'STRING' },
      sitename: { value: 'Main DC', type: 'STRING' },
      device_model: { value: 'vsmart', type: 'STRING' },
      bfd_sessions: { value: '-', type: 'STRING' },
      omp_peers: { value: '10.10.1.17', type: 'STRING' },
      control: { value: 6, type: 'NUMBER' },
      version: { value: '20.4.2', type: 'STRING' },
      chassis_no: { value: 'f7b59sksikekwlasasds', type: 'STRING' },
      serial_no: { value: 'f7b59sksikekwlasasds', type: 'STRING' },
      update_time: { value: 'f7b59sksikekwlasasds', type: 'STRING' },
      last_update: { value: 'f7b59sksikekwlasasds', type: 'STRING' },
    },
    {
      reachability: { value: 'Reachable', type: 'STATUS', criticality: Criticality.SAFE },
      hostname: { value: 'vsmart', type: 'STRING' },
      system_ip: { value: '10.10.1.5', type: 'STRING' },
      sitename: { value: 'Main DC', type: 'STRING' },
      device_model: { value: 'vsmart', type: 'STRING' },
      bfd_sessions: { value: '-', type: 'STRING' },
      omp_peers: { value: '10.10.1.17', type: 'STRING' },
      control: { value: 6, type: 'NUMBER' },
      version: { value: '20.4.2', type: 'STRING' },
      chassis_no: { value: 'f7b59sksikekwlasasds', type: 'STRING' },
      serial_no: { value: 'f7b59sksikekwlasasds', type: 'STRING' },
      update_time: { value: 'f7b59sksikekwlasasds', type: 'STRING' },
      last_update: { value: 'f7b59sksikekwlasasds', type: 'STRING' },
    },
  ],
};

const DeviceDownDetailPanel = () => {
  const hasError = deviceDownDetails.data.reduce((acc, curr) => {
    if (acc) return acc;
    return curr.reachability.criticality == Criticality.CRITICAL ? true : false;
  }, false);

  return (
    <StatPanelContainer
      description='Data about device down details'
      label={deviceDownDetails.title}
      showError={hasError}
    >
      <div className='mt-4 sm:mt-[26px]'></div>
      <Table
        data={deviceDownDetails.data}
        headers={deviceDownDetails.columns}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
        statusTypes={[{ label: 'Unreachable' }, { label: 'Reachable' }]}
        showStatusChip
      ></Table>
    </StatPanelContainer>
  );
};

export default DeviceDownDetailPanel;
