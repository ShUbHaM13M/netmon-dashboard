import { StatPanelContainer, Table } from '../../../components';
import { API_URL, FetchPanelData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import Like from '../../../assets/images/like.svg';

const licenseDetailsURL = `${API_URL}/panel/device/license/details?ver=v2`;

const LicenseDetails = () => {
  const {
    data: licenseData,
    loading,
    error,
  } = useFetch<FetchPanelData>(licenseDetailsURL, { headers });

  if (loading) return <div className='text-icon-white'>Loading...</div>;

  if (error || !licenseData)
    return <div className='text-icon-white'>Failed to fetch license details.</div>;

  return (
    <div className='h-[510px] mt-4'>
      <StatPanelContainer label={licenseData.title} description='Showing license data'>
        <Table
          headers={licenseData.columns}
          data={licenseData.data}
          emptyStateData={{
            icon: Like,
            title: 'No License Details Found',
            subtitle: 'No license details found',
          }}
        />
      </StatPanelContainer>
    </div>
  );
};

export default LicenseDetails;
