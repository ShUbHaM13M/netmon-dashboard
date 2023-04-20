import { API_URL, FetchPanelData, headers } from '../../global';
import Table from '../table/Table';
import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import useFetch from '../../hooks/useFetch';
import { useUserContext } from '../../context/UserContext';

const DeviceDownDetailPanel = () => {
  const { refetch } = useUserContext();
  const deviceDownDetailURL = `${API_URL}/panel/device/unreachable/details?ver=v2`;

  const { data: deviceDownDetailData } = useFetch<FetchPanelData>(
    deviceDownDetailURL,
    {
      headers,
    },
    refetch,
  );

  if (!deviceDownDetailData) return null;

  let criticalWord = '';
  const status: { [key: string]: string } = {};
  deviceDownDetailData.status.map((s) => {
    if (s.criticality === 'CRITICAL') criticalWord = s.value;
    status[s.value] = s.criticality;
    return status;
  });

  return (
    <StatPanelContainer
      description='Data about device down details'
      label={deviceDownDetailData.title}
      showError={!!deviceDownDetailData.data.find((d) => d.status === criticalWord)}
    >
      <div className='mt-4 sm:mt-[26px]'></div>
      <Table
        data={deviceDownDetailData.data}
        headers={deviceDownDetailData.columns}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
        showStatusChip
        status={status}
      ></Table>
    </StatPanelContainer>
  );
};

export default DeviceDownDetailPanel;
