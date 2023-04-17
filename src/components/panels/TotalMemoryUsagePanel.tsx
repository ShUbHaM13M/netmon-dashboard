import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import Table from '../table/Table';

const cpuLoadUsageData = {
  title: 'Total Memory Usage',
  sub_title: 'Today: 09:00:00 to 21:00:00',
  columns: [
    { title: 'mem_util', dataType: 'STRING' },
    { title: 'hostname', dataType: 'STRING' },
    { title: 'last_update', dataType: 'STRING' },
  ],
  data: [
    {
      mem_util: { value: '13.4%' },
      hostname: { value: 'dc-cedge01' },
      last_updated: { value: '2023-03-21 19_01:32.143' },
    },
    {
      mem_util: { value: '15.6%' },
      hostname: { value: 'site2-cedge01' },
      last_updated: { value: '2023-03-21 19_01:32.143' },
    },
    {
      mem_util: { value: '15.6%' },
      hostname: { value: 'site2-cedge01' },
      last_updated: { value: '2023-03-21 19_01:32.143' },
    },
    {
      mem_util: { value: '15.6%' },
      hostname: { value: 'site2-cedge01' },
      last_updated: { value: '2023-03-21 19_01:32.143' },
    },
    {
      mem_util: { value: '15.6%' },
      hostname: { value: 'site2-cedge01' },
      last_updated: { value: '2023-03-21 19_01:32.143' },
    },
    {
      mem_util: { value: '15.6%' },
      hostname: { value: 'site2-cedge01' },
      last_updated: { value: '2023-03-21 19_01:32.143' },
    },
    {
      mem_util: { value: '15.6%' },
      hostname: { value: 'site2-cedge01' },
      last_updated: { value: '2023-03-21 19_01:32.143' },
    },
  ],
};

const TotalMemoryUsagePanel = () => {
  return (
    <StatPanelContainer description='Data about total memory usage' label={cpuLoadUsageData.title}>
      <div className='mt-6 sm:mt-[26px]'></div>
      <Table
        data={cpuLoadUsageData.data}
        headers={cpuLoadUsageData.columns}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
        showStatus={false}
      ></Table>
    </StatPanelContainer>
  );
};

export default TotalMemoryUsagePanel;
