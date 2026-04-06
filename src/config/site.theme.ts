import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'editorial',
  hero: {
    variant: 'spotlight-split',
    eyebrow: 'Premium multi-surface publishing system',
  },
  home: {
    layout: 'editorial-rhythm',
    primaryTask: 'sbm',
    featuredTaskKeys: ['sbm', 'profile', 'article'],
  },
  navigation: {
    variant: 'editorial',
  },
  footer: {
    variant: 'editorial',
  },
  cards: {
    listing: 'editorial-feature',
    article: 'editorial-feature',
    image: 'studio-panel',
    profile: 'studio-panel',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'editorial-feature',
    social: 'studio-panel',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})
