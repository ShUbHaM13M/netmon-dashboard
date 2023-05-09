import { StatPanelContainer, Table } from '../../../components';
// import { API_URL, headers } from '../../../global';
// import useFetch from '../../../hooks/useFetch';
import Like from '../../../assets/images/like.svg';

// const userDataURL = `${API_URL}/admin/users`;
const userTabHeaders = [
  { title: 'Username', data_type: 'string', property: 'username' },
  { title: 'Roles', property: 'roles', data_type: 'string' },
];

const UsersTab = () => {
  // const { data: userData } = useFetch(userDataURL, {
  //   headers,
  // });

  return (
    <div className='flex flex-col gap-4 sm:gap-6'>
      <div className='h-[410px]'>
        <StatPanelContainer label='Users' description='List of all the users'>
          <Table
            headers={userTabHeaders}
            data={[]}
            emptyStateData={{
              icon: Like,
              title: 'No Users Found',
              subtitle: 'No users were found',
            }}
          />
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default UsersTab;
