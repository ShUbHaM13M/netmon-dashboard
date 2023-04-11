import { useState } from 'react';
import TabLabel, { ITabLabelProps } from './TabLabel';

interface ITabContainerProps {
  children: React.ReactElement<ITabLabelProps>[];
}

const TabContainer = ({ children }: ITabContainerProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className='text-icon-white w-full'>
      <div
        className='flex relative gap-4 hide-scroll items-center overflow-x-auto 
				border-b border-card-light
				mb-4 sm:mb-6'
      >
        {children.map((tab, index) => {
          return (
            <TabLabel
              key={index}
              title={tab.props.title}
              icon={tab.props.icon}
              selected={index === selectedTab}
              onClick={() => setSelectedTab(index)}
            />
          );
        })}
      </div>
      {children[selectedTab]}
    </div>
  );
};

export default TabContainer;
