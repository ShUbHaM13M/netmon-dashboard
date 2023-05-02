import Table from '../table/Table';
import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import { useUserContext } from '../../context/UserContext';
import PercentFormatter from '../formatter/PercentFormatter';

const DownloadLinkUtilizationPanel = ({ percentile }: { percentile: number }) => {
  const { refetch } = useUserContext();
  const downloadLinkUtilURL = `${API_URL}/panel/interface/utilization/service-window?direction=download&percentile=${percentile}&start-hrs=09:00:00&end-hrs=21:00:00&tz-offset=%2B5:30&ver=v2`;

  const { data: downloadLinkUtilizationData } = useFetch<FetchPanelData>(
    downloadLinkUtilURL,
    {
      headers,
    },
    refetch,
  );

  if (!downloadLinkUtilizationData) return null;

  const hasError = downloadLinkUtilizationData.data.find((d) => {
    return d[downloadLinkUtilizationData.columns[0].property] > 80;
  });
  console.log(downloadLinkUtilizationData);

  return (
    <StatPanelContainer
      subtitle={downloadLinkUtilizationData.sub_title}
      description='Data about link down details'
      label={downloadLinkUtilizationData.title}
      showError={!!hasError}
    >
      <Table
        data={downloadLinkUtilizationData.data}
        headers={downloadLinkUtilizationData.columns}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
        columnFormatters={{ pct_util: PercentFormatter }}
      ></Table>
    </StatPanelContainer>
  );
};

export default DownloadLinkUtilizationPanel;
