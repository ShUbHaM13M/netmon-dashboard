import { useUserContext } from '../../context/UserContext';
import { API_URL, Criticality, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import StatPanelContainer from './StatPanelContainer';
import Status from './Status';

const networkIssueURL = `${API_URL}/panel/network/issues/summary?ver=v2`;

const NetworkIssuePanel = () => {
  const { refetch } = useUserContext();
  const { data: networkIssueData } = useFetch<FetchPanelData>(
    networkIssueURL,
    {
      headers,
    },
    refetch,
  );

  if (!networkIssueData) return null;

  return (
    <StatPanelContainer
      description='This will show the Network issues'
      label={networkIssueData.title}
      subtitle={networkIssueData.sub_title}
      showError={!!networkIssueData.data.find((d) => d.count > 0)}
    >
      <div className='px-4 py-3 flex flex-col gap-3'>
        <div className='flex gap-4'>
          {networkIssueData.data.map((data, index) => (
            <Status
              criticality={data.criticality || Criticality.CRITICAL}
              value={data.count}
              label={data.name}
              key={index}
            />
          ))}
        </div>
      </div>
    </StatPanelContainer>
  );
};

export default NetworkIssuePanel;
