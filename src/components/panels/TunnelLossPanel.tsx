import Table from '../table/Table';
import StatPanelContainer from './StatPanelContainer';
import Like from '../../assets/images/like.svg';

const data = {
    columns: [
      { title: 'tunnel', dataType: 'STRING' },
      { title: '%', dataType: 'NUMBER' },
    ],
    data: [
      {
        tunnel: { value: 'site3-vedge01:public-internet-dc-cedge01:public-internetll', type: 'STRING' },
        '%': { value: 2, type: 'NUMBER' },
      },
      {
        tunnel: { value: 'site3-vedge01:public-internet-dc-cedge01:public-internetll', type: 'STRING' },
        '%': { value: 1.2, type: 'NUMBER' },
      },
      {
        tunnel: { value: 'site3-vedge01:public-internet-dc-cedge01:public-internetll', type: 'STRING' },
        '%': { value: 1, type: 'NUMBER' },
      },
      {
        tunnel: { value: 'site3-vedge01:public-internet-dc-cedge01:public-internetll', type: 'STRING' },
        '%': { value: 2.2, type: 'NUMBER' },
      },
    ],
  };

const TunnelLossPanel = () => {
  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Tunnel Loss'
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

export default TunnelLossPanel;
