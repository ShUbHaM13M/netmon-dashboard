import { API_URL, Criticality, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import StatPanelContainer from './StatPanelContainer';
import Status from './Status';

const networkIssueURL = `${API_URL}/panel/network/issues/summary?ver=v2`;

const NetworkIssuePanel = () => {
  const { data: networkIssueData } = useFetch<FetchPanelData>(networkIssueURL, {
    headers,
  });

  if (!networkIssueData) return null;

  return (
    <StatPanelContainer
      description='This will show the Network issues'
      label={networkIssueData.title}
      subtitle={networkIssueData.sub_title}
      showError
    >
      <div className='px-4 py-3 flex flex-col gap-3'>
        <div className='flex gap-4'>
          {networkIssueData.data.map((data, index) => (
            <Status
              criticality={data.criticality || Criticality.SAFE}
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
