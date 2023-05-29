import { StatPanelContainer, Table } from '../../../components';
import Like from '../../../assets/images/like.svg';
import { useContext } from 'react';
import { UptimeReportContext } from '.';
import { useUserContext } from '../../../context/UserContext';
import { API_URL, FetchPanelData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';

const SiteDowntime = () => {
  const { refetch } = useUserContext();

  const { reportKeys, selectedSite } = useContext(UptimeReportContext);

  const siteDowntimeURL = `${API_URL}/panel/report/downtime/site/details?site-name=${selectedSite?.Text}&site-report-key=${reportKeys?.reportSiteKey}&ver=v2`;
  const { data: siteDowntimeData, loading } = useFetch<FetchPanelData>(
    siteDowntimeURL,
    { headers },
    refetch,
    !(reportKeys?.reportSiteKey && selectedSite),
  );

  return (
    <StatPanelContainer
      label='Site Downtime'
      description='This panel shows the Site Downtime'
      loading={loading}
    >
      <Table
        headers={siteDowntimeData?.columns || []}
        data={siteDowntimeData?.data || []}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
      />
    </StatPanelContainer>
  );
};

export default SiteDowntime;
