import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import Table from '../table/Table';
import { useUserContext } from '../../context/UserContext';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';

const TotalMemoryUsagePanel = () => {
  const { refetch } = useUserContext();
  const memoryUsageURL = `${API_URL}/panel/device/mem/usage?ver=v2`;

  const { data: memoryUsageData, loading } = useFetch<FetchPanelData>(
    memoryUsageURL,
    {
      headers,
    },
    refetch,
  );

  return (
    <StatPanelContainer
      description='Data about total memory usage'
      label={memoryUsageData?.title || 'Top Memory Usage'}
      loading={loading}
    >
      <div className='mt-4'></div>
      <Table
        data={memoryUsageData?.data || []}
        headers={memoryUsageData?.columns || []}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
      ></Table>
    </StatPanelContainer>
  );
};

export default TotalMemoryUsagePanel;
