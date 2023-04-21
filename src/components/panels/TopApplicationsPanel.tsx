import { useUserContext } from '../../context/UserContext';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import ApplicationGraph from './ApplicationGraph';
import StatPanelContainer from './StatPanelContainer';

const TopApplicationsPanel = () => {
  const { refetch } = useUserContext();
  const topApplicationPanelURL = `${API_URL}/panel/apps/usage?from=1681669800000&to=1681842599000&limit=10&ver=v2`;

  const { data: topApplicationPanelData } = useFetch<FetchPanelData>(
    topApplicationPanelURL,
    {
      headers,
    },
    refetch,
  );

  if (!topApplicationPanelData) return null;

  const data = topApplicationPanelData.data.map((d) => ({
    name: d.app,
    value: d.usage,
    unit: 'MB',
  }));

  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Top Applications'
    >
      <ApplicationGraph data={data} />
    </StatPanelContainer>
  );
};

export default TopApplicationsPanel;
