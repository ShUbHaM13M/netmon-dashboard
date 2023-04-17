import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import StackedGraph from './StackedGraph';
import StatPanelContainer from './StatPanelContainer';

const certificatePanelURL = `${API_URL}/panel/device/certificate/summary?ver=v2`;

const CertificatePanel = () => {
  const { data: certificatePanelData } = useFetch<FetchPanelData>(certificatePanelURL, {
    headers,
  });

  if (!certificatePanelData) return null;

  const total = certificatePanelData.data.find((d) => d['expiration-status'] === 'normal');
  const expired = certificatePanelData.data.find((d) => d['expiration-status'] === 'expired');

  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label={certificatePanelData.title}
      showError={!!expired?.count}
    >
      <StackedGraph
        criticalCount={expired?.count}
        safeLabel='Valid'
        criticalLabel='Expired'
        total={total?.count}
      />
    </StatPanelContainer>
  );
};

export default CertificatePanel;
