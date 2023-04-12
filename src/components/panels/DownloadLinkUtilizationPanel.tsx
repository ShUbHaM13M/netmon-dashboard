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
      rx_95_util: { value: '85%', type: 'STATUS', criticality: Criticality.CRITICAL },
      rx_avg_util: { value: '1.3%', type: 'STRING' },
      hostname: { value: 'site3-vedge01', type: 'STRING' },
      color: { value: 'biz-internet', type: 'STRING' },
      provider: { value: 'ISP 1', type: 'STRING' },
      bandwidth: { value: '1 Mb/s', type: 'STRING' },
      rx_pct: { value: '71.0 kb/s', type: 'STRING' },
      rx_avg: { value: '13.0 kb/s', type: 'STRING' },
      site_name: { value: 'Bangalore', type: 'STRING' },
      site_id: { value: 1003, type: 'NUMBER' },
    },
    {
      rx_95_util: { value: '56%', type: 'STATUS', criticality: Criticality.SAFE },
      rx_avg_util: { value: '1.3%', type: 'STRING' },
      hostname: { value: 'site3-vedge01', type: 'STRING' },
      color: { value: 'biz-internet', type: 'STRING' },
      provider: { value: 'ISP 1', type: 'STRING' },
      bandwidth: { value: '1 Mb/s', type: 'STRING' },
      rx_pct: { value: '71.0 kb/s', type: 'STRING' },
      rx_avg: { value: '13.0 kb/s', type: 'STRING' },
      site_name: { value: 'Bangalore', type: 'STRING' },
      site_id: { value: 1003, type: 'NUMBER' },
    },
    {
      rx_95_util: { value: '76%', type: 'STATUS', criticality: Criticality.MAJOR },
      rx_avg_util: { value: '1.3%', type: 'STRING' },
      hostname: { value: 'site3-vedge01', type: 'STRING' },
      color: { value: 'biz-internet', type: 'STRING' },
      provider: { value: 'ISP 1', type: 'STRING' },
      bandwidth: { value: '1 Mb/s', type: 'STRING' },
      rx_pct: { value: '71.0 kb/s', type: 'STRING' },
      rx_avg: { value: '13.0 kb/s', type: 'STRING' },
      site_name: { value: 'Bangalore', type: 'STRING' },
      site_id: { value: 1003, type: 'NUMBER' },
    },
    {
      rx_95_util: { value: '3.50%', type: 'STATUS', criticality: Criticality.SAFE },
      rx_avg_util: { value: '1.3%', type: 'STRING' },
      hostname: { value: 'site3-vedge01', type: 'STRING' },
      color: { value: 'biz-internet', type: 'STRING' },
      provider: { value: 'ISP 1', type: 'STRING' },
      bandwidth: { value: '1 Mb/s', type: 'STRING' },
      rx_pct: { value: '71.0 kb/s', type: 'STRING' },
      rx_avg: { value: '13.0 kb/s', type: 'STRING' },
      site_name: { value: 'Bangalore', type: 'STRING' },
      site_id: { value: 1003, type: 'NUMBER' },
    },
    {
      rx_95_util: { value: '80%', type: 'STATUS', criticality: Criticality.MAJOR },
      rx_avg_util: { value: '1.3%', type: 'STRING' },
      hostname: { value: 'site3-vedge01', type: 'STRING' },
      color: { value: 'biz-internet', type: 'STRING' },
      provider: { value: 'ISP 1', type: 'STRING' },
      bandwidth: { value: '1 Mb/s', type: 'STRING' },
      rx_pct: { value: '71.0 kb/s', type: 'STRING' },
      rx_avg: { value: '13.0 kb/s', type: 'STRING' },
      site_name: { value: 'Bangalore', type: 'STRING' },
      site_id: { value: 1003, type: 'NUMBER' },
    },
  ],
};

const DownloadLinkUtilizationPanel = () => {
  return (
    <StatPanelContainer
      description='Data about link down details'
      label={downloadLinkUtilizationData.title}
      showError
    >
      <div className='p-4 flex gap-1 items-center mb-4 sm:mb-6'>
        <span className='caps-2-bold text-icon-dark-grey'>Duration</span>
        <h6 className='text-icon-grey'>{downloadLinkUtilizationData.sub_title}</h6>
      </div>
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
