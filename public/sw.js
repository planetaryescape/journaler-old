if(!self.define){let e,a={};const s=(s,c)=>(s=new URL(s+".js",c).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(a[t])return;let n={};const d=e=>s(e,t),r={module:{uri:t},exports:n,require:d};a[t]=Promise.all(c.map((e=>r[e]||d(e)))).then((e=>(i(...e),n)))}}define(["./workbox-2e6be583"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"342b175b1bdabbd2e6225aeb844278bc"},{url:"/_next/static/GRH5VAkHCAlZ03obSpE6D/_buildManifest.js",revision:"d874680f4d4a5bbf3b0db29fde9e514a"},{url:"/_next/static/GRH5VAkHCAlZ03obSpE6D/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/137-14470eb85cef4e24.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/137-14470eb85cef4e24.js.map",revision:"737fd79ab4e75bd4f0888ff634b4d703"},{url:"/_next/static/chunks/1414-9b6e336b328374dc.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/1414-9b6e336b328374dc.js.map",revision:"6a5514b0517735a69e2b2f267aa1594f"},{url:"/_next/static/chunks/1612-7a4f82806ac22ebe.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/1612-7a4f82806ac22ebe.js.map",revision:"522fc96a06c3da2d48b057cf849f4db4"},{url:"/_next/static/chunks/1649-02edf23bfe85e7a2.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/1649-02edf23bfe85e7a2.js.map",revision:"1d1e5597b07adce2787d1ea3448fb257"},{url:"/_next/static/chunks/1818-61ca41b12317c327.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/1818-61ca41b12317c327.js.map",revision:"7a85d1fbbda7bd3281ac4cf32755e220"},{url:"/_next/static/chunks/2490-0526a73be2865ac4.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/2490-0526a73be2865ac4.js.map",revision:"2104ec29be5d5b3fff7209daedddecf5"},{url:"/_next/static/chunks/2964-f5296d94f8143fc2.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/2964-f5296d94f8143fc2.js.map",revision:"7d4c9597bd7768c0f66467a0cb0bda3c"},{url:"/_next/static/chunks/3093-b32ef3bf8ed0212e.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/3093-b32ef3bf8ed0212e.js.map",revision:"618abbed9e0d6a7f23da13be21eb661f"},{url:"/_next/static/chunks/3782-5d5f80ee1383517a.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/3782-5d5f80ee1383517a.js.map",revision:"99557450abcdc94a42d4df715421df67"},{url:"/_next/static/chunks/3990-9c00e4fe6390c19d.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/3990-9c00e4fe6390c19d.js.map",revision:"6c4b0d554ff265663daa975155574d59"},{url:"/_next/static/chunks/4061-d15e2f939bf9f64f.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/4061-d15e2f939bf9f64f.js.map",revision:"4960f4934c9fb61dda13b0858cdce3d6"},{url:"/_next/static/chunks/4701-8e3d57909d97fd6f.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/4701-8e3d57909d97fd6f.js.map",revision:"86b3b745856b38eb9bf132e97eb0a855"},{url:"/_next/static/chunks/4715-92f8742bf8320968.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/4715-92f8742bf8320968.js.map",revision:"25287e7408152e6592d00879900bae1e"},{url:"/_next/static/chunks/4859-e0b504c30cb10b7f.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/4859-e0b504c30cb10b7f.js.map",revision:"84abd97e2b8a100a52cc8ed2968ea47f"},{url:"/_next/static/chunks/5542-d859dc354541d26c.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/5542-d859dc354541d26c.js.map",revision:"63d881578e5bb1b9e76622e2b35ecd2e"},{url:"/_next/static/chunks/5666-501525a9cca064aa.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/5666-501525a9cca064aa.js.map",revision:"5129270c6f3bedd15d738469657a97fd"},{url:"/_next/static/chunks/5699-6cb7f2aa08c965a8.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/5699-6cb7f2aa08c965a8.js.map",revision:"91cb0eb4575c63b309bf04f14f5bc434"},{url:"/_next/static/chunks/7382-5daa676188b817fa.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/7382-5daa676188b817fa.js.map",revision:"b5ec60114d14d6cf66a01e90269b638e"},{url:"/_next/static/chunks/8101-3e791b803d4208ba.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/8101-3e791b803d4208ba.js.map",revision:"0ebe42468de3858ad36d4d7038f710e2"},{url:"/_next/static/chunks/84fbfe7f-013eb9da580191d8.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/84fbfe7f-013eb9da580191d8.js.map",revision:"f1c890b0b1a2515a066796ddab7301c5"},{url:"/_next/static/chunks/8698-5247829e90ad9acc.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/8698-5247829e90ad9acc.js.map",revision:"3a3d96bbfdae2f3c08f8b9422c2a554b"},{url:"/_next/static/chunks/8974-116788e73d43157d.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/8974-116788e73d43157d.js.map",revision:"2b9ac60618b7fd335e6b19a95f365306"},{url:"/_next/static/chunks/app/(app)/account/categories/%5Bid%5D/page-42d45ba7e42848f9.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/account/categories/%5Bid%5D/page-42d45ba7e42848f9.js.map",revision:"901176623bb5fc41fddfc87dfccc2773"},{url:"/_next/static/chunks/app/(app)/account/categories/new/page-eedfb004ea4220d6.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/account/categories/new/page-eedfb004ea4220d6.js.map",revision:"e231ceaab34732cb255bbbfca5a48d74"},{url:"/_next/static/chunks/app/(app)/account/categories/page-af9d62354bc29d48.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/account/categories/page-af9d62354bc29d48.js.map",revision:"d6bad44cdbfda7dff87a2c7231ae0ad6"},{url:"/_next/static/chunks/app/(app)/account/profile/page-fd6b9d8c02720653.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/account/profile/page-fd6b9d8c02720653.js.map",revision:"45e1241a2d167f01dc9a94026478547a"},{url:"/_next/static/chunks/app/(app)/account/prompts/%5Bid%5D/page-9a9c6c7b4786e2f8.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/account/prompts/%5Bid%5D/page-9a9c6c7b4786e2f8.js.map",revision:"284de2c30f07c278ec92592890f7daa7"},{url:"/_next/static/chunks/app/(app)/account/prompts/new/page-ebb032400f8361cb.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/account/prompts/new/page-ebb032400f8361cb.js.map",revision:"d743f3303e080a06a3c7e6d19492c40c"},{url:"/_next/static/chunks/app/(app)/categories/%5Bid%5D/page-6a493c07dbc102c3.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/categories/%5Bid%5D/page-6a493c07dbc102c3.js.map",revision:"c7fccf84ea451c950318389fcfd52c05"},{url:"/_next/static/chunks/app/(app)/categories/page-7bc3106ea7936ba8.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/categories/page-7bc3106ea7936ba8.js.map",revision:"c5ebdd781c7563fe45096f4e4dd5f9f8"},{url:"/_next/static/chunks/app/(app)/prompts/%5Bid%5D/page-9b06110fc49ab0c3.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/prompts/%5Bid%5D/page-9b06110fc49ab0c3.js.map",revision:"288cdf9ace114fdb48e4229d05ccea1e"},{url:"/_next/static/chunks/app/(app)/prompts/all-time/page-9ce0316ae06427f2.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/prompts/all-time/page-9ce0316ae06427f2.js.map",revision:"5dc2ab935b105bea14ecc042d8def0c1"},{url:"/_next/static/chunks/app/(app)/prompts/latest/page-bd82c53cb2b22459.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/prompts/latest/page-bd82c53cb2b22459.js.map",revision:"2f0121eca71b7b5b830ac87f6306756f"},{url:"/_next/static/chunks/app/(app)/prompts/page-3c0da386b336e2d5.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/prompts/page-3c0da386b336e2d5.js.map",revision:"09ccbd0ad3e24250507523a44f13383e"},{url:"/_next/static/chunks/app/(app)/prompts/this-week/page-8879d0e670ae640f.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/prompts/this-week/page-8879d0e670ae640f.js.map",revision:"8b01fbe5e6b5e8391845938e73dec1c9"},{url:"/_next/static/chunks/app/(app)/prompts/trending/page-a672065023c2e8c7.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/prompts/trending/page-a672065023c2e8c7.js.map",revision:"9752d130a01c648e3663055909657328"},{url:"/_next/static/chunks/app/(app)/users/%5Bid%5D/page-783a08b57cd30998.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(app)/users/%5Bid%5D/page-783a08b57cd30998.js.map",revision:"60556d02dc5fca0534ae0c8cbc103ece"},{url:"/_next/static/chunks/app/(auth)/layout-6584ed22190159a7.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(auth)/sign-in/%5B%5B...sign-in%5D%5D/page-c724fad6958b28ca.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(auth)/sign-in/%5B%5B...sign-in%5D%5D/page-c724fad6958b28ca.js.map",revision:"3b6468e4e18f1ccebd7d0f89241a884d"},{url:"/_next/static/chunks/app/(auth)/sign-up/%5B%5B...sign-up%5D%5D/page-4b7ee98c01c8f7d3.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(auth)/sign-up/%5B%5B...sign-up%5D%5D/page-4b7ee98c01c8f7d3.js.map",revision:"135923e053f40a84a226e71a810c2e3f"},{url:"/_next/static/chunks/app/(dashboard)/dashboard/layout-a1091f64919e5e62.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(dashboard)/dashboard/page-557ba6129e866459.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(dashboard)/dashboard/page-557ba6129e866459.js.map",revision:"a41fd3c9529b659bde99e6103572a647"},{url:"/_next/static/chunks/app/(legal)/cookies/page-1ef8e86da021951a.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(legal)/layout-26749ceab1c9fcef.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(legal)/privacy/page-ded69a2f6af8843d.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(marketing)/page-0d0849a650582754.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/(marketing)/page-0d0849a650582754.js.map",revision:"6956ff70ce94a3c51cd2597a5ef6698c"},{url:"/_next/static/chunks/app/_not-found/page-5e0695bd411d6dea.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/_not-found/page-5e0695bd411d6dea.js.map",revision:"83d0c17a0858c064b0914ef3fa0da995"},{url:"/_next/static/chunks/app/global-error-988abd02feb701c8.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/global-error-988abd02feb701c8.js.map",revision:"1b36dc296ef0695c1e69484fb40e4421"},{url:"/_next/static/chunks/app/layout-72c3e9c02a15ea11.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/app/layout-72c3e9c02a15ea11.js.map",revision:"35cf2055a8431047d04fe25ee4a76f56"},{url:"/_next/static/chunks/c4e3e400-a418d20a1a6ee267.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/c4e3e400-a418d20a1a6ee267.js.map",revision:"e9373afb944725d1fc1604f41f6f9250"},{url:"/_next/static/chunks/c8915400-cf84908582dc7e3a.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/c8915400-cf84908582dc7e3a.js.map",revision:"d7f9ec84ff2279d1ce6bd5d53d01a8a6"},{url:"/_next/static/chunks/framework-70e2b770f059bb3c.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/framework-70e2b770f059bb3c.js.map",revision:"17c0b5506026483a854d45d70c88188c"},{url:"/_next/static/chunks/main-app-4d5e9e4d103dded8.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/main-app-4d5e9e4d103dded8.js.map",revision:"3b01ea5f25c346cfc81e861a5d07ecc6"},{url:"/_next/static/chunks/main-f600f8a359663b9a.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/main-f600f8a359663b9a.js.map",revision:"1ac1cc9544c0552c5e9c26f49ddc6940"},{url:"/_next/static/chunks/pages/_app-5db0745514230456.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/pages/_app-5db0745514230456.js.map",revision:"0c26579feb85d1017274e63229c2b2f9"},{url:"/_next/static/chunks/pages/_error-351a67a552bf320d.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/pages/_error-351a67a552bf320d.js.map",revision:"4eccf353c68c097c5db294a4b0d56ce0"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-3ccf5d2bd203a018.js",revision:"GRH5VAkHCAlZ03obSpE6D"},{url:"/_next/static/chunks/webpack-3ccf5d2bd203a018.js.map",revision:"ece45027cdf4418bdda6044af6870e47"},{url:"/_next/static/css/56d6195246f59d22.css",revision:"56d6195246f59d22"},{url:"/_next/static/css/56d6195246f59d22.css.map",revision:"6f93774830098ff12d6b46af76907f76"},{url:"/_next/static/css/f97fd96b9a7c3c13.css",revision:"f97fd96b9a7c3c13"},{url:"/_next/static/css/f97fd96b9a7c3c13.css.map",revision:"564876fbd86747804113a4b5d49da1c5"},{url:"/_next/static/media/062522b8b7c3ad6a-s.woff2",revision:"0f347a32b2168180dbc514e104ab207c"},{url:"/_next/static/media/07103e16d41c9190-s.woff2",revision:"865bfc77817e078122fba2ff0a8e259c"},{url:"/_next/static/media/0fb93cc812fb4b50-s.woff2",revision:"a18ad80bf268ef612116d884c2af418f"},{url:"/_next/static/media/13017c58cf72aedd-s.woff2",revision:"6007c746e2785673234104b918d8e3ec"},{url:"/_next/static/media/19e37deead9b3ec2-s.woff2",revision:"8f919c25620e7f246b5abcfa979922bf"},{url:"/_next/static/media/32702a3715dbd7c1-s.woff2",revision:"8c6c9a0ed2815ab4659cf6f10388aea2"},{url:"/_next/static/media/38ebcf0298551099-s.woff2",revision:"033d8b2a4bd7fddccb3e0b891f65ebbe"},{url:"/_next/static/media/3d9ea938b6afa941-s.p.woff2",revision:"ee1b2a154fb9ea98a28413a839adedfb"},{url:"/_next/static/media/46392699924ae7e5-s.woff2",revision:"467f697ccbe92aebc38f6c1a433f6948"},{url:"/_next/static/media/6dc02f179ba8da8f-s.woff2",revision:"ec321a873a0a3dbb51083da484c6182c"},{url:"/_next/static/media/6fed4e5749a3ea15-s.woff2",revision:"bd04001574d461203c7264ac27d8c504"},{url:"/_next/static/media/7b9ca6a1d31c5662-s.p.woff2",revision:"817c5aeb992050a67c54c8bf028a28a8"},{url:"/_next/static/media/83651bee47cf14da-s.woff2",revision:"d2bb91b14d5895c91741b933a76be9c0"},{url:"/_next/static/media/84a39d905077a976-s.woff2",revision:"cd3fed32b75d04b79cf48a95ef63b9a5"},{url:"/_next/static/media/931105f8d96e7f26-s.p.woff2",revision:"6d1f2c44bd135848c7321937f7371e37"},{url:"/_next/static/media/9450a5aa688b86af-s.woff2",revision:"ad7ab63936b2f4518d04ebbdf704c8ca"},{url:"/_next/static/media/9beef36ab83de3f0-s.woff2",revision:"82c2dc97217d32c57a029754fda91e4e"},{url:"/_next/static/media/b0059268cc419911-s.woff2",revision:"a7f4b74ef28825cce3f205bff67c9323"},{url:"/_next/static/media/b53e832d745212bc-s.woff2",revision:"330dec86fdfff71ea576b1456aa8b1d3"},{url:"/_next/static/media/bd2489da38fb1d0b-s.woff2",revision:"ca4dd28ee25e096804bbb0dab6fc7dfe"},{url:"/_next/static/media/c7a495162773a63f-s.p.woff2",revision:"7db919af8577843004c4b5f564d9aa23"},{url:"/_next/static/media/dd4ab5b525bd804a-s.woff2",revision:"b505d29c0021c60e4a004de0b5fea45f"},{url:"/_next/static/media/e6f5886ae1242622-s.woff2",revision:"e64d3f79602912c46c2b4d7f26dcadb8"},{url:"/_next/static/media/e80e9c14bdf82dd6-s.woff2",revision:"5b9e8288b8eac8b9b5c9239e1e7c8eeb"},{url:"/_next/static/media/ef3f4e253ce73be8-s.woff2",revision:"87b8cf1c8e2380fe1e3c000bd48ed5c6"},{url:"/_next/static/media/f0b16be9a95e8820-s.woff2",revision:"48487e645e8bd5ac883f1175b4efdfe0"},{url:"/_next/static/media/f1d4c48219b1bd72-s.woff2",revision:"e46df47bb1e1cf796f08f67211174cef"},{url:"/_next/static/media/f2988470e2e746be-s.woff2",revision:"89143b5f41037c26ec098f61cff925dc"},{url:"/_next/static/media/faac4ac11aa3d97b-s.woff2",revision:"9cb88d5b1ed3ff5796eefc9e62af1b8e"},{url:"/_next/static/media/fbdbe464b9e5cc95-s.p.woff2",revision:"10d972b68f617d88f222c728a169e5f2"},{url:"/android-chrome-192x192.png",revision:"c0f74e753642417a082de6fda42a4d18"},{url:"/android-chrome-512x512.png",revision:"d15f3dc09dc06cf3f33f1a80fbed2961"},{url:"/apple-touch-icon.png",revision:"66c5fbe1c420ce78d3df253c001b7089"},{url:"/favicon-16x16.png",revision:"82cb3353d73f7b134d6853304e852d14"},{url:"/favicon-32x32.png",revision:"5df8f2370be84bc1a3b29e2e0824b61a"},{url:"/logo-dark.png",revision:"fc0bad45dd8be5c8862e2f4bbfc20c2c"},{url:"/logo-light.png",revision:"00acc3ba9c859daa411c61e384d5b903"},{url:"/logo-small-dark.png",revision:"f6247b77b0cb104fd261bc3252ada3fa"},{url:"/logo-small-light.png",revision:"b67afaa2cf1c05e1c0e2c9fb2d166c16"},{url:"/logo-square.png",revision:"b2a5e1a92cbd1fb4da8c33f01cbec9dc"},{url:"/site.webmanifest",revision:"d0a807221cf405b64abfe05d38c778a7"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:c})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
//# sourceMappingURL=sw.js.map
