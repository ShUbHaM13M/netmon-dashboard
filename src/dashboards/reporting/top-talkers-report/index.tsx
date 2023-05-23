import { useEffect, useMemo, useState } from 'react';
import {
  MultiSelectDropdown,
  SingleSelectDropdown,
  StatPanelContainer,
  Table,
} from '../../../components';
import { useUserContext } from '../../../context/UserContext';
import { API_URL, FetchData, FetchPanelData, dateFormatter, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { IDropdownOption } from '../../../components/dropdown/SingleSelectDropdown';
import Like from '../../../assets/images/like.svg';

const deviceOptionsURL = `${API_URL}/vars?name=device&filter-name=site-name&filter-value=All`;

const TopTalkersReport = () => {
  const { refetch, timestamp } = useUserContext();

  const { data: deviceOptions } = useFetch<FetchData[]>(deviceOptionsURL, { headers });

  const appDataURL = `${API_URL}/vars?name=app-name&filter-name=on-demand-dpi&from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}`;
  const { data: appOptions } = useFetch<FetchData[]>(appDataURL, { headers });

  const [valuesChanged, setValuesChanged] = useState(false);
  const [selectedApps, setSelectedApps] = useState<IDropdownOption[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<IDropdownOption>();

  const requestOptions = useMemo(
    () => ({
      method: 'POST',
      body: JSON.stringify({
        'app-name': selectedApps?.map((app) => app.Value).join('|'),
      }),
      headers,
    }),
    [selectedApps],
  );

  useEffect(() => {
    setValuesChanged((prev) => !prev);
  }, [selectedApps]);

  useEffect(() => {
    if (appOptions) setSelectedApps([]);
  }, [appOptions]);

  const topTalkersDataURL = `${API_URL}/panel/apps/top-talker?from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}&hostname=${
    selectedDevice?.Value
  }&ver=v2`;
  const { data: topTakersData } = useFetch<FetchPanelData>(
    topTalkersDataURL,
    requestOptions,
    refetch || valuesChanged,
    !selectedDevice,
  );

  const topTakersIPDataURL = `${API_URL}/panel/apps/top-talker/ip?from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}&hostname=${
    selectedDevice?.Value
  }&ver=v2`;
  const { data: topTalkersByIPData } = useFetch<FetchPanelData>(
    topTakersIPDataURL,
    requestOptions,
    refetch || valuesChanged,
    !selectedDevice,
  );

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

      <div className='h-[410px]'>
        <StatPanelContainer
          label={`${selectedDevice?.Text} Application Usage from ${dateFormatter.format(
            timestamp.from,
          )} to ${dateFormatter.format(timestamp.to)}`}
          description='This panel shows the Application Usage of the selected Device'
        >
          <div></div>
        </StatPanelContainer>
      </div>

      <div className='h-[410px]'>
        <StatPanelContainer
          label={`Top Talkers from ${dateFormatter.format(
            timestamp.from,
          )} to ${dateFormatter.format(timestamp.to)}`}
          description='This panel shows the Top Talkers of the selected Apps'
        >
          <Table
            headers={topTakersData?.columns || []}
            data={topTakersData?.data || []}
            emptyStateData={{
              icon: Like,
              title: 'All good here',
              subtitle: '',
            }}
          />
        </StatPanelContainer>
      </div>

      <div className='h-[410px]'>
        <StatPanelContainer
          label={`Top Talkers by IP from ${dateFormatter.format(
            timestamp.from,
          )} to ${dateFormatter.format(timestamp.to)}`}
          description='This panel shows the Top Talkers by IP of the selected Apps'
        >
          <Table
            headers={topTalkersByIPData?.columns || []}
            data={topTalkersByIPData?.data || []}
            emptyStateData={{
              icon: Like,
              title: 'All good here',
              subtitle: '',
            }}
          />
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default TopTalkersReport;
