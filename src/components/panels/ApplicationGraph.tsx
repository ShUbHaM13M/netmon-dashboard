import { useEffect, useMemo, useState } from 'react';

function convertValue(valueInMB: number): string {
  const TB = valueInMB / (1000 * 1000);
  const GB = valueInMB / 1000;

  if (TB >= 1) {
    return `${TB.toFixed(0)} TB`;
  } else if (GB >= 1) {
    return `${GB.toFixed(2)} GB`;
  } else {
    return `${valueInMB} MB`;
  }
}

function getWidth(unit: string, value: number, maxValue: number): number {
  if (unit === 'MB') {
    return value / maxValue;
  }
  if (unit == 'GB') {
    return value / 1000 / maxValue;
  }
  return value / 10000 / maxValue;
}

interface IApplicationGraphProps {
  data: {
    name: string;
    value: number;
    unit: string;
  }[];
}

const ApplicationGraph = ({ data }: IApplicationGraphProps) => {
  const maxValue = useMemo(() => Math.max(...data.map((d) => d.value)), [data]);

  return (
    <div className='flex flex-col gap-6 text-white text-xs uppercase p-4 overflow-y-auto'>
      {data.map((data) => {
        return (
          <GraphBarItem
            key={data.name}
            name={data.name}
            value={data.value}
            width={getWidth(data.unit, data.value, maxValue) * 100}
          />
        );
      })}
    </div>
  );
};

interface IGraphBarItemProps {
  name: string;
  value: number;
  width: number;
}

const GraphBarItem = ({ name, value, width }: IGraphBarItemProps) => {
  const [initialWidth, setInitialWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setInitialWidth(width);
    }, 0);
  }, [width]);

  return (
    <div className='flex flex-col gap-3 justify-start'>
      <p>{name}</p>
      <div className='flex gap-6'>
        <div
          style={{
            width: '94%',
          }}
          className='bg-card-light rounded-[4px] h-fit overflow-hidden'
        >
          <svg width='100%' height='15' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect
              x='0.75'
              y='0.75'
              width={`${initialWidth}%`}
              className='block transition-all ease duration-300'
              height='13.5'
              rx='3.25'
              fill='#19B0FE'
              fillOpacity='0.2'
              stroke='url(#paint0_linear_103_12)'
              strokeWidth='1.5'
            />
            <defs>
              <linearGradient
                id='paint0_linear_103_12'
                x1='7.5'
                y1='0'
                x2='7.5'
                y2='15'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#19B0FE' stopOpacity='0.8' />
                <stop offset='1' stopColor='#19B0FE' stopOpacity='0' />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <p
          style={{
            minWidth: '10ch',
          }}
          className='text-xs'
        >
          {convertValue(value)}
        </p>
      </div>
    </div>
  );
};

export default ApplicationGraph;
