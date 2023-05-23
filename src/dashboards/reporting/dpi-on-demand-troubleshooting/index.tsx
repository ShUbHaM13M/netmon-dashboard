import { useCallback, useEffect, useMemo, useState } from 'react';
import { SingleSelectDropdown, MultiSelectDropdown, StatPanelContainer } from '../../../components';
import {
  API_URL,
  headers,
  FetchData,
  dateFormatter,
  getTimeInSeconds,
  API_BASE,
  downloadDataAsCSV,
} from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { IDropdownOption } from '../../../components/dropdown/SingleSelectDropdown';
import { useUserContext } from '../../../context/UserContext';
import { useLocation } from 'wouter';

const deviceOptionsURL = `${API_URL}/vars?name=device&filter-name=site-name&filter-value=All`;

const DPIOnDemandTrobuleshooting = () => {
  const { timestamp } = useUserContext();
  const [_, setLocation] = useLocation();
  const { data: deviceOptions } = useFetch<FetchData[]>(deviceOptionsURL, { headers });

  const [selectedDevice, setSelectedDevice] = useState<IDropdownOption>();
  const [selectedApps, setSelectedApps] = useState<IDropdownOption[]>();

  const appDataURL = `${API_URL}/vars?name=app-name&filter-name=on-demand-dpi&from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}`;
  const { data: appOptions } = useFetch<FetchData[]>(appDataURL, { headers });

  const onDemandDPIReportURL = `${API_BASE}/ldap/report/ondemand-dpi?start-time=${getTimeInSeconds(
    timestamp.from.getTime(),
  )}&end-time=${getTimeInSeconds(timestamp.to.getTime())}&app=${selectedApps
    ?.map((app) => app.Value)
    .join(',')}&device=${selectedDevice?.Value}`;

  const onGenerateReportClick = useCallback(async () => {
    const res = await fetch(onDemandDPIReportURL, { headers });
    const data = await res.text();
    if (res.ok) {
      // Downloading the data as a csv file.
      downloadDataAsCSV('dpi-on-demand.csv', data);
      // Redirecting on response success.
      setLocation('/reporting/top-talkers-report');
    }
  }, [onDemandDPIReportURL, setLocation]);

  useEffect(() => {
    if (appOptions) setSelectedApps([]);
  }, [appOptions]);

  useEffect(() => {
    if (deviceOptions) setSelectedDevice(deviceOptions[0]);
  }, [deviceOptions]);

  return (
    <div className='flex flex-col pb-6 gap-6'>
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 z-10 text-icon-white'>
        <div className='w-full sm:w-[240px]'>
          <SingleSelectDropdown
            label='Device'
            options={deviceOptions || []}
            onValueChange={(value) => setSelectedDevice(value)}
          />
        </div>
        <div className='w-full sm:w-[240px]'>
          <MultiSelectDropdown
            label='App'
            options={appOptions || []}
            onValueChange={(value) => setSelectedApps(value)}
          />
        </div>
      </div>

      <div className='h-[210px] text-icon-white'>
        <StatPanelContainer
          label='Generate Report'
          description='Click on the link to generate a report'
        >
          <div className='p-4'>
            <button
              onClick={onGenerateReportClick}
              className='underline font-semibold text-brand-orange'
            >
              Click Here
            </button>
            &nbsp; to pull On-Demand DPI Stats from {dateFormatter.format(timestamp.from)} to &nbsp;
            {dateFormatter.format(timestamp.to)} &nbsp;
            <br />
            Device: {selectedDevice?.Text}
            <br />
            App: &nbsp;
            {selectedApps?.length
              ? selectedApps?.map((app) => app.Text).join(', ')
              : 'No Apps selected'}
          </div>
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default DPIOnDemandTrobuleshooting;
