import {
  Nav,
  ControllerPanel,
  NetworkIssuePanel,
  LinkDownDetailsPanel,
  DeviceDownDetailPanel,
  DownloadLinkUtilizationPanel,
  UploadLinkUtilizationPanel,
  CPULoadUsagePanel,
  TotalMemoryUsagePanel,
  TotalDiskUsagePanel,
  CPU_UsagePanel,
  TunnelJitterPanel,
  TunnelLatencyPanel,
  TunnelLossPanel,
  TopApplicationsPanel,
  WanEdgePanel,
  ControlStatusPanel,
  CertificatePanel,
  BfdConnectivityPanel,
} from '../components';

export default function Example() {
  return (
    <div className='app bg-card-dark flex flex-col gap-4 min-h-screen'>
      <Nav client='HBB'></Nav>
      <div className='flex flex-col gap-4 p-4'>
        <ControllerPanel />
        <NetworkIssuePanel />
        <LinkDownDetailsPanel />
        <DeviceDownDetailPanel />
        <DownloadLinkUtilizationPanel />
        <UploadLinkUtilizationPanel />
        <CPU_UsagePanel />
        <CPULoadUsagePanel />
        <TotalMemoryUsagePanel />
        <TotalDiskUsagePanel />
        <TunnelJitterPanel />
        <TunnelLatencyPanel />
        <TunnelLossPanel />
        <TopApplicationsPanel />
        <WanEdgePanel />
        <ControlStatusPanel />
        <CertificatePanel />
        <BfdConnectivityPanel />
      </div>
    </div>
  );
}
