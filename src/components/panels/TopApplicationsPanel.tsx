import { useUserContext } from '../../context/UserContext';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import ApplicationGraph from './ApplicationGraph';
import StatPanelContainer from './StatPanelContainer';

const TopApplicationsPanel = () => {
  const { refetch, timestamp } = useUserContext();
  const topApplicationPanelURL = `${API_URL}/panel/apps/usage?from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}&limit=10&ver=v2`;

  const { data: topApplicationPanelData, loading } = useFetch<FetchPanelData>(
    topApplicationPanelURL,
    {
      headers,
    },
    refetch,
  );

  const data = topApplicationPanelData?.data.map((d) => ({
    name: d.app,
    value: d.usage,
    unit: 'MB',
  }));

  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Top Applications'
      loading={loading}
    >
      <ApplicationGraph data={data || []} />
    </StatPanelContainer>
  );
};

export default TopApplicationsPanel;
