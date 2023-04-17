import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import DeviceStatus from './DeviceStatus';
import StatPanelContainer from './StatPanelContainer';

const controllerPanelURL = `${API_URL}/panel/device/connection/summary?device-type=controllers&ver=v2`;

const ControllerPanel = () => {
  const { data: controllerPanelData } = useFetch<FetchPanelData>(controllerPanelURL, {
    headers,
  });

  if (!controllerPanelData) return null;

  let reachableDevices = 0;
  let unReachableDevices = 0;
  controllerPanelData.data.forEach((d) => {
    if (d.reachability === 'reachable') {
      reachableDevices += d.count;
    } else {
      unReachableDevices += d.count;
    }
  });

  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Controllers'
      showError={!!unReachableDevices}
    >
      <DeviceStatus
        reachableDevices={reachableDevices}
        label='Total Devices'
        unReachableDevices={unReachableDevices}
      />
    </StatPanelContainer>
  );
};

export default ControllerPanel;
