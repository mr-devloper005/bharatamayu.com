import type { SiteFactoryRecipe } from '@/design/factory/types'

export const SITE_FACTORY_RECIPE: SiteFactoryRecipe = {
  brandPack: 'editorial-luxe',
  navbar: 'editorial-bar',
  footer: 'editorial-footer',
  homeLayout: 'image-profile-home',
  motionPack: 'editorial-soft',
  primaryTask: 'sbm',
  enabledTasks: ['sbm', 'profile'],
  taskLayouts: {
    sbm: 'sbm-curation',
    profile: 'profile-business',
  },
}
