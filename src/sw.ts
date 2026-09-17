/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { createPartialResponse } from 'workbox-range-requests';
import manifests from './data/packs.json';
declare const self:ServiceWorkerGlobalScope & { __WB_MANIFEST: {url:string;revision:string|null}[] };
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();
clientsClaim();
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING') void self.skipWaiting();});
registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html'), {denylist:[/^\/media\//,/^\/audio\//,/^\/packs\//]}));
registerRoute(({url})=>url.origin===self.location.origin && /^\/(media|audio|packs)\//.test(url.pathname),async({request,url})=>{
  // Explicit package downloads must reach the network for integrity verification.
  if(request.cache==='no-store') return fetch(request);
  for(const pack of Object.values(manifests)) {
    const name=`vocabulary-pack-${pack.categoryId}--${pack.version}`;
    if(!(await caches.has(name))) continue;
    const response=await (await caches.open(name)).match(url.pathname);
    if(response) return request.headers.has('range') ? createPartialResponse(request,response) : response;
  }
  return fetch(request);
});
