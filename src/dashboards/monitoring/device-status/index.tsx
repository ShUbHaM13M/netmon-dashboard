import { useState, useEffect } from 'react';
import { API_URL, FetchData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { SingleSelectDropdown, StatPanelContainer } from '../../../components';

const siteOptionURL = `${API_URL}/vars?name=site&filter-name=site-name&filter-value=All`;

const DeviceStatus = () => {
  const { data: siteOptions } = useFetch<FetchData[]>(siteOptionURL, {
    headers,
  });

  const [selectedSite, setSelectedSite] = useState<FetchData>();
  const deviceOptionURL = `${API_URL}/vars?name=device&filter-name=site-name&filter-value=${selectedSite?.Text}`;
  const { data: deviceOptions } = useFetch<FetchData[]>(deviceOptionURL, { headers });

  const [_selectedDevice, setSelectedDevice] = useState<FetchData>();

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

      <div className='flex flex-col xl:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <div>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='h-[210px] sm:min-w-[210px]'>
                <StatPanelContainer
                  label='User CPU'
                  description='This panel shows the user CPU usage'
                >
                  <div></div>
                </StatPanelContainer>
              </div>
              <div className='h-[210px] md:flex-1'>
                <StatPanelContainer
                  label='User CPU History'
                  description='This panel shows the user CPU usage history'
                >
                  <div></div>
                </StatPanelContainer>
              </div>
            </div>
          </div>

          <div>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='h-[210px] sm:min-w-[210px]'>
                <StatPanelContainer label='CPU Load' description='This panel shows the CPU Load'>
                  <div></div>
                </StatPanelContainer>
              </div>
              <div className='h-[210px] md:flex-1'>
                <StatPanelContainer
                  label='CPU Load History'
                  description='This panel shows the user CPU Load History'
                >
                  <div></div>
                </StatPanelContainer>
              </div>
            </div>
          </div>

          <div>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='h-[210px] sm:min-w-[210px]'>
                <StatPanelContainer
                  label='Memory Utilization'
                  description='This panel shows the Memory Utilization'
                >
                  <div></div>
                </StatPanelContainer>
              </div>
              <div className='h-[210px] md:flex-1'>
                <StatPanelContainer
                  label='Memory Utilization History'
                  description='This panel shows the user Memory utlization history'
                >
                  <div></div>
                </StatPanelContainer>
              </div>
            </div>
          </div>

          <div>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='h-[210px] sm:min-w-[210px]'>
                <StatPanelContainer
                  label='Disk Utilization'
                  description='This panel shows the Disk Utilization'
                >
                  <div></div>
                </StatPanelContainer>
              </div>
              <div className='h-[210px] md:flex-1'>
                <StatPanelContainer
                  label='Disk Utilization History'
                  description='This panel shows the user Disk utilization history'
                >
                  <div></div>
                </StatPanelContainer>
              </div>
            </div>
          </div>
        </div>

        <div className='sm:min-w-[410px] h-[410px] xl:h-auto'>
          <StatPanelContainer
            label='Device Temperature'
            description='This panel shows the device temperature'
          >
            <div></div>
          </StatPanelContainer>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatus;
