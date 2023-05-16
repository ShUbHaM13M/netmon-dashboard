import { useEffect, useState } from 'react';
import { API_URL, headers, FetchData } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { SingleSelectDropdown, StatPanelContainer, Table } from '../../../components';
import Like from '../../../assets/images/like.svg';

const siteOptionURL = `${API_URL}/vars?name=site&filter-name=site-name&filter-value=All`;
const deviceOptionURL = `${API_URL}/vars?name=device&filter-name=site-name&filter-value=All`;

const RealtimeTunnelStats = () => {
  const { data: siteOptions } = useFetch<FetchData[]>(siteOptionURL, {
    headers,
  });

  const { data: deviceOptions } = useFetch<FetchData[]>(deviceOptionURL, { headers });

  const [selectedSite, setSelectedSite] = useState<FetchData>();
  const [selectedDevice, setSelectedDevice] = useState<FetchData>();

  useEffect(() => {
    if (siteOptions) setSelectedSite(siteOptions[0]);
  }, [siteOptions]);

  useEffect(() => {
    if (deviceOptions) setSelectedSite(deviceOptions[0]);
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
            headers={[]}
            data={[]}
            emptyStateData={{
              icon: Like,
              title: 'All good here',
              subtitle: 'No link down',
            }}
          />
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default RealtimeTunnelStats;
