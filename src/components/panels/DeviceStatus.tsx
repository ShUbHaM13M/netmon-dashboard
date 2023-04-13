import { DeviceReachability } from '../../global';

interface IDeviceStatusProps {
  label: string;
  data: {
    reachability: DeviceReachability;
    name: string;
  }[];
}

const DeviceStatus = ({ label, data }: IDeviceStatusProps) => {
  const totalDevices = data.length;
  const reachableDevices = data.filter(
    (device) => device.reachability == DeviceReachability.REACHABLE,
  ).length;
  const reachableDevicesPercentage = (reachableDevices * 100) / totalDevices;
  const unReachableDevicesPercentage = ((totalDevices - reachableDevices) * 100) / totalDevices;

  return (
    <div className='p-4 flex flex-col gap-3'>
      <div className='flex justify-between'>
        <p className='text-xs font-semibold text-disabled caps-2'>{label}</p>
        <p className='text-sm text-icon-grey'>{totalDevices}</p>
      </div>

      <div className='flex'>
        <div
          style={{
            width: `${reachableDevicesPercentage}%`,
          }}
          className={`h-5 rounded-md bg-status-safe bg-opacity-10 border-solid border-status-safe transition-all ease-out duration-150
          ${reachableDevicesPercentage === 0 ? 'border-0' : 'border'}
          `}
        ></div>
        <div
          style={{
            width: `${unReachableDevicesPercentage}%`,
          }}
          className={`h-5 rounded-md bg-status-critical border-solid border-status-critical transition-all ease-out duration-150 ${
            unReachableDevicesPercentage === 0 ? 'border-0' : 'border'
          }`}
        ></div>
      </div>

      <div className='flex justify-between'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-1'>
            <div className='w-1.5 h-1.5 bg-status-safe rounded-full'></div>
            <p className='caps-2 text-icon-dark-grey'>Reachable</p>
          </div>
          <p className='ml-2.5 text-icon-white'>{reachableDevices}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-1'>
            <div className='w-1.5 h-1.5 bg-status-critical rounded-full'></div>
            <p className='caps-2 text-icon-dark-grey'>Unreachable</p>
          </div>
          <p className='ml-2.5 text-icon-white'>{totalDevices - reachableDevices}</p>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatus;
