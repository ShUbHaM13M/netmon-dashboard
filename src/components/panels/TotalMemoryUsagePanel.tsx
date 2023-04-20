import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import Table from '../table/Table';
import { useUserContext } from '../../context/UserContext';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';

const TotalMemoryUsagePanel = () => {
  const { refetch } = useUserContext();
  const memoryUsageURL = `${API_URL}/panel/device/mem/usage?ver=v2`;

  const { data: memoryUsageData } = useFetch<FetchPanelData>(
    memoryUsageURL,
    {
      headers,
    },
    refetch,
  );

  if (!memoryUsageData) return null;

  return (
    <StatPanelContainer description='Data about total memory usage' label={memoryUsageData.title}>
      <div className='mt-6 sm:mt-[26px]'></div>
      <Table
        data={memoryUsageData.data}
        headers={memoryUsageData.columns}
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
