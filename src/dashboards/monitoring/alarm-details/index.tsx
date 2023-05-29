import { useEffect, useState } from 'react';
import { MultiSelectDropdown, StatPanelContainer, Table } from '../../../components';
import { IMultiSelectDropdownOption } from '../../../components/dropdown/MultiSelectDropdown';
import { API_URL, FetchData, FetchPanelData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import useDebouce from '../../../hooks/useDebounce';
import { useUserContext } from '../../../context/UserContext';
import Like from '../../../assets/images/like.svg';

const activeOptions: IMultiSelectDropdownOption[] = [
  { Text: 'True', Value: 'true' },
  { Text: 'False', Value: 'false' },
];

const severityOptions: IMultiSelectDropdownOption[] = [
  { Text: 'Critical', Value: 'Critical' },
  { Text: 'Major', Value: 'Major' },
  { Text: 'Medium', Value: 'Medium' },
  { Text: 'Minor', Value: 'Minor' },
];

const AlarmDetails = () => {
  const { refetch, timestamp } = useUserContext();

  const [valuesChanged, setValuesChanged] = useState(false);
  const [selectedActive, setSelectedActive] = useState<FetchData[]>();
  const [selectedSeverity, setSelectedSeverity] = useState<FetchData[]>();
  const [selectedName, setSelectedName] = useState<FetchData[]>();
  const [impactedEntities, setImpactedEntities] = useState('');
  const debouncedImpactedEntities = useDebouce(impactedEntities);

  const nameOptionURL = `${API_URL}/vars?name=alarm-name&from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}`;
  const { data: nameOptions } = useFetch<FetchData[]>(nameOptionURL, { headers });

  const alarmStatsURL = `${API_URL}/panel/alarm/stats?from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}&ver=v2`;

  const { data: alarmStatsData, loading } = useFetch<FetchPanelData>(
    alarmStatsURL,
    {
      method: 'POST',
      body: JSON.stringify({
        states: selectedActive?.map((active) => active.Value),
        severities: selectedSeverity?.map((severity) => severity.Value),
        'alarm-names': selectedName?.map((name) => name.Text),
        'impacted-entity': debouncedImpactedEntities,
      }),
      headers,
    },
    refetch || valuesChanged,
    !(selectedActive && selectedName && selectedSeverity && debouncedImpactedEntities),
  );

  useEffect(() => {
    setValuesChanged((prev) => !prev);
  }, [selectedActive, selectedName, selectedSeverity, debouncedImpactedEntities]);

  return (
    <div className='flex flex-col pb-6 gap-6 h-full'>
      <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 z-10 text-icon-white'>
        <div className='flex gap-6'>
          <div className='w-2/4 sm:w-[140px]'>
            <MultiSelectDropdown
              label='Active'
              options={activeOptions}
              defaultValue={activeOptions[0]}
              onValueChange={(data) => setSelectedActive(data)}
            />
          </div>
          <div className='w-2/4 sm:w-[140px]'>
            <MultiSelectDropdown
              label='Severity'
              options={severityOptions}
              defaultValue={severityOptions[0]}
              onValueChange={(data) => setSelectedSeverity(data)}
            />
          </div>
        </div>
        <div className='flex gap-6'>
          <div className='w-2/4 md:w-[340px]'>
            <MultiSelectDropdown
              label='Name'
              options={nameOptions || []}
              onValueChange={(data) => setSelectedName(data)}
            />
          </div>
          <div className='w-2/4 sm:w-[240px]'>
            <label
              htmlFor='impactedEntitiesInput'
              className='caps-1 text-icon-dark-grey whitespace-nowrap'
            >
              Impacted Entities
            </label>
            <input
              value={impactedEntities}
              onChange={(e) => setImpactedEntities(e.currentTarget.value)}
              className='mt-1.5 w-full bg-card-light rounded-sm py-1.5 pl-2 hover:bg-[#3E404D] text-sm text-icon-grey outline-none'
              id='impactedEntitiesInput'
              placeholder='Enter variable value'
            />
          </div>
        </div>
      </div>
      <div className='h-[410px]'>
        <StatPanelContainer
          label={`Alarm Details from ${timestamp.from.toLocaleString()} to ${timestamp.to.toLocaleString()}`}
          description='Showing Alarm Details'
          loading={loading}
        >
          <Table
            headers={alarmStatsData?.columns || []}
            data={alarmStatsData?.data || []}
            emptyStateData={{
              icon: Like,
              title: 'All good here',
              subtitle: 'No link down',
            }}
          />
        </StatPanelContainer>
      </div>{' '}
    </div>
  );
};

export default AlarmDetails;
