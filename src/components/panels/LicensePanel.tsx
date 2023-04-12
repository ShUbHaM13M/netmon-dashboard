import StackedGraph from './StackedGraph';
import StatPanelContainer from './StatPanelContainer';

const LicensePanel = () => {
  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Licenses'
      showError
    >
        <StackedGraph safe={8} safeLabel='Valid' criticalLabel='Expired' total={10} />
    </StatPanelContainer>
  );
};

export default LicensePanel;
