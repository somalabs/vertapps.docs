import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'VERTAPPS',
  tagline: 'Documentação oficial do time de apps AZZAS',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://somalabs.github.io',
  baseUrl: '/vertapps.docs/',

  organizationName: 'somalabs',
  projectName: 'vertapps.docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/somalabs/vertapps.docs/tree/main/website/',
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'VERTAPPS',
      logo: {
        alt: 'VERTAPPS',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentação',
        },
        {
          to: '/docs/processos',
          label: 'Processos',
          position: 'left',
        },
        {
          to: '/docs/skills-release',
          label: 'Skills de Release',
          position: 'left',
        },
        {
          href: 'https://github.com/somalabs/vertapps.docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentação',
          items: [
            {label: 'Início', to: '/docs/intro'},
            {label: 'Padrão visual e de escrita', to: '/docs/padrao/tema'},
            {label: 'Como contribuir', to: '/docs/padrao/como-escrever'},
          ],
        },
        {
          title: 'Operação',
          items: [
            {label: 'Processos', to: '/docs/processos'},
            {label: 'Skills de Release', to: '/docs/skills-release'},
            {label: 'Guia rápido de release', to: '/docs/skills-release/guia-rapido'},
          ],
        },
        {
          title: 'Repos',
          items: [
            {
              label: 'vertapps.docs',
              href: 'https://github.com/somalabs/vertapps.docs',
            },
            {
              label: 'vertapps.skills',
              href: 'https://github.com/somalabs/vertapps.skills',
            },
          ],
        },
      ],
      copyright: `VERTAPPS · Documentação interna AZZAS · ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash', 'json', 'dart', 'yaml'],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
