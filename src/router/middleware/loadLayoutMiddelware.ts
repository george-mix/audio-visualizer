import type { RouteLocationNormalized } from 'vue-router'
import { AppLayoutEnum, AppLayoutToFileMap } from '@/layouts/layouts.types'

export async function loadLayoutMiddleware(route: RouteLocationNormalized): Promise<void> {
  const { layout } = route.meta
  const normalizedLayoutName = layout || AppLayoutEnum.default
  const fileName = AppLayoutToFileMap[normalizedLayoutName]
  const fileNameWithoutExtension = fileName.split('.vue')[0]

  const component = await import(`../../layouts/${fileNameWithoutExtension}.vue`)

  route.meta.layoutComponent = component.default
}
