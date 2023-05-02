import { useContext } from 'react';
import { StatPanelContainer, Table } from '../../../components';
import { API_URL, FetchPanelData, getArrayAsString, headers } from '../../../global';
import Like from '../../../assets/images/like.svg';
import { UptimeReportContext } from '.';
import { useUserContext } from '../../../context/UserContext';
import useFetch from '../../../hooks/useFetch';

const LinkAvailability = () => {
  const { refetch } = useUserContext();

  const { reportKeys, selectedColors, selectedDevices, selectedProviders, selectedSite } =
    useContext(UptimeReportContext);

  const linkAvailabilityURL = `${API_URL}/panel/report/uptime/link/summary?site=${
    selectedSite?.Value
  }&device=${selectedDevices ? getArrayAsString(selectedDevices, 'Text') : 'All'}&colors=${
    selectedColors ? getArrayAsString(selectedColors, 'Value') : 'All'
  }&service-providers=${
    selectedProviders ? getArrayAsString(selectedProviders, 'Value') : 'All'
  }&site-report-key=${reportKeys?.reportSiteKey}&link-report-key=${
    reportKeys?.reportLinkKey
  }&ver=v2`;

  const skipFetching = !(
    reportKeys?.reportLinkKey &&
    reportKeys?.reportSiteKey &&
    selectedSite &&
    selectedDevices?.length &&
    selectedColors?.length &&
    selectedProviders?.length
  );

  const { data: linkAvailabilityData } = useFetch<FetchPanelData>(
    linkAvailabilityURL,
    { headers },
    refetch,
    skipFetching,
  );

  return (
    <StatPanelContainer
      label='Link Availability'
      description='This panel shows the Link Availability'
    >
      <Table
        headers={linkAvailabilityData?.columns || []}
        data={linkAvailabilityData?.data || []}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
      />
    </StatPanelContainer>
  );
};

export default LinkAvailability;
