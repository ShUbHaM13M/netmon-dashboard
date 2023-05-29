import Table from '../table/Table';
import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import { useUserContext } from '../../context/UserContext';
import PercentFormatter from '../formatter/PercentFormatter';

const UploadLinkUtilizationPanel = ({ percentile }: { percentile: number }) => {
  const { refetch } = useUserContext();
  const uploadLinkUtilURL = `${API_URL}/panel/interface/utilization/service-window?direction=upload&percentile=${percentile}&start-hrs=09:00:00&end-hrs=21:00:00&tz-offset=%2B5:30&ver=v2`;

  const { data: uploadLinkUtilizationData, loading } = useFetch<FetchPanelData>(
    uploadLinkUtilURL,
    {
      headers,
    },
    refetch,
  );

  const hasError = uploadLinkUtilizationData?.data.find((d) => {
    return d[uploadLinkUtilizationData.columns[0].property] > 80;
  });

  return (
    <StatPanelContainer
      description='Data about link down details'
      label={uploadLinkUtilizationData?.title || 'Upload Link Utilization'}
      showError={!!hasError}
      loading={loading}
    >
      <div className='sm:mt-[26px]'></div>
      <Table
        data={uploadLinkUtilizationData?.data || []}
        headers={uploadLinkUtilizationData?.columns || []}
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

export default UploadLinkUtilizationPanel;
