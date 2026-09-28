import type {ReactNode} from 'react';
import clsx from 'clsx';

export type ChipTone =
  | 'coral'
  | 'teal'
  | 'amber'
  | 'blue'
  | 'purple'
  | 'pink';

export default function Chip({
  children,
  tone,
}: {
  children: ReactNode;
  tone?: ChipTone;
}): ReactNode {
  return (
    <span className={clsx('azzas-chip', tone && `azzas-chip--${tone}`)}>
      {children}
    </span>
  );
}

export function Chips({children}: {children: ReactNode}): ReactNode {
  return <div className="azzas-chips">{children}</div>;
}
