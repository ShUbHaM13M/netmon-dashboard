import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import Table from '../table/Table';
import { useUserContext } from '../../context/UserContext';
import { API_URL, FetchPanelData, getFormatedDate, headers } from '../../global';
import useFetch from '../../hooks/useFetch';

const CPU_UsagePanel = () => {
  const { refetch } = useUserContext();
  const cpuUsageURL = `${API_URL}/panel/device/cpu/usage?ver=v2`;

  const { data: cpuUsageData } = useFetch<FetchPanelData>(
    cpuUsageURL,
    {
      headers,
    },
    refetch,
  );

  if (!cpuUsageData) return null;

  const data = cpuUsageData.data.map((d) => {
    return {
      ...d,
      last_updated: getFormatedDate(d.last_updated),
    };
  });

  return (
    <StatPanelContainer description='Data about top CPU Usage' label={cpuUsageData.title}>
      <div className='mt-6 sm:mt-[26px]'></div>
      <Table
        data={data}
        headers={cpuUsageData.columns}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
        showStatus={false}
        showPercentage
      ></Table>
    </StatPanelContainer>
  );
};

export default CPU_UsagePanel;
