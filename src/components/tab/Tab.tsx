interface ITabProps {
  title: string;
  icon: React.ReactElement;
  children: React.ReactNode;
}

const Tab = ({ children }: ITabProps) => {
  return <div>{children}</div>;
};

export default Tab;
