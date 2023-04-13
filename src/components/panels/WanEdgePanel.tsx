import DeviceStatus from './DeviceStatus';
import StatPanelContainer from './StatPanelContainer';
import { DeviceReachability } from '../../global';

const deviceData = [
  { reachability: DeviceReachability.REACHABLE, name: 'A1' },
  { reachability: DeviceReachability.REACHABLE, name: 'A2' },
  { reachability: DeviceReachability.REACHABLE, name: 'A3' },
  { reachability: DeviceReachability.REACHABLE, name: 'A4' },
  { reachability: DeviceReachability.UNREACHABLE, name: 'A5' },
  { reachability: DeviceReachability.UNREACHABLE, name: 'A6' },
];

const WanEdgePanel = () => {
  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='WAN Edge'
      showError
    >
      <DeviceStatus label='Total devices' data={deviceData} />
    </StatPanelContainer>
  );
};

export default WanEdgePanel;
