import { Criticality } from '../../global';
import StatPanelContainer from './StatPanelContainer';
import Status from './Status';

const BfdConnectivityPanel = () => {
  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='BFD Connectivity'
      showError
    >
      <div className='flex flex-col sm:flex-row w-full pt-4 sm:pt-6 px-4 py-4 gap-3 sm:gap-4'>
        <div className='flex-1'>
          <Status label='Full' value={5} criticality={Criticality.SAFE} />
        </div>
        <div className='flex-1'>
          <Status label='PARTIAL' value={0} criticality={Criticality.MAJOR} />
        </div>
        <div className='flex-1'>
          <Status label='UNAVAILABLE' value={2} criticality={Criticality.CRITICAL} />
        </div>
      </div>
    </StatPanelContainer>
  );
};

export default BfdConnectivityPanel;
