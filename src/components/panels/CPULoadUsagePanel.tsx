import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import Table from '../table/Table';
import { useUserContext } from '../../context/UserContext';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';

const CPULoadUsagePanel = () => {
  const { refetch } = useUserContext();
  const cpuLoadUsageURL = `${API_URL}/panel/device/cpu-load/usage?ver=v2`;

  const { data: cpuLoadUsageData, loading } = useFetch<FetchPanelData>(
    cpuLoadUsageURL,
    {
      headers,
    },
    refetch,
  );

  return (
    <StatPanelContainer
      description='Data about top CPU usage'
      label={cpuLoadUsageData?.title || 'Top CPU Load'}
      loading={loading}
    >
      <div className='mt-4'></div>
      <Table
        data={cpuLoadUsageData?.data || []}
        headers={cpuLoadUsageData?.columns || []}
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
