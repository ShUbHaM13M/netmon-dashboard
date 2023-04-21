import Table from '../table/Table';
import Like from '../../assets/images/like.svg';
import StatPanelContainer from './StatPanelContainer';
import { API_URL, FetchPanelData, headers } from '../../global';
import useFetch from '../../hooks/useFetch';
import { useUserContext } from '../../context/UserContext';

const LinkDownDetailsPanel = () => {
  const { refetch } = useUserContext();
  const linkDownDetailURl = `${API_URL}/panel/link/down/service-window?start-hrs=09:00:00&end-hrs=21:00:00&tz-offset=%2B5:30&ver=v2`;

  const { data: linkDownDetailData } = useFetch<FetchPanelData>(
    linkDownDetailURl,
    {
      headers,
    },
    refetch,
  );

  if (!linkDownDetailData) return null;

  let criticalWord = '';
  const status: { [key: string]: string } = {};
  linkDownDetailData.status.map((s) => {
    if (s.criticality === 'CRITICAL') criticalWord = s.value;
    status[s.value] = s.criticality;
    return status;
  });

  return (
    <StatPanelContainer
      subtitle={linkDownDetailData.sub_title}
      description='Data about link down details'
      label={linkDownDetailData.title}
      showError={!!linkDownDetailData.data.find((d) => d.status === criticalWord)}
    >
      <Table
        data={linkDownDetailData.data}
        headers={linkDownDetailData.columns}
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

export default LinkDownDetailsPanel;
