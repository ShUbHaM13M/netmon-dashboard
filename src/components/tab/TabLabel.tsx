import { useEffect, useRef } from 'react';

export interface ITabLabelProps {
  icon: React.ReactNode;
  title: string;
  selected: boolean;
  onClick: () => void;
}

const TabLabel = ({ title, icon, onClick, selected }: ITabLabelProps) => {
  const tabLabelRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selected && tabLabelRef.current)
      tabLabelRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
  }, [selected]);

  return (
    <button
      ref={tabLabelRef}
      className={`flex gap-2 items-center py-[18px] pl-1 pr-3 min-w-fit relative after:absolute after:bottom-[-1px] after:h-0.5 after:w-full after:left-0 transition-colors ease-out duration-150 after:transition-colors after:ease-out after:duration-150 
      ${
        selected
          ? 'text-brand-orange stroke-brand-orange after:bg-brand-orange'
          : 'text-icon-grey stroke-icon-grey  after:bg-transparent'
      }`}
      onClick={onClick}
    >
      {icon}
      {title}
    </button>
  );
};

export default TabLabel;
