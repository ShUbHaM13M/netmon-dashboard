import { StatPanelContainer, Table } from '../../../components';
import ActiveStatusFormatter from '../../../components/formatter/ActiveStateFormatter';
import Like from '../../../assets/images/like.svg';
import { API_URL, Criticality, FetchPanelData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { useCallback, useContext, useEffect, useState } from 'react';
import ActionFormatter from '../../../components/formatter/ActionFormatter';
import { TeamDetailContext } from './TeamDetail';

const userDataURL = `${API_URL}/admin/users?ver=v2`;

const TeamUserDetail = () => {
  const { teamData, setSelectedEntity, setMessages } = useContext(TeamDetailContext);
  const teamId = teamData?.data[0].id;
  const removeDescription = `Are you sure you want to remove this user from the team: ${teamData?.data[0].name}`;

  const { data: userData } = useFetch<FetchPanelData>(userDataURL, { headers });
  const { data: usersInTeam } = useFetch<FetchPanelData>(
    `${API_URL}/admin/team/user?team-id=${teamId}&ver=v2`,
    { headers },
    false,
    !teamId,
  );
  const [users, setUsers] = useState(userData?.data);

  const onUserActionClick = useCallback(
    async (action: string, userId: number) => {
      let method = 'POST';
      if (action === 'Remove') {
        method = 'DELETE';
      }
      const res = await fetch(`${API_URL}/admin/team/user?ver=v2`, {
        method,
        body: JSON.stringify({
          team_id: teamId,
          user_id: userId,
        }),
        headers,
      });

      if (!res.ok) return;

      setUsers((prev) =>
        prev?.map((user) => {
          if (user.user_id !== userId) return user;
          const updatedUser = { ...user };

          if (action === 'Add') {
            updatedUser['action'] = 'Remove';
            updatedUser['actionEvent'] = () =>
              setSelectedEntity({
                title: 'Remove User',
                description: removeDescription,
                onPrimaryActionClick: () => onUserActionClick('Remove', userId),
              });
            return updatedUser;
          }

          updatedUser['action'] = 'Add';
          updatedUser['actionEvent'] = () => onUserActionClick('Add', userId);
          return updatedUser;
        }),
      );
      setMessages((prev) => [
        ...prev,
        {
          id: `User-${action}-${userId}`,
          description:
            action === 'Add'
              ? `Added User: ${userId} to the team`
              : `Removed User: ${userId} from the team`,
          criticality: action === 'Add' ? Criticality.SAFE : Criticality.CRITICAL,
        },
      ]);
    },
    [removeDescription, setMessages, setSelectedEntity, teamId],
  );

  useEffect(() => {
    if (!userData || !usersInTeam) return;
    setUsers(
      userData.data.map((data) => {
        if (usersInTeam.data.find((user) => data.user_id === user.user_id))
          data['action'] = 'Remove';
        else data['action'] = 'Add';

        if (data['action'] === 'Remove')
          data['actionEvent'] = () => {
            setSelectedEntity({
              title: 'Remove User',
              description: removeDescription,
              onPrimaryActionClick: () => onUserActionClick(data['action'], data.user_id),
            });
          };
        else data['actionEvent'] = () => onUserActionClick('Add', data.user_id);
        return data;
      }),
    );
  }, [userData, usersInTeam, onUserActionClick, removeDescription, setSelectedEntity]);

  return (
    <div className='h-[410px] w-full lg:w-2/4'>
      <StatPanelContainer label='User' description='List of all the users.'>
        <Table
          headers={[
            ...(userData?.columns || []),
            { title: 'Action', data_type: 'action', property: 'action', sortable: false },
          ]}
          data={users || []}
          emptyStateData={{
            icon: Like,
            title: 'No Users Found',
            subtitle: 'No users found.',
          }}
          columnFormatters={{ active: ActiveStatusFormatter, action: ActionFormatter }}
        />
      </StatPanelContainer>
    </div>
  );
};

export default TeamUserDetail;
