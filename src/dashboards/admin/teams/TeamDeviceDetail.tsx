import { StatPanelContainer, Table } from '../../../components';
import ActiveStatusFormatter from '../../../components/formatter/ActiveStateFormatter';
import Like from '../../../assets/images/like.svg';
import { API_URL, Criticality, FetchPanelData, headers } from '../../../global';
import useFetch from '../../../hooks/useFetch';
import { useCallback, useContext, useEffect, useState } from 'react';
import ActionFormatter from '../../../components/formatter/ActionFormatter';
import { TeamDetailContext } from './TeamDetail';

const deviceDataURL = `${API_URL}/admin/devices?ver=v2`;

const TeamDeviceDetail = () => {
  const { teamData, setSelectedEntity, setMessages } = useContext(TeamDetailContext);
  const teamId = teamData?.data[0].id;
  const removeDescription = `Are you sure you want to remove this device from ${teamData?.data[0].name}`;

  const { data: devicesData } = useFetch<FetchPanelData>(deviceDataURL, { headers });
  const { data: devicesInTeam } = useFetch<FetchPanelData>(
    `${API_URL}/admin/team/device?team-id=${teamId}&ver=v2`,
    { headers },
    false,
    !teamId,
  );
  const [devices, setDevices] = useState(devicesData?.data);

  const onDeviceActionClick = useCallback(
    async (action: string, deviceId: number) => {
      let method = 'POST';
      if (action === 'Remove') {
        method = 'DELETE';
      }
      const res = await fetch(`${API_URL}/admin/team/device?ver=v2`, {
        method,
        body: JSON.stringify({
          team_id: teamId,
          device_id: deviceId,
        }),
        headers,
      });

      if (!res.ok) return;

      setDevices((prev) =>
        prev?.map((device) => {
          if (device.id !== deviceId) return device;

          const updatedDevice = { ...device };
          if (action === 'Add') {
            updatedDevice['action'] = 'Remove';
            updatedDevice['actionEvent'] = () =>
              setSelectedEntity({
                title: 'Remove Device',
                description: removeDescription,
                onPrimaryActionClick: () => onDeviceActionClick('Remove', deviceId),
              });
            return updatedDevice;
          }

          updatedDevice['action'] = 'Add';
          updatedDevice['actionEvent'] = () => onDeviceActionClick('Add', deviceId);
          return updatedDevice;
        }),
      );

      setMessages((prev) => [
        ...prev,
        {
          id: `Device-${action}-${deviceId}`,
          description:
            action === 'Add'
              ? `Added Device: ${deviceId} to the team`
              : `Removed Device: ${deviceId} from the team`,
          criticality: action === 'Add' ? Criticality.SAFE : Criticality.CRITICAL,
        },
      ]);
    },
    [teamId, setMessages, setSelectedEntity, removeDescription],
  );

  useEffect(() => {
    if (!devicesData || !devicesInTeam) return;
    setDevices(
      devicesData.data.map((data) => {
        if (devicesInTeam.data.find((device) => data.id === device.id)) data['action'] = 'Remove';
        else data['action'] = 'Add';

        if (data['action'] === 'Remove')
          data['actionEvent'] = () => {
            setSelectedEntity({
              title: 'Remove Device',
              description: removeDescription,
              onPrimaryActionClick: () => onDeviceActionClick(data['action'], data.id),
            });
          };
        else data['actionEvent'] = () => onDeviceActionClick('Add', data.id);

        return data;
      }),
    );
  }, [devicesData, devicesInTeam, onDeviceActionClick, removeDescription, setSelectedEntity]);

  return (
    <div className='h-[510px]'>
      <StatPanelContainer label='Devices' description='List of all the devices.'>
        <Table
          headers={[
            ...(devicesData?.columns || []),
            { title: 'Action', data_type: 'action', property: 'action', sortable: false },
          ]}
          data={devices || []}
          emptyStateData={{
            icon: Like,
            title: 'No Devices Found',
            subtitle: 'No devices found.',
          }}
          columnFormatters={{ active: ActiveStatusFormatter, action: ActionFormatter }}
        />
      </StatPanelContainer>
    </div>
  );
};

export default TeamDeviceDetail;
