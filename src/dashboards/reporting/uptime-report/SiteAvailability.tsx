import { StatPanelContainer, Table } from '../../../components';
import Like from '../../../assets/images/like.svg';
import { useContext } from 'react';
import { UptimeReportContext } from '.';
import { useUserContext } from '../../../context/UserContext';
import { API_URL, FetchPanelData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';

const SiteAvailability = () => {
  const { refetch } = useUserContext();
  const { reportKeys, selectedSite } = useContext(UptimeReportContext);

  const siteAvailabilityURL = `${API_URL}/panel/report/uptime/site/summary?site-name=${selectedSite?.Text}&site-report-key=${reportKeys?.reportSiteKey}&ver=v2`;
  const { data: siteAvailabilityData, loading } = useFetch<FetchPanelData>(
    siteAvailabilityURL,
    { headers },
    refetch,
    !(reportKeys?.reportSiteKey && selectedSite),
  );

  return (
    <StatPanelContainer
      label='Site Availability'
      description='This panel shows the Site Availability'
      loading={loading}
    >
      <Table
        headers={siteAvailabilityData?.columns || []}
        data={siteAvailabilityData?.data || []}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
      />
    </StatPanelContainer>
  );
};

export default SiteAvailability;
