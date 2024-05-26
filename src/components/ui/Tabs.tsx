import React, { useState, ReactNode } from 'react';

interface TabProps {
  label: string;
  children: ReactNode;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    newActiveTab: string,
  ) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='flex w-max'>
        {children.map((child) => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label
                ? 'text-blue-500 bg-gray-100 dark:bg-slate-900 rounded-t-md'
                : 'text-gray-500'
            } font-semibold py-2 px-8`}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className=''>
        {children.map((child) => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab: React.FC<TabProps> = ({ label, children }) => {
  return (
    <div data-label={label} className='hidden'>
      {children}
    </div>
  );
};

export { Tabs, Tab };
