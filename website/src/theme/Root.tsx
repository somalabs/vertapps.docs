import type {ReactNode} from 'react';
import ProgressBar from '@site/src/components/ProgressBar';

export default function Root({children}: {children: ReactNode}): ReactNode {
  return (
    <>
      <ProgressBar />
      {children}
    </>
  );
}
