import { lazy } from 'react';
import IconTeam from '../../assets/icons/team';
import { Tab, TabContainer } from '../../components';
import IconUser from '../../assets/icons/user';
import IconDevice from '../../assets/icons/device';

const TeamTab = lazy(() => import('./TeamsTab'));
const UserTab = lazy(() => import('./UsersTab'));
const DeviceTab = lazy(() => import('./DevicesTab'));

const AdminPanel = () => {
  return (
    <div className='text-icon-white'>
      <TabContainer showAutoPlay={false}>
        <Tab icon={<IconTeam />} title='Teams'>
          <TeamTab />
        </Tab>
        <Tab icon={<IconUser />} title='Users'>
          <UserTab />
        </Tab>
        <Tab icon={<IconDevice />} title='Devices'>
          <DeviceTab />
        </Tab>
      </TabContainer>
    </div>
  );
};

export default AdminPanel;
