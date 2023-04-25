import { useEffect, useState } from 'react';
import { MultiSelectDropdown, SingleSelectDropdown, StatPanelContainer } from '../../../components';
import { API_URL, FetchData, dateFormatter, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { useUserContext } from '../../../context/UserContext';

const ApplicationUsageByApp = () => {
  const { timestamp } = useUserContext();
  const [selectedSite, setSelectedSite] = useState<FetchData>();
  const [selectedApplications, setSelectedApplications] = useState<FetchData[]>();

  const siteOptionURL = `${API_URL}/vars?name=site&filter-name=site-name&filter-value=All`;
  const { data: siteOptions, loading } = useFetch<FetchData[]>(siteOptionURL, { headers });

  const appOptionURL = `${API_URL}/vars?name=app-name&filter-name=dpi&from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}`;
  const { data: appOptions } = useFetch<FetchData[]>(appOptionURL, { headers });

  useEffect(() => {
    if (siteOptions) setSelectedSite(siteOptions[0]);
  }, [siteOptions]);

  if (loading && !siteOptions) return <div>Loading...</div>;

  return (
    <div className='flex flex-col pb-6 gap-6'>
      <div className='flex gap-4 sm:gap-6 z-10'>
        <div className='w-2/4 sm:w-[140px]'>
          <SingleSelectDropdown
            label='Active'
            options={siteOptions || []}
            onValueChange={(data) => setSelectedSite(data)}
          />
        </div>
        <div className='w-2/4 sm:w-[240px]'>
          <MultiSelectDropdown
            label='App'
            options={appOptions || []}
            onValueChange={(data) => setSelectedApplications(data)}
          />
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <StatPanelContainer
          label={`${selectedSite?.Text} Application Usage from ${dateFormatter.format(
            timestamp.from,
          )} - ${dateFormatter.format(timestamp.to)}`}
          description='This shows the Usage of selected Application'
        >
          <div className='h-[410px]'></div>
        </StatPanelContainer>
        <StatPanelContainer
          label={`${selectedSite?.Text} RX Interface Usage from ${dateFormatter.format(
            timestamp.from,
          )} - ${dateFormatter.format(timestamp.to)}`}
          description='This shows the RX Interface Usage of selected Application'
        >
          <div className='h-[410px]'></div>
        </StatPanelContainer>{' '}
        <StatPanelContainer
          label={`${selectedSite?.Text} TX Interface Usage from ${dateFormatter.format(
            timestamp.from,
          )} - ${dateFormatter.format(timestamp.to)}`}
          description='This shows the TX Interface Usage of selected Application'
        >
          <div className='h-[410px]'></div>
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default ApplicationUsageByApp;
