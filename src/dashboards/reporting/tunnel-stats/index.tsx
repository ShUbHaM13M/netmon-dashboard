import { useEffect, useState } from 'react';
import { MultiSelectDropdown, SingleSelectDropdown, StatPanelContainer } from '../../../components';
import { useUserContext } from '../../../context/UserContext';
import { API_URL, FetchData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { IDropdownOption } from '../../../components/dropdown/SingleSelectDropdown';

const sourceHostURL = `${API_URL}/vars?name=device&filter-name=site-name&filter-value=All`;

const TunnelStats = () => {
  const { timestamp } = useUserContext();

  const { data: sourceHostOptions } = useFetch<FetchData[]>(sourceHostURL, {
    headers,
  });

  const [selectedHost, setSelectedHost] = useState<IDropdownOption>();
  const [_selectedTunnelLatencies, setSelectedTunnelLatencices] = useState<IDropdownOption[]>([]);
  const [_selectedTunnelLosses, setSelectedTunnelLosses] = useState<IDropdownOption[]>([]);
  const [_selectedTunnelJitters, setSelectedTunnelJitters] = useState<IDropdownOption[]>([]);

  useEffect(() => {
    if (sourceHostOptions) setSelectedHost(sourceHostOptions[0]);
  }, [sourceHostOptions]);

  const tunnelLatencyURL = `${API_URL}/vars?name=tunnel-by-latency&filter-name=source&filter-value=${
    selectedHost?.Value
  }&from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}`;
  const { data: tunnelLatencyOptions } = useFetch<FetchData[]>(
    tunnelLatencyURL,
    { headers },
    false,
    !selectedHost,
  );

  const tunnelLossURL = `${API_URL}/vars?name=tunnel-by-loss&filter-name=source&filter-value=${
    selectedHost?.Value
  }&from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}`;
  const { data: tunnelLossOptions } = useFetch<FetchData[]>(
    tunnelLossURL,
    { headers },
    false,
    !selectedHost,
  );

  const tunnelJitterURL = `${API_URL}/vars?name=tunnel-by-jitter&filter-name=source&filter-value=${
    selectedHost?.Value
  }&from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}`;
  const { data: tunnelJitterOptions } = useFetch<FetchData[]>(
    tunnelJitterURL,
    { headers },
    false,
    !selectedHost,
  );

  return (
    <div className='flex flex-col pb-6 gap-6'>
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 z-10 text-icon-white flex-wrap'>
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
          <div className='w-full sm:w-[240px]'>
            <SingleSelectDropdown
              label='Source Host'
              options={sourceHostOptions || []}
              onValueChange={(value) => setSelectedHost(value)}
            />
          </div>
          <div className='w-full sm:w-[240px]'>
            <MultiSelectDropdown
              label='Tunnels By Latency'
              options={tunnelLatencyOptions || []}
              onValueChange={(value) => setSelectedTunnelLatencices(value)}
            />
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
          <div className='w-full sm:w-[240px]'>
            <MultiSelectDropdown
              label='Tunnels By Loss'
              options={tunnelLossOptions || []}
              onValueChange={(value) => setSelectedTunnelLosses(value)}
            />
          </div>
          <div className='w-full sm:w-[240px]'>
            <MultiSelectDropdown
              label='Tunnels By Jitter'
              options={tunnelJitterOptions || []}
              onValueChange={(value) => setSelectedTunnelJitters(value)}
            />
          </div>
        </div>
      </div>

      <div className='h-[410px]'>
        <StatPanelContainer
          label='Tunnel Latency'
          description='This panel shows the Tunnel Latency of the selected Host'
        >
          <div></div>
        </StatPanelContainer>
      </div>

      <div className='h-[410px]'>
        <StatPanelContainer
          label='Tunnel Loss'
          description='This panel shows the Tunnel Loss of the selected Host'
        >
          <div></div>
        </StatPanelContainer>
      </div>

      <div className='h-[410px]'>
        <StatPanelContainer
          label='Tunnel Jitter'
          description='This panel shows the Tunnel Jitter of the selected Host'
        >
          <div></div>
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default TunnelStats;
