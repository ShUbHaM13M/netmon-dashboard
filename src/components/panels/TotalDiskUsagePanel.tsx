import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import Table from '../table/Table';
import { useUserContext } from '../../context/UserContext';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';

const TotalDiskUsagePanel = () => {
  const { refetch } = useUserContext();
  const diskUsageURL = `${API_URL}/panel/device/disk/usage?ver=v2`;

  const { data: diskUsageData, loading } = useFetch<FetchPanelData>(
    diskUsageURL,
    {
      headers,
    },
    refetch,
  );

  return (
    <StatPanelContainer
      description='Data about total disk usage'
      label={diskUsageData?.title || 'Top Disk Usage'}
      loading={loading}
    >
      <div className='mt-4'></div>
      <Table
        data={diskUsageData?.data || []}
        headers={diskUsageData?.columns || []}
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
