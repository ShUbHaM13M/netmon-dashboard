import { DeviceReachability } from '../../global';
import DeviceStatus from './DeviceStatus';
import StatPanelContainer from './StatPanelContainer';

const deviceData = [
  { reachability: DeviceReachability.REACHABLE, name: 'A1' },
  { reachability: DeviceReachability.REACHABLE, name: 'A2' },
  { reachability: DeviceReachability.REACHABLE, name: 'A3' },
];

const ControllerPanel = () => {
  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Controllers'
    >
      <DeviceStatus data={deviceData} label='Total Devices' />
    </StatPanelContainer>
  );
};

export default ControllerPanel;
