import Table from '../table/Table';
import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import { Criticality } from '../../global';

const downloadLinkUtilizationData = {
  title: 'Download link utilization',
  sub_title: 'Today: 09:00:00 to 21:00:00',
  columns: [
    { title: 'rx_95_util', dataType: 'STATUS' },
    { title: 'rx_avg_util', dataType: 'STRING' },
    { title: 'hostname', dataType: 'STRING' },
    { title: 'color', dataType: 'STRING' },
    { title: 'provider', dataType: 'STRING' },
    { title: 'bandwidth', dataType: 'STRING' },
    { title: 'rx_pct', dataType: 'STRING' },
    { title: 'px_avg', dataType: 'STRING' },
    { title: 'site_name', dataType: 'STRING' },
    { title: 'site_id', dataType: 'NUMBER' },
  ],
  data: [
    {
      rx_95_util: { value: '85%', criticality: Criticality.CRITICAL },
      rx_avg_util: { value: '1.3%' },
      hostname: { value: 'site3-vedge01' },
      color: { value: 'biz-internet' },
      provider: { value: 'ISP 1' },
      bandwidth: { value: '1 Mb/s' },
      rx_pct: { value: '71.0 kb/s' },
      rx_avg: { value: '13.0 kb/s' },
      site_name: { value: 'Bangalore' },
      site_id: { value: 1003 },
    },
    {
      rx_95_util: { value: '56%', criticality: Criticality.SAFE },
      rx_avg_util: { value: '1.3%' },
      hostname: { value: 'site3-vedge01' },
      color: { value: 'biz-internet' },
      provider: { value: 'ISP 1' },
      bandwidth: { value: '1 Mb/s' },
      rx_pct: { value: '71.0 kb/s' },
      rx_avg: { value: '13.0 kb/s' },
      site_name: { value: 'Bangalore' },
      site_id: { value: 1003 },
    },
    {
      rx_95_util: { value: '76%', criticality: Criticality.MAJOR },
      rx_avg_util: { value: '1.3%' },
      hostname: { value: 'site3-vedge01' },
      color: { value: 'biz-internet' },
      provider: { value: 'ISP 1' },
      bandwidth: { value: '1 Mb/s' },
      rx_pct: { value: '71.0 kb/s' },
      rx_avg: { value: '13.0 kb/s' },
      site_name: { value: 'Bangalore' },
      site_id: { value: 1003 },
    },
    {
      rx_95_util: { value: '3.50%', criticality: Criticality.SAFE },
      rx_avg_util: { value: '1.3%' },
      hostname: { value: 'site3-vedge01' },
      color: { value: 'biz-internet' },
      provider: { value: 'ISP 1' },
      bandwidth: { value: '1 Mb/s' },
      rx_pct: { value: '71.0 kb/s' },
      rx_avg: { value: '13.0 kb/s' },
      site_name: { value: 'Bangalore' },
      site_id: { value: 1003 },
    },
    {
      rx_95_util: { value: '80%', criticality: Criticality.MAJOR },
      rx_avg_util: { value: '1.3%' },
      hostname: { value: 'site3-vedge01' },
      color: { value: 'biz-internet' },
      provider: { value: 'ISP 1' },
      bandwidth: { value: '1 Mb/s' },
      rx_pct: { value: '71.0 kb/s' },
      rx_avg: { value: '13.0 kb/s' },
      site_name: { value: 'Bangalore' },
      site_id: { value: 1003 },
    },
  ],
};

const DownloadLinkUtilizationPanel = () => {
  return (
    <StatPanelContainer
      subtitle={downloadLinkUtilizationData.sub_title}
      description='Data about link down details'
      label={downloadLinkUtilizationData.title}
      showError
    >
      <Table
        data={downloadLinkUtilizationData.data}
        headers={downloadLinkUtilizationData.columns}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
        showStatusChip={false}
      ></Table>
    </StatPanelContainer>
  );
};

export default DownloadLinkUtilizationPanel;
