import Table from '../table/Table';
import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';
import { Criticality } from '../../global';

const uploadLinkUtilizationData = {
  title: 'Upload link utilization',
  sub_title: 'Today: 09:00:00 to 21:00:00',
  columns: [
    { title: 'tx_95_util', dataType: 'STATUS' },
    { title: 'tx_avg_util', dataType: 'STRING' },
    { title: 'hostname', dataType: 'STRING' },
    { title: 'color', dataType: 'STRING' },
    { title: 'provider', dataType: 'STRING' },
    { title: 'bandwidth', dataType: 'STRING' },
    { title: 'tx_pct', dataType: 'STRING' },
    { title: 'tx_avg', dataType: 'STRING' },
    { title: 'site_name', dataType: 'STRING' },
    { title: 'site_id', dataType: 'NUMBER' },
  ],
  data: [
    {
      tx_95_util: { value: '85%', type: 'STATUS', criticality: Criticality.SAFE },
      tx_avg_util: { value: '1.3%', type: 'STRING' },
      hostname: { value: 'site3-vedge01', type: 'STRING' },
      color: { value: 'biz-internet', type: 'STRING' },
      provider: { value: 'ISP 1', type: 'STRING' },
      bandwidth: { value: '1 Mb/s', type: 'STRING' },
      tx_pct: { value: '71.0 kb/s', type: 'STRING' },
      tx_avg: { value: '13.0 kb/s', type: 'STRING' },
      site_name: { value: 'Bangalore', type: 'STRING' },
      site_id: { value: 1003, type: 'NUMBER' },
    },
    {
      tx_95_util: { value: '56%', type: 'STATUS', criticality: Criticality.SAFE },
      tx_avg_util: { value: '1.3%', type: 'STRING' },
      hostname: { value: 'site3-vedge01', type: 'STRING' },
      color: { value: 'biz-internet', type: 'STRING' },
      provider: { value: 'ISP 1', type: 'STRING' },
      bandwidth: { value: '1 Mb/s', type: 'STRING' },
      tx_pct: { value: '71.0 kb/s', type: 'STRING' },
      tx_avg: { value: '13.0 kb/s', type: 'STRING' },
      site_name: { value: 'Bangalore', type: 'STRING' },
      site_id: { value: 1003, type: 'NUMBER' },
    },
    {
      tx_95_util: { value: '76%', type: 'STATUS', criticality: Criticality.SAFE },
      tx_avg_util: { value: '1.3%', type: 'STRING' },
      hostname: { value: 'site3-vedge01', type: 'STRING' },
      color: { value: 'biz-internet', type: 'STRING' },
      provider: { value: 'ISP 1', type: 'STRING' },
      bandwidth: { value: '1 Mb/s', type: 'STRING' },
      tx_pct: { value: '71.0 kb/s', type: 'STRING' },
      tx_avg: { value: '13.0 kb/s', type: 'STRING' },
      site_name: { value: 'Bangalore', type: 'STRING' },
      site_id: { value: 1003, type: 'NUMBER' },
    },
    {
      tx_95_util: { value: '3.50%', type: 'STATUS', criticality: Criticality.SAFE },
      tx_avg_util: { value: '1.3%', type: 'STRING' },
      hostname: { value: 'site3-vedge01', type: 'STRING' },
      color: { value: 'biz-internet', type: 'STRING' },
      provider: { value: 'ISP 1', type: 'STRING' },
      bandwidth: { value: '1 Mb/s', type: 'STRING' },
      tx_pct: { value: '71.0 kb/s', type: 'STRING' },
      tx_avg: { value: '13.0 kb/s', type: 'STRING' },
      site_name: { value: 'Bangalore', type: 'STRING' },
      site_id: { value: 1003, type: 'NUMBER' },
    },
    {
      tx_95_util: { value: '80%', type: 'STATUS', criticality: Criticality.SAFE },
      tx_avg_util: { value: '1.3%', type: 'STRING' },
      hostname: { value: 'site3-vedge01', type: 'STRING' },
      color: { value: 'biz-internet', type: 'STRING' },
      provider: { value: 'ISP 1', type: 'STRING' },
      bandwidth: { value: '1 Mb/s', type: 'STRING' },
      tx_pct: { value: '71.0 kb/s', type: 'STRING' },
      tx_avg: { value: '13.0 kb/s', type: 'STRING' },
      site_name: { value: 'Bangalore', type: 'STRING' },
      site_id: { value: 1003, type: 'NUMBER' },
    },
  ],
};

const UploadLinkUtilizationPanel = () => {
  return (
    <StatPanelContainer
      description='Data about link down details'
      label={uploadLinkUtilizationData.title}
      showError
    >
      <div className='sm:mt-[26px]'></div>
      <Table
        data={uploadLinkUtilizationData.data}
        headers={uploadLinkUtilizationData.columns}
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

export default UploadLinkUtilizationPanel;
