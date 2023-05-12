import { StatPanelContainer, Table } from '../../../components';
import { API_URL, FetchPanelData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import Like from '../../../assets/images/like.svg';
import { useLocation } from 'wouter';
import ActiveStatusFormatter from '../../../components/formatter/ActiveStateFormatter';

export type DeviceData = {
  id: number;
  device_id: string;
  site_id: string;
  oem: string;
  active: boolean;
  last_updated: Date;
  last_updated_user: string;
};

const deviceDataURL = `${API_URL}/admin/devices?ver=v2`;

export const deviceTabHeaders = [
  { title: 'ID', data_type: 'int', property: 'id' },
  { title: 'Device ID', data_type: 'string', property: 'device_id' },
  { title: 'Site ID', data_type: 'string', property: 'site_id' },
  { title: 'oem', data_type: 'string', property: 'oem' },
  { title: 'active', data_type: 'string', property: 'active' },
  { title: 'last updated', data_type: 'epoch_ms', property: 'last_updated' },
  { title: 'last updated user', data_type: 'string', property: 'last_updated_user' },
];

const DevicesTab = () => {
  const [_, setLocation] = useLocation();
  const { data: deviceData, loading } = useFetch<FetchPanelData>(deviceDataURL, {
    headers,
  });

  if (loading) return <div>Loading...</div>;
  if (!deviceData) return null;

  return (
    <div className='flex flex-col gap-4 sm:gap-6'>
      <div className='h-[410px]'>
        <StatPanelContainer label='Devices' description='List of all the devices'>
          <Table
            headers={deviceData.columns}
            data={deviceData.data}
            emptyStateData={{
              icon: Like,
              title: 'No Devices found',
              subtitle: 'No devices found',
            }}
            columnFormatters={{ active: ActiveStatusFormatter }}
            onRowClick={(row) => {
              setLocation(`/admin/devices/${(row as DeviceData).device_id}`);
            }}
          />
        </StatPanelContainer>
      </div>
    </div>
  );
};

export default DevicesTab;
