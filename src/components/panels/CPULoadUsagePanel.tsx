import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import Table from '../table/Table';
import { useUserContext } from '../../context/UserContext';
import { API_URL, FetchPanelData, getFormatedDate, headers } from '../../global';
import useFetch from '../../hooks/useFetch';

const CPULoadUsagePanel = () => {
  const { refetch } = useUserContext();
  const cpuLoadUsageURL = `${API_URL}/panel/device/cpu-load/usage?ver=v2`;

  const { data: cpuLoadUsageData } = useFetch<FetchPanelData>(
    cpuLoadUsageURL,
    {
      headers,
    },
    refetch,
  );

  if (!cpuLoadUsageData) return null;

  const data = cpuLoadUsageData.data.map((d) => {
    return {
      ...d,
      last_updated: getFormatedDate(d.last_updated),
    };
  });

  return (
    <StatPanelContainer description='Data about top CPU usage' label={cpuLoadUsageData.title}>
      <div className='mt-6 sm:mt-[26px]'></div>
      <Table
        data={data}
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

export default CPULoadUsagePanel;
