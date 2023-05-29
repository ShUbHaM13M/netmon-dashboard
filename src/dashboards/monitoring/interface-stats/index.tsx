import { useEffect, useState } from 'react';
import { SingleSelectDropdown, StatPanelContainer, Table } from '../../../components';
import { API_URL, headers, FetchData, FetchPanelData } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { getInterfaceStatsSummary } from './util';
import { useUserContext } from '../../../context/UserContext';
import Like from '../../../assets/images/like.svg';

const siteOptionURL = `${API_URL}/vars?name=site&filter-name=site-name&filter-value=All`;

const InterfaceStats = () => {
  const { refetch, timestamp } = useUserContext();

  const [selectedSite, setSelectedSite] = useState<FetchData>();
  const [selectedDevice, setSelectedDevice] = useState<FetchData>();
  const [selectedColor, setSelectedColor] = useState<FetchData>();
  const [selectedPercentile, setSelectedPercentile] = useState<FetchData>();

  const { data: siteOptions } = useFetch<FetchData[]>(siteOptionURL, {
    headers,
  });

  const deviceOptionURL = `${API_URL}/vars?name=device&filter-name=site-name&filter-value=${
    selectedSite?.Text || 'All'
  }`;
  const { data: deviceOptions } = useFetch<FetchData[]>(deviceOptionURL, { headers });

  const colorOptionURL = `${API_URL}/vars?name=color&filter-name=hostname&filter-value=${
    selectedDevice?.Text || 'All'
  }`;
  const { data: colorOptions } = useFetch<FetchData[]>(colorOptionURL, { headers });

  const percentileOptionURL = `${API_URL}/vars?name=config&filter-value=percentile`;
  const { data: percentileOptions } = useFetch<FetchData[]>(percentileOptionURL, { headers });

  const interfaceSummaryURL = `${API_URL}/interface/stats/summary?device_id=${
    selectedDevice?.Text
  }&color=${
    selectedColor?.Text
  }&from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}&start_hrs=00:00:00&end_hrs=23:59:59&percentile=${
    selectedPercentile?.Value || 95
  }&holidays=&ver=v2`;
  const { data: interfaceStatsData, loading } = useFetch<FetchPanelData>(
    interfaceSummaryURL,
    { headers },
    refetch,
    !(selectedSite && selectedDevice && selectedColor && selectedPercentile),
  );

  useEffect(() => {
    if (siteOptions) setSelectedSite(siteOptions[0]);
  }, [siteOptions]);

  useEffect(() => {
    if (deviceOptions) setSelectedDevice(deviceOptions[0]);
  }, [deviceOptions]);

  useEffect(() => {
    if (colorOptions) setSelectedColor(colorOptions[0]);
  }, [colorOptions]);

  useEffect(() => {
    if (percentileOptions) setSelectedPercentile(percentileOptions[0]);
  }, [percentileOptions]);

  const { interfaceSummaryData, rxUtilData, txUtilData } =
    getInterfaceStatsSummary(interfaceStatsData);

  return (
    <div className='flex flex-col pb-6'>
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 z-10'>
        <div className='flex gap-6'>
          <div className='w-2/4 sm:w-[140px]'>
            <SingleSelectDropdown
              label='Site'
              options={siteOptions || []}
              onValueChange={(data) => setSelectedSite(data)}
              showSearchbar
            />
          </div>
          <div className='w-2/4 sm:w-[140px]'>
            <SingleSelectDropdown
              label='Device'
              options={deviceOptions || []}
              onValueChange={(data) => setSelectedDevice(data)}
            />
          </div>
        </div>
        <div className='flex gap-6 mb-6'>
          <div className='w-2/4 sm:w-[140px]'>
            <SingleSelectDropdown
              label='Color'
              options={colorOptions || []}
              onValueChange={(data) => setSelectedColor(data)}
              showSearchbar
            />
          </div>
          <div className='w-2/4 sm:w-[140px]'>
            <SingleSelectDropdown
              label='Percentile'
              options={percentileOptions || []}
              onValueChange={(data) => setSelectedPercentile(data)}
              showSearchbar
            />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pb-6'>
        <div className='h-[200px]'>
          <StatPanelContainer
            label={`${selectedSite?.Text} Interface Summary`}
            description={`Shows the summary of ${selectedSite?.Text}`}
            loading={loading}
          >
            <Table
              headers={interfaceSummaryData?.columns || []}
              data={interfaceSummaryData?.data || []}
              emptyStateData={{
                icon: Like,
                title: 'All good here',
                subtitle: 'No link down',
              }}
            />
          </StatPanelContainer>
        </div>
        <div className='h-[200px]'>
          <StatPanelContainer
            label={`RX Utilization (${selectedPercentile?.Value} Percentile)`}
            description={`Shows the RX Utilization of ${selectedSite?.Text}`}
            loading={loading}
          >
            <Table
              headers={rxUtilData?.columns || []}
              data={rxUtilData?.data || []}
              emptyStateData={{
                icon: Like,
                title: 'All good here',
                subtitle: 'No link down',
              }}
            />
          </StatPanelContainer>
        </div>
        <div className='h-[200px]'>
          <StatPanelContainer
            label={`TX Utilization (${selectedPercentile?.Value} Percentile)`}
            description={`Shows the TX Utilization of ${selectedSite?.Text}`}
            loading={loading}
          >
            <Table
              headers={txUtilData?.columns || []}
              data={txUtilData?.data || []}
              emptyStateData={{
                icon: Like,
                title: 'All good here',
                subtitle: 'No link down',
              }}
            />
          </StatPanelContainer>
        </div>
      </div>
      <div className='flex flex-col gap-4 sm:gap-6'>
        <StatPanelContainer
          description='Showing the interface stats RX'
          label='Interface Stats (RX)'
        >
          <div className='h-[410px]'></div>
        </StatPanelContainer>
        <StatPanelContainer
          description='Showing the interface stats TX'
          label='Interface Stats (TX)'
        >
          <div className='h-[410px]'></div>
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default InterfaceStats;
