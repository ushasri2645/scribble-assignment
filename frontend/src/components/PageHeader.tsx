interface PageHeaderProps {
  kicker: string;
  title: string;
  description: string;
}

export function PageHeader({ kicker, title, description }: PageHeaderProps) {
  return (
    <div className="page-header">
      <span className="section-kicker">{kicker}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
