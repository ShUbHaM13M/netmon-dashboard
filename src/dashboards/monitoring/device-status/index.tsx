import { useState, useEffect } from 'react';
import { API_URL, FetchData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { SingleSelectDropdown } from '../../../components';

const siteOptionURL = `${API_URL}/vars?name=site&filter-name=site-name&filter-value=All`;
const deviceOptionURL = `${API_URL}/vars?name=device&filter-name=site-name&filter-value=All`;

const DeviceStatus = () => {
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
    </div>
  );
};

export default DeviceStatus;
