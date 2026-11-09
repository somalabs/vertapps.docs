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

  markdown: {
    mermaid: true,
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['pt', 'en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: false,
        explicitSearchResultPath: true,
        searchBarShortcutHint: true,
        searchResultLimits: 8,
      },
    ],
  ],

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  plugins: ['docusaurus-plugin-image-zoom'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
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
    zoom: {
      selector: '.theme-doc-markdown img',
      background: {
        light: 'rgba(22, 20, 15, 0.92)',
        dark: 'rgba(22, 20, 15, 0.92)',
      },
      config: {
        margin: 24,
      },
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
          to: '/docs/strapi',
          label: 'Strapi',
          position: 'left',
        },
        {
          to: '/docs/geral',
          label: 'Geral',
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
      links: [],
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
