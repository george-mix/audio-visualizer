import type { VueElement } from 'vue'
import type { AppLayoutEnum } from '@/layouts/layouts.types'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: AppLayoutEnum
    layoutComponent?: VueElement
  }
}

export enum RouteNameEnum {
  home = 'home'
}
