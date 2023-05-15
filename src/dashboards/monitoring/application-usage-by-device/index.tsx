import { useEffect, useState } from 'react';
import { ApplicationGraph, SingleSelectDropdown, StatPanelContainer } from '../../../components';
import { useUserContext } from '../../../context/UserContext';
import { API_URL, FetchData, FetchPanelData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';

function convertValue(valueInMB: number): string {
  const KB = valueInMB * 1024;
  const GB = valueInMB / 1000;

  if (GB >= 1) {
    return `${GB.toFixed(2)} GB/s`;
  } else if (valueInMB >= 1) {
    return `${GB.toFixed(2)} MB/s`;
  } else {
    return `${KB.toFixed(1)} KB/s`;
  }
}

function getWidth(unit: string, value: number, maxValue: number): number {
  if (unit === 'GB/s') return value / 10000 / maxValue;
  return value / maxValue;
}

const ApplicationUsageByDevice = () => {
  const { refetch, timestamp } = useUserContext();

  const appOptionsURL = `${API_URL}/vars?name=app-name&filter-name=dpi&from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}`;
  const { data: appOptions } = useFetch<FetchData[]>(appOptionsURL, { headers });

  const [selectedApp, setSelectedApp] = useState<FetchData>();

  useEffect(() => {
    appOptions && setSelectedApp(appOptions[0]);
  }, [appOptions]);

  const topDevicesDataURL = `${API_URL}/panel/apps/usage/device?limit=15&app-name=${
    selectedApp?.Text
  }&from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}&ver=v2`;
  const { data: topDevicesData } = useFetch<FetchPanelData>(
    topDevicesDataURL,
    { headers },
    refetch,
    !selectedApp,
  );

  const data =
    topDevicesData?.data.map((d: { [key: string]: any }) => ({
      name: d.hostname,
      value: d.usage_mbps,
      unit: 'MB/s',
    })) || [];

  return (
    <div className='flex flex-col pb-6 gap-6'>
      <div className='w-2/4 sm:w-[140px]'>
        <SingleSelectDropdown
          label='App'
          options={appOptions || []}
          onValueChange={(data) => setSelectedApp(data)}
        />
      </div>
      <div className='h-[510px]'>
        <StatPanelContainer
          label='Top Devices Using the App'
          description='This will show the top devices using the App'
        >
          <ApplicationGraph data={data} convertValue={convertValue} getWidth={getWidth} />
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default ApplicationUsageByDevice;
