import { Criticality } from '../../global';

interface StatusProps {
  label: string;
  value: number;
  criticality: Criticality;
}

const Status = ({ label, value, criticality }: StatusProps) => {
  return (
    <div className='px-4 py-2 rounded-2xl border border-card-light flex flex-col gap-1'>
      <p className='text-disabled caps-2 font-semibold'>{label}</p>
      <div className='flex gap-2.5 items-center'>
        <div
          style={{
            backgroundColor: criticality,
          }}
          className='w-1 h-6 rounded-full'
        ></div>
        <span className='text-icon-white text-xl'>{value}</span>
      </div>
    </div>
  );
};

export default Status;
