import { StatPanelContainer, Table } from '../../../components';
import Like from '../../../assets/images/like.svg';

const NetworkStatus = () => {
  return (
    <div className='flex flex-col lg:flex-row pb-6 gap-6 h-full text-icon-white mt-4'>
      <div className='h-[410px] lg:h-[510px] w-full'>
        <StatPanelContainer
          label='Reboot Summary from -- to --'
          description='Showing the reboot summary'
        >
          <Table
            headers={[]}
            data={[]}
            emptyStateData={{
              icon: Like,
              title: 'No Reboot Summary',
              subtitle: 'No reboot summary',
            }}
          />
        </StatPanelContainer>
      </div>
      <div className='h-[410px] lg:h-[510px] w-full'>
        <StatPanelContainer
          label='Reboot Details'
          description='This panel shows the Reboot details'
        >
          <Table
            headers={[]}
            data={[]}
            emptyStateData={{
              icon: Like,
              title: 'No Reboot Details',
              subtitle: 'No reboot details',
            }}
          />
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default NetworkStatus;
