(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[20],{6655:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/works/workPopup/workPopup",function(){return t(7420)}])},4490:function(e,n,t){"use strict";var r=t(5893),o=t(7166),i=t.n(o),c=t(1128),a=t.n(c),u=t(7294),s=t(1056),l=i().bind(a());n.Z=function(e){var n=e.src,t=e.isBackgroundImage,o=void 0!==t&&t,i=e.skeletonClassName,c=(0,u.useState)(!0),a=c[0],d=c[1];return(0,r.jsxs)(r.Fragment,{children:[a&&(0,r.jsx)(s.Z,{className:l("skeleton",i)}),o&&(0,r.jsx)("div",{className:l(e.className,a&&"hide"),style:{backgroundImage:"url(".concat(n,")")}}),(0,r.jsx)("img",{src:n,className:l(e.className,(a||o)&&"hide"),onLoad:function(){return d(!1)}})]})}},1566:function(e,n,t){"use strict";var r=t(5893),o=t(9992),i=t.n(o),c=t(7166),a=t.n(c),u=t(7294),s=t(1193),l=t.n(s),d=t(3756),f=t(3147),p=t(4480),_=t(1649),h=t(3472);function m(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function v(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,i=[],c=!0,a=!1;try{for(t=t.call(e);!(c=(r=t.next()).done)&&(i.push(r.value),!n||i.length!==n);c=!0);}catch(u){a=!0,o=u}finally{try{c||null==t.return||t.return()}finally{if(a)throw o}}return i}}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return m(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return m(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var k=a().bind(i());n.Z=function(e){var n=e.title,t=void 0===n?"title":n,o=e.idx,i=e.isActive,c=void 0!==i&&i,a=e.isDraggable,s=void 0===a||a,m=e.isRandomPositon,b=void 0===m||m,y=e.buttons,w=void 0===y?null:y,g=e.bodyClassName,x=e.onClickClose,N=(0,d.Z)().isPcScreenSize,j=(0,u.useState)(100+-1*o),C=j[0],S=j[1],E=v((0,p.FV)(f.Ud),2),P=E[0],M=E[1],A=(0,u.useState)(!0),Z=A[0],D=A[1],I=(0,u.useRef)(null),T=v((0,p.FV)(f.x7),2),L=T[0],F=T[1];(0,u.useEffect)((function(){null!==I.current&&(b&&(0,h.n)(I.current),c&&F(I.current))}),[]),(0,u.useEffect)((function(){I.current===L&&R()}),[L]),(0,u.useEffect)((function(){null!==I.current&&(0,h.n)(I.current)}),[b]);var R=function(){S(P+1),M(P+1),F(I.current)},z=function(e){D(!1),null!==e&&B(e)},B=function(e){setTimeout((function(){e.remove()}),250)};return(0,r.jsx)(l(),{disabled:!N,grid:[50,50],bounds:"div",onDrag:function(){return s&&R()},onMouseDown:function(){return s&&R()},children:(0,r.jsxs)("div",{id:e.id,className:k("container",!Z&&"hide",e.className),style:(e.style,{zIndex:C,order:o}),onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseLeave,ref:I,children:[(0,r.jsxs)("div",{className:k("header",L===I.current&&"header--active"),children:[(0,r.jsx)("h1",{children:t}),(0,r.jsxs)("div",{className:k("button__wrapper"),children:[null!==w&&w.map((function(e){return e})),(0,r.jsx)("div",{className:k("close__button"),onClick:x||function(){return z(I.current)},onTouchStart:x||function(){return N&&z(I.current)},children:(0,r.jsx)(_.QAE,{size:17.5})})]})]}),(0,r.jsx)("div",{className:k("body",g),children:e.children})]})})}},1056:function(e,n,t){"use strict";t.d(n,{Z:function(){return m}});var r=t(5893),o=t(7166),i=t.n(o),c=t(7571),a=t.n(c),u=t(7294);const s=u.createContext({});function l({baseColor:e,highlightColor:n,width:t,height:r,borderRadius:o,circle:i,direction:c,duration:a,enableAnimation:u=true}){const s={};return"rtl"===c&&(s["--animation-direction"]="reverse"),"number"===typeof a&&(s["--animation-duration"]=`${a}s`),u||(s["--pseudo-element-display"]="none"),"string"!==typeof t&&"number"!==typeof t||(s.width=t),"string"!==typeof r&&"number"!==typeof r||(s.height=r),"string"!==typeof o&&"number"!==typeof o||(s.borderRadius=o),i&&(s.borderRadius="50%"),"undefined"!==typeof e&&(s["--base-color"]=e),"undefined"!==typeof n&&(s["--highlight-color"]=n),s}function d({count:e=1,wrapper:n,className:t,containerClassName:r,containerTestId:o,circle:i=!1,style:c,...a}){var d,f,p;const _=u.useContext(s),h={...a};for(const[u,s]of Object.entries(a))"undefined"===typeof s&&delete h[u];const m={..._,...h,circle:i},v={...c,...l(m)};let k="react-loading-skeleton";t&&(k+=` ${t}`);const b=null!==(d=m.inline)&&void 0!==d&&d,y=[],w=Math.ceil(e);for(let s=0;s<w;s++){let n=v;if(w>e&&s===w-1){const t=null!==(f=n.width)&&void 0!==f?f:"100%",r=e%1,o="number"===typeof t?t*r:`calc(${t} * ${r})`;n={...n,width:o}}const t=u.createElement("span",{className:k,style:n,key:s},"\u200c");b?y.push(t):y.push(u.createElement(u.Fragment,{key:s},t,u.createElement("br",null)))}return u.createElement("span",{className:r,"data-testid":o,"aria-live":"polite","aria-busy":null===(p=m.enableAnimation)||void 0===p||p},n?y.map(((e,t)=>u.createElement(n,{key:t},e))):y)}function f({children:e,...n}){return u.createElement(s.Provider,{value:n},e)}var p=t(3147),_=t(4480);t(6860);var h=i().bind(a()),m=function(e){e=null!==e?e:function(e){throw e}(new TypeError("Cannot destructure undefined"));var n=(0,_.sJ)(p.W9);return(0,r.jsx)(f,{baseColor:n?"#383838":"",highlightColor:n?"#404040":"",borderRadius:0,children:(0,r.jsx)(d,{className:h("container",e.className)})})}},2121:function(e,n,t){"use strict";var r=t(5893),o=t(7166),i=t.n(o),c=t(6688),a=t.n(c),u=t(7294),s=t(1056),l=i().bind(a());n.Z=function(e){var n=e.link,t=e.iframeClassName,o=e.skeletonClassName,i=(0,u.useState)(!0),c=i[0],a=i[1];return(0,r.jsxs)("div",{className:l(e.className),children:[c&&(0,r.jsx)(s.Z,{className:l(o,"skeleton")}),(0,r.jsx)("iframe",{className:l(t,c&&"hide"),title:"youtube_video",src:"".concat(n,"?autoplay=1&showinfo=0&loop=1&mute=1&rel=0"),frameBorder:"0",allow:"autoplay; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,onLoad:function(){return a(!1)}})]})}},3756:function(e,n,t){"use strict";var r=t(7294);n.Z=function(){var e=(0,r.useState)([0,0]),n=e[0],t=e[1],o=n[0]>768;return(0,r.useLayoutEffect)((function(){var e=function(){t([window.innerWidth,window.innerHeight])};return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),{screenSize:n,isPcScreenSize:o}}},334:function(e,n,t){"use strict";var r;t.d(n,{S:function(){return r}}),function(e){e.ko="ko",e.en="en"}(r||(r={}))},3472:function(e,n,t){"use strict";t.d(n,{n:function(){return r}});var r=function(e){e.style.left="".concat(Math.floor(Math.random()*(window.innerWidth-e.offsetWidth)),"px"),e.style.top="".concat(Math.floor(Math.random()*(window.innerHeight-e.offsetHeight)),"px")}},9160:function(e,n,t){"use strict";t.d(n,{QW:function(){return r},gX:function(){return o},v7:function(){return i}});var r=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},o=function(e){if(e)return(e=e.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,"")).toLowerCase().replace(/ /g,"-")},i=function(e){return"https://drive.google.com/uc?export=view&id="+e}},2926:function(e,n,t){"use strict";t.d(n,{h:function(){return r}});var r=function(e,n){window.open(e,"_blank")}},9053:function(e,n,t){"use strict";t.r(n);var r=t(5893),o=t(8633),i=t.n(o),c=t(7166),a=t.n(c),u=t(4480),s=t(3147),l=t(1566),d=t(1664),f=t.n(d),p=t(1163),_=t(2926),h=a().bind(i());n.default=function(e){var n,t,o=e.workData,i=e.idx,c=e.id,a=e.className,d=e.onClickClose,m=(0,p.useRouter)(),v=(0,u.sJ)(s.b6),k=o&&(null===(n=o.description[v])||void 0===n?void 0:n.length),b=void 0!==k&&k>90;return o?(0,r.jsx)("span",{children:(0,r.jsxs)(l.Z,{title:"".concat(o.info.category," - ").concat(o.info.role),idx:i+1,className:h("container",a),isActive:!1,isDraggable:!1,onClickClose:d,children:[(0,r.jsxs)("p",{children:[null===(t=o.description[v])||void 0===t?void 0:t.substring(0,90).trimEnd(),b&&(0,r.jsxs)(r.Fragment,{children:["...",(0,r.jsx)(f(),{href:"/works/".concat(c),children:(0,r.jsx)("span",{className:h("link"),onTouchStart:function(){m.push("/works/".concat(c))},children:"read more"})})]})]}),o.link&&o.link.map((function(e){return(0,r.jsx)(f(),{href:e.url,target:"_blank",children:(0,r.jsxs)("span",{className:h("link","link--block"),onTouchStart:function(){return(0,_.h)(e.url)},children:["Visit the ",e.type," \u2192"]})})})),!b&&(0,r.jsx)(f(),{href:"/works/".concat(c),children:(0,r.jsx)("span",{className:h("link","link--block"),onTouchStart:function(){m.push("/works/".concat(c))},children:"Read More \u2192"})})]})}):null}},7420:function(e,n,t){"use strict";t.r(n);var r=t(5893),o=t(8669),i=t.n(o),c=t(7166),a=t.n(c),u=t(4480),s=t(3147),l=t(1566),d=t(7294),f=t(3756),p=t(2121),_=t(9053),h=t(9160),m=t(4490),v=a().bind(i());n.default=function(e){var n=e.workData,t=e.isRandomPositon,o=e.idx,i=e.id,c=(0,u.sJ)(s.b6),a=(0,u.sJ)(s.x7),k=(0,f.Z)().isPcScreenSize,b=(0,d.useState)(!1),y=b[0],w=b[1];return(0,d.useEffect)((function(){a==document.getElementById(i)?w(!0):w(!1)}),[a]),n?(0,r.jsxs)(l.Z,{id:i,title:n.title[c],isRandomPositon:t,idx:o+1,onMouseEnter:function(){return k&&w(!0)},onMouseLeave:function(){return k&&!(a==document.getElementById(i))&&w(!1)},className:v("container"),bodyClassName:v("body"),children:[n.video?(0,r.jsx)(p.Z,{link:n.video[0].url,className:v("video__container"),skeletonClassName:v("video__container","skeleton")}):n.thumbUrl&&(0,r.jsx)(m.Z,{src:(0,h.v7)(n.thumbUrl),className:v("image__container"),skeletonClassName:v("video__container"),isBackgroundImage:!0}),(0,r.jsx)(_.default,{className:v("description-popup".concat(!y&&"--hide")),workData:n,idx:o,id:i,onClickClose:function(){return w(!1)}})]}):null}},3147:function(e,n,t){"use strict";t.d(n,{Ud:function(){return u},W9:function(){return i},_v:function(){return a},b6:function(){return c},x7:function(){return s}});var r=t(334),o=t(4480),i=(0,o.cn)({key:"darkModeState",default:!1}),c=(0,o.cn)({key:"languageState",default:r.S.ko}),a=(0,o.cn)({key:"workFilterState",default:"All"}),u=(0,o.cn)({key:"popupOverlayState",default:999}),s=(0,o.cn)({key:"currentActivePopupState",default:null})},1128:function(e){e.exports={skeleton:"contentImage_skeleton__A38FN",hide:"contentImage_hide__W_OY9"}},9992:function(e){e.exports={container:"popup_container__i_NTy",header:"popup_header__EBPD_",button__wrapper:"popup_button__wrapper__poJSJ",close__button:"popup_close__button__B17h1","header--active":"popup_header--active__kGFGj",body:"popup_body__cpqJN",hide:"popup_hide__04Z7K"}},7571:function(e){e.exports={container:"skeletonBox_container__L0jDm"}},6688:function(e){e.exports={skeleton:"youtubeVideo_skeleton__SHtEx",hide:"youtubeVideo_hide__jqJwN"}},8633:function(e){e.exports={container:"workDescriptionPopup_container__fxGkS",link:"workDescriptionPopup_link__Ch6CT","link--block":"workDescriptionPopup_link--block__hslJ3"}},8669:function(e){e.exports={container:"workPopup_container__CLo12",body:"workPopup_body__Fjw9K",image__container:"workPopup_image__container__0Z_7k",video__container:"workPopup_video__container__K5hU_",skeleton:"workPopup_skeleton__BdD3D","description-popup":"workPopup_description-popup__M4lm5","description-popup--hide":"workPopup_description-popup--hide__CPzUN"}},6860:function(){}},function(e){e.O(0,[866,874,664,774,888,179],(function(){return n=6655,e(e.s=n);var n}));var n=e.O();_N_E=n}]);