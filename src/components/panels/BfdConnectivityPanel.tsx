import { useUserContext } from '../../context/UserContext';
import { API_URL, FetchPanelData, headers, stringToCriticality } from '../../global';
import useFetch from '../../hooks/useFetch';
import StatPanelContainer from './StatPanelContainer';
import Status from './Status';

const bfdPanelURL = `${API_URL}/panel/bfd/summary?ver=v2`;

const BfdConnectivityPanel = () => {
  const { refetch } = useUserContext();
  const { data: bfdPanelData, loading } = useFetch<FetchPanelData>(
    bfdPanelURL,
    {
      headers,
    },
    refetch,
  );

  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label={bfdPanelData?.title || 'BFD Connectivity'}
      showError={!!bfdPanelData?.data.find((d) => d.name === 'unavailable')?.count}
      loading={loading}
    >
      <div className='min-h-[250px] md:min-h-[105px] flex flex-col sm:flex-row w-full pt-4 sm:pt-6 px-4 py-4 gap-3 sm:gap-4'>
        {bfdPanelData?.data.map((d) => {
          return (
            <div className='flex-1' key={d.name}>
              <Status
                label={d.name}
                value={d.count}
                criticality={stringToCriticality(
                  bfdPanelData.status.find((status) => status.value === d.name)?.criticality,
                )}
              />
            </div>
          );
        })}
      </div>
    </StatPanelContainer>
  );
};

export default BfdConnectivityPanel;
