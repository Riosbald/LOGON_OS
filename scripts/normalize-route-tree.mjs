#!/usr/bin/env node
/**
 * Keep TanStack Router's checked-in route tree strict. The generator emits a
 * broad cast for its private route metadata; this post-generation step gives
 * that metadata an explicit structural type without suppressing diagnostics.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const routeTreePath = fileURLToPath(new URL("../src/routeTree.gen.ts", import.meta.url));
const metadata = `type RouteTreeNodeMetadata = {
  id: string;
  path: string;
  getParentRoute: () => unknown;
};`;

const source = readFileSync(routeTreePath, "utf8");
const withType = source.includes("type RouteTreeNodeMetadata")
  ? source
  : source.replace(
      "// noinspection JSUnusedGlobalSymbols",
      `// noinspection JSUnusedGlobalSymbols\n\n${metadata}`,
    );

const routeNames = [...withType.matchAll(/const (\w+Route) = \w+RouteImport\.update\(/g)].map(
  ([, routeName]) => routeName,
);
let routeIndex = 0;
const normalized = withType.replace(/\} as \w+\)/g, (match) => {
  const routeName = routeNames[routeIndex];
  routeIndex += 1;
  if (routeName === undefined) return match;
  return `} as unknown as Parameters<typeof ${routeName}Import.update>[0] & RouteTreeNodeMetadata)`;
});

if (routeIndex !== routeNames.length) {
  throw new Error(`Expected ${routeNames.length} generated route metadata casts, found ${routeIndex}`);
}

if (normalized !== source) writeFileSync(routeTreePath, normalized);
