import {useEffect, useState, type ReactNode} from 'react';
import styles from './styles.module.css';

export default function ProgressBar(): ReactNode {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setWidth(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={styles.bar}
      style={{width: `${width}%`}}
      aria-hidden="true"
    />
  );
}
