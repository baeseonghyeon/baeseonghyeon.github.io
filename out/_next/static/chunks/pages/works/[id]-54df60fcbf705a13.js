(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[671],{235:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/works/[id]",function(){return t(8375)}])},1566:function(n,e,t){"use strict";var r=t(5893),i=t(9992),o=t.n(i),a=t(7166),c=t.n(a),l=t(7294),s=t(1193),u=t.n(s),d=t(3756),_=t(3147),f=t(4480),p=t(1649);function v(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function h(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var t=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=t){var r,i,o=[],a=!0,c=!1;try{for(t=t.call(n);!(a=(r=t.next()).done)&&(o.push(r.value),!e||o.length!==e);a=!0);}catch(l){c=!0,i=l}finally{try{a||null==t.return||t.return()}finally{if(c)throw i}}return o}}(n,e)||function(n,e){if(!n)return;if("string"===typeof n)return v(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return v(n,e)}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var m=c().bind(o());e.Z=function(n){var e=n.title,t=void 0===e?"title":e,i=n.idx,o=n.isActive,a=void 0!==o&&o,c=n.isDraggable,s=void 0===c||c,v=n.isRandomPositon,w=void 0===v||v,x=n.buttons,k=void 0===x?null:x,j=n.bodyClassName,b=n.onClickClose,y=(0,d.Z)().isPcScreenSize,g=(0,l.useState)(100+-1*i),N=g[0],S=g[1],D=h((0,f.FV)(_.Ud),2),E=D[0],A=D[1],Z=(0,l.useState)(!0),C=Z[0],M=Z[1],P=(0,l.useRef)(null),z=h((0,f.FV)(_.x7),2),L=z[0],I=z[1];(0,l.useEffect)((function(){null!==P.current&&(w&&J(P.current),a&&I(P.current))}),[]),(0,l.useEffect)((function(){P.current===L&&O()}),[L]),(0,l.useEffect)((function(){null!==P.current&&J(P.current)}),[w]);var J=function(n){n.style.left="".concat(Math.floor(Math.random()*(window.innerWidth-n.offsetWidth)),"px"),n.style.top="".concat(Math.floor(Math.random()*(window.innerHeight-n.offsetHeight)),"px")},O=function(){S(E+1),A(E+1),I(P.current)},R=function(n){M(!1),null!==n&&T(n)},T=function(n){setTimeout((function(){n.remove()}),250)};return(0,r.jsx)(u(),{disabled:!y,grid:[50,50],bounds:"div",onDrag:function(){return s&&O()},onMouseDown:function(){return s&&O()},children:(0,r.jsxs)("div",{id:n.id,className:m("container",!C&&"hide",n.className),style:(n.style,{zIndex:N,order:i}),onMouseEnter:n.onMouseEnter,onMouseLeave:n.onMouseLeave,ref:P,children:[(0,r.jsxs)("div",{className:m("header",L===P.current&&"header--active"),children:[(0,r.jsx)("h1",{children:t}),(0,r.jsxs)("div",{className:m("button__wrapper"),children:[null!==k&&k.map((function(n){return n})),(0,r.jsx)("div",{className:m("close__button"),onClick:b||function(){return R(P.current)},onTouchStart:b||function(){return y&&R(P.current)},children:(0,r.jsx)(p.QAE,{size:17.5})})]})]}),(0,r.jsx)("div",{className:m("body",j),children:n.children})]})})}},3756:function(n,e,t){"use strict";var r=t(7294);e.Z=function(){var n=(0,r.useState)([0,0]),e=n[0],t=n[1],i=e[0]>768;return(0,r.useLayoutEffect)((function(){var n=function(){t([window.innerWidth,window.innerHeight])};return window.addEventListener("resize",n),n(),function(){return window.removeEventListener("resize",n)}}),[]),{screenSize:e,isPcScreenSize:i}}},8375:function(n,e,t){"use strict";t.r(e),t.d(e,{__N_SSG:function(){return j}});var r=t(5893),i=t(3977),o=t(1163),a=t(7294),c=t(4697),l=t(9160),s=t(4480),u=t(3147),d=t(5782),_=t.n(d),f=t(7166),p=t.n(f),v=t(2121),h=t(7819),m=t(5347),w=t(680),x=t(4490),k=p().bind(_()),j=!0;e.default=function(n){var e,t,d,_=n.work,f=(0,o.useRouter)(),p=(0,s.sJ)(u.b6),j=c,b=(0,a.useState)(),y=b[0],g=b[1],N=(0,a.useState)(),S=N[0],D=N[1],E=(0,a.useState)(null),A=E[0],Z=E[1];return(0,a.useEffect)((function(){if(f.isReady){var n=f.query.id;n&&g(n)}}),[f.isReady]),(0,a.useEffect)((function(){if(y){var n=y.split("-"),e=n[n.length-1],t=y.replace("-".concat(e),""),r=j.data.filter((function(n){var r;return(0,l.gX)(n.title.en)===t&&(null===(r=n.info.category[0])||void 0===r?void 0:r.toLowerCase())===e})).map((function(n){return D(n)}));Z(r.length)}}),[y]),0===A?(0,r.jsx)(w.default,{}):S?(0,r.jsxs)(i.Z,{title:S.title[p],description:(null===(e=S.description[p])||void 0===e?void 0:e.substring(0,80).trimEnd())+"...",children:[(0,r.jsx)(m.default,{workData:S}),(0,r.jsx)(h.default,{workData:S}),(0,r.jsxs)("div",{className:k("container"),children:[(0,r.jsx)("div",{className:k("content__container"),children:null===(t=S.video)||void 0===t?void 0:t.map((function(n){return(0,r.jsx)("div",{className:k(n.fullSize?"col-md-12":"col-md-6"),children:(0,r.jsx)("div",{className:k("video__wrapper"),children:(0,r.jsx)(v.Z,{iframeClassName:k("video__content"),skeletonClassName:k(k("video__content")),link:n.url})})},n.url)}))}),(0,r.jsx)("div",{className:k("content__container"),children:null===(d=S.image)||void 0===d?void 0:d.map((function(n){return(0,r.jsx)("div",{className:k(n.fullSize?"col-md-12":"col-md-6"),children:(0,r.jsx)(x.Z,{src:(0,l.v7)(n.url),className:k("image__content"),skeletonClassName:k("skeleton")})},n.url)}))})]})]}):(0,r.jsx)(i.Z,{title:_.title,description:_.content,image:_.image,children:(0,r.jsxs)("div",{className:k("loading"),children:[(0,r.jsx)("h1",{children:_.title}),(0,r.jsx)("p",{children:_.content}),(0,r.jsx)("p",{style:{textAlign:"center"},children:"Loading..."})]})})}},7819:function(n,e,t){"use strict";t.r(e);var r=t(5893),i=t(8079),o=t.n(i),a=t(7166),c=t.n(a),l=t(4480),s=t(3147),u=t(1566),d=c().bind(o());e.default=function(n){var e,t,i=n.workData,o=(0,l.sJ)(s.b6);return i?(0,r.jsxs)(u.Z,{title:i.title[o],idx:1,className:d("container"),children:[(0,r.jsxs)("p",{children:[i.description[o]," ",null===(e=i.description.link)||void 0===e?void 0:e.map((function(n,e,t){var i=t.length;return(0,r.jsxs)("a",{href:n.url,target:"_blank",children:[0===e&&"(",n.common?n.common:n[o],e!==i-1?", ":")"]})}))]}),null===(t=i.link)||void 0===t?void 0:t.map((function(n){return(0,r.jsxs)("a",{href:n.url,target:"_blank",className:d("link"),children:["Visit the ",n.type," \u2192"]})}))]}):null}},5347:function(n,e,t){"use strict";t.r(e);var r=t(5893),i=t(2551),o=t.n(i),a=t(7166),c=t.n(a),l=t(4480),s=t(3147),u=t(1566),d=t(9160),_=c().bind(o());e.default=function(n){var e=n.workData,t=(0,l.sJ)(s.b6);return e?(0,r.jsx)(u.Z,{title:e.title[t],isActive:!0,idx:0,className:_("container"),children:Object.entries(e.info).map((function(n){return(0,r.jsx)("li",{className:_("list"),children:(0,r.jsxs)("p",{children:[(0,r.jsxs)("strong",{children:[n[1]&&(0,d.QW)(n[0]),n[1]&&" : "]}),n[1]?"string"===typeof n[1]?n[1]:Array.isArray(n[1])?n[1].map((function(n,e,t){var r=e===t.length-1;return"".concat(n).concat(r?"":", ")})):n[1][t]:null]})})}))}):null}},9992:function(n){n.exports={container:"popup_container__i_NTy",header:"popup_header__EBPD_",button__wrapper:"popup_button__wrapper__poJSJ",close__button:"popup_close__button__B17h1","header--active":"popup_header--active__kGFGj",body:"popup_body__cpqJN",hide:"popup_hide__04Z7K"}},5782:function(n){n.exports={container:"workDetail_container__LfRHv",content__container:"workDetail_content__container__NKpOw",video__wrapper:"workDetail_video__wrapper__kIwPi",video__content:"workDetail_video__content___cGB4",image__content:"workDetail_image__content__BN9x0",skeleton:"workDetail_skeleton__klCZ4",loading:"workDetail_loading__szLZI"}},8079:function(n){n.exports={container:"workDetailDescriptionPopup_container__qtrex",link:"workDetailDescriptionPopup_link__UcbvI"}},2551:function(n){n.exports={container:"workDetailInfoPopup_container__ZSQML",list:"workDetailInfoPopup_list__AcBo4"}}},function(n){n.O(0,[866,885,874,664,261,639,599,680,774,888,179],(function(){return e=235,n(n.s=e);var e}));var e=n.O();_N_E=e}]);