import { StatPanelContainer, Table } from '../../../components';
import { API_URL, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import Like from '../../../assets/images/like.svg';
import { useLocation } from 'wouter';
import { Row } from '../../../components/table/Table';

type DeviceData = {
  id: number;
  device_id: string;
  site_id: string;
  oem: string;
  active: boolean;
  last_updated: Date;
  last_updated_user: string;
};

const deviceDataURL = `${API_URL}/admin/devices`;

const UserActiveStatusFormatter = (value: string, _dataType: string, _row: Row) => {
  return <span>{value ? 'Active' : 'Inactive'}</span>;
};

const deviceTabHeaders = [
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
  const { data: deviceData } = useFetch<DeviceData[]>(deviceDataURL, {
    headers,
  });

  return (
    <div className='flex flex-col gap-4 sm:gap-6'>
      <div className='h-[410px]'>
        <StatPanelContainer label='Devices' description='List of all the devices'>
          <Table
            headers={deviceTabHeaders}
            data={deviceData || []}
            emptyStateData={{
              icon: Like,
              title: 'No Devices found',
              subtitle: 'No devices found',
            }}
            columnFormatters={{ active: UserActiveStatusFormatter }}
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
