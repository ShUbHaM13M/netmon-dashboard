import Like from '../../../assets/images/like.svg';
import { StatPanelContainer, Table } from '../../../components';
import { API_URL, FetchPanelData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';

const licenseDetailsURL = `${API_URL}/panel/device/certificate/details?ver=v2`;
const CertificateDetails = () => {
  const {
    data: certificateDetails,
    loading,
    error,
  } = useFetch<FetchPanelData>(licenseDetailsURL, { headers });

  if (error || !certificateDetails)
    return <div className='text-icon-white'>Failed to fetch certificate details.</div>;

  return (
    <div className='h-[510px] mt-4'>
      <StatPanelContainer
        label={certificateDetails.title}
        description='Showing certificate data'
        loading={loading}
      >
        <Table
          headers={certificateDetails.columns}
          data={certificateDetails.data}
          emptyStateData={{
            icon: Like,
            title: 'No Certificate Details Found',
            subtitle: 'No certificate details found',
          }}
        />
      </StatPanelContainer>
    </div>
  );
};

export default CertificateDetails;
