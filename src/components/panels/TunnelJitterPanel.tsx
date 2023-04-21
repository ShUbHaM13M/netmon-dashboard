import StatPanelContainer from './StatPanelContainer';
import Table from '../table/Table';
import Like from '../../assets/images/like.svg';
import { API_URL, FetchPanelData, getFormatedDate, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import { useUserContext } from '../../context/UserContext';

const TunnelJitterPanel = () => {
  const { refetch } = useUserContext();
  const tunnelJitterURL = `${API_URL}/approute/tunnels/summary?type=jitter&limit=10&ver=v2`;

  const { data: tunnelJitterData } = useFetch<FetchPanelData>(
    tunnelJitterURL,
    {
      headers,
    },
    refetch,
  );

  if (!tunnelJitterData) return null;

  const data = tunnelJitterData.data.map((d) => {
    return {
      ...d,
      summary_time: getFormatedDate(d.summary_time),
    };
  });

  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Tunnel Jitter'
    >
      <div className='mt-4'></div>
      <Table
        headers={tunnelJitterData.columns}
        data={data}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
        showStatus={false}
      />
    </StatPanelContainer>
  );
};

export default TunnelJitterPanel;
