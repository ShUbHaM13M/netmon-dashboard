import ApplicationGraph from './ApplicationGraph';
import StatPanelContainer from './StatPanelContainer';

const data = [
  {
    name: 'FACEBOOK',
    value: 1000000,
    unit: 'TB',
  },
  {
    name: 'GOOGLE',
    value: 7000,
    unit: 'GB',
  },
  {
    name: 'YOUTUBE',
    value: 5500,
    unit: 'GB',
  },
  {
    name: 'ZOOM',
    value: 700,
    unit: 'MB',
  },
  {
    name: 'SAP',
    value: 300,
    unit: 'MB',
  },
];

const TopApplicationsPanel = () => {
  return (
    <StatPanelContainer
      description='This will show reachable and unreachable out off total devices'
      label='Top Applications'
    >
      <ApplicationGraph data={data} />
    </StatPanelContainer>
  );
};

export default TopApplicationsPanel;
