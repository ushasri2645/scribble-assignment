import type { PropsWithChildren, ReactNode } from "react";

interface CardProps extends PropsWithChildren {
  title: string;
  badge?: string;
  footer?: ReactNode;
}

export function Card({ title, badge, footer, children }: CardProps) {
  return (
    <article className="card">
      <header className="card__header">
        {badge ? <span className="card__badge">{badge}</span> : null}
        <h2>{title}</h2>
      </header>
      <div className="card__body">{children}</div>
      {footer ? <footer className="card__footer">{footer}</footer> : null}
    </article>
  );
}
