import { StatPanelContainer, Table } from '../../../components';
import { API_URL, FetchPanelData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import Like from '../../../assets/images/like.svg';
import { useLocation } from 'wouter';
import ActiveStatusFormatter from '../../../components/formatter/ActiveStateFormatter';

type UserData = {
  username: string;
  roles: [string];
};

const userDataURL = `${API_URL}/admin/users?ver=v2`;

const UsersTab = () => {
  const [_, setLocation] = useLocation();
  const { data: userData, loading } = useFetch<FetchPanelData>(userDataURL, {
    headers,
  });

  if (loading) return <div>Loading...</div>;
  if (!userData) return null;

  return (
    <div className='flex flex-col gap-4 sm:gap-6'>
      <div className='h-[410px]'>
        <StatPanelContainer label='Users' description='List of all the users'>
          <Table
            headers={userData.columns}
            data={userData.data}
            emptyStateData={{
              icon: Like,
              title: 'No Users Found',
              subtitle: 'No users were found',
            }}
            columnFormatters={{ active: ActiveStatusFormatter }}
            onRowClick={(row) => {
              setLocation(`/admin/users/${(row as UserData).username}`);
            }}
          />
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default UsersTab;
