import type {ReactNode} from 'react';
import Chip, {type ChipTone} from './Chip';

export default function DocTitle({
  children,
  brand,
  tone = 'amber',
}: {
  children: ReactNode;
  brand?: string;
  tone?: ChipTone;
}): ReactNode {
  return (
    <h1 className="azzas-doc-title">
      <span className="azzas-doc-title__text">{children}</span>
      {brand ? <Chip tone={tone}>{brand}</Chip> : null}
    </h1>
  );
}
