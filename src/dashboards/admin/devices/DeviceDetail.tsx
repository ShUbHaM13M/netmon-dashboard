interface ParamType {
  device_id: string;
}

const DeviceDetail = ({ params }: { params: ParamType }) => {
  return (
    <div className='text-icon-white'>
      Showing device details for device id:
      <span className='font-bold text-lg'> {params.device_id}</span>
    </div>
  );
};

export default DeviceDetail;
