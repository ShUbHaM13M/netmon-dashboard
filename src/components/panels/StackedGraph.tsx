interface IStackedGraphProps {
  total: number;
  criticalCount: number;
  safeLabel: string;
  criticalLabel: string;
}

const StackedGraph = ({
  criticalLabel: dangerLabel,
  safeLabel,
  criticalCount,
  total,
}: IStackedGraphProps) => {
  const criticalPercentage = (criticalCount * 100) / total;
  const safePercentage = ((total - criticalCount) * 100) / total;

  return (
    <div className='pt-3 px-4 pb-5 flex flex-col'>
      <div className='flex items-center justify-between'>
        <span className='caps-2 text-icon-dark-grey'>Total</span>
        <span className='text-icon-grey font-[13px]'>{total}</span>
      </div>

      <div className='flex mt-2'>
        <div
          style={{
            width: `${safePercentage}%`,
          }}
          className='h-1 rounded-full bg-status-safe transition-all ease-out duration-150'
        ></div>
        <div
          style={{
            width: `${criticalPercentage}%`,
          }}
          className='h-1 rounded-md bg-status-critical  transition-all ease-out duration-150'
        ></div>
      </div>

      <div className='flex flex-col gap-3 mt-4'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-1 items-center'>
            <span className='w-1.5 h-1.5 rounded-full bg-status-safe'></span>
            <span className='text-icon-dark-grey caps-3-bold'>{safeLabel}</span>
          </div>
          <div className='text-[13px] text-icon-white font-semibold'>{total - criticalCount}</div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-1 items-center'>
            <span className='w-1.5 h-1.5 rounded-full bg-status-critical'></span>
            <span className='text-icon-dark-grey caps-3-bold'>{dangerLabel}</span>
          </div>
          <div className='text-[13px] text-icon-white font-semibold'>{criticalCount}</div>
        </div>
      </div>
    </div>
  );
};

export default StackedGraph;
