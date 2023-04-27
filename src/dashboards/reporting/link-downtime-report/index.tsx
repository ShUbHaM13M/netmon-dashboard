import { useEffect, useState } from 'react';
import { MultiSelectDropdown, StatPanelContainer, Table } from '../../../components';
import { useUserContext } from '../../../context/UserContext';
import { API_URL, FetchData, FetchPanelData, dateFormatter, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import Like from '../../../assets/images/like.svg';

const LinkDowntimeReport = () => {
  const { refetch, timestamp } = useUserContext();

  const [valuesChanged, setValuesChanged] = useState(false);
  const [selectedSites, setSelectedSites] = useState<FetchData[]>();
  const [selectedDevices, setSelectedDevices] = useState<FetchData[]>();
  const [selectedProviders, setSelectedProviders] = useState<FetchData[]>();

  const siteOptionsURL = `${API_URL}/vars?name=site&filter-name=site-name&filter-value=All`;
  const { data: siteOptions, loading } = useFetch<FetchData[]>(siteOptionsURL, { headers });

  const deviceOptionsURL = `${API_URL}/vars?name=device&filter-name=site-name&filter-value=${'All'}`;
  const { data: deviceOptions } = useFetch<FetchData[]>(deviceOptionsURL, { headers });

  const serviceProviderOptionsURL = `${API_URL}/vars?name=service-provider`;
  const { data: serviceProviderOptions } = useFetch<FetchData[]>(serviceProviderOptionsURL, {
    headers,
  });

  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify({
      sites: selectedDevices?.map((active) => active.Text),
      hostnames: selectedDevices?.map((device) => device.Text),
      providers: selectedProviders?.map((provider) => provider.Value),
    }),
    headers,
  };
  const skipFetching = !(
    selectedSites?.length &&
    selectedDevices?.length &&
    selectedProviders?.length
  );

  const totalLinkDowntimeURL = `${API_URL}/panel/link/down/total?from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}&ver=v2`;
  const { data: totalLinkDowntimeData } = useFetch<FetchPanelData>(
    totalLinkDowntimeURL,
    fetchOptions,
    refetch || valuesChanged,
    skipFetching,
    false,
  );

  const linkDowntimeURL = `${API_URL}/panel/link/down/details?from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}&ver=v2`;
  const { data: linkDowntimeData } = useFetch<FetchPanelData>(
    linkDowntimeURL,
    fetchOptions,
    refetch || valuesChanged,
    skipFetching,
    false,
  );

  useEffect(() => {
    setValuesChanged((prev) => !prev);
  }, [selectedDevices, selectedSites, selectedProviders]);

  if (loading && !siteOptions) return <div>Loading...</div>;

  return (
    <div className='flex flex-col pb-6 gap-6 h-full'>
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 z-10 text-icon-white'>
        <div className='w-full sm:w-[240px]'>
          <MultiSelectDropdown
            label='Site'
            options={siteOptions || []}
            onValueChange={(value) => setSelectedSites(value)}
          />
        </div>
        <div className='w-full sm:w-[240px]'>
          <MultiSelectDropdown
            label='Device'
            options={deviceOptions || []}
            onValueChange={(value) => setSelectedDevices(value)}
          />
        </div>
        <div className='w-full sm:w-[240px]'>
          <MultiSelectDropdown
            label='Service Provider'
            options={serviceProviderOptions || []}
            onValueChange={(value) => setSelectedProviders(value)}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pb-6'>
        <div className='h-[410px]'>
          <StatPanelContainer
            label='Total Link Downtime'
            description={`Showing Total Link Downtime from 
            ${dateFormatter.format(timestamp.from)} - ${dateFormatter.format(timestamp.to)}`}
          >
            <Table
              headers={totalLinkDowntimeData?.columns || []}
              data={totalLinkDowntimeData?.data || []}
              emptyStateData={{
                icon: Like,
                title: 'All good here',
                subtitle: 'No link down',
              }}
            />
          </StatPanelContainer>
        </div>
        <div className='h-[410px]'>
          <StatPanelContainer
            label='Link Downtime Details'
            description={`Showing Link Downtime Details from 
            ${dateFormatter.format(timestamp.from)} - ${dateFormatter.format(timestamp.to)}`}
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
        </div>
      </div>
    </div>
  );
};

export default LinkDowntimeReport;
