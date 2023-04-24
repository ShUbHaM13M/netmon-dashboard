import StatPanelContainer from './StatPanelContainer';
import Table from '../table/Table';
import Like from '../../assets/images/like.svg';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import { useUserContext } from '../../context/UserContext';

const TunnelLatencyPanel = () => {
  const { refetch } = useUserContext();
  const tunnelLatencyURL = `${API_URL}/approute/tunnels/summary?type=latency&limit=10&ver=v2`;

  const { data: tunnelLatencyData } = useFetch<FetchPanelData>(
    tunnelLatencyURL,
    {
      headers,
    },
    refetch,
  );

  if (!tunnelLatencyData) return null;

  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Tunnel Latency'
    >
      <div className='mt-4'></div>
      <Table
        headers={[
          tunnelLatencyData.columns[2],
          tunnelLatencyData.columns[1],
          tunnelLatencyData.columns[0],
        ]}
        data={tunnelLatencyData.data}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
      />
    </StatPanelContainer>
  );
};

export default TunnelLatencyPanel;
