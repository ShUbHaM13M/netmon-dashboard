import { useEffect, useState } from 'react';
import { MultiSelectDropdown, StatPanelContainer, Table } from '../../../components';
import { useUserContext } from '../../../context/UserContext';
import { API_URL, FetchData, FetchPanelData, headers } from '../../../global';
import SingleSelectDropdown, {
  IDropdownOption,
} from '../../../components/dropdown/SingleSelectDropdown';
import useFetch from '../../../hooks/useFetch';
import Like from '../../../assets/images/like.svg';

const deviceTypeOptions: IDropdownOption[] = [
  {
    Text: 'vmanage',
    Value: 'vmanage',
  },
  {
    Text: 'vbond',
    Value: 'vbond',
  },
  {
    Text: 'vsmart',
    Value: 'vsmart',
  },
  {
    Text: 'vedge',
    Value: 'vedge',
  },
];

const controlStatusOptions: IDropdownOption[] = [
  {
    Text: 'Control up',
    Value: 'Control up',
  },
  {
    Text: 'Control down',
    Value: 'Control down',
  },
  {
    Text: 'Partial',
    Value: 'Partial',
  },
];

const bfdStatusOptions: IDropdownOption[] = [
  {
    Text: 'full',
    Value: 'full',
  },
  {
    Text: 'partial',
    Value: 'partial',
  },
  {
    Text: 'unavailable',
    Value: 'unavailable',
  },
  {
    Text: 'na',
    Value: 'na',
  },
];

const siteOptionURL = `${API_URL}/vars?name=site&filter-name=site-name&filter-value=All`;

const DeviceDetails = () => {
  const { refetch } = useUserContext();

  const { data: siteOptions } = useFetch<FetchData[]>(siteOptionURL, {
    headers,
  });

  const [selectedSite, setSelectedSite] = useState<FetchData>();

  useEffect(() => {
    siteOptions && setSelectedSite(siteOptions[0]);
  }, [siteOptions]);

  const deviceOptionURL = `${API_URL}/vars?name=device&filter-name=site-name&filter-value=${selectedSite?.Text}`;
  const { data: deviceOptions } = useFetch<FetchData[]>(deviceOptionURL, { headers });

  const [valuesChanged, setValuesChanged] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<FetchData[]>();
  const [selectedDeviceType, setSelectedDeviceType] = useState<FetchData[]>([]);
  const [selectedControlStatus, setSelectedControlStatus] = useState<FetchData[]>();
  const [selectedBFDStatus, setSelectedBFDStatus] = useState<FetchData[]>();

  const deviceDetailsURL = `${API_URL}/panel/device/details?ver=v2`;

  const { data: deviceDetailsData } = useFetch<FetchPanelData>(
    deviceDetailsURL,
    {
      method: 'POST',
      body: JSON.stringify({
        'device-types': selectedDeviceType.map((deviceType) => deviceType.Value),
        hostnames: selectedDevice?.map((device) => device.Value),
        'control-stats': selectedControlStatus?.map((controlStat) => controlStat.Value),
        'bfd-stats': selectedBFDStatus?.map((bfdStat) => bfdStat.Value),
      }),
      headers,
    },
    refetch || valuesChanged,
    !selectedDevice?.length,
  );

  useEffect(() => {
    setValuesChanged((prev) => !prev);
  }, [selectedDevice, selectedBFDStatus, selectedControlStatus, selectedSite, selectedDeviceType]);

  return (
    <div className='flex flex-col pb-6 gap-6 h-full text-icon-white'>
      <div className='flex flex-col md:flex-row gap-4 sm:gap-6 z-10 text-icon-white flex-wrap'>
        <div className='flex gap-6 flex-row'>
          <div className='w-2/4 sm:w-[140px]'>
            <SingleSelectDropdown
              label='Site'
              options={siteOptions || []}
              onValueChange={(data) => setSelectedSite(data)}
            />
          </div>
          <div className='w-2/4 sm:w-[240px]'>
            <MultiSelectDropdown
              label='Device'
              options={deviceOptions || []}
              onValueChange={(data) => setSelectedDevice(data)}
            />
          </div>
        </div>
        <div className='flex gap-6 flex-row'>
          <div className='w-2/4 sm:w-[140px]'>
            <MultiSelectDropdown
              label='Device Type'
              options={deviceTypeOptions || []}
              onValueChange={(data) => setSelectedDeviceType(data)}
            />
          </div>
          <div className='w-2/4 sm:w-[240px]'>
            <MultiSelectDropdown
              label='Control Status'
              options={controlStatusOptions || []}
              onValueChange={(data) => setSelectedControlStatus(data)}
            />
          </div>
        </div>
        <div className='w-full sm:w-[140px]'>
          <MultiSelectDropdown
            label='BFD Status'
            options={bfdStatusOptions || []}
            onValueChange={(data) => setSelectedBFDStatus(data)}
          />
        </div>
      </div>
      <div className='h-[510px]'>
        <StatPanelContainer label='Device Details' description='Showing Device Details'>
          <Table
            headers={deviceDetailsData?.columns || []}
            data={deviceDetailsData?.data || []}
            emptyStateData={{
              icon: Like,
              title: 'No Device Details Found',
              subtitle: 'No device details found',
            }}
          />
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default DeviceDetails;
