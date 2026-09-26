/* eslint-disable */
// @ts-nocheck
// Regenerated: marketing routes under /systems/* + core pages

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as ComposeRouteImport } from './routes/compose'
import { Route as RegistryRouteImport } from './routes/registry'
import { Route as SystemsRouteImport } from './routes/systems'
import { Route as SystemsIndexRouteImport } from './routes/systems/index'
import { Route as SystemsBusinessRouteImport } from './routes/systems/business'
import { Route as SystemsAssuranceRouteImport } from './routes/systems/assurance'
import { Route as SystemsIntelligenceRouteImport } from './routes/systems/intelligence'
import { Route as SystemsVerticalOsRouteImport } from './routes/systems/vertical-os'
import { Route as SystemsVoiceRouteImport } from './routes/systems/voice'
import { Route as AuditRouteImport } from './routes/audit'
import { Route as ControlPlaneRouteImport } from './routes/control-plane'
import { Route as InsightsRouteImport } from './routes/insights'
import { Route as PartnersRouteImport } from './routes/partners'
import { Route as PlatformRouteImport } from './routes/platform'
import { Route as ResearchRouteImport } from './routes/research'

const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)
const ComposeRoute = ComposeRouteImport.update({ id: '/compose', path: '/compose', getParentRoute: () => rootRouteImport } as any)
const RegistryRoute = RegistryRouteImport.update({ id: '/registry', path: '/registry', getParentRoute: () => rootRouteImport } as any)
const SystemsRoute = SystemsRouteImport.update({ id: '/systems', path: '/systems', getParentRoute: () => rootRouteImport } as any)
const SystemsIndexRoute = SystemsIndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => SystemsRoute } as any)
const SystemsBusinessRoute = SystemsBusinessRouteImport.update({ id: '/business', path: '/business', getParentRoute: () => SystemsRoute } as any)
const SystemsAssuranceRoute = SystemsAssuranceRouteImport.update({ id: '/assurance', path: '/assurance', getParentRoute: () => SystemsRoute } as any)
const SystemsIntelligenceRoute = SystemsIntelligenceRouteImport.update({ id: '/intelligence', path: '/intelligence', getParentRoute: () => SystemsRoute } as any)
const SystemsVerticalOsRoute = SystemsVerticalOsRouteImport.update({ id: '/vertical-os', path: '/vertical-os', getParentRoute: () => SystemsRoute } as any)
const SystemsVoiceRoute = SystemsVoiceRouteImport.update({ id: '/voice', path: '/voice', getParentRoute: () => SystemsRoute } as any)
const AuditRoute = AuditRouteImport.update({ id: '/audit', path: '/audit', getParentRoute: () => rootRouteImport } as any)
const ControlPlaneRoute = ControlPlaneRouteImport.update({ id: '/control-plane', path: '/control-plane', getParentRoute: () => rootRouteImport } as any)
const InsightsRoute = InsightsRouteImport.update({ id: '/insights', path: '/insights', getParentRoute: () => rootRouteImport } as any)
const PartnersRoute = PartnersRouteImport.update({ id: '/partners', path: '/partners', getParentRoute: () => rootRouteImport } as any)
const PlatformRoute = PlatformRouteImport.update({ id: '/platform', path: '/platform', getParentRoute: () => rootRouteImport } as any)
const ResearchRoute = ResearchRouteImport.update({ id: '/research', path: '/research', getParentRoute: () => rootRouteImport } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/compose': typeof ComposeRoute
  '/registry': typeof RegistryRoute
  '/systems': typeof SystemsRouteWithChildren
  '/systems/': typeof SystemsIndexRoute
  '/systems/business': typeof SystemsBusinessRoute
  '/systems/assurance': typeof SystemsAssuranceRoute
  '/systems/intelligence': typeof SystemsIntelligenceRoute
  '/systems/vertical-os': typeof SystemsVerticalOsRoute
  '/systems/voice': typeof SystemsVoiceRoute
  '/audit': typeof AuditRoute
  '/control-plane': typeof ControlPlaneRoute
  '/insights': typeof InsightsRoute
  '/partners': typeof PartnersRoute
  '/platform': typeof PlatformRoute
  '/research': typeof ResearchRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/compose': typeof ComposeRoute
  '/registry': typeof RegistryRoute
  '/systems': typeof SystemsIndexRoute
  '/systems/business': typeof SystemsBusinessRoute
  '/systems/assurance': typeof SystemsAssuranceRoute
  '/systems/intelligence': typeof SystemsIntelligenceRoute
  '/systems/vertical-os': typeof SystemsVerticalOsRoute
  '/systems/voice': typeof SystemsVoiceRoute
  '/audit': typeof AuditRoute
  '/control-plane': typeof ControlPlaneRoute
  '/insights': typeof InsightsRoute
  '/partners': typeof PartnersRoute
  '/platform': typeof PlatformRoute
  '/research': typeof ResearchRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/compose': typeof ComposeRoute
  '/registry': typeof RegistryRoute
  '/systems': typeof SystemsRouteWithChildren
  '/systems/': typeof SystemsIndexRoute
  '/systems/business': typeof SystemsBusinessRoute
  '/systems/assurance': typeof SystemsAssuranceRoute
  '/systems/intelligence': typeof SystemsIntelligenceRoute
  '/systems/vertical-os': typeof SystemsVerticalOsRoute
  '/systems/voice': typeof SystemsVoiceRoute
  '/audit': typeof AuditRoute
  '/control-plane': typeof ControlPlaneRoute
  '/insights': typeof InsightsRoute
  '/partners': typeof PartnersRoute
  '/platform': typeof PlatformRoute
  '/research': typeof ResearchRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/compose' | '/registry' | '/systems' | '/systems/' | '/systems/business' | '/systems/assurance' | '/systems/intelligence' | '/systems/vertical-os' | '/systems/voice' | '/audit' | '/control-plane' | '/insights' | '/partners' | '/platform' | '/research'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/compose' | '/registry' | '/systems' | '/systems/business' | '/systems/assurance' | '/systems/intelligence' | '/systems/vertical-os' | '/systems/voice' | '/audit' | '/control-plane' | '/insights' | '/partners' | '/platform' | '/research'
  id: '__root__' | '/' | '/compose' | '/registry' | '/systems' | '/systems/' | '/systems/business' | '/systems/assurance' | '/systems/intelligence' | '/systems/vertical-os' | '/systems/voice' | '/audit' | '/control-plane' | '/insights' | '/partners' | '/platform' | '/research'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ComposeRoute: typeof ComposeRoute
  RegistryRoute: typeof RegistryRoute
  SystemsRoute: typeof SystemsRouteWithChildren
  AuditRoute: typeof AuditRoute
  ControlPlaneRoute: typeof ControlPlaneRoute
  InsightsRoute: typeof InsightsRoute
  PartnersRoute: typeof PartnersRoute
  PlatformRoute: typeof PlatformRoute
  ResearchRoute: typeof ResearchRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
    '/compose': { id: '/compose'; path: '/compose'; fullPath: '/compose'; preLoaderRoute: typeof ComposeRouteImport; parentRoute: typeof rootRouteImport }
    '/registry': { id: '/registry'; path: '/registry'; fullPath: '/registry'; preLoaderRoute: typeof RegistryRouteImport; parentRoute: typeof rootRouteImport }
    '/systems': { id: '/systems'; path: '/systems'; fullPath: '/systems'; preLoaderRoute: typeof SystemsRouteImport; parentRoute: typeof rootRouteImport }
    '/systems/': { id: '/systems/'; path: '/'; fullPath: '/systems/'; preLoaderRoute: typeof SystemsIndexRouteImport; parentRoute: typeof SystemsRoute }
    '/systems/business': { id: '/systems/business'; path: '/business'; fullPath: '/systems/business'; preLoaderRoute: typeof SystemsBusinessRouteImport; parentRoute: typeof SystemsRoute }
    '/systems/assurance': { id: '/systems/assurance'; path: '/assurance'; fullPath: '/systems/assurance'; preLoaderRoute: typeof SystemsAssuranceRouteImport; parentRoute: typeof SystemsRoute }
    '/systems/intelligence': { id: '/systems/intelligence'; path: '/intelligence'; fullPath: '/systems/intelligence'; preLoaderRoute: typeof SystemsIntelligenceRouteImport; parentRoute: typeof SystemsRoute }
    '/systems/vertical-os': { id: '/systems/vertical-os'; path: '/vertical-os'; fullPath: '/systems/vertical-os'; preLoaderRoute: typeof SystemsVerticalOsRouteImport; parentRoute: typeof SystemsRoute }
    '/systems/voice': { id: '/systems/voice'; path: '/voice'; fullPath: '/systems/voice'; preLoaderRoute: typeof SystemsVoiceRouteImport; parentRoute: typeof SystemsRoute }
    '/audit': { id: '/audit'; path: '/audit'; fullPath: '/audit'; preLoaderRoute: typeof AuditRouteImport; parentRoute: typeof rootRouteImport }
    '/control-plane': { id: '/control-plane'; path: '/control-plane'; fullPath: '/control-plane'; preLoaderRoute: typeof ControlPlaneRouteImport; parentRoute: typeof rootRouteImport }
    '/insights': { id: '/insights'; path: '/insights'; fullPath: '/insights'; preLoaderRoute: typeof InsightsRouteImport; parentRoute: typeof rootRouteImport }
    '/partners': { id: '/partners'; path: '/partners'; fullPath: '/partners'; preLoaderRoute: typeof PartnersRouteImport; parentRoute: typeof rootRouteImport }
    '/platform': { id: '/platform'; path: '/platform'; fullPath: '/platform'; preLoaderRoute: typeof PlatformRouteImport; parentRoute: typeof rootRouteImport }
    '/research': { id: '/research'; path: '/research'; fullPath: '/research'; preLoaderRoute: typeof ResearchRouteImport; parentRoute: typeof rootRouteImport }
  }
}

interface SystemsRouteChildren {
  SystemsIndexRoute: typeof SystemsIndexRoute
  SystemsBusinessRoute: typeof SystemsBusinessRoute
  SystemsAssuranceRoute: typeof SystemsAssuranceRoute
  SystemsIntelligenceRoute: typeof SystemsIntelligenceRoute
  SystemsVerticalOsRoute: typeof SystemsVerticalOsRoute
  SystemsVoiceRoute: typeof SystemsVoiceRoute
}
const SystemsRouteChildren: SystemsRouteChildren = {
  SystemsIndexRoute, SystemsBusinessRoute, SystemsAssuranceRoute,
  SystemsIntelligenceRoute, SystemsVerticalOsRoute, SystemsVoiceRoute,
}
const SystemsRouteWithChildren = SystemsRoute._addFileChildren(SystemsRouteChildren)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute, ComposeRoute, RegistryRoute, SystemsRoute: SystemsRouteWithChildren,
  AuditRoute, ControlPlaneRoute, InsightsRoute, PartnersRoute, PlatformRoute, ResearchRoute,
}
export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { createStart } from '@tanstack/react-start'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
  }
}
