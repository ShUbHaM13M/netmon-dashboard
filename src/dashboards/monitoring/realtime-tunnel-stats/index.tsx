import { useEffect, useState } from 'react';
import { API_URL, headers, FetchData, FetchPanelData } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { SingleSelectDropdown, StatPanelContainer, Table } from '../../../components';
import Like from '../../../assets/images/like.svg';
import { useUserContext } from '../../../context/UserContext';

const siteOptionURL = `${API_URL}/vars?name=site&filter-name=site-name&filter-value=All`;

const RealtimeTunnelStats = () => {
  const { refetch } = useUserContext();
  const { data: siteOptions } = useFetch<FetchData[]>(siteOptionURL, {
    headers,
  });

  const [selectedSite, setSelectedSite] = useState<FetchData>();

  const deviceOptionURL = `${API_URL}/vars?name=device&filter-name=site-name&filter-value=${selectedSite?.Text}`;
  const { data: deviceOptions } = useFetch<FetchData[]>(deviceOptionURL, { headers }, false);

  const [selectedDevice, setSelectedDevice] = useState<FetchData>();

  const realtimeTunnelStatsURL = `${API_URL}/tunnel/stats?device-id=${selectedDevice?.Value}&ver=v2`;
  const { data: realtimeTunnelStatsData } = useFetch<FetchPanelData>(
    realtimeTunnelStatsURL,
    {
      headers,
    },
    refetch,
    !selectedDevice,
  );

  useEffect(() => {
    if (siteOptions) {
      setSelectedSite(siteOptions[0]);
    }
  }, [siteOptions]);

  useEffect(() => {
    if (deviceOptions) {
      setSelectedDevice(deviceOptions[0]);
    }
  }, [deviceOptions]);

  return (
    <div className='flex flex-col pb-6 text-icon-white gap-4 sm:gap-6'>
      <div className='flex gap-4 sm:gap-6 z-10'>
        <div className='w-2/4 sm:w-[140px]'>
          <SingleSelectDropdown
            label='Site'
            options={siteOptions || []}
            onValueChange={(data) => setSelectedSite(data)}
          />
        </div>
        <div className='w-2/4 sm:w-[240px]'>
          <SingleSelectDropdown
            label='Device'
            options={deviceOptions || []}
            onValueChange={(data) => setSelectedDevice(data)}
          />
        </div>
      </div>
      <div className='h-[510px]'>
        <StatPanelContainer
          label='Realtime Tunnel Stats'
          description='This panel shows the Realtime tunnel stats'
        >
          <Table
            headers={realtimeTunnelStatsData?.columns || []}
            data={realtimeTunnelStatsData?.data || []}
            emptyStateData={{
              icon: Like,
              title: 'Tunnel Stats not found',
              subtitle: 'Tunnel Stats for the device was not found',
            }}
          />
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default RealtimeTunnelStats;
