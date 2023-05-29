import { useUserContext } from '../../context/UserContext';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import StackedGraph from './StackedGraph';
import StatPanelContainer from './StatPanelContainer';

const certificatePanelURL = `${API_URL}/panel/device/certificate/summary?ver=v2`;

const CertificatePanel = () => {
  const { refetch } = useUserContext();
  const { data: certificatePanelData, loading } = useFetch<FetchPanelData>(
    certificatePanelURL,
    {
      headers,
    },
    refetch,
  );

  const total = certificatePanelData?.data.find((d) => d['expiration-status'] === 'normal');
  const expired = certificatePanelData?.data.find((d) => d['expiration-status'] === 'expired');

  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label={certificatePanelData?.title || 'Certificates'}
      showError={!!expired?.count}
      loading={loading}
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
