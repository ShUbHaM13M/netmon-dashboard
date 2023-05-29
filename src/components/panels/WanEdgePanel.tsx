import DeviceStatus from './DeviceStatus';
import StatPanelContainer from './StatPanelContainer';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import { useUserContext } from '../../context/UserContext';

const wanEdgePanelURL = `${API_URL}/panel/device/connection/summary?device-type=vedge&ver=v2`;

const WanEdgePanel = () => {
  const { refetch } = useUserContext();
  const { data: wanEdgePanelData, loading } = useFetch<FetchPanelData>(
    wanEdgePanelURL,
    {
      headers,
    },
    refetch,
  );

  const reachableDevices = wanEdgePanelData?.data.find((d) => d.reachability === 'reachable');
  const unReachableDevices = wanEdgePanelData?.data.find((d) => d.reachability === 'unreachable');

  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='WAN Edge'
      showError={!!unReachableDevices?.count}
      loading={loading}
    >
      <DeviceStatus
        label='Total devices'
        reachableDevices={reachableDevices?.count || 0}
        unReachableDevices={unReachableDevices?.count || 0}
      />
    </StatPanelContainer>
  );
};

export default WanEdgePanel;
