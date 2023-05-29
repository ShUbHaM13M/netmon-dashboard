import { useUserContext } from '../../context/UserContext';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import StackedGraph from './StackedGraph';
import StatPanelContainer from './StatPanelContainer';

const licensePanelURL = `${API_URL}/panel/device/license/summary?ver=v2`;

const LicensePanel = () => {
  const { refetch } = useUserContext();
  const { data: licensePanelData, loading } = useFetch<FetchPanelData>(
    licensePanelURL,
    {
      headers,
    },
    refetch,
  );

  const total = licensePanelData?.data.find((d) => d['status'] === 'subscribed');
  const notSubscribed = licensePanelData?.data.find((d) => d['status'] === 'not-subscribed') || {
    count: 0,
  };

  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label={licensePanelData?.title || 'License'}
      showError={!!notSubscribed?.count}
      loading={loading}
    >
      <StackedGraph
        criticalCount={notSubscribed?.count}
        safeLabel='Valid'
        criticalLabel='Expired'
        total={total?.count}
      />
    </StatPanelContainer>
  );
};

export default LicensePanel;
