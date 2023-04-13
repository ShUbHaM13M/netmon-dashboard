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
      tunnel: { value: 'site3-vedge01:public-internet-dc-cedge01:public-internetll', type: 'STRING' },
      ms: { value: 2, type: 'NUMBER' },
    },
    {
      tunnel: { value: 'site3-vedge01:public-internet-dc-cedge01:public-internetll', type: 'STRING' },
      ms: { value: 1.2, type: 'NUMBER' },
    },
    {
      tunnel: { value: 'site3-vedge01:public-internet-dc-cedge01:public-internetll', type: 'STRING' },
      ms: { value: 1, type: 'NUMBER' },
    },
    {
      tunnel: { value: 'site3-vedge01:public-internet-dc-cedge01:public-internetll', type: 'STRING' },
      ms: { value: 2.2, type: 'NUMBER' },
    },
  ],
};

const TunnelJitterPanel = () => {
  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Tunnel Latency'
    >
      <Table
        headers={data.columns}
        data={data.data}
        emptyStateData={{
          icon: Like,
          title: 'All good here',
          subtitle: 'No link down',
        }}
      />
    </StatPanelContainer>
  );
};

export default TunnelJitterPanel;
