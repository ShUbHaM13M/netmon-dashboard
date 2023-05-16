import { useEffect, useRef, useState } from 'react';
import TabLabel, { ITabLabelProps } from './TabLabel';
import ToggleButton from '../toggle-button/ToggleButton';
import SingleSelectDropdown from '../dropdown/SingleSelectDropdown';

interface ITabContainerProps {
  children: React.ReactElement<ITabLabelProps>[];
  showAutoPlay?: boolean;
  defaultSelectedTab?: number;
  onTabClick?: (tabTitle: string) => void;
}

const autoplayOptions = [
  { Text: '10 s', Value: 10 },
  { Text: '60 s', Value: 60 },
  { Text: '120 s', Value: 120 },
  { Text: '160 s', Value: 160 },
  { Text: '180 s', Value: 180 },
  { Text: '550 s', Value: 500 },
];

const TabContainer = ({
  children,
  showAutoPlay = true,
  defaultSelectedTab = 0,
  onTabClick,
}: ITabContainerProps) => {
  const [selectedTab, setSelectedTab] = useState(defaultSelectedTab);
  const [enableAutoplay, setEnableAutoplay] = useState(false);
  const [autoplayDuration, setAutoplayDuration] = useState(autoplayOptions[0].Value);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!enableAutoplay) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setSelectedTab((prev) => (prev + 1 > children.length - 1 ? 0 : prev + 1));
    }, autoplayDuration * 1000);
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, [autoplayDuration, children.length, enableAutoplay]);

  return (
    <div className='text-icon-white w-full'>
      <div className='flex flex-col md:flex-row justify-between md:items-center mb-4 md:mb-6 border-b-0 md:border-b border-card-light'>
        <div
          className='flex flex-1 relative gap-4 hide-scroll items-center overflow-x-auto 
				border-b border-card-light md:border-0'
        >
          {children.map((tab, index) => {
            return (
              <TabLabel
                key={index}
                title={tab.props.title}
                icon={tab.props.icon}
                selected={index === selectedTab}
                onClick={() => {
                  setSelectedTab(index);
                  onTabClick && onTabClick(tab.props.title);
                }}
              />
            );
          })}
        </div>
        {showAutoPlay ? (
          <div className='flex items-center gap-2 mt-4 md:mt-0 border-l-0 md:border-l border-card-light px-2'>
            <ToggleButton
              label='Autoplay'
              defaultValue={enableAutoplay}
              onValueChange={(value) => setEnableAutoplay(value)}
            />
            <SingleSelectDropdown
              disabled={!enableAutoplay}
              options={autoplayOptions}
              onValueChange={(event) => setAutoplayDuration(event.Value)}
              defaultValue={autoplayOptions[0]}
              label='Autoplay'
              showLabelInDesktop={false}
              showSearchbar={false}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      {children[selectedTab]}
    </div>
  );
};

export default TabContainer;
