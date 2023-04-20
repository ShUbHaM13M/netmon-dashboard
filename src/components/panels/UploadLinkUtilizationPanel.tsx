import Table from '../table/Table';
import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import { useUserContext } from '../../context/UserContext';

const UploadLinkUtilizationPanel = ({ percentile }: { percentile: number }) => {
  const { refetch } = useUserContext();
  const uploadLinkUtilURL = `${API_URL}/panel/interface/utilization/service-window?direction=upload&percentile=${percentile}&start-hrs=09:00:00&end-hrs=21:00:00&tz-offset=%2B5:30&ver=v2`;

  const { data: uploadLinkUtilizationData } = useFetch<FetchPanelData>(
    uploadLinkUtilURL,
    {
      headers,
    },
    refetch,
  );

  if (!uploadLinkUtilizationData) return null;

  const hasError = uploadLinkUtilizationData.data.find((d) => {
    return d[uploadLinkUtilizationData.columns[0].property] > 80;
  });

  return (
    <StatPanelContainer
      description='Data about link down details'
      label={uploadLinkUtilizationData.title}
      showError={!!hasError}
    >
      <div className='sm:mt-[26px]'></div>
      <Table
        data={uploadLinkUtilizationData.data}
        headers={uploadLinkUtilizationData.columns}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
        showStatusChip={false}
        showPercentage
      ></Table>
    </StatPanelContainer>
  );
};

export default UploadLinkUtilizationPanel;
