import StackedGraph from './StackedGraph';
import StatPanelContainer from './StatPanelContainer';

const CertificatePanel = () => {
  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Certificates'
    >
      <StackedGraph safe={3} safeLabel='Valid' criticalLabel='Expired' total={3} />
    </StatPanelContainer>
  );
};

export default CertificatePanel;
