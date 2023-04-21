import StatPanelContainer from './StatPanelContainer';
import Table from '../table/Table';
import Like from '../../assets/images/like.svg';
import { API_URL, FetchPanelData, getFormatedDate, headers } from '../../global';
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

  const data = tunnelLatencyData.data.map((d) => {
    return {
      ...d,
      summary_time: getFormatedDate(d.summary_time),
    };
  });

  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Tunnel Latency'
    >
      <div className='mt-4'></div>
      <Table
        headers={tunnelLatencyData.columns}
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

export default TunnelLatencyPanel;
