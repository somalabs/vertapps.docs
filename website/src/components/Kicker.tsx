import type {ReactNode} from 'react';

export default function Kicker({children}: {children: ReactNode}): ReactNode {
  return <div className="azzas-kicker">{children}</div>;
}
