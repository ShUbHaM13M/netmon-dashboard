import { lazy } from 'react';
import IconTeam from '../../assets/icons/team';
import { Tab, TabContainer } from '../../components';
import IconUser from '../../assets/icons/user';
import IconDevice from '../../assets/icons/device';
import { useLocation } from 'wouter';

const TeamTab = lazy(() => import('./teams'));
const UserTab = lazy(() => import('./users'));
const DeviceTab = lazy(() => import('./devices'));

interface ParamsType {
  tab: string;
}

const tabs = [
  {
    Icon: IconTeam,
    title: 'Teams',
    Component: TeamTab,
  },
  {
    Icon: IconUser,
    title: 'Users',
    Component: UserTab,
  },
  {
    Icon: IconDevice,
    title: 'Devices',
    Component: DeviceTab,
  },
];

const AdminPanel = ({ params }: { params: ParamsType }) => {
  const [_, setLocation] = useLocation();
  const selectedTabIndex = tabs.findIndex((tab) => tab.title.toLowerCase() === params.tab);

  return (
    <div className='text-icon-white'>
      <TabContainer
        showAutoPlay={false}
        defaultSelectedTab={selectedTabIndex === -1 ? 0 : selectedTabIndex}
        onTabClick={(tabTitle) => setLocation(`/admin/${tabTitle.toLowerCase()}`)}
      >
        {tabs.map((tab) => {
          return (
            <Tab icon={<tab.Icon />} title={tab.title} key={tab.title}>
              <tab.Component />
            </Tab>
          );
        })}
      </TabContainer>
    </div>
  );
};

export default AdminPanel;
