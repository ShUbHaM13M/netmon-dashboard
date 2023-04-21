import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import Table from '../table/Table';
import { useUserContext } from '../../context/UserContext';
import { API_URL, FetchPanelData, getFormatedDate, headers } from '../../global';
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

  const data = memoryUsageData.data.map((d) => {
    return {
      ...d,
      last_updated: getFormatedDate(d.last_updated),
    };
  });

  return (
    <StatPanelContainer description='Data about total memory usage' label={memoryUsageData.title}>
      <div className='mt-6 sm:mt-[26px]'></div>
      <Table
        data={data}
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
