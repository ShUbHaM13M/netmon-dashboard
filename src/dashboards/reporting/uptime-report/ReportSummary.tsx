import { StatPanelContainer, Table } from '../../../components';
import Like from '../../../assets/images/like.svg';
import { useContext } from 'react';
import { UptimeReportContext } from '.';
import { useUserContext } from '../../../context/UserContext';
import { API_URL, FetchPanelData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';

const ReportSummary = () => {
  const { refetch } = useUserContext();
  const { reportKeys } = useContext(UptimeReportContext);

  const reportSummaryURL = `${API_URL}/panel/report/uptime/summary?site-report-key=${reportKeys?.reportSiteKey}&ver=v2`;
  const { data: reportSummaryData, loading } = useFetch<FetchPanelData>(
    reportSummaryURL,
    { headers },
    refetch,
    !reportKeys?.reportSiteKey,
  );

  return (
    <StatPanelContainer
      label='Report Summary'
      description='This panel shows the Report Summary'
      loading={loading}
    >
      <Table
        headers={reportSummaryData?.columns || []}
        data={reportSummaryData?.data || []}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
      />
    </StatPanelContainer>
  );
};

export default ReportSummary;
