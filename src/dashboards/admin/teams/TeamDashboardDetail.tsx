import { StatPanelContainer, Table } from '../../../components';
import ActiveStatusFormatter from '../../../components/formatter/ActiveStateFormatter';
import Like from '../../../assets/images/like.svg';
import { API_URL, Criticality, FetchPanelData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { useCallback, useContext, useEffect, useState } from 'react';
import ActionFormatter from '../../../components/formatter/ActionFormatter';
import { TeamDetailContext } from './TeamDetail';

const dashboardDataURL = `${API_URL}/admin/dashboards?ver=v2`;

const TeamDashboardDetail = () => {
  const { teamData, setSelectedEntity, setMessages } = useContext(TeamDetailContext);
  const teamId = teamData?.data[0].id;
  const removeDescription = `Are you sure you want to remove this dashboard from the team: ${teamData?.data[0].name}`;

  const { data: dashboardData } = useFetch<FetchPanelData>(dashboardDataURL, { headers });
  const { data: dashboardsInTeam } = useFetch<FetchPanelData>(
    `${API_URL}/admin/team/dashboard?team-id=${teamId}&ver=v2`,
    { headers },
    false,
    !teamId,
  );
  const [dashboards, setDashboards] = useState(dashboardData?.data);

  const onDashboardActionClick = useCallback(
    async (action: string, dashboardId: number) => {
      let method = 'POST';
      if (action === 'Remove') {
        method = 'DELETE';
      }
      const res = await fetch(`${API_URL}/admin/team/dashboard?ver=v2`, {
        method,
        body: JSON.stringify({
          team_id: teamId,
          dashboard_id: dashboardId,
        }),
        headers,
      });

      if (!res.ok) return;

      setDashboards((prev) =>
        prev?.map((dashboard) => {
          if (dashboard.id !== dashboardId) return dashboard;
          const updatedDashboard = { ...dashboard };

          if (action === 'Add') {
            updatedDashboard['action'] = 'Remove';
            updatedDashboard['actionEvent'] = () =>
              setSelectedEntity({
                title: 'Remove Dashboard',
                description: removeDescription,
                onPrimaryActionClick: () => onDashboardActionClick('Remove', dashboardId),
              });
            return updatedDashboard;
          }

          updatedDashboard['action'] = 'Add';
          updatedDashboard['actionEvent'] = () => onDashboardActionClick('Add', dashboardId);
          return updatedDashboard;
        }),
      );

      setMessages((prev) => [
        ...prev,
        {
          id: `Dashboard-${action}-${dashboardId}`,
          description:
            action === 'Add'
              ? `Added Dashboard: ${dashboardId} to the team`
              : `Removed Dashboard: ${dashboardId} from the team`,
          criticality: action === 'Add' ? Criticality.SAFE : Criticality.CRITICAL,
        },
      ]);
    },
    [removeDescription, setMessages, setSelectedEntity, teamId],
  );

  useEffect(() => {
    if (!dashboardData || !dashboardsInTeam) return;
    setDashboards(
      dashboardData.data.map((data) => {
        if (dashboardsInTeam.data.find((dashboard) => data.id === dashboard.id))
          data['action'] = 'Remove';
        else data['action'] = 'Add';

        if (data['action'] === 'Remove')
          data['actionEvent'] = () => {
            setSelectedEntity({
              title: 'Remove Dashboard',
              description: removeDescription,
              onPrimaryActionClick: () => onDashboardActionClick(data['action'], data.id),
            });
          };
        else data['actionEvent'] = () => onDashboardActionClick('Add', data.id);
        return data;
      }),
    );
  }, [
    dashboardData,
    dashboardsInTeam,
    onDashboardActionClick,
    removeDescription,
    setSelectedEntity,
  ]);

  return (
    <div className='h-[410px] w-full lg:w-2/4'>
      <StatPanelContainer label='Dashboard' description='List of all the dashboards.'>
        <Table
          headers={[
            ...(dashboardData?.columns || []),
            { title: 'Action', data_type: 'action', property: 'action', sortable: false },
          ]}
          data={dashboards || []}
          emptyStateData={{
            icon: Like,
            title: 'No Dashboards Found',
            subtitle: 'No dashboards found.',
          }}
          columnFormatters={{ active: ActiveStatusFormatter, action: ActionFormatter }}
        />
      </StatPanelContainer>
    </div>
  );
};

export default TeamDashboardDetail;
