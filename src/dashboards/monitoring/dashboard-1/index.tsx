import {
  IconAppUsage,
  IconDeviceStatus,
  IconLinkUtitlization,
  IconOverview,
  IconWanStatus,
} from '../../../assets/icons';
import {
  BfdConnectivityPanel,
  CPULoadUsagePanel,
  CPU_UsagePanel,
  CertificatePanel,
  ControlStatusPanel,
  ControllerPanel,
  DeviceDownDetailPanel,
  LicensePanel,
  LinkDownDetailsPanel,
  NetworkIssuePanel,
  Tab,
  TabContainer,
  TopApplicationsPanel,
  TotalDiskUsagePanel,
  TotalMemoryUsagePanel,
  TunnelJitterPanel,
  TunnelLatencyPanel,
  TunnelLossPanel,
  WanEdgePanel,
} from '../../../components';
import LinkUtilisationTab from './LinkUtilisationTab';

const Dashboard_1 = () => {
  return (
    <TabContainer>
      <Tab icon={<IconOverview />} title='Overview'>
        <div className='flex flex-col gap-4 sm:gap-6'>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6'>
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
              <div className='flex-1'>
                <ControllerPanel />
              </div>
              <div className='flex-1'>
                <WanEdgePanel />
              </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
              <NetworkIssuePanel />
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
                <CertificatePanel />
                <LicensePanel />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pb-6'>
            <div className='sm:w-full h-[392px] sm:h-[414px]'>
              <LinkDownDetailsPanel />
            </div>
            <div className='sm:full h-[392px] sm:h-[414px]'>
              <DeviceDownDetailPanel />
            </div>
          </div>
        </div>
      </Tab>
      <Tab icon={<IconLinkUtitlization />} title='Link Utilisation'>
        <LinkUtilisationTab />
      </Tab>
      <Tab icon={<IconWanStatus />} title='WAN Status'>
        <div className='flex flex-col gap-4 sm:gap-6'>
          <div className='flex flex-col md:flex-row gap-4 sm:gap-6 w-full'>
            <div className='flex-1'>
              <BfdConnectivityPanel />
            </div>
            <div className='flex-1'>
              <ControlStatusPanel />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pb-6'>
            <div className='h-[410px] sm:h-[430px]'>
              <TunnelLatencyPanel />
            </div>
            <div className='h-[410px] sm:h-[430px]'>
              <TunnelLossPanel />
            </div>
            <div className='h-[410px] sm:h-[430px]'>
              <TunnelJitterPanel />
            </div>
          </div>
        </div>
      </Tab>
      <Tab icon={<IconDeviceStatus />} title='Device Status'>
        <div className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 sm:gap-6 pb-6'>
          <div className='h-[280px] sm:h-[290px]'>
            <CPU_UsagePanel />
          </div>
          <div className='h-[280px] sm:h-[290px]'>
            <CPULoadUsagePanel />
          </div>
          <div className='h-[280px] sm:h-[290px]'>
            <TotalMemoryUsagePanel />
          </div>
          <div className='h-[280px] sm:h-[290px]'>
            <TotalDiskUsagePanel />
          </div>
        </div>
      </Tab>
      <Tab icon={<IconAppUsage />} title='App Usage'>
        <div className='h-[543px] sm:h-[600px] sm:w-2/4 pb-6'>
          <TopApplicationsPanel />
        </div>
      </Tab>
    </TabContainer>
  );
};

export default Dashboard_1;
