export type PageHeaderProps = {
  title: string;
  accessoryRight?: React.ReactNode;
};

const PageHeader: React.FC<PageHeaderProps> = ({ title, accessoryRight }) => {
  return (
    <section className="flex items-center justify-between h-14">
      <h2 className="text-xl font-semibold">{title}</h2>
      {accessoryRight ? <div>{accessoryRight}</div> : null}
    </section>
  );
};

export default PageHeader;
