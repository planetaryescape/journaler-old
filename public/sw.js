if(!self.define){let e,a={};const s=(s,c)=>(s=new URL(s+".js",c).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(a[t])return;let n={};const d=e=>s(e,t),f={module:{uri:t},exports:n,require:d};a[t]=Promise.all(c.map((e=>f[e]||d(e)))).then((e=>(i(...e),n)))}}define(["./workbox-2e6be583"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"6e968aa31aaa8a8524ec566e9d2cbe69"},{url:"/_next/static/chunks/164-1944e3ff4f02344f.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/164-1944e3ff4f02344f.js.map",revision:"da607c9f12ddc6414ab897ce21d67380"},{url:"/_next/static/chunks/17-0db3410dfd1e048d.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/17-0db3410dfd1e048d.js.map",revision:"ac9a33931db357798d09ea02326e0ecf"},{url:"/_next/static/chunks/296-0d2a21b7af2b10ad.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/296-0d2a21b7af2b10ad.js.map",revision:"76c0b7690823e73db14670f101233f2f"},{url:"/_next/static/chunks/323-357b6827ec238484.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/323-357b6827ec238484.js.map",revision:"8c560fe64aaa2704a21e69996b89030a"},{url:"/_next/static/chunks/453-db64f39ce61122c3.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/453-db64f39ce61122c3.js.map",revision:"10bebad4c7bed645514014a9c0360d3c"},{url:"/_next/static/chunks/718-1ffffc5891e425cb.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/718-1ffffc5891e425cb.js.map",revision:"a203d6c7feab64a3f2e535c7074e60e8"},{url:"/_next/static/chunks/74-40297fceb2f2d962.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/74-40297fceb2f2d962.js.map",revision:"59a8dfec5e3b62f3c3850f6b34ab00cf"},{url:"/_next/static/chunks/806-6a7b052f7d541a02.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/806-6a7b052f7d541a02.js.map",revision:"d881a0b466b3bc8b7f7053fc058a9425"},{url:"/_next/static/chunks/84fbfe7f-04dab875ba06aa4e.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/84fbfe7f-04dab875ba06aa4e.js.map",revision:"9d756c6259afec8d69a5d8db6603918b"},{url:"/_next/static/chunks/856-8f3a475c9db5b7e1.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/856-8f3a475c9db5b7e1.js.map",revision:"579a55dc227f8b0253136ce212545969"},{url:"/_next/static/chunks/990-82b4a7d2d4d9ccb2.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/990-82b4a7d2d4d9ccb2.js.map",revision:"daaf8fda3de1e8ce4aa0871f21a98892"},{url:"/_next/static/chunks/991-2d540b8169847809.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/991-2d540b8169847809.js.map",revision:"ff77671e3b08d45531f9935c22f5e9cc"},{url:"/_next/static/chunks/app/(auth)/layout-11b1878374dc49cb.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/(auth)/sign-in/%5B%5B...sign-in%5D%5D/page-759ea3bffb66c73a.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/(auth)/sign-in/%5B%5B...sign-in%5D%5D/page-759ea3bffb66c73a.js.map",revision:"0a68fe4cd6a755ae5f022b04ed6465cb"},{url:"/_next/static/chunks/app/(auth)/sign-up/%5B%5B...sign-up%5D%5D/page-976f9a3d122c1fcb.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/(auth)/sign-up/%5B%5B...sign-up%5D%5D/page-976f9a3d122c1fcb.js.map",revision:"6232235bbac11ef8ff576dc30d1ee0f4"},{url:"/_next/static/chunks/app/(dashboard)/dashboard/layout-6f80b9858246df6f.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/(dashboard)/dashboard/page-543ecafb3b86ba2c.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/(dashboard)/dashboard/page-543ecafb3b86ba2c.js.map",revision:"73200c2ad471713edabd117f4f0efae3"},{url:"/_next/static/chunks/app/(legal)/cookies/page-a99824df6c72183f.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/(legal)/layout-c762ad114afa39d3.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/(legal)/privacy/page-33ba44baa4c3334c.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/(marketing)/create-prompt/page-ef70a4cc097ac5e4.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/(marketing)/page-d7fdc07358bbc91e.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/(marketing)/page-d7fdc07358bbc91e.js.map",revision:"3ab672298a8e3cbe918d40743145bb66"},{url:"/_next/static/chunks/app/(marketing)/prompts/%5Bid%5D/page-9793d10f36abf7cd.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/(marketing)/prompts/%5Bid%5D/page-9793d10f36abf7cd.js.map",revision:"84155f9ec27600c2ec430021b438ed41"},{url:"/_next/static/chunks/app/(marketing)/prompts/page-0d3a8ec597261daa.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/(marketing)/prompts/page-0d3a8ec597261daa.js.map",revision:"3354f5e1bd6560032619ef20d914e5ce"},{url:"/_next/static/chunks/app/_not-found/page-c14d683deec72bed.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/_not-found/page-c14d683deec72bed.js.map",revision:"275adfae6af74f4eed1b756e4ac19bdc"},{url:"/_next/static/chunks/app/account/prompts/%5Bid%5D/page-34b4f47383c75992.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/account/prompts/%5Bid%5D/page-34b4f47383c75992.js.map",revision:"43e23dbf1d252e79bec4a418627a8d84"},{url:"/_next/static/chunks/app/account/prompts/new/page-7aa66f62c1c061bb.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/account/prompts/new/page-7aa66f62c1c061bb.js.map",revision:"1e34296c933dad1052730afac02a4d41"},{url:"/_next/static/chunks/app/account/prompts/page-07ddce772493f2fc.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/account/prompts/page-07ddce772493f2fc.js.map",revision:"d507eeffde7c55a721ec7543136b75d4"},{url:"/_next/static/chunks/app/global-error-14edb59889d29cf4.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/global-error-14edb59889d29cf4.js.map",revision:"8ef953c84285e5623011f90343420f7f"},{url:"/_next/static/chunks/app/layout-e1d79cae31ce718e.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/app/layout-e1d79cae31ce718e.js.map",revision:"ea68d2fbb26d3708904f777cbe48f795"},{url:"/_next/static/chunks/c4e3e400-d1ed4625361a7194.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/c4e3e400-d1ed4625361a7194.js.map",revision:"5a8f4c59deca358daee6736ed7a8f6ba"},{url:"/_next/static/chunks/c8915400-bd3ecbdca9efc23f.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/c8915400-bd3ecbdca9efc23f.js.map",revision:"2442231842b4ef51113fb88f921872f3"},{url:"/_next/static/chunks/framework-66a8e106fc24f6d8.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/framework-66a8e106fc24f6d8.js.map",revision:"03e2bd84c28fa4edf0368c0402fc081b"},{url:"/_next/static/chunks/main-36eaba936dbacd11.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/main-36eaba936dbacd11.js.map",revision:"36999f514d4f6e0d55e69e53ae4c8e5c"},{url:"/_next/static/chunks/main-app-39002fc67d6b854d.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/main-app-39002fc67d6b854d.js.map",revision:"98deea1cf5be79fdce702e8dffc16029"},{url:"/_next/static/chunks/pages/_app-1066778ee2c97555.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/pages/_app-1066778ee2c97555.js.map",revision:"dffe73f54670510950c9dfc96a81e08f"},{url:"/_next/static/chunks/pages/_error-0002b4c396aa2308.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/pages/_error-0002b4c396aa2308.js.map",revision:"dfec6fb2ebe6be1eaebb98f1a0641b0c"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-ffbaaaab1bd52276.js",revision:"d2DA_qREDz3DX3VHg8sha"},{url:"/_next/static/chunks/webpack-ffbaaaab1bd52276.js.map",revision:"75efdcdc6901479832c05f79d24f6354"},{url:"/_next/static/css/4a92f1a5e318d8f3.css",revision:"4a92f1a5e318d8f3"},{url:"/_next/static/css/4a92f1a5e318d8f3.css.map",revision:"7c5b6ee496fa9f6990a2e6e9da58a385"},{url:"/_next/static/css/cd268a89b74f13a6.css",revision:"cd268a89b74f13a6"},{url:"/_next/static/css/cd268a89b74f13a6.css.map",revision:"7e83c91d0ec689b0cc64a766ba6a67a4"},{url:"/_next/static/d2DA_qREDz3DX3VHg8sha/_buildManifest.js",revision:"2bd7cc2d85ffcd1717c6e4db4a0a8528"},{url:"/_next/static/d2DA_qREDz3DX3VHg8sha/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/062522b8b7c3ad6a-s.woff2",revision:"0f347a32b2168180dbc514e104ab207c"},{url:"/_next/static/media/07103e16d41c9190-s.woff2",revision:"865bfc77817e078122fba2ff0a8e259c"},{url:"/_next/static/media/0fb93cc812fb4b50-s.woff2",revision:"a18ad80bf268ef612116d884c2af418f"},{url:"/_next/static/media/13017c58cf72aedd-s.woff2",revision:"6007c746e2785673234104b918d8e3ec"},{url:"/_next/static/media/19e37deead9b3ec2-s.woff2",revision:"8f919c25620e7f246b5abcfa979922bf"},{url:"/_next/static/media/32702a3715dbd7c1-s.woff2",revision:"8c6c9a0ed2815ab4659cf6f10388aea2"},{url:"/_next/static/media/38ebcf0298551099-s.woff2",revision:"033d8b2a4bd7fddccb3e0b891f65ebbe"},{url:"/_next/static/media/3d9ea938b6afa941-s.p.woff2",revision:"ee1b2a154fb9ea98a28413a839adedfb"},{url:"/_next/static/media/46392699924ae7e5-s.woff2",revision:"467f697ccbe92aebc38f6c1a433f6948"},{url:"/_next/static/media/6dc02f179ba8da8f-s.woff2",revision:"ec321a873a0a3dbb51083da484c6182c"},{url:"/_next/static/media/6fed4e5749a3ea15-s.woff2",revision:"bd04001574d461203c7264ac27d8c504"},{url:"/_next/static/media/7b9ca6a1d31c5662-s.p.woff2",revision:"817c5aeb992050a67c54c8bf028a28a8"},{url:"/_next/static/media/83651bee47cf14da-s.woff2",revision:"d2bb91b14d5895c91741b933a76be9c0"},{url:"/_next/static/media/84a39d905077a976-s.woff2",revision:"cd3fed32b75d04b79cf48a95ef63b9a5"},{url:"/_next/static/media/931105f8d96e7f26-s.p.woff2",revision:"6d1f2c44bd135848c7321937f7371e37"},{url:"/_next/static/media/9450a5aa688b86af-s.woff2",revision:"ad7ab63936b2f4518d04ebbdf704c8ca"},{url:"/_next/static/media/9beef36ab83de3f0-s.woff2",revision:"82c2dc97217d32c57a029754fda91e4e"},{url:"/_next/static/media/b0059268cc419911-s.woff2",revision:"a7f4b74ef28825cce3f205bff67c9323"},{url:"/_next/static/media/b53e832d745212bc-s.woff2",revision:"330dec86fdfff71ea576b1456aa8b1d3"},{url:"/_next/static/media/bd2489da38fb1d0b-s.woff2",revision:"ca4dd28ee25e096804bbb0dab6fc7dfe"},{url:"/_next/static/media/c7a495162773a63f-s.p.woff2",revision:"7db919af8577843004c4b5f564d9aa23"},{url:"/_next/static/media/dd4ab5b525bd804a-s.woff2",revision:"b505d29c0021c60e4a004de0b5fea45f"},{url:"/_next/static/media/e6f5886ae1242622-s.woff2",revision:"e64d3f79602912c46c2b4d7f26dcadb8"},{url:"/_next/static/media/e80e9c14bdf82dd6-s.woff2",revision:"5b9e8288b8eac8b9b5c9239e1e7c8eeb"},{url:"/_next/static/media/ef3f4e253ce73be8-s.woff2",revision:"87b8cf1c8e2380fe1e3c000bd48ed5c6"},{url:"/_next/static/media/f0b16be9a95e8820-s.woff2",revision:"48487e645e8bd5ac883f1175b4efdfe0"},{url:"/_next/static/media/f1d4c48219b1bd72-s.woff2",revision:"e46df47bb1e1cf796f08f67211174cef"},{url:"/_next/static/media/f2988470e2e746be-s.woff2",revision:"89143b5f41037c26ec098f61cff925dc"},{url:"/_next/static/media/faac4ac11aa3d97b-s.woff2",revision:"9cb88d5b1ed3ff5796eefc9e62af1b8e"},{url:"/_next/static/media/fbdbe464b9e5cc95-s.p.woff2",revision:"10d972b68f617d88f222c728a169e5f2"},{url:"/android-chrome-192x192.png",revision:"c0f74e753642417a082de6fda42a4d18"},{url:"/android-chrome-512x512.png",revision:"d15f3dc09dc06cf3f33f1a80fbed2961"},{url:"/apple-touch-icon.png",revision:"66c5fbe1c420ce78d3df253c001b7089"},{url:"/favicon-16x16.png",revision:"82cb3353d73f7b134d6853304e852d14"},{url:"/favicon-32x32.png",revision:"5df8f2370be84bc1a3b29e2e0824b61a"},{url:"/favicon.ico",revision:"e5bab681dffd509dbcc9467c87e9e619"},{url:"/logo-dark.png",revision:"fc0bad45dd8be5c8862e2f4bbfc20c2c"},{url:"/logo-light.png",revision:"00acc3ba9c859daa411c61e384d5b903"},{url:"/logo-small-dark.png",revision:"f6247b77b0cb104fd261bc3252ada3fa"},{url:"/logo-small-light.png",revision:"b67afaa2cf1c05e1c0e2c9fb2d166c16"},{url:"/logo-square.png",revision:"b2a5e1a92cbd1fb4da8c33f01cbec9dc"},{url:"/site.webmanifest",revision:"d0a807221cf405b64abfe05d38c778a7"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:c})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
//# sourceMappingURL=sw.js.map
