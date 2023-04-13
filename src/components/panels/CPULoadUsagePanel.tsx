import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import Table from '../table/Table';

const cpuLoadUsageData = {
  title: 'Total CPU Load Usage',
  sub_title: 'Today: 09:00:00 to 21:00:00',
  columns: [
    { title: '1_min', dataType: 'NUMBER' },
    { title: '5_min', dataType: 'NUMBER' },
    { title: '15_min', dataType: 'NUMBER' },
    { title: 'hostname', dataType: 'STRING' },
    { title: 'last_updated', dataType: 'STRING' },
  ],
  data: [
    {
      '1_min': { value: 1.69, type: 'NUMBER' },
      '5_min': { value: 1.0, type: 'NUMBER' },
      '15_min': { value: 1.04, type: 'NUMBER' },
      hostname: { value: 'site2-cedge01', type: 'STRING' },
      last_updated: { value: '2023-03-21 19_01:32.143', type: 'STRING' },
    },
    {
      '1_min': { value: 1.69, type: 'NUMBER' },
      '5_min': { value: 1.0, type: 'NUMBER' },
      '15_min': { value: 1.04, type: 'NUMBER' },
      hostname: { value: 'site2-cedge01', type: 'STRING' },
      last_updated: { value: '2023-03-21 19_01:32.143', type: 'STRING' },
    },
    {
      '1_min': { value: 1.69, type: 'NUMBER' },
      '5_min': { value: 1.0, type: 'NUMBER' },
      '15_min': { value: 1.04, type: 'NUMBER' },
      hostname: { value: 'site2-cedge01', type: 'STRING' },
      last_updated: { value: '2023-03-21 19_01:32.143', type: 'STRING' },
    },
    {
      '1_min': { value: 1.69, type: 'NUMBER' },
      '5_min': { value: 1.0, type: 'NUMBER' },
      '15_min': { value: 1.04, type: 'NUMBER' },
      hostname: { value: 'site2-cedge01', type: 'STRING' },
      last_updated: { value: '2023-03-21 19_01:32.143', type: 'STRING' },
    },
  ],
};

const CPULoadUsagePanel = () => {
  return (
    <StatPanelContainer description='Data about top CPU usage' label={cpuLoadUsageData.title}>
      <div className='mt-6 sm:mt-[26px]'></div>
      <Table
        data={cpuLoadUsageData.data}
        headers={cpuLoadUsageData.columns}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
      ></Table>
    </StatPanelContainer>
  );
};

export default CPULoadUsagePanel;
