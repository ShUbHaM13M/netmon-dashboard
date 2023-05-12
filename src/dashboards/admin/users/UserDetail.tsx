import { StatPanelContainer, Table } from '../../../components';
import { API_URL, dateFormatter, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { DeviceData, deviceTabHeaders } from '../devices';
import Like from '../../../assets/images/like.svg';
import ActiveStatusFormatter from '../../../components/formatter/ActiveStateFormatter';

interface ParamType {
  username: string;
}

type UserData = {
  username: string;
  roles: string[];
  allowed_dashboards: string[];
  allowed_devices: DeviceData[];
  last_activity: Date;
};

const UserDetail = ({ params }: { params: ParamType }) => {
  const userDetailURL = `${API_URL}/admin/user?user-name=${params.username}&ver=v2`;
  const { data: userDetailData, loading, error } = useFetch<UserData>(userDetailURL, { headers });

  if (loading) return <div>Loading...</div>;

  if (!userDetailData?.username || error)
    return (
      <div className='text-icon-white text-center mt-4'>
        No User with username: {params.username} was found
      </div>
    );

  return (
    <div className='text-icon-white flex flex-col gap-4 mt-4 pb-6'>
      <h3>{userDetailData.username}</h3>

      <div className='flex flex-col gap-2'>
        <p className='flex gap-1 text-sm'>
          <span className='text-icon-grey'>Last activity</span>
          <span className='text-icon-grey'> : </span>
          <span>{dateFormatter.format(userDetailData.last_activity)}</span>
        </p>
        <p className='flex gap-1 text-sm'>
          <span className='text-icon-grey'>Roles</span>
          <span className='text-icon-grey'> : </span>
          <span>{userDetailData.roles.join(', ')}</span>
        </p>
        <p className='flex gap-1 text-sm'>
          <span className='text-icon-grey'>Allowed Dashboards</span>
          <span className='text-icon-grey'> : </span>
          <span className='capitalize'>{userDetailData.allowed_dashboards.join(', ')}</span>
        </p>
      </div>

      <div className='h-[410px]'>
        <StatPanelContainer
          label='Allowed Devices'
          description='List of devices allowed to the user'
        >
          <Table
            headers={deviceTabHeaders}
            data={userDetailData.allowed_devices}
            columnFormatters={{ active: ActiveStatusFormatter }}
            emptyStateData={{
              icon: Like,
              title: 'No Devices found',
              subtitle: 'No devices found',
            }}
          />
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default UserDetail;
