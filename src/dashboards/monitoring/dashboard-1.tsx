import {
  IconAppUsage,
  IconDeviceStatus,
  IconLinkUtitlization,
  IconOverview,
  IconWanStatus,
} from '../../assets/icons';
import {
  BfdConnectivityPanel,
  CPULoadUsagePanel,
  CPU_UsagePanel,
  CertificatePanel,
  ControlStatusPanel,
  ControllerPanel,
  DeviceDownDetailPanel,
  DownloadLinkUtilizationPanel,
  LicensePanel,
  LinkDownDetailsPanel,
  MultiSelectDropdown,
  NetworkIssuePanel,
  SingleSelectDropdown,
  Tab,
  TabContainer,
  TopApplicationsPanel,
  TotalDiskUsagePanel,
  TotalMemoryUsagePanel,
  TunnelJitterPanel,
  TunnelLatencyPanel,
  TunnelLossPanel,
  UploadLinkUtilizationPanel,
  WanEdgePanel,
} from '../../components';
import { API_URL, headers, FetchData } from '../../global';
import useFetch from '../../hooks/useFetch';

const percentileURL = `${API_URL}/vars?name=config&filter-value=percentile`;
const siteURL = `${API_URL}/vars?name=site&filter-name=site-name&filter-value=All`;

const Dashboard_1 = () => {
  const { data: percentileOptions } = useFetch<FetchData[]>(percentileURL, { headers });
  const { data: siteOptions } = useFetch<FetchData[]>(siteURL, { headers });

  return (
    <TabContainer>
      <Tab icon={<IconOverview />} title='Overview'>
        <div className='flex flex-col gap-4 sm:gap-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
              <div className='flex-1'>
                <ControllerPanel />
              </div>
              <div className='flex-1'>
                <WanEdgePanel />
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
              <NetworkIssuePanel />
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
                <CertificatePanel />
                <LicensePanel />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
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
        <div className='flex gap-6 mb-6'>
          <div className='w-2/4 sm:w-[140px] z-[20]'>
            <SingleSelectDropdown
              options={percentileOptions || []}
              label='Percentile'
              onValueChange={(_) => ({})}
            />
          </div>
          <div className='w-2/4 sm:w-[240px] z-[20]'>
            <MultiSelectDropdown
              options={siteOptions || []}
              label='SITE'
              onValueChange={(_) => ({})}
            />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
          <div className='h-[490px] sm:h-[590px]'>
            <DownloadLinkUtilizationPanel />
          </div>
          <div className='h-[490px] sm:h-[590px]'>
            <UploadLinkUtilizationPanel />
          </div>
        </div>
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
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6'>
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
        <div className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 sm:gap-6'>
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
        <div className='h-[543px] sm:h-[600px] sm:w-2/4'>
          <TopApplicationsPanel />
        </div>
      </Tab>
    </TabContainer>
  );
};

export default Dashboard_1;
