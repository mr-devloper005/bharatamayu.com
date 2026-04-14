import { BRAND_PACKS } from '@/design/factory/brand-packs'
import { SITE_FACTORY_RECIPE } from '@/config/site.factory'

export function getFactoryState() {
  const brandPack = BRAND_PACKS[SITE_FACTORY_RECIPE.brandPack]
  return {
    recipe: SITE_FACTORY_RECIPE,
    brandPack,
  }
}
