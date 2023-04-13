import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import Table from '../table/Table';

const diskUsageData = {
  title: 'Total Disk Usage',
  sub_title: 'Today: 09:00:00 to 21:00:00',
  columns: [
    { title: 'mem_util', dataType: 'STRING' },
    { title: 'hostname', dataType: 'STRING' },
    { title: 'last_update', dataType: 'STRING' },
  ],
  data: [
    {
      mem_util: { value: '13.4%', type: 'STRING' },
      hostname: { value: 'dc-cedge01', type: 'STRING' },
      last_updated: { value: '2023-03-21 19_01:32.143', type: 'STRING' },
    },
    {
      mem_util: { value: '15.6%', type: 'STRING' },
      hostname: { value: 'site2-cedge01', type: 'STRING' },
      last_updated: { value: '2023-03-21 19_01:32.143', type: 'STRING' },
    },
    {
      mem_util: { value: '15.6%', type: 'STRING' },
      hostname: { value: 'site2-cedge01', type: 'STRING' },
      last_updated: { value: '2023-03-21 19_01:32.143', type: 'STRING' },
    },
    {
      mem_util: { value: '15.6%', type: 'STRING' },
      hostname: { value: 'site2-cedge01', type: 'STRING' },
      last_updated: { value: '2023-03-21 19_01:32.143', type: 'STRING' },
    },
    {
      mem_util: { value: '15.6%', type: 'STRING' },
      hostname: { value: 'site2-cedge01', type: 'STRING' },
      last_updated: { value: '2023-03-21 19_01:32.143', type: 'STRING' },
    },
    {
      mem_util: { value: '15.6%', type: 'STRING' },
      hostname: { value: 'site2-cedge01', type: 'STRING' },
      last_updated: { value: '2023-03-21 19_01:32.143', type: 'STRING' },
    },
    {
      mem_util: { value: '15.6%', type: 'STRING' },
      hostname: { value: 'site2-cedge01', type: 'STRING' },
      last_updated: { value: '2023-03-21 19_01:32.143', type: 'STRING' },
    },
  ],
};

const TotalDiskUsagePanel = () => {
  return (
    <StatPanelContainer description='Data about total disk usage' label={diskUsageData.title}>
      <div className='mt-6 sm:mt-[26px]'></div>
      <Table
        data={diskUsageData.data}
        headers={diskUsageData.columns}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
      ></Table>
    </StatPanelContainer>
  );
};

export default TotalDiskUsagePanel;
