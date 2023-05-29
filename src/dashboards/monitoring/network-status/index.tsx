import { StatPanelContainer, Table } from '../../../components';
import Like from '../../../assets/images/like.svg';
import { API_URL, FetchPanelData, dateFormatter, headers } from '../../../global';
import { useUserContext } from '../../../context/UserContext';
import useFetch from '../../../hooks/useFetch';

const NetworkStatus = () => {
  const { refetch, timestamp } = useUserContext();

  const rebootSummaryDataURL = `${API_URL}/panel/network/reboot/summary?from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}&ver=v2`;
  const { data: rebootSummaryData, loading: loadingRebootSummaryData } = useFetch<FetchPanelData>(
    rebootSummaryDataURL,
    { headers },
    refetch,
  );

  const rebootDetailsDataURL = `${API_URL}/panel/network/reboot/details?from=${timestamp.from.getTime()}&to=${timestamp.to.getTime()}&ver=v2`;
  const { data: rebootDetailsData, loading: loadingRebootDetailsData } = useFetch<FetchPanelData>(
    rebootDetailsDataURL,
    { headers },
    refetch,
  );

  return (
    <div className='flex flex-col lg:flex-row pb-6 gap-6 h-full text-icon-white mt-4'>
      <div className='h-[410px] lg:h-[510px] w-full'>
        <StatPanelContainer
          label={`Reboot Summary from ${dateFormatter.format(
            timestamp.from,
          )} to ${dateFormatter.format(timestamp.to)}`}
          description='Showing the reboot summary'
          loading={loadingRebootSummaryData}
        >
          <Table
            headers={rebootSummaryData ? rebootSummaryData.columns : []}
            data={rebootSummaryData ? rebootSummaryData.data : []}
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
          loading={loadingRebootDetailsData}
        >
          <Table
            headers={rebootDetailsData?.columns || []}
            data={rebootDetailsData?.data || []}
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
