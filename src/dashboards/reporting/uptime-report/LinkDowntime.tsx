import { useContext } from 'react';
import { UptimeReportContext } from '.';
import { StatPanelContainer, Table } from '../../../components';
import { useUserContext } from '../../../context/UserContext';
import Like from '../../../assets/images/like.svg';
import { API_URL, FetchPanelData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';

const LinkDowntime = () => {
  const { refetch, timestamp } = useUserContext();

  const { reportKeys, selectedColors, selectedDevices, selectedProviders, selectedSite } =
    useContext(UptimeReportContext);

  const linkDowntimeURL = `${API_URL}/panel/report/downtime/link/details?site-name=${
    selectedSite?.Value
  }&from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}&link-report-key=${
    reportKeys?.reportLinkKey
  }&ver=v2`;

  const skipFetching = !(selectedSite && reportKeys?.reportLinkKey);

  const { data: linkDowntimeData, loading } = useFetch<FetchPanelData>(
    linkDowntimeURL,
    {
      method: 'POST',
      body: JSON.stringify({
        hostnames: selectedDevices?.map((device) => device.Text),
        colors: selectedColors?.map((color) => color.Value),
        providers: selectedProviders?.map((provider) => provider.Value),
      }),
      headers,
    },
    refetch,
    skipFetching,
  );

  return (
    <StatPanelContainer
      label='Link Downtime'
      description='This panel shows the Link Downtime'
      loading={loading}
    >
      <Table
        headers={linkDowntimeData?.columns || []}
        data={linkDowntimeData?.data || []}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
      />
    </StatPanelContainer>
  );
};
export default LinkDowntime;
