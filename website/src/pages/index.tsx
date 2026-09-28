import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

type HomeCard = {
  title: string;
  description: string;
  to: string;
  tone: string;
};

const cards: HomeCard[] = [
  {
    title: 'Padrão de documentação',
    description: 'Tema, tokens, tom de escrita e como publicar uma página nova.',
    to: '/docs/padrao/tema',
    tone: styles.cardCoral,
  },
  {
    title: 'Processos App Plataforma × App Custom',
    description: 'Fluxos, arquitetura, releases e automações do time.',
    to: '/docs/processos',
    tone: styles.cardBlue,
  },
  {
    title: 'Skills de Release',
    description: 'brand-release, post-brand-release, gates e lessons.',
    to: '/docs/skills-release',
    tone: styles.cardTeal,
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="Documentação oficial"
      description="Documentação interna do time de apps AZZAS — VERTAPPS.">
      <main className={styles.page}>
        <div className={styles.wrap}>
          <p className={styles.kicker}>AZZAS · Time de apps</p>
          <Heading as="h1" className={styles.title}>
            VERTAPPS
          </Heading>
          <p className={styles.lead}>
            Documentação oficial do time. Mesmo tema visual da apresentação de
            reestruturação: escuro quente, sóbrio e executivo.
          </p>
          <div className={styles.chips}>
            <span className={clsx(styles.chip, styles.chipPlat)}>
              App Plataforma
            </span>
            <span className={clsx(styles.chip, styles.chipCustom)}>
              App Custom
            </span>
            <span className={clsx(styles.chip, styles.chipRelease)}>
              Release & Qualidade
            </span>
          </div>
          <ul className={styles.list}>
            {cards.map((card) => (
              <li key={card.to}>
                <Link className={clsx(styles.card, card.tone)} to={card.to}>
                  <strong>{card.title}</strong>
                  <span>{card.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </Layout>
  );
}
