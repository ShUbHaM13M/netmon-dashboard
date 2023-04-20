import Table from '../table/Table';
import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import { useUserContext } from '../../context/UserContext';

const TunnelLossPanel = () => {
  const { refetch } = useUserContext();
  const tunnelLossPanel = `${API_URL}/approute/tunnels/summary?type=loss&limit=10&ver=v2`;

  const { data: tunnelLossData } = useFetch<FetchPanelData>(
    tunnelLossPanel,
    {
      headers,
    },
    refetch,
  );

  if (!tunnelLossData) return null;

  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Tunnel Loss'
    >
      <div className='mt-4'></div>
      <Table
        headers={tunnelLossData.columns}
        data={tunnelLossData.data}
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

export default TunnelLossPanel;
