import type {ReactNode} from 'react';
import clsx from 'clsx';

export type CardTone = 'coral' | 'teal' | 'amber' | 'blue' | 'purple' | 'pink';

export default function DocCard({
  title,
  children,
  tone = 'coral',
}: {
  title: string;
  children: ReactNode;
  tone?: CardTone;
}): ReactNode {
  return (
    <article className={clsx('azzas-card', `azzas-card--${tone}`)}>
      <h3 className="azzas-card__title">{title}</h3>
      <div className="azzas-card__body">{children}</div>
    </article>
  );
}

export function CardGrid({children}: {children: ReactNode}): ReactNode {
  return <div className="azzas-cards">{children}</div>;
}
