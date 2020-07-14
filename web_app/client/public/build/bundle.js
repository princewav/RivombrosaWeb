var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function l(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function s(t,e,n){t.insertBefore(e,n||null)}function i(t){t.parentNode.removeChild(t)}function a(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function f(t){return document.createElement(t)}function u(t){return document.createTextNode(t)}function d(){return u(" ")}function p(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function h(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function g(t,e){e=""+e,t.data!==e&&(t.data=e)}function m(t,e,n){t.classList[n?"add":"remove"](e)}let v;function $(t){v=t}const b=[],y=[],_=[],x=[],w=Promise.resolve();let S=!1;function k(t){_.push(t)}let E=!1;const O=new Set;function L(){if(!E){E=!0;do{for(let t=0;t<b.length;t+=1){const e=b[t];$(e),N(e.$$)}for(b.length=0;y.length;)y.pop()();for(let t=0;t<_.length;t+=1){const e=_[t];O.has(e)||(O.add(e),e())}_.length=0}while(b.length);for(;x.length;)x.pop()();S=!1,E=!1,O.clear()}}function N(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(k)}}const P=new Set;let T;function C(){T={r:0,c:[],p:T}}function D(){T.r||o(T.c),T=T.p}function A(t,e){t&&t.i&&(P.delete(t),t.i(e))}function j(t,e,n,o){if(t&&t.o){if(P.has(t))return;P.add(t),T.c.push(()=>{P.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}function H(t){t&&t.c()}function M(t,n,r){const{fragment:c,on_mount:s,on_destroy:i,after_update:a}=t.$$;c&&c.m(n,r),k(()=>{const n=s.map(e).filter(l);i?i.push(...n):o(n),t.$$.on_mount=[]}),a.forEach(k)}function R(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function I(t,e){-1===t.$$.dirty[0]&&(b.push(t),S||(S=!0,w.then(L)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function q(e,l,r,c,s,a,f=[-1]){const u=v;$(e);const d=l.props||{},p=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:s,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:n(),dirty:f};let h=!1;if(p.ctx=r?r(e,d,(t,n,...o)=>{const l=o.length?o[0]:n;return p.ctx&&s(p.ctx[t],p.ctx[t]=l)&&(p.bound[t]&&p.bound[t](l),h&&I(e,t)),n}):[],p.update(),h=!0,o(p.before_update),p.fragment=!!c&&c(p.ctx),l.target){if(l.hydrate){const t=function(t){return Array.from(t.childNodes)}(l.target);p.fragment&&p.fragment.l(t),t.forEach(i)}else p.fragment&&p.fragment.c();l.intro&&A(e.$$.fragment),M(e,l.target,l.anchor),L()}$(u)}class Q{$destroy(){R(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}function X(t){return Object.entries(t)}function B(t,e,n){const o=t.slice();return o[8]=e[n],o}function G(t,e,n){const o=t.slice();return o[5]=e[n],o[7]=n,o}function J(t){let e,n;return{c(){e=f("div"),e.innerHTML='<p class="svelte-1fh702o"></p> \n            <p class="svelte-1fh702o">-</p> \n            <p class="svelte-1fh702o">-</p> \n            <p class="svelte-1fh702o">-</p> \n            <p class="svelte-1fh702o">-</p> \n            <p class="svelte-1fh702o">-</p>',h(e,"class",n="row grid "+t[5]+" svelte-1fh702o")},m(t,n){s(t,e,n)},d(t){t&&i(e)}}}function Y(t){let e,n,o,r,a,v,$,b,y,_,x,w,S,k,E,O,L,N,P,T,C,D,A,j,H,M,R,I,q,Q=t[8].match+"",X=t[8].date+"",B=t[8].outcome+"",G=t[8].marathon+"",J=t[8].pinnacle+"",Y=t[8].coeff+"",K=t[8].esps+"",V=t[8].stake+"";return{c(){e=f("div"),n=f("p"),o=u(Q),r=u(" ("),a=u(X),v=u(")"),$=d(),b=f("p"),y=u(B),_=d(),x=f("p"),w=u(G),S=u(" ("),k=u(J),E=u(")"),O=d(),L=f("p"),N=f("b"),P=u(Y),T=d(),C=f("p"),D=u(K),A=d(),j=f("p"),H=u("€ "),M=u(V),h(n,"class","svelte-1fh702o"),h(b,"class","svelte-1fh702o"),h(x,"class","svelte-1fh702o"),h(N,"class","svelte-1fh702o"),m(N,"alert",t[8].coeff>2),h(L,"class","svelte-1fh702o"),h(C,"class","svelte-1fh702o"),h(j,"class","svelte-1fh702o"),h(e,"class",R="row grid "+t[5]+" svelte-1fh702o"),m(e,"tie","X"==t[8].outcome)},m(i,f){s(i,e,f),c(e,n),c(n,o),c(n,r),c(n,a),c(n,v),c(e,$),c(e,b),c(b,y),c(e,_),c(e,x),c(x,w),c(x,S),c(x,k),c(x,E),c(e,O),c(e,L),c(L,N),c(N,P),c(e,T),c(e,C),c(C,D),c(e,A),c(e,j),c(j,H),c(j,M),I||(q=p(e,"click",(function(){l(t[3](t[8]))&&t[3](t[8]).apply(this,arguments)})),I=!0)},p(n,l){t=n,2&l&&Q!==(Q=t[8].match+"")&&g(o,Q),2&l&&X!==(X=t[8].date+"")&&g(a,X),2&l&&B!==(B=t[8].outcome+"")&&g(y,B),2&l&&G!==(G=t[8].marathon+"")&&g(w,G),2&l&&J!==(J=t[8].pinnacle+"")&&g(k,J),2&l&&Y!==(Y=t[8].coeff+"")&&g(P,Y),2&l&&m(N,"alert",t[8].coeff>2),2&l&&K!==(K=t[8].esps+"")&&g(D,K),2&l&&V!==(V=t[8].stake+"")&&g(M,V),2&l&&m(e,"tie","X"==t[8].outcome)},d(t){t&&i(e),I=!1,q()}}}function K(t){let e,n,o=t[1][t[5]],l=[];for(let e=0;e<o.length;e+=1)l[e]=Y(B(t,o,e));let r=null;return o.length||(r=J(t)),{c(){e=f("div");for(let t=0;t<l.length;t+=1)l[t].c();r&&r.c(),n=d(),h(e,"class","tier svelte-1fh702o")},m(t,o){s(t,e,o);for(let t=0;t<l.length;t+=1)l[t].m(e,null);r&&r.m(e,null),c(e,n)},p(t,c){if(10&c){let s;for(o=t[1][t[5]],s=0;s<o.length;s+=1){const r=B(t,o,s);l[s]?l[s].p(r,c):(l[s]=Y(r),l[s].c(),l[s].m(e,n))}for(;s<l.length;s+=1)l[s].d(1);l.length=o.length,o.length?r&&(r.d(1),r=null):r||(r=J(t),r.c(),r.m(e,n))}},d(t){t&&i(e),a(l,t),r&&r.d()}}}function V(e){let n,o,l,r,p,m,v,$,b,y,_=["tier_1","tier_2","tier_3"],x=[];for(let t=0;t<3;t+=1)x[t]=K(G(e,_,t));return{c(){n=f("div"),o=f("h2"),l=f("img"),p=d(),m=u(e[0]),v=d(),$=f("div"),b=f("div"),b.innerHTML='<p class="svelte-1fh702o">Evento (Data)</p> \n      <p class="svelte-1fh702o">Esito</p> \n      <p class="svelte-1fh702o">Quota*</p> \n      <p class="svelte-1fh702o">Coeff.</p> \n      <p class="svelte-1fh702o">ESPS</p> \n      <p class="svelte-1fh702o">Stake</p>',y=d();for(let t=0;t<3;t+=1)x[t].c();l.src!==(r=e[2])&&h(l,"src",r),h(l,"alt","flag"),h(l,"class","svelte-1fh702o"),h(o,"class","svelte-1fh702o"),h(b,"class","table-head grid svelte-1fh702o"),h($,"class","table svelte-1fh702o")},m(t,e){s(t,n,e),c(n,o),c(o,l),c(o,p),c(o,m),c(n,v),c(n,$),c($,b),c($,y);for(let t=0;t<3;t+=1)x[t].m($,null)},p(t,[e]){if(4&e&&l.src!==(r=t[2])&&h(l,"src",r),1&e&&g(m,t[0]),10&e){let n;for(_=["tier_1","tier_2","tier_3"],n=0;n<3;n+=1){const o=G(t,_,n);x[n]?x[n].p(o,e):(x[n]=K(o),x[n].c(),x[n].m($,null))}for(;n<3;n+=1)x[n].d(1)}},i:t,o:t,d(t){t&&i(n),a(x,t)}}}function z(t,e,n){let{league:o}=e,{tierData:l}=e;const r={"Premier League":"gb","Serie A":"it","Primera Division":"es","Primeira Liga":"pt","Prem'er-Lig":"ru"};let c;return t.$set=t=>{"league"in t&&n(0,o=t.league),"tierData"in t&&n(1,l=t.tierData)},t.$$.update=()=>{1&t.$$.dirty&&n(2,c=`https://www.countryflags.io/${r[o]}/flat/64.png`)},[o,l,c,t=>{confirm(`Vuoi giocare €${t.stake} su ${t.match}?`)&&function(t){const e=new XMLHttpRequest;e.open("POST",t.endpoint,!0),e.setRequestHeader("Content-Type","application/json"),e.onreadystatechange=function(){if(4===e.readyState&&200===e.status){const t=JSON.parse(e.responseText);console.log(t)}},e.send(JSON.stringify(t.data))}({endpoint:"/save_bet",data:t})}]}class F extends Q{constructor(t){super(),q(this,t,z,V,r,{league:0,tierData:1})}}function U(t,e,n){const o=t.slice();return o[5]=e[n][0],o[6]=e[n][1],o}function W(t){let e,n,o;const l=new F({props:{league:t[5],tierData:t[6]}});return{c(){H(l.$$.fragment),e=d(),n=f("br")},m(t,r){M(l,t,r),s(t,e,r),s(t,n,r),o=!0},p(t,e){const n={};1&e&&(n.league=t[5]),1&e&&(n.tierData=t[6]),l.$set(n)},i(t){o||(A(l.$$.fragment,t),o=!0)},o(t){j(l.$$.fragment,t),o=!1},d(t){R(l,t),t&&i(e),t&&i(n)}}}function Z(t){let e,n,o=(t[6].tier_1.length||t[6].tier_2.length||t[6].tier_3.length)&&W(t);return{c(){o&&o.c(),e=u("")},m(t,l){o&&o.m(t,l),s(t,e,l),n=!0},p(t,n){t[6].tier_1.length||t[6].tier_2.length||t[6].tier_3.length?o?(o.p(t,n),1&n&&A(o,1)):(o=W(t),o.c(),A(o,1),o.m(e.parentNode,e)):o&&(C(),j(o,1,1,()=>{o=null}),D())},i(t){n||(A(o),n=!0)},o(t){j(o),n=!1},d(t){o&&o.d(t),t&&i(e)}}}function tt(t){let e,n,o,l,r,g,m=!((v=X)&&0===Object.keys(v).length);var v;let $,b,y,_,x,w,S,k=X(t[0]),E=[];for(let e=0;e<k.length;e+=1)E[e]=Z(U(t,k,e));const O=t=>j(E[t],1,1,()=>{E[t]=null});let L=m&&function(t){let e;return{c(){e=u("*: Quota Marathon (Quota Pinnacle)")},m(t,n){s(t,e,n)},d(t){t&&i(e)}}}();return{c(){e=f("div"),n=f("div"),o=f("div"),l=f("button"),l.textContent="AGGIORNA TIERS",r=d();for(let t=0;t<E.length;t+=1)E[t].c();g=d(),L&&L.c(),$=d(),b=f("br"),y=d(),_=f("br"),h(l,"class","btn btn-light"),h(o,"class","main-btn-container svelte-4i7dlg"),h(n,"class","container")},m(i,a){s(i,e,a),c(e,n),c(n,o),c(o,l),c(n,r);for(let t=0;t<E.length;t+=1)E[t].m(n,null);c(n,g),L&&L.m(n,null),c(n,$),c(n,b),c(n,y),c(n,_),x=!0,w||(S=p(l,"click",t[1]),w=!0)},p(t,[e]){if(1&e){let o;for(k=X(t[0]),o=0;o<k.length;o+=1){const l=U(t,k,o);E[o]?(E[o].p(l,e),A(E[o],1)):(E[o]=Z(l),E[o].c(),A(E[o],1),E[o].m(n,g))}for(C(),o=k.length;o<E.length;o+=1)O(o);D()}},i(t){if(!x){for(let t=0;t<k.length;t+=1)A(E[t]);x=!0}},o(t){E=E.filter(Boolean);for(let t=0;t<E.length;t+=1)j(E[t]);x=!1},d(t){t&&i(e),a(E,t),L&&L.d(),w=!1,S()}}}function et(t,e,n){let o={};return[o,async function(){n(0,o=await(await fetch("/get_tiers")).json())}]}class nt extends Q{constructor(t){super(),q(this,t,et,tt,r,{})}}function ot(e){return{c:t,m:t,i:t,o:t,d:t}}function lt(t){let e;const n=new nt({});return{c(){H(n.$$.fragment)},m(t,o){M(n,t,o),e=!0},i(t){e||(A(n.$$.fragment,t),e=!0)},o(t){j(n.$$.fragment,t),e=!1},d(t){R(n,t)}}}function rt(t){let e,n,o,l,r,a,u,g,m,v,$,b,y,_;const x=[lt,ot],w=[];function S(t,e){return"tiers"==t[0]?0:"history"==t[0]?1:-1}return~(v=S(t))&&($=w[v]=x[v](t)),{c(){e=f("div"),n=f("header"),o=f("h2"),o.textContent="SHINNY PORK SOCIETY",l=d(),r=f("div"),a=f("ul"),u=f("li"),u.textContent="Tiers",g=d(),m=f("div"),$&&$.c(),h(u,"class","svelte-ox2lcc"),h(a,"class","svelte-ox2lcc"),h(r,"class","links svelte-ox2lcc"),h(n,"class","svelte-ox2lcc"),h(m,"class","container")},m(i,f){s(i,e,f),c(e,n),c(n,o),c(n,l),c(n,r),c(r,a),c(a,u),c(e,g),c(e,m),~v&&w[v].m(m,null),b=!0,y||(_=p(u,"click",t[1]),y=!0)},p(t,[e]){let n=v;v=S(t),v!==n&&($&&(C(),j(w[n],1,1,()=>{w[n]=null}),D()),~v?($=w[v],$||($=w[v]=x[v](t),$.c()),A($,1),$.m(m,null)):$=null)},i(t){b||(A($),b=!0)},o(t){j($),b=!1},d(t){t&&i(e),~v&&w[v].d(),y=!1,_()}}}function ct(t,e,n){let o="tiers";return[o,()=>{n(0,o="tiers")}]}return new class extends Q{constructor(t){super(),q(this,t,ct,rt,r,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
