import StatPanelContainer from './StatPanelContainer';
import Table from '../table/Table';
import Like from '../../assets/images/like.svg';

const data = {
  columns: [
    { title: 'tunnel', dataType: 'STRING' },
    { title: 'ms', dataType: 'NUMBER' },
  ],
  data: [
    {
      tunnel: {
        value: 'site3-vedge01:public-internet-dc-cedge01:public-internetll',
      },
      ms: { value: 2 },
    },
    {
      tunnel: { value: 'site3-vedge01:public-internet-dc-cedge01:public-internetll' },
      ms: { value: 1.2 },
    },
    {
      tunnel: { value: 'site3-vedge01:public-internet-dc-cedge01:public-internetll' },
      ms: { value: 1 },
    },
    {
      tunnel: { value: 'site3-vedge01:public-internet-dc-cedge01:public-internetll' },
      ms: { value: 2.2 },
    },
  ],
};

const TunnelLatencyPanel = () => {
  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Tunnel Latency'
    >
      <div className='mt-4'></div>
      <Table
        headers={data.columns}
        data={data.data}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
        showStatus={false}
      />
    </StatPanelContainer>
  );
};

export default TunnelLatencyPanel;
