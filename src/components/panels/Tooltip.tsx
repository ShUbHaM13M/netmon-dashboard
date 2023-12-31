import { useEffect, useRef } from 'react';

interface ITooltipProps {
  title: string;
  description: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tooltip = ({ title, description, show, setShow }: ITooltipProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [setShow]);

  return (
    <div
      ref={containerRef}
      style={{
        width: 230,
      }}
      className={`text-icon-white
      flex-col items-start 
      absolute -left-2 top-full min-h-fit z-20
      transition-opacity duration-150 ease-out
      ${show ? 'flex' : 'hidden'}
      `}
    >
      <svg
        width='16'
        height='13'
        viewBox='0 0 16 13'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='ml-2 -mb-1'
      >
        <path
          d='M6.6494 1.36355C7.24657 0.318506 8.75343 0.318506 9.3506 1.36355L16 13H0L6.6494 1.36355Z'
          className='fill-card-dark stroke-card-dark'
        />
      </svg>

      <div
        className='bg-card-dark text-icon-white
      flex flex-col gap-2 items-start p-4 min-h-fit rounded-[4px]
      transition-opacity duration-150 ease-out'
      >
        <h6
          style={{
            maxWidth: 230,
          }}
          className='whitespace-nowrap overflow-hidden text-ellipsis'
        >
          {title}
        </h6>
        <p className='text-icon-grey text-sm text-left'>{description}</p>
      </div>
    </div>
  );
};

export default Tooltip;
