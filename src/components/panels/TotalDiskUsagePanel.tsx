import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import Table from '../table/Table';
import { useUserContext } from '../../context/UserContext';
import { API_URL, FetchPanelData, getFormatedDate, headers } from '../../global';
import useFetch from '../../hooks/useFetch';

const TotalDiskUsagePanel = () => {
  const { refetch } = useUserContext();
  const diskUsageURL = `${API_URL}/panel/device/disk/usage?ver=v2`;

  const { data: diskUsageData } = useFetch<FetchPanelData>(
    diskUsageURL,
    {
      headers,
    },
    refetch,
  );

  if (!diskUsageData) return null;

  const data = diskUsageData.data.map((d) => {
    return {
      ...d,
      last_updated: getFormatedDate(d.last_updated),
    };
  });

  return (
    <StatPanelContainer description='Data about total disk usage' label={diskUsageData.title}>
      <div className='mt-6 sm:mt-[26px]'></div>
      <Table
        data={data}
        headers={diskUsageData.columns}
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

export default TotalDiskUsagePanel;
