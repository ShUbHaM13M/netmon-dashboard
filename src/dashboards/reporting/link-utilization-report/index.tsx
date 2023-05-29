import { useEffect, useState } from 'react';
import { SingleSelectDropdown, StatPanelContainer, Table } from '../../../components';
import { API_URL, FetchData, FetchPanelData, TableHeadType, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { IDropdownOption } from '../../../components/dropdown/SingleSelectDropdown';
import { useUserContext } from '../../../context/UserContext';
import Like from '../../../assets/images/like.svg';

const siteOptionURL = `${API_URL}/vars?name=site&filter-name=site-name&filter-value=All`;
const percentileOptionURL = `${API_URL}/vars?name=config&filter-value=percentile`;

const TX_HEADERS: TableHeadType[] = [
  { title: 'TS', property: 'time', data_type: 'epoch_ms' },
  { title: 'TxPct', property: 'tx_pct', data_type: 'float' },
  { title: 'TxPctUtil', property: 'tx_pct_util', data_type: 'float' },
  { title: 'TxAvg', property: 'tx_avg', data_type: 'float' },
  { title: 'TxMin', property: 'tx_min', data_type: 'float' },
  { title: 'TxMax', property: 'tx_max', data_type: 'float' },
  { title: 'BandwidthMbps', property: 'bandwidth_mbps', data_type: 'int' },
];

const RX_HEADERS: TableHeadType[] = [
  { title: 'TS', property: 'time', data_type: 'epoch_ms' },
  { title: 'RxPct', property: 'rx_pct', data_type: 'float' },
  { title: 'RxPctUtil', property: 'rx_pct_util', data_type: 'float' },
  { title: 'RxAvg', property: 'rx_avg', data_type: 'float' },
  { title: 'RxMin', property: 'rx_min', data_type: 'float' },
  { title: 'RxMax', property: 'rx_max', data_type: 'float' },
  { title: 'BandwidthMbps', property: 'bandwidth_mbps', data_type: 'int' },
];

const LinkUtilizationReport = () => {
  const { refetch, timestamp } = useUserContext();

  const [selectedSite, setSelectedSite] = useState<IDropdownOption>();
  const [selectedDevice, setSelectedDevice] = useState<FetchData>();
  const [selectedColor, setSelectedColor] = useState<FetchData>();
  const [selectedPercentile, setSelectedPercentile] = useState<FetchData>();

  const { data: siteOptions } = useFetch<FetchData[]>(siteOptionURL, { headers });

  const deviceOptionURL = `${API_URL}/vars?name=device&filter-name=site-name&filter-value=${selectedSite?.Text}`;
  const { data: deviceOptions } = useFetch<FetchData[]>(
    deviceOptionURL,
    { headers },
    false,
    !selectedSite,
  );

  const colorOptionURL = `${API_URL}/vars?name=color&filter-name=hostname&filter-value=${selectedDevice?.Text}`;
  const { data: colorOptions } = useFetch<FetchData[]>(
    colorOptionURL,
    { headers },
    false,
    !(selectedDevice && selectedSite),
  );

  const { data: percentileOptions } = useFetch<FetchData[]>(percentileOptionURL, { headers });

  const skipFetching = !(selectedSite && selectedDevice && selectedColor && selectedPercentile);

  const statsURL = `${API_URL}/panel/link/utilization/stats?from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}&site-id=${
    selectedSite?.Value
  }&device-id=${selectedDevice?.Value}&color=${selectedColor?.Value}&percentile=${
    selectedPercentile?.Value
  }&ver=v2`;

  const { data: statsData, loading } = useFetch<FetchPanelData>(
    statsURL,
    { headers },
    refetch,
    skipFetching,
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

  return (
    <div className='flex flex-col pb-6 gap-6'>
      <div className='flex flex-col md:flex-row gap-4 sm:gap-6 z-10 flex-wrap'>
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
          <div className='w-full sm:w-[240px]'>
            <SingleSelectDropdown
              label='Site'
              options={siteOptions || []}
              onValueChange={(data) => setSelectedSite(data)}
              showSearchbar
            />
          </div>
          <div className='w-full sm:w-[240px]'>
            <SingleSelectDropdown
              label='Device'
              options={deviceOptions || []}
              onValueChange={(data) => setSelectedDevice(data)}
            />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
          <div className='w-full sm:w-[240px]'>
            <SingleSelectDropdown
              label='Color'
              options={colorOptions || []}
              onValueChange={(data) => setSelectedColor(data)}
              showSearchbar
            />
          </div>
          <div className='w-full sm:w-[240px]'>
            <SingleSelectDropdown
              label='Percentile'
              options={percentileOptions || []}
              onValueChange={(data) => setSelectedPercentile(data)}
              showSearchbar
            />
          </div>
        </div>
      </div>

      <div className='h-[210px]'>
        <StatPanelContainer
          label={statsData?.title || 'Hourly Link Usage'}
          description='This panel shows the hourly link usage'
          subtitle={statsData?.sub_title}
        >
          <div></div>
        </StatPanelContainer>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full'>
        <div className='h-[410px]'>
          <StatPanelContainer
            label={`${selectedSite?.Text} / ${selectedColor?.Text} RX`}
            description='This panel shows the RX'
            loading={loading}
          >
            <Table
              headers={RX_HEADERS}
              data={statsData?.data || []}
              emptyStateData={{
                icon: Like,
                title: 'No Data Found',
                subtitle: '',
              }}
            />
          </StatPanelContainer>
        </div>
        <div className='h-[410px]'>
          <StatPanelContainer
            label={`${selectedSite?.Text} / ${selectedColor?.Text} TX`}
            description='This panel shows the TX'
            loading={loading}
          >
            <Table
              headers={TX_HEADERS}
              data={statsData?.data || []}
              emptyStateData={{
                icon: Like,
                title: 'No Data Found',
                subtitle: '',
              }}
            />
          </StatPanelContainer>
        </div>
      </div>
    </div>
  );
};

export default LinkUtilizationReport;
