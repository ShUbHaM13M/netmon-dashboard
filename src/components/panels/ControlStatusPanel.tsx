import StatPanelContainer from './StatPanelContainer';
import { API_URL, FetchPanelData, headers, stringToCriticality } from '../../global';
import useFetch from '../../hooks/useFetch';
import Status from './Status';
import { useUserContext } from '../../context/UserContext';

const controlStatusURL = `${API_URL}/panel/control/summary?ver=v2`;

const ControlStatusPanel = () => {
  const { refetch } = useUserContext();
  const { data: controlStatusData, loading } = useFetch<FetchPanelData>(
    controlStatusURL,
    {
      headers,
    },
    refetch,
  );

  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Control Status'
      showError={!!controlStatusData?.data.find((d) => d.name === 'Control down')?.count}
      loading={loading}
    >
      <div className='min-h-[250px] md:min-h-[105px] flex flex-col sm:flex-row w-full pt-4 sm:pt-6 px-4 py-4 gap-3 sm:gap-4'>
        {controlStatusData?.data.map((d) => {
          return (
            <div className='flex-1' key={d.name}>
              <Status
                label={d.name}
                value={d.count}
                criticality={stringToCriticality(
                  controlStatusData.status.find((status) => status.value === d.name)?.criticality,
                )}
              />
            </div>
          );
        })}
      </div>
    </StatPanelContainer>
  );
};

export default ControlStatusPanel;
