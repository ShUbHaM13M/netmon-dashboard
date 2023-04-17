import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import Table from '../table/Table';

const cpuUsageData = {
  title: 'Top CPU Usage',
  sub_title: 'Today: 09:00:00 to 21:00:00',
  columns: [
    { title: 'user_cpu', dataType: 'STRING' },
    { title: 'hostname', dataType: 'STRING' },
    { title: 'last_updated', dataType: 'STRING' },
  ],
  data: [
    {
      user_cpu: { value: '13.4%' },
      hostname: { value: 'dc-cedge01' },
      last_updated: { value: '2023-03-21 19_01:32.143' },
    },
    {
      user_cpu: { value: '15.6%' },
      hostname: { value: 'site2-cedge01' },
      last_updated: { value: '2023-03-21 19_01:32.143' },
    },
    {
      user_cpu: { value: '13.4%' },
      hostname: { value: 'site2-cedge01' },
      last_updated: { value: '2023-03-21 19_01:32.143' },
    },
    {
      user_cpu: { value: '15.6%' },
      hostname: { value: 'site2-cedge01' },
      last_updated: { value: '2023-03-21 19_01:32.143' },
    },
  ],
};

const CPU_UsagePanel = () => {
  return (
    <StatPanelContainer description='Data about top CPU Usage' label={cpuUsageData.title}>
      <div className='mt-6 sm:mt-[26px]'></div>
      <Table
        data={cpuUsageData.data}
        headers={cpuUsageData.columns}
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

export default CPU_UsagePanel;
