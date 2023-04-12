import { Criticality } from '../../global';
import StatPanelContainer from './StatPanelContainer';
import Status from './Status';

const networkIssueData = [
  { label: 'Reboot', criticality: Criticality.CRITICAL, value: 2 },
  { label: 'HW Err', criticality: Criticality.SAFE, value: 0 },
  { label: 'Crash', criticality: Criticality.SAFE, value: 0 },
];

const NetworkIssuePanel = () => {
  return (
    <StatPanelContainer
      description='This will show the Network issues'
      label='Network Issues'
      showError
    >
      <div className='px-4 py-3 flex flex-col gap-3'>
        <div className='flex items-center gap-1'>
          <span className='caps-2-bold text-icon-dark-grey'>Duration</span>
          <span className='text-icon-white font-semibold text-[13px]'>24 H</span>
        </div>
        <div className='flex gap-4'>
          {networkIssueData.map((data, index) => (
            <Status {...data} key={index} />
          ))}
        </div>
      </div>
    </StatPanelContainer>
  );
};

export default NetworkIssuePanel;
