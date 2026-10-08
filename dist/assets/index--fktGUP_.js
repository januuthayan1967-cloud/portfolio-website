(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const c of a)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function n(a){const c={};return a.integrity&&(c.integrity=a.integrity),a.referrerPolicy&&(c.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?c.credentials="include":a.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(a){if(a.ep)return;a.ep=!0;const c=n(a);fetch(a.href,c)}})();function Pm(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var hu={exports:{}},bo={},pu={exports:{}},xt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _p;function q0(){if(_p)return xt;_p=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),c=Symbol.for("react.provider"),u=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),S=Symbol.iterator;function v(x){return x===null||typeof x!="object"?null:(x=S&&x[S]||x["@@iterator"],typeof x=="function"?x:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,C={};function M(x,B,oe){this.props=x,this.context=B,this.refs=C,this.updater=oe||E}M.prototype.isReactComponent={},M.prototype.setState=function(x,B){if(typeof x!="object"&&typeof x!="function"&&x!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,x,B,"setState")},M.prototype.forceUpdate=function(x){this.updater.enqueueForceUpdate(this,x,"forceUpdate")};function y(){}y.prototype=M.prototype;function O(x,B,oe){this.props=x,this.context=B,this.refs=C,this.updater=oe||E}var U=O.prototype=new y;U.constructor=O,w(U,M.prototype),U.isPureReactComponent=!0;var L=Array.isArray,Y=Object.prototype.hasOwnProperty,z={current:null},k={key:!0,ref:!0,__self:!0,__source:!0};function X(x,B,oe){var V,J={},ce=null,ie=null;if(B!=null)for(V in B.ref!==void 0&&(ie=B.ref),B.key!==void 0&&(ce=""+B.key),B)Y.call(B,V)&&!k.hasOwnProperty(V)&&(J[V]=B[V]);var xe=arguments.length-2;if(xe===1)J.children=oe;else if(1<xe){for(var Ae=Array(xe),Ce=0;Ce<xe;Ce++)Ae[Ce]=arguments[Ce+2];J.children=Ae}if(x&&x.defaultProps)for(V in xe=x.defaultProps,xe)J[V]===void 0&&(J[V]=xe[V]);return{$$typeof:s,type:x,key:ce,ref:ie,props:J,_owner:z.current}}function P(x,B){return{$$typeof:s,type:x.type,key:B,ref:x.ref,props:x.props,_owner:x._owner}}function R(x){return typeof x=="object"&&x!==null&&x.$$typeof===s}function j(x){var B={"=":"=0",":":"=2"};return"$"+x.replace(/[=:]/g,function(oe){return B[oe]})}var he=/\/+/g;function ne(x,B){return typeof x=="object"&&x!==null&&x.key!=null?j(""+x.key):B.toString(36)}function pe(x,B,oe,V,J){var ce=typeof x;(ce==="undefined"||ce==="boolean")&&(x=null);var ie=!1;if(x===null)ie=!0;else switch(ce){case"string":case"number":ie=!0;break;case"object":switch(x.$$typeof){case s:case e:ie=!0}}if(ie)return ie=x,J=J(ie),x=V===""?"."+ne(ie,0):V,L(J)?(oe="",x!=null&&(oe=x.replace(he,"$&/")+"/"),pe(J,B,oe,"",function(Ce){return Ce})):J!=null&&(R(J)&&(J=P(J,oe+(!J.key||ie&&ie.key===J.key?"":(""+J.key).replace(he,"$&/")+"/")+x)),B.push(J)),1;if(ie=0,V=V===""?".":V+":",L(x))for(var xe=0;xe<x.length;xe++){ce=x[xe];var Ae=V+ne(ce,xe);ie+=pe(ce,B,oe,Ae,J)}else if(Ae=v(x),typeof Ae=="function")for(x=Ae.call(x),xe=0;!(ce=x.next()).done;)ce=ce.value,Ae=V+ne(ce,xe++),ie+=pe(ce,B,oe,Ae,J);else if(ce==="object")throw B=String(x),Error("Objects are not valid as a React child (found: "+(B==="[object Object]"?"object with keys {"+Object.keys(x).join(", ")+"}":B)+"). If you meant to render a collection of children, use an array instead.");return ie}function me(x,B,oe){if(x==null)return x;var V=[],J=0;return pe(x,V,"","",function(ce){return B.call(oe,ce,J++)}),V}function de(x){if(x._status===-1){var B=x._result;B=B(),B.then(function(oe){(x._status===0||x._status===-1)&&(x._status=1,x._result=oe)},function(oe){(x._status===0||x._status===-1)&&(x._status=2,x._result=oe)}),x._status===-1&&(x._status=0,x._result=B)}if(x._status===1)return x._result.default;throw x._result}var ae={current:null},G={transition:null},fe={ReactCurrentDispatcher:ae,ReactCurrentBatchConfig:G,ReactCurrentOwner:z};function N(){throw Error("act(...) is not supported in production builds of React.")}return xt.Children={map:me,forEach:function(x,B,oe){me(x,function(){B.apply(this,arguments)},oe)},count:function(x){var B=0;return me(x,function(){B++}),B},toArray:function(x){return me(x,function(B){return B})||[]},only:function(x){if(!R(x))throw Error("React.Children.only expected to receive a single React element child.");return x}},xt.Component=M,xt.Fragment=n,xt.Profiler=a,xt.PureComponent=O,xt.StrictMode=r,xt.Suspense=h,xt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fe,xt.act=N,xt.cloneElement=function(x,B,oe){if(x==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+x+".");var V=w({},x.props),J=x.key,ce=x.ref,ie=x._owner;if(B!=null){if(B.ref!==void 0&&(ce=B.ref,ie=z.current),B.key!==void 0&&(J=""+B.key),x.type&&x.type.defaultProps)var xe=x.type.defaultProps;for(Ae in B)Y.call(B,Ae)&&!k.hasOwnProperty(Ae)&&(V[Ae]=B[Ae]===void 0&&xe!==void 0?xe[Ae]:B[Ae])}var Ae=arguments.length-2;if(Ae===1)V.children=oe;else if(1<Ae){xe=Array(Ae);for(var Ce=0;Ce<Ae;Ce++)xe[Ce]=arguments[Ce+2];V.children=xe}return{$$typeof:s,type:x.type,key:J,ref:ce,props:V,_owner:ie}},xt.createContext=function(x){return x={$$typeof:u,_currentValue:x,_currentValue2:x,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},x.Provider={$$typeof:c,_context:x},x.Consumer=x},xt.createElement=X,xt.createFactory=function(x){var B=X.bind(null,x);return B.type=x,B},xt.createRef=function(){return{current:null}},xt.forwardRef=function(x){return{$$typeof:d,render:x}},xt.isValidElement=R,xt.lazy=function(x){return{$$typeof:_,_payload:{_status:-1,_result:x},_init:de}},xt.memo=function(x,B){return{$$typeof:g,type:x,compare:B===void 0?null:B}},xt.startTransition=function(x){var B=G.transition;G.transition={};try{x()}finally{G.transition=B}},xt.unstable_act=N,xt.useCallback=function(x,B){return ae.current.useCallback(x,B)},xt.useContext=function(x){return ae.current.useContext(x)},xt.useDebugValue=function(){},xt.useDeferredValue=function(x){return ae.current.useDeferredValue(x)},xt.useEffect=function(x,B){return ae.current.useEffect(x,B)},xt.useId=function(){return ae.current.useId()},xt.useImperativeHandle=function(x,B,oe){return ae.current.useImperativeHandle(x,B,oe)},xt.useInsertionEffect=function(x,B){return ae.current.useInsertionEffect(x,B)},xt.useLayoutEffect=function(x,B){return ae.current.useLayoutEffect(x,B)},xt.useMemo=function(x,B){return ae.current.useMemo(x,B)},xt.useReducer=function(x,B,oe){return ae.current.useReducer(x,B,oe)},xt.useRef=function(x){return ae.current.useRef(x)},xt.useState=function(x){return ae.current.useState(x)},xt.useSyncExternalStore=function(x,B,oe){return ae.current.useSyncExternalStore(x,B,oe)},xt.useTransition=function(){return ae.current.useTransition()},xt.version="18.3.1",xt}var yp;function Od(){return yp||(yp=1,pu.exports=q0()),pu.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sp;function Y0(){if(Sp)return bo;Sp=1;var s=Od(),e=Symbol.for("react.element"),n=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function u(d,h,g){var _,S={},v=null,E=null;g!==void 0&&(v=""+g),h.key!==void 0&&(v=""+h.key),h.ref!==void 0&&(E=h.ref);for(_ in h)r.call(h,_)&&!c.hasOwnProperty(_)&&(S[_]=h[_]);if(d&&d.defaultProps)for(_ in h=d.defaultProps,h)S[_]===void 0&&(S[_]=h[_]);return{$$typeof:e,type:d,key:v,ref:E,props:S,_owner:a.current}}return bo.Fragment=n,bo.jsx=u,bo.jsxs=u,bo}var Mp;function $0(){return Mp||(Mp=1,hu.exports=Y0()),hu.exports}var p=$0(),at=Od();const K0=Pm(at);var qa={},mu={exports:{}},Ln={},gu={exports:{}},xu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ep;function Z0(){return Ep||(Ep=1,(function(s){function e(G,fe){var N=G.length;G.push(fe);e:for(;0<N;){var x=N-1>>>1,B=G[x];if(0<a(B,fe))G[x]=fe,G[N]=B,N=x;else break e}}function n(G){return G.length===0?null:G[0]}function r(G){if(G.length===0)return null;var fe=G[0],N=G.pop();if(N!==fe){G[0]=N;e:for(var x=0,B=G.length,oe=B>>>1;x<oe;){var V=2*(x+1)-1,J=G[V],ce=V+1,ie=G[ce];if(0>a(J,N))ce<B&&0>a(ie,J)?(G[x]=ie,G[ce]=N,x=ce):(G[x]=J,G[V]=N,x=V);else if(ce<B&&0>a(ie,N))G[x]=ie,G[ce]=N,x=ce;else break e}}return fe}function a(G,fe){var N=G.sortIndex-fe.sortIndex;return N!==0?N:G.id-fe.id}if(typeof performance=="object"&&typeof performance.now=="function"){var c=performance;s.unstable_now=function(){return c.now()}}else{var u=Date,d=u.now();s.unstable_now=function(){return u.now()-d}}var h=[],g=[],_=1,S=null,v=3,E=!1,w=!1,C=!1,M=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,O=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function U(G){for(var fe=n(g);fe!==null;){if(fe.callback===null)r(g);else if(fe.startTime<=G)r(g),fe.sortIndex=fe.expirationTime,e(h,fe);else break;fe=n(g)}}function L(G){if(C=!1,U(G),!w)if(n(h)!==null)w=!0,de(Y);else{var fe=n(g);fe!==null&&ae(L,fe.startTime-G)}}function Y(G,fe){w=!1,C&&(C=!1,y(X),X=-1),E=!0;var N=v;try{for(U(fe),S=n(h);S!==null&&(!(S.expirationTime>fe)||G&&!j());){var x=S.callback;if(typeof x=="function"){S.callback=null,v=S.priorityLevel;var B=x(S.expirationTime<=fe);fe=s.unstable_now(),typeof B=="function"?S.callback=B:S===n(h)&&r(h),U(fe)}else r(h);S=n(h)}if(S!==null)var oe=!0;else{var V=n(g);V!==null&&ae(L,V.startTime-fe),oe=!1}return oe}finally{S=null,v=N,E=!1}}var z=!1,k=null,X=-1,P=5,R=-1;function j(){return!(s.unstable_now()-R<P)}function he(){if(k!==null){var G=s.unstable_now();R=G;var fe=!0;try{fe=k(!0,G)}finally{fe?ne():(z=!1,k=null)}}else z=!1}var ne;if(typeof O=="function")ne=function(){O(he)};else if(typeof MessageChannel<"u"){var pe=new MessageChannel,me=pe.port2;pe.port1.onmessage=he,ne=function(){me.postMessage(null)}}else ne=function(){M(he,0)};function de(G){k=G,z||(z=!0,ne())}function ae(G,fe){X=M(function(){G(s.unstable_now())},fe)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(G){G.callback=null},s.unstable_continueExecution=function(){w||E||(w=!0,de(Y))},s.unstable_forceFrameRate=function(G){0>G||125<G?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<G?Math.floor(1e3/G):5},s.unstable_getCurrentPriorityLevel=function(){return v},s.unstable_getFirstCallbackNode=function(){return n(h)},s.unstable_next=function(G){switch(v){case 1:case 2:case 3:var fe=3;break;default:fe=v}var N=v;v=fe;try{return G()}finally{v=N}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(G,fe){switch(G){case 1:case 2:case 3:case 4:case 5:break;default:G=3}var N=v;v=G;try{return fe()}finally{v=N}},s.unstable_scheduleCallback=function(G,fe,N){var x=s.unstable_now();switch(typeof N=="object"&&N!==null?(N=N.delay,N=typeof N=="number"&&0<N?x+N:x):N=x,G){case 1:var B=-1;break;case 2:B=250;break;case 5:B=1073741823;break;case 4:B=1e4;break;default:B=5e3}return B=N+B,G={id:_++,callback:fe,priorityLevel:G,startTime:N,expirationTime:B,sortIndex:-1},N>x?(G.sortIndex=N,e(g,G),n(h)===null&&G===n(g)&&(C?(y(X),X=-1):C=!0,ae(L,N-x))):(G.sortIndex=B,e(h,G),w||E||(w=!0,de(Y))),G},s.unstable_shouldYield=j,s.unstable_wrapCallback=function(G){var fe=v;return function(){var N=v;v=fe;try{return G.apply(this,arguments)}finally{v=N}}}})(xu)),xu}var Tp;function Q0(){return Tp||(Tp=1,gu.exports=Z0()),gu.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wp;function J0(){if(wp)return Ln;wp=1;var s=Od(),e=Q0();function n(t){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+t,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,a={};function c(t,i){u(t,i),u(t+"Capture",i)}function u(t,i){for(a[t]=i,t=0;t<i.length;t++)r.add(i[t])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,g=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,_={},S={};function v(t){return h.call(S,t)?!0:h.call(_,t)?!1:g.test(t)?S[t]=!0:(_[t]=!0,!1)}function E(t,i,o,l){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return l?!1:o!==null?!o.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function w(t,i,o,l){if(i===null||typeof i>"u"||E(t,i,o,l))return!0;if(l)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function C(t,i,o,l,f,m,T){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=l,this.attributeNamespace=f,this.mustUseProperty=o,this.propertyName=t,this.type=i,this.sanitizeURL=m,this.removeEmptyString=T}var M={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){M[t]=new C(t,0,!1,t,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var i=t[0];M[i]=new C(i,1,!1,t[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(t){M[t]=new C(t,2,!1,t.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){M[t]=new C(t,2,!1,t,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){M[t]=new C(t,3,!1,t.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(t){M[t]=new C(t,3,!0,t,null,!1,!1)}),["capture","download"].forEach(function(t){M[t]=new C(t,4,!1,t,null,!1,!1)}),["cols","rows","size","span"].forEach(function(t){M[t]=new C(t,6,!1,t,null,!1,!1)}),["rowSpan","start"].forEach(function(t){M[t]=new C(t,5,!1,t.toLowerCase(),null,!1,!1)});var y=/[\-:]([a-z])/g;function O(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var i=t.replace(y,O);M[i]=new C(i,1,!1,t,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var i=t.replace(y,O);M[i]=new C(i,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(t){var i=t.replace(y,O);M[i]=new C(i,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(t){M[t]=new C(t,1,!1,t.toLowerCase(),null,!1,!1)}),M.xlinkHref=new C("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(t){M[t]=new C(t,1,!1,t.toLowerCase(),null,!0,!0)});function U(t,i,o,l){var f=M.hasOwnProperty(i)?M[i]:null;(f!==null?f.type!==0:l||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(w(i,o,f,l)&&(o=null),l||f===null?v(i)&&(o===null?t.removeAttribute(i):t.setAttribute(i,""+o)):f.mustUseProperty?t[f.propertyName]=o===null?f.type===3?!1:"":o:(i=f.attributeName,l=f.attributeNamespace,o===null?t.removeAttribute(i):(f=f.type,o=f===3||f===4&&o===!0?"":""+o,l?t.setAttributeNS(l,i,o):t.setAttribute(i,o))))}var L=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Y=Symbol.for("react.element"),z=Symbol.for("react.portal"),k=Symbol.for("react.fragment"),X=Symbol.for("react.strict_mode"),P=Symbol.for("react.profiler"),R=Symbol.for("react.provider"),j=Symbol.for("react.context"),he=Symbol.for("react.forward_ref"),ne=Symbol.for("react.suspense"),pe=Symbol.for("react.suspense_list"),me=Symbol.for("react.memo"),de=Symbol.for("react.lazy"),ae=Symbol.for("react.offscreen"),G=Symbol.iterator;function fe(t){return t===null||typeof t!="object"?null:(t=G&&t[G]||t["@@iterator"],typeof t=="function"?t:null)}var N=Object.assign,x;function B(t){if(x===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);x=i&&i[1]||""}return`
`+x+t}var oe=!1;function V(t,i){if(!t||oe)return"";oe=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(se){var l=se}Reflect.construct(t,[],i)}else{try{i.call()}catch(se){l=se}t.call(i.prototype)}else{try{throw Error()}catch(se){l=se}t()}}catch(se){if(se&&l&&typeof se.stack=="string"){for(var f=se.stack.split(`
`),m=l.stack.split(`
`),T=f.length-1,D=m.length-1;1<=T&&0<=D&&f[T]!==m[D];)D--;for(;1<=T&&0<=D;T--,D--)if(f[T]!==m[D]){if(T!==1||D!==1)do if(T--,D--,0>D||f[T]!==m[D]){var H=`
`+f[T].replace(" at new "," at ");return t.displayName&&H.includes("<anonymous>")&&(H=H.replace("<anonymous>",t.displayName)),H}while(1<=T&&0<=D);break}}}finally{oe=!1,Error.prepareStackTrace=o}return(t=t?t.displayName||t.name:"")?B(t):""}function J(t){switch(t.tag){case 5:return B(t.type);case 16:return B("Lazy");case 13:return B("Suspense");case 19:return B("SuspenseList");case 0:case 2:case 15:return t=V(t.type,!1),t;case 11:return t=V(t.type.render,!1),t;case 1:return t=V(t.type,!0),t;default:return""}}function ce(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case k:return"Fragment";case z:return"Portal";case P:return"Profiler";case X:return"StrictMode";case ne:return"Suspense";case pe:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case j:return(t.displayName||"Context")+".Consumer";case R:return(t._context.displayName||"Context")+".Provider";case he:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case me:return i=t.displayName||null,i!==null?i:ce(t.type)||"Memo";case de:i=t._payload,t=t._init;try{return ce(t(i))}catch{}}return null}function ie(t){var i=t.type;switch(t.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=i.render,t=t.displayName||t.name||"",i.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ce(i);case 8:return i===X?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function xe(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Ae(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ce(t){var i=Ae(t)?"checked":"value",o=Object.getOwnPropertyDescriptor(t.constructor.prototype,i),l=""+t[i];if(!t.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var f=o.get,m=o.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return f.call(this)},set:function(T){l=""+T,m.call(this,T)}}),Object.defineProperty(t,i,{enumerable:o.enumerable}),{getValue:function(){return l},setValue:function(T){l=""+T},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function Qe(t){t._valueTracker||(t._valueTracker=Ce(t))}function nt(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var o=i.getValue(),l="";return t&&(l=Ae(t)?t.checked?"true":"false":t.value),t=l,t!==o?(i.setValue(t),!0):!1}function $e(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function F(t,i){var o=i.checked;return N({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??t._wrapperState.initialChecked})}function Rt(t,i){var o=i.defaultValue==null?"":i.defaultValue,l=i.checked!=null?i.checked:i.defaultChecked;o=xe(i.value!=null?i.value:o),t._wrapperState={initialChecked:l,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function it(t,i){i=i.checked,i!=null&&U(t,"checked",i,!1)}function tt(t,i){it(t,i);var o=xe(i.value),l=i.type;if(o!=null)l==="number"?(o===0&&t.value===""||t.value!=o)&&(t.value=""+o):t.value!==""+o&&(t.value=""+o);else if(l==="submit"||l==="reset"){t.removeAttribute("value");return}i.hasOwnProperty("value")?vt(t,i.type,o):i.hasOwnProperty("defaultValue")&&vt(t,i.type,xe(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(t.defaultChecked=!!i.defaultChecked)}function Be(t,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var l=i.type;if(!(l!=="submit"&&l!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+t._wrapperState.initialValue,o||i===t.value||(t.value=i),t.defaultValue=i}o=t.name,o!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,o!==""&&(t.name=o)}function vt(t,i,o){(i!=="number"||$e(t.ownerDocument)!==t)&&(o==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+o&&(t.defaultValue=""+o))}var Ue=Array.isArray;function I(t,i,o,l){if(t=t.options,i){i={};for(var f=0;f<o.length;f++)i["$"+o[f]]=!0;for(o=0;o<t.length;o++)f=i.hasOwnProperty("$"+t[o].value),t[o].selected!==f&&(t[o].selected=f),f&&l&&(t[o].defaultSelected=!0)}else{for(o=""+xe(o),i=null,f=0;f<t.length;f++){if(t[f].value===o){t[f].selected=!0,l&&(t[f].defaultSelected=!0);return}i!==null||t[f].disabled||(i=t[f])}i!==null&&(i.selected=!0)}}function b(t,i){if(i.dangerouslySetInnerHTML!=null)throw Error(n(91));return N({},i,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function te(t,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(n(92));if(Ue(o)){if(1<o.length)throw Error(n(93));o=o[0]}i=o}i==null&&(i=""),o=i}t._wrapperState={initialValue:xe(o)}}function _e(t,i){var o=xe(i.value),l=xe(i.defaultValue);o!=null&&(o=""+o,o!==t.value&&(t.value=o),i.defaultValue==null&&t.defaultValue!==o&&(t.defaultValue=o)),l!=null&&(t.defaultValue=""+l)}function ye(t){var i=t.textContent;i===t._wrapperState.initialValue&&i!==""&&i!==null&&(t.value=i)}function ge(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Xe(t,i){return t==null||t==="http://www.w3.org/1999/xhtml"?ge(i):t==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Re,Fe=(function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,l,f){MSApp.execUnsafeLocalFunction(function(){return t(i,o,l,f)})}:t})(function(t,i){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=i;else{for(Re=Re||document.createElement("div"),Re.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Re.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;i.firstChild;)t.appendChild(i.firstChild)}});function ft(t,i){if(i){var o=t.firstChild;if(o&&o===t.lastChild&&o.nodeType===3){o.nodeValue=i;return}}t.textContent=i}var Ee={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ze=["Webkit","ms","Moz","O"];Object.keys(Ee).forEach(function(t){ze.forEach(function(i){i=i+t.charAt(0).toUpperCase()+t.substring(1),Ee[i]=Ee[t]})});function Ze(t,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||Ee.hasOwnProperty(t)&&Ee[t]?(""+i).trim():i+"px"}function st(t,i){t=t.style;for(var o in i)if(i.hasOwnProperty(o)){var l=o.indexOf("--")===0,f=Ze(o,i[o],l);o==="float"&&(o="cssFloat"),l?t.setProperty(o,f):t[o]=f}}var Ve=N({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function gt(t,i){if(i){if(Ve[t]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(n(137,t));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(n(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(n(61))}if(i.style!=null&&typeof i.style!="object")throw Error(n(62))}}function ct(t,i){if(t.indexOf("-")===-1)return typeof i.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Pt=null;function q(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Pe=null,ue=null,ve=null;function De(t){if(t=uo(t)){if(typeof Pe!="function")throw Error(n(280));var i=t.stateNode;i&&(i=la(i),Pe(t.stateNode,t.type,i))}}function Ie(t){ue?ve?ve.push(t):ve=[t]:ue=t}function ut(){if(ue){var t=ue,i=ve;if(ve=ue=null,De(t),i)for(t=0;t<i.length;t++)De(i[t])}}function Ut(t,i){return t(i)}function Kt(){}var Et=!1;function wn(t,i,o){if(Et)return t(i,o);Et=!0;try{return Ut(t,i,o)}finally{Et=!1,(ue!==null||ve!==null)&&(Kt(),ut())}}function _n(t,i){var o=t.stateNode;if(o===null)return null;var l=la(o);if(l===null)return null;o=l[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break e;default:t=!1}if(t)return null;if(o&&typeof o!="function")throw Error(n(231,i,typeof o));return o}var Kr=!1;if(d)try{var ji={};Object.defineProperty(ji,"passive",{get:function(){Kr=!0}}),window.addEventListener("test",ji,ji),window.removeEventListener("test",ji,ji)}catch{Kr=!1}function yi(t,i,o,l,f,m,T,D,H){var se=Array.prototype.slice.call(arguments,3);try{i.apply(o,se)}catch(Me){this.onError(Me)}}var Si=!1,Mr=null,Er=!1,Gi=null,Bo={onError:function(t){Si=!0,Mr=t}};function Zr(t,i,o,l,f,m,T,D,H){Si=!1,Mr=null,yi.apply(Bo,arguments)}function Ho(t,i,o,l,f,m,T,D,H){if(Zr.apply(this,arguments),Si){if(Si){var se=Mr;Si=!1,Mr=null}else throw Error(n(198));Er||(Er=!0,Gi=se)}}function ui(t){var i=t,o=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(o=i.return),t=i.return;while(t)}return i.tag===3?o:null}function Vo(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function jo(t){if(ui(t)!==t)throw Error(n(188))}function Fl(t){var i=t.alternate;if(!i){if(i=ui(t),i===null)throw Error(n(188));return i!==t?null:t}for(var o=t,l=i;;){var f=o.return;if(f===null)break;var m=f.alternate;if(m===null){if(l=f.return,l!==null){o=l;continue}break}if(f.child===m.child){for(m=f.child;m;){if(m===o)return jo(f),t;if(m===l)return jo(f),i;m=m.sibling}throw Error(n(188))}if(o.return!==l.return)o=f,l=m;else{for(var T=!1,D=f.child;D;){if(D===o){T=!0,o=f,l=m;break}if(D===l){T=!0,l=f,o=m;break}D=D.sibling}if(!T){for(D=m.child;D;){if(D===o){T=!0,o=m,l=f;break}if(D===l){T=!0,l=m,o=f;break}D=D.sibling}if(!T)throw Error(n(189))}}if(o.alternate!==l)throw Error(n(190))}if(o.tag!==3)throw Error(n(188));return o.stateNode.current===o?t:i}function Go(t){return t=Fl(t),t!==null?Wo(t):null}function Wo(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var i=Wo(t);if(i!==null)return i;t=t.sibling}return null}var Xo=e.unstable_scheduleCallback,A=e.unstable_cancelCallback,$=e.unstable_shouldYield,re=e.unstable_requestPaint,Q=e.unstable_now,K=e.unstable_getCurrentPriorityLevel,we=e.unstable_ImmediatePriority,Le=e.unstable_UserBlockingPriority,ke=e.unstable_NormalPriority,je=e.unstable_LowPriority,ot=e.unstable_IdlePriority,rt=null,We=null;function yt(t){if(We&&typeof We.onCommitFiberRoot=="function")try{We.onCommitFiberRoot(rt,t,void 0,(t.current.flags&128)===128)}catch{}}var ht=Math.clz32?Math.clz32:Mt,Vt=Math.log,Ot=Math.LN2;function Mt(t){return t>>>=0,t===0?32:31-(Vt(t)/Ot|0)|0}var Ke=64,jt=4194304;function _t(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function dn(t,i){var o=t.pendingLanes;if(o===0)return 0;var l=0,f=t.suspendedLanes,m=t.pingedLanes,T=o&268435455;if(T!==0){var D=T&~f;D!==0?l=_t(D):(m&=T,m!==0&&(l=_t(m)))}else T=o&~f,T!==0?l=_t(T):m!==0&&(l=_t(m));if(l===0)return 0;if(i!==0&&i!==l&&(i&f)===0&&(f=l&-l,m=i&-i,f>=m||f===16&&(m&4194240)!==0))return i;if((l&4)!==0&&(l|=o&16),i=t.entangledLanes,i!==0)for(t=t.entanglements,i&=l;0<i;)o=31-ht(i),f=1<<o,l|=t[o],i&=~f;return l}function Wi(t,i){switch(t){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function yn(t,i){for(var o=t.suspendedLanes,l=t.pingedLanes,f=t.expirationTimes,m=t.pendingLanes;0<m;){var T=31-ht(m),D=1<<T,H=f[T];H===-1?((D&o)===0||(D&l)!==0)&&(f[T]=Wi(D,i)):H<=i&&(t.expiredLanes|=D),m&=~D}}function Mi(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Nt(){var t=Ke;return Ke<<=1,(Ke&4194240)===0&&(Ke=64),t}function fn(t){for(var i=[],o=0;31>o;o++)i.push(t);return i}function tn(t,i,o){t.pendingLanes|=i,i!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,i=31-ht(i),t[i]=o}function ln(t,i){var o=t.pendingLanes&~i;t.pendingLanes=i,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=i,t.mutableReadLanes&=i,t.entangledLanes&=i,i=t.entanglements;var l=t.eventTimes;for(t=t.expirationTimes;0<o;){var f=31-ht(o),m=1<<f;i[f]=0,l[f]=-1,t[f]=-1,o&=~m}}function nn(t,i){var o=t.entangledLanes|=i;for(t=t.entanglements;o;){var l=31-ht(o),f=1<<l;f&i|t[l]&i&&(t[l]|=i),o&=~f}}var Tt=0;function di(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var Zd,kl,Qd,Jd,ef,Ol=!1,qo=[],Xi=null,qi=null,Yi=null,Ys=new Map,$s=new Map,$i=[],mg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function tf(t,i){switch(t){case"focusin":case"focusout":Xi=null;break;case"dragenter":case"dragleave":qi=null;break;case"mouseover":case"mouseout":Yi=null;break;case"pointerover":case"pointerout":Ys.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":$s.delete(i.pointerId)}}function Ks(t,i,o,l,f,m){return t===null||t.nativeEvent!==m?(t={blockedOn:i,domEventName:o,eventSystemFlags:l,nativeEvent:m,targetContainers:[f]},i!==null&&(i=uo(i),i!==null&&kl(i)),t):(t.eventSystemFlags|=l,i=t.targetContainers,f!==null&&i.indexOf(f)===-1&&i.push(f),t)}function gg(t,i,o,l,f){switch(i){case"focusin":return Xi=Ks(Xi,t,i,o,l,f),!0;case"dragenter":return qi=Ks(qi,t,i,o,l,f),!0;case"mouseover":return Yi=Ks(Yi,t,i,o,l,f),!0;case"pointerover":var m=f.pointerId;return Ys.set(m,Ks(Ys.get(m)||null,t,i,o,l,f)),!0;case"gotpointercapture":return m=f.pointerId,$s.set(m,Ks($s.get(m)||null,t,i,o,l,f)),!0}return!1}function nf(t){var i=Tr(t.target);if(i!==null){var o=ui(i);if(o!==null){if(i=o.tag,i===13){if(i=Vo(o),i!==null){t.blockedOn=i,ef(t.priority,function(){Qd(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){t.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Yo(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var o=Bl(t.domEventName,t.eventSystemFlags,i[0],t.nativeEvent);if(o===null){o=t.nativeEvent;var l=new o.constructor(o.type,o);Pt=l,o.target.dispatchEvent(l),Pt=null}else return i=uo(o),i!==null&&kl(i),t.blockedOn=o,!1;i.shift()}return!0}function rf(t,i,o){Yo(t)&&o.delete(i)}function xg(){Ol=!1,Xi!==null&&Yo(Xi)&&(Xi=null),qi!==null&&Yo(qi)&&(qi=null),Yi!==null&&Yo(Yi)&&(Yi=null),Ys.forEach(rf),$s.forEach(rf)}function Zs(t,i){t.blockedOn===i&&(t.blockedOn=null,Ol||(Ol=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,xg)))}function Qs(t){function i(f){return Zs(f,t)}if(0<qo.length){Zs(qo[0],t);for(var o=1;o<qo.length;o++){var l=qo[o];l.blockedOn===t&&(l.blockedOn=null)}}for(Xi!==null&&Zs(Xi,t),qi!==null&&Zs(qi,t),Yi!==null&&Zs(Yi,t),Ys.forEach(i),$s.forEach(i),o=0;o<$i.length;o++)l=$i[o],l.blockedOn===t&&(l.blockedOn=null);for(;0<$i.length&&(o=$i[0],o.blockedOn===null);)nf(o),o.blockedOn===null&&$i.shift()}var Qr=L.ReactCurrentBatchConfig,$o=!0;function vg(t,i,o,l){var f=Tt,m=Qr.transition;Qr.transition=null;try{Tt=1,zl(t,i,o,l)}finally{Tt=f,Qr.transition=m}}function _g(t,i,o,l){var f=Tt,m=Qr.transition;Qr.transition=null;try{Tt=4,zl(t,i,o,l)}finally{Tt=f,Qr.transition=m}}function zl(t,i,o,l){if($o){var f=Bl(t,i,o,l);if(f===null)ic(t,i,l,Ko,o),tf(t,l);else if(gg(f,t,i,o,l))l.stopPropagation();else if(tf(t,l),i&4&&-1<mg.indexOf(t)){for(;f!==null;){var m=uo(f);if(m!==null&&Zd(m),m=Bl(t,i,o,l),m===null&&ic(t,i,l,Ko,o),m===f)break;f=m}f!==null&&l.stopPropagation()}else ic(t,i,l,null,o)}}var Ko=null;function Bl(t,i,o,l){if(Ko=null,t=q(l),t=Tr(t),t!==null)if(i=ui(t),i===null)t=null;else if(o=i.tag,o===13){if(t=Vo(i),t!==null)return t;t=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null);return Ko=t,null}function sf(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(K()){case we:return 1;case Le:return 4;case ke:case je:return 16;case ot:return 536870912;default:return 16}default:return 16}}var Ki=null,Hl=null,Zo=null;function of(){if(Zo)return Zo;var t,i=Hl,o=i.length,l,f="value"in Ki?Ki.value:Ki.textContent,m=f.length;for(t=0;t<o&&i[t]===f[t];t++);var T=o-t;for(l=1;l<=T&&i[o-l]===f[m-l];l++);return Zo=f.slice(t,1<l?1-l:void 0)}function Qo(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function Jo(){return!0}function af(){return!1}function Un(t){function i(o,l,f,m,T){this._reactName=o,this._targetInst=f,this.type=l,this.nativeEvent=m,this.target=T,this.currentTarget=null;for(var D in t)t.hasOwnProperty(D)&&(o=t[D],this[D]=o?o(m):m[D]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?Jo:af,this.isPropagationStopped=af,this}return N(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=Jo)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=Jo)},persist:function(){},isPersistent:Jo}),i}var Jr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Vl=Un(Jr),Js=N({},Jr,{view:0,detail:0}),yg=Un(Js),jl,Gl,eo,ea=N({},Js,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Xl,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==eo&&(eo&&t.type==="mousemove"?(jl=t.screenX-eo.screenX,Gl=t.screenY-eo.screenY):Gl=jl=0,eo=t),jl)},movementY:function(t){return"movementY"in t?t.movementY:Gl}}),lf=Un(ea),Sg=N({},ea,{dataTransfer:0}),Mg=Un(Sg),Eg=N({},Js,{relatedTarget:0}),Wl=Un(Eg),Tg=N({},Jr,{animationName:0,elapsedTime:0,pseudoElement:0}),wg=Un(Tg),bg=N({},Jr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Ag=Un(bg),Cg=N({},Jr,{data:0}),cf=Un(Cg),Rg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Pg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Lg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ng(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=Lg[t])?!!i[t]:!1}function Xl(){return Ng}var Ig=N({},Js,{key:function(t){if(t.key){var i=Rg[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=Qo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Pg[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Xl,charCode:function(t){return t.type==="keypress"?Qo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Qo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Dg=Un(Ig),Ug=N({},ea,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),uf=Un(Ug),Fg=N({},Js,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Xl}),kg=Un(Fg),Og=N({},Jr,{propertyName:0,elapsedTime:0,pseudoElement:0}),zg=Un(Og),Bg=N({},ea,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Hg=Un(Bg),Vg=[9,13,27,32],ql=d&&"CompositionEvent"in window,to=null;d&&"documentMode"in document&&(to=document.documentMode);var jg=d&&"TextEvent"in window&&!to,df=d&&(!ql||to&&8<to&&11>=to),ff=" ",hf=!1;function pf(t,i){switch(t){case"keyup":return Vg.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function mf(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var es=!1;function Gg(t,i){switch(t){case"compositionend":return mf(i);case"keypress":return i.which!==32?null:(hf=!0,ff);case"textInput":return t=i.data,t===ff&&hf?null:t;default:return null}}function Wg(t,i){if(es)return t==="compositionend"||!ql&&pf(t,i)?(t=of(),Zo=Hl=Ki=null,es=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return df&&i.locale!=="ko"?null:i.data;default:return null}}var Xg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function gf(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!Xg[t.type]:i==="textarea"}function xf(t,i,o,l){Ie(l),i=sa(i,"onChange"),0<i.length&&(o=new Vl("onChange","change",null,o,l),t.push({event:o,listeners:i}))}var no=null,io=null;function qg(t){Uf(t,0)}function ta(t){var i=ss(t);if(nt(i))return t}function Yg(t,i){if(t==="change")return i}var vf=!1;if(d){var Yl;if(d){var $l="oninput"in document;if(!$l){var _f=document.createElement("div");_f.setAttribute("oninput","return;"),$l=typeof _f.oninput=="function"}Yl=$l}else Yl=!1;vf=Yl&&(!document.documentMode||9<document.documentMode)}function yf(){no&&(no.detachEvent("onpropertychange",Sf),io=no=null)}function Sf(t){if(t.propertyName==="value"&&ta(io)){var i=[];xf(i,io,t,q(t)),wn(qg,i)}}function $g(t,i,o){t==="focusin"?(yf(),no=i,io=o,no.attachEvent("onpropertychange",Sf)):t==="focusout"&&yf()}function Kg(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ta(io)}function Zg(t,i){if(t==="click")return ta(i)}function Qg(t,i){if(t==="input"||t==="change")return ta(i)}function Jg(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var Zn=typeof Object.is=="function"?Object.is:Jg;function ro(t,i){if(Zn(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var o=Object.keys(t),l=Object.keys(i);if(o.length!==l.length)return!1;for(l=0;l<o.length;l++){var f=o[l];if(!h.call(i,f)||!Zn(t[f],i[f]))return!1}return!0}function Mf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Ef(t,i){var o=Mf(t);t=0;for(var l;o;){if(o.nodeType===3){if(l=t+o.textContent.length,t<=i&&l>=i)return{node:o,offset:i-t};t=l}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=Mf(o)}}function Tf(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?Tf(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function wf(){for(var t=window,i=$e();i instanceof t.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)t=i.contentWindow;else break;i=$e(t.document)}return i}function Kl(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}function e0(t){var i=wf(),o=t.focusedElem,l=t.selectionRange;if(i!==o&&o&&o.ownerDocument&&Tf(o.ownerDocument.documentElement,o)){if(l!==null&&Kl(o)){if(i=l.start,t=l.end,t===void 0&&(t=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(t,o.value.length);else if(t=(i=o.ownerDocument||document)&&i.defaultView||window,t.getSelection){t=t.getSelection();var f=o.textContent.length,m=Math.min(l.start,f);l=l.end===void 0?m:Math.min(l.end,f),!t.extend&&m>l&&(f=l,l=m,m=f),f=Ef(o,m);var T=Ef(o,l);f&&T&&(t.rangeCount!==1||t.anchorNode!==f.node||t.anchorOffset!==f.offset||t.focusNode!==T.node||t.focusOffset!==T.offset)&&(i=i.createRange(),i.setStart(f.node,f.offset),t.removeAllRanges(),m>l?(t.addRange(i),t.extend(T.node,T.offset)):(i.setEnd(T.node,T.offset),t.addRange(i)))}}for(i=[],t=o;t=t.parentNode;)t.nodeType===1&&i.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)t=i[o],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var t0=d&&"documentMode"in document&&11>=document.documentMode,ts=null,Zl=null,so=null,Ql=!1;function bf(t,i,o){var l=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;Ql||ts==null||ts!==$e(l)||(l=ts,"selectionStart"in l&&Kl(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),so&&ro(so,l)||(so=l,l=sa(Zl,"onSelect"),0<l.length&&(i=new Vl("onSelect","select",null,i,o),t.push({event:i,listeners:l}),i.target=ts)))}function na(t,i){var o={};return o[t.toLowerCase()]=i.toLowerCase(),o["Webkit"+t]="webkit"+i,o["Moz"+t]="moz"+i,o}var ns={animationend:na("Animation","AnimationEnd"),animationiteration:na("Animation","AnimationIteration"),animationstart:na("Animation","AnimationStart"),transitionend:na("Transition","TransitionEnd")},Jl={},Af={};d&&(Af=document.createElement("div").style,"AnimationEvent"in window||(delete ns.animationend.animation,delete ns.animationiteration.animation,delete ns.animationstart.animation),"TransitionEvent"in window||delete ns.transitionend.transition);function ia(t){if(Jl[t])return Jl[t];if(!ns[t])return t;var i=ns[t],o;for(o in i)if(i.hasOwnProperty(o)&&o in Af)return Jl[t]=i[o];return t}var Cf=ia("animationend"),Rf=ia("animationiteration"),Pf=ia("animationstart"),Lf=ia("transitionend"),Nf=new Map,If="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Zi(t,i){Nf.set(t,i),c(i,[t])}for(var ec=0;ec<If.length;ec++){var tc=If[ec],n0=tc.toLowerCase(),i0=tc[0].toUpperCase()+tc.slice(1);Zi(n0,"on"+i0)}Zi(Cf,"onAnimationEnd"),Zi(Rf,"onAnimationIteration"),Zi(Pf,"onAnimationStart"),Zi("dblclick","onDoubleClick"),Zi("focusin","onFocus"),Zi("focusout","onBlur"),Zi(Lf,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),c("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),c("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),c("onBeforeInput",["compositionend","keypress","textInput","paste"]),c("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),c("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),c("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var oo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),r0=new Set("cancel close invalid load scroll toggle".split(" ").concat(oo));function Df(t,i,o){var l=t.type||"unknown-event";t.currentTarget=o,Ho(l,i,void 0,t),t.currentTarget=null}function Uf(t,i){i=(i&4)!==0;for(var o=0;o<t.length;o++){var l=t[o],f=l.event;l=l.listeners;e:{var m=void 0;if(i)for(var T=l.length-1;0<=T;T--){var D=l[T],H=D.instance,se=D.currentTarget;if(D=D.listener,H!==m&&f.isPropagationStopped())break e;Df(f,D,se),m=H}else for(T=0;T<l.length;T++){if(D=l[T],H=D.instance,se=D.currentTarget,D=D.listener,H!==m&&f.isPropagationStopped())break e;Df(f,D,se),m=H}}}if(Er)throw t=Gi,Er=!1,Gi=null,t}function Ft(t,i){var o=i[cc];o===void 0&&(o=i[cc]=new Set);var l=t+"__bubble";o.has(l)||(Ff(i,t,2,!1),o.add(l))}function nc(t,i,o){var l=0;i&&(l|=4),Ff(o,t,l,i)}var ra="_reactListening"+Math.random().toString(36).slice(2);function ao(t){if(!t[ra]){t[ra]=!0,r.forEach(function(o){o!=="selectionchange"&&(r0.has(o)||nc(o,!1,t),nc(o,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[ra]||(i[ra]=!0,nc("selectionchange",!1,i))}}function Ff(t,i,o,l){switch(sf(i)){case 1:var f=vg;break;case 4:f=_g;break;default:f=zl}o=f.bind(null,i,o,t),f=void 0,!Kr||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(f=!0),l?f!==void 0?t.addEventListener(i,o,{capture:!0,passive:f}):t.addEventListener(i,o,!0):f!==void 0?t.addEventListener(i,o,{passive:f}):t.addEventListener(i,o,!1)}function ic(t,i,o,l,f){var m=l;if((i&1)===0&&(i&2)===0&&l!==null)e:for(;;){if(l===null)return;var T=l.tag;if(T===3||T===4){var D=l.stateNode.containerInfo;if(D===f||D.nodeType===8&&D.parentNode===f)break;if(T===4)for(T=l.return;T!==null;){var H=T.tag;if((H===3||H===4)&&(H=T.stateNode.containerInfo,H===f||H.nodeType===8&&H.parentNode===f))return;T=T.return}for(;D!==null;){if(T=Tr(D),T===null)return;if(H=T.tag,H===5||H===6){l=m=T;continue e}D=D.parentNode}}l=l.return}wn(function(){var se=m,Me=q(o),Te=[];e:{var Se=Nf.get(t);if(Se!==void 0){var Oe=Vl,Ge=t;switch(t){case"keypress":if(Qo(o)===0)break e;case"keydown":case"keyup":Oe=Dg;break;case"focusin":Ge="focus",Oe=Wl;break;case"focusout":Ge="blur",Oe=Wl;break;case"beforeblur":case"afterblur":Oe=Wl;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Oe=lf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Oe=Mg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Oe=kg;break;case Cf:case Rf:case Pf:Oe=wg;break;case Lf:Oe=zg;break;case"scroll":Oe=yg;break;case"wheel":Oe=Hg;break;case"copy":case"cut":case"paste":Oe=Ag;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Oe=uf}var qe=(i&4)!==0,Wt=!qe&&t==="scroll",Z=qe?Se!==null?Se+"Capture":null:Se;qe=[];for(var W=se,ee;W!==null;){ee=W;var be=ee.stateNode;if(ee.tag===5&&be!==null&&(ee=be,Z!==null&&(be=_n(W,Z),be!=null&&qe.push(lo(W,be,ee)))),Wt)break;W=W.return}0<qe.length&&(Se=new Oe(Se,Ge,null,o,Me),Te.push({event:Se,listeners:qe}))}}if((i&7)===0){e:{if(Se=t==="mouseover"||t==="pointerover",Oe=t==="mouseout"||t==="pointerout",Se&&o!==Pt&&(Ge=o.relatedTarget||o.fromElement)&&(Tr(Ge)||Ge[Ei]))break e;if((Oe||Se)&&(Se=Me.window===Me?Me:(Se=Me.ownerDocument)?Se.defaultView||Se.parentWindow:window,Oe?(Ge=o.relatedTarget||o.toElement,Oe=se,Ge=Ge?Tr(Ge):null,Ge!==null&&(Wt=ui(Ge),Ge!==Wt||Ge.tag!==5&&Ge.tag!==6)&&(Ge=null)):(Oe=null,Ge=se),Oe!==Ge)){if(qe=lf,be="onMouseLeave",Z="onMouseEnter",W="mouse",(t==="pointerout"||t==="pointerover")&&(qe=uf,be="onPointerLeave",Z="onPointerEnter",W="pointer"),Wt=Oe==null?Se:ss(Oe),ee=Ge==null?Se:ss(Ge),Se=new qe(be,W+"leave",Oe,o,Me),Se.target=Wt,Se.relatedTarget=ee,be=null,Tr(Me)===se&&(qe=new qe(Z,W+"enter",Ge,o,Me),qe.target=ee,qe.relatedTarget=Wt,be=qe),Wt=be,Oe&&Ge)t:{for(qe=Oe,Z=Ge,W=0,ee=qe;ee;ee=is(ee))W++;for(ee=0,be=Z;be;be=is(be))ee++;for(;0<W-ee;)qe=is(qe),W--;for(;0<ee-W;)Z=is(Z),ee--;for(;W--;){if(qe===Z||Z!==null&&qe===Z.alternate)break t;qe=is(qe),Z=is(Z)}qe=null}else qe=null;Oe!==null&&kf(Te,Se,Oe,qe,!1),Ge!==null&&Wt!==null&&kf(Te,Wt,Ge,qe,!0)}}e:{if(Se=se?ss(se):window,Oe=Se.nodeName&&Se.nodeName.toLowerCase(),Oe==="select"||Oe==="input"&&Se.type==="file")var Ye=Yg;else if(gf(Se))if(vf)Ye=Qg;else{Ye=Kg;var Je=$g}else(Oe=Se.nodeName)&&Oe.toLowerCase()==="input"&&(Se.type==="checkbox"||Se.type==="radio")&&(Ye=Zg);if(Ye&&(Ye=Ye(t,se))){xf(Te,Ye,o,Me);break e}Je&&Je(t,Se,se),t==="focusout"&&(Je=Se._wrapperState)&&Je.controlled&&Se.type==="number"&&vt(Se,"number",Se.value)}switch(Je=se?ss(se):window,t){case"focusin":(gf(Je)||Je.contentEditable==="true")&&(ts=Je,Zl=se,so=null);break;case"focusout":so=Zl=ts=null;break;case"mousedown":Ql=!0;break;case"contextmenu":case"mouseup":case"dragend":Ql=!1,bf(Te,o,Me);break;case"selectionchange":if(t0)break;case"keydown":case"keyup":bf(Te,o,Me)}var et;if(ql)e:{switch(t){case"compositionstart":var lt="onCompositionStart";break e;case"compositionend":lt="onCompositionEnd";break e;case"compositionupdate":lt="onCompositionUpdate";break e}lt=void 0}else es?pf(t,o)&&(lt="onCompositionEnd"):t==="keydown"&&o.keyCode===229&&(lt="onCompositionStart");lt&&(df&&o.locale!=="ko"&&(es||lt!=="onCompositionStart"?lt==="onCompositionEnd"&&es&&(et=of()):(Ki=Me,Hl="value"in Ki?Ki.value:Ki.textContent,es=!0)),Je=sa(se,lt),0<Je.length&&(lt=new cf(lt,t,null,o,Me),Te.push({event:lt,listeners:Je}),et?lt.data=et:(et=mf(o),et!==null&&(lt.data=et)))),(et=jg?Gg(t,o):Wg(t,o))&&(se=sa(se,"onBeforeInput"),0<se.length&&(Me=new cf("onBeforeInput","beforeinput",null,o,Me),Te.push({event:Me,listeners:se}),Me.data=et))}Uf(Te,i)})}function lo(t,i,o){return{instance:t,listener:i,currentTarget:o}}function sa(t,i){for(var o=i+"Capture",l=[];t!==null;){var f=t,m=f.stateNode;f.tag===5&&m!==null&&(f=m,m=_n(t,o),m!=null&&l.unshift(lo(t,m,f)),m=_n(t,i),m!=null&&l.push(lo(t,m,f))),t=t.return}return l}function is(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function kf(t,i,o,l,f){for(var m=i._reactName,T=[];o!==null&&o!==l;){var D=o,H=D.alternate,se=D.stateNode;if(H!==null&&H===l)break;D.tag===5&&se!==null&&(D=se,f?(H=_n(o,m),H!=null&&T.unshift(lo(o,H,D))):f||(H=_n(o,m),H!=null&&T.push(lo(o,H,D)))),o=o.return}T.length!==0&&t.push({event:i,listeners:T})}var s0=/\r\n?/g,o0=/\u0000|\uFFFD/g;function Of(t){return(typeof t=="string"?t:""+t).replace(s0,`
`).replace(o0,"")}function oa(t,i,o){if(i=Of(i),Of(t)!==i&&o)throw Error(n(425))}function aa(){}var rc=null,sc=null;function oc(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var ac=typeof setTimeout=="function"?setTimeout:void 0,a0=typeof clearTimeout=="function"?clearTimeout:void 0,zf=typeof Promise=="function"?Promise:void 0,l0=typeof queueMicrotask=="function"?queueMicrotask:typeof zf<"u"?function(t){return zf.resolve(null).then(t).catch(c0)}:ac;function c0(t){setTimeout(function(){throw t})}function lc(t,i){var o=i,l=0;do{var f=o.nextSibling;if(t.removeChild(o),f&&f.nodeType===8)if(o=f.data,o==="/$"){if(l===0){t.removeChild(f),Qs(i);return}l--}else o!=="$"&&o!=="$?"&&o!=="$!"||l++;o=f}while(o);Qs(i)}function Qi(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return t}function Bf(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return t;i--}else o==="/$"&&i++}t=t.previousSibling}return null}var rs=Math.random().toString(36).slice(2),fi="__reactFiber$"+rs,co="__reactProps$"+rs,Ei="__reactContainer$"+rs,cc="__reactEvents$"+rs,u0="__reactListeners$"+rs,d0="__reactHandles$"+rs;function Tr(t){var i=t[fi];if(i)return i;for(var o=t.parentNode;o;){if(i=o[Ei]||o[fi]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(t=Bf(t);t!==null;){if(o=t[fi])return o;t=Bf(t)}return i}t=o,o=t.parentNode}return null}function uo(t){return t=t[fi]||t[Ei],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ss(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(n(33))}function la(t){return t[co]||null}var uc=[],os=-1;function Ji(t){return{current:t}}function kt(t){0>os||(t.current=uc[os],uc[os]=null,os--)}function Dt(t,i){os++,uc[os]=t.current,t.current=i}var er={},hn=Ji(er),bn=Ji(!1),wr=er;function as(t,i){var o=t.type.contextTypes;if(!o)return er;var l=t.stateNode;if(l&&l.__reactInternalMemoizedUnmaskedChildContext===i)return l.__reactInternalMemoizedMaskedChildContext;var f={},m;for(m in o)f[m]=i[m];return l&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=f),f}function An(t){return t=t.childContextTypes,t!=null}function ca(){kt(bn),kt(hn)}function Hf(t,i,o){if(hn.current!==er)throw Error(n(168));Dt(hn,i),Dt(bn,o)}function Vf(t,i,o){var l=t.stateNode;if(i=i.childContextTypes,typeof l.getChildContext!="function")return o;l=l.getChildContext();for(var f in l)if(!(f in i))throw Error(n(108,ie(t)||"Unknown",f));return N({},o,l)}function ua(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||er,wr=hn.current,Dt(hn,t),Dt(bn,bn.current),!0}function jf(t,i,o){var l=t.stateNode;if(!l)throw Error(n(169));o?(t=Vf(t,i,wr),l.__reactInternalMemoizedMergedChildContext=t,kt(bn),kt(hn),Dt(hn,t)):kt(bn),Dt(bn,o)}var Ti=null,da=!1,dc=!1;function Gf(t){Ti===null?Ti=[t]:Ti.push(t)}function f0(t){da=!0,Gf(t)}function tr(){if(!dc&&Ti!==null){dc=!0;var t=0,i=Tt;try{var o=Ti;for(Tt=1;t<o.length;t++){var l=o[t];do l=l(!0);while(l!==null)}Ti=null,da=!1}catch(f){throw Ti!==null&&(Ti=Ti.slice(t+1)),Xo(we,tr),f}finally{Tt=i,dc=!1}}return null}var ls=[],cs=0,fa=null,ha=0,Hn=[],Vn=0,br=null,wi=1,bi="";function Ar(t,i){ls[cs++]=ha,ls[cs++]=fa,fa=t,ha=i}function Wf(t,i,o){Hn[Vn++]=wi,Hn[Vn++]=bi,Hn[Vn++]=br,br=t;var l=wi;t=bi;var f=32-ht(l)-1;l&=~(1<<f),o+=1;var m=32-ht(i)+f;if(30<m){var T=f-f%5;m=(l&(1<<T)-1).toString(32),l>>=T,f-=T,wi=1<<32-ht(i)+f|o<<f|l,bi=m+t}else wi=1<<m|o<<f|l,bi=t}function fc(t){t.return!==null&&(Ar(t,1),Wf(t,1,0))}function hc(t){for(;t===fa;)fa=ls[--cs],ls[cs]=null,ha=ls[--cs],ls[cs]=null;for(;t===br;)br=Hn[--Vn],Hn[Vn]=null,bi=Hn[--Vn],Hn[Vn]=null,wi=Hn[--Vn],Hn[Vn]=null}var Fn=null,kn=null,zt=!1,Qn=null;function Xf(t,i){var o=Xn(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=t,i=t.deletions,i===null?(t.deletions=[o],t.flags|=16):i.push(o)}function qf(t,i){switch(t.tag){case 5:var o=t.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(t.stateNode=i,Fn=t,kn=Qi(i.firstChild),!0):!1;case 6:return i=t.pendingProps===""||i.nodeType!==3?null:i,i!==null?(t.stateNode=i,Fn=t,kn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=br!==null?{id:wi,overflow:bi}:null,t.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=Xn(18,null,null,0),o.stateNode=i,o.return=t,t.child=o,Fn=t,kn=null,!0):!1;default:return!1}}function pc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function mc(t){if(zt){var i=kn;if(i){var o=i;if(!qf(t,i)){if(pc(t))throw Error(n(418));i=Qi(o.nextSibling);var l=Fn;i&&qf(t,i)?Xf(l,o):(t.flags=t.flags&-4097|2,zt=!1,Fn=t)}}else{if(pc(t))throw Error(n(418));t.flags=t.flags&-4097|2,zt=!1,Fn=t}}}function Yf(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Fn=t}function pa(t){if(t!==Fn)return!1;if(!zt)return Yf(t),zt=!0,!1;var i;if((i=t.tag!==3)&&!(i=t.tag!==5)&&(i=t.type,i=i!=="head"&&i!=="body"&&!oc(t.type,t.memoizedProps)),i&&(i=kn)){if(pc(t))throw $f(),Error(n(418));for(;i;)Xf(t,i),i=Qi(i.nextSibling)}if(Yf(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(n(317));e:{for(t=t.nextSibling,i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="/$"){if(i===0){kn=Qi(t.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}t=t.nextSibling}kn=null}}else kn=Fn?Qi(t.stateNode.nextSibling):null;return!0}function $f(){for(var t=kn;t;)t=Qi(t.nextSibling)}function us(){kn=Fn=null,zt=!1}function gc(t){Qn===null?Qn=[t]:Qn.push(t)}var h0=L.ReactCurrentBatchConfig;function fo(t,i,o){if(t=o.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(n(309));var l=o.stateNode}if(!l)throw Error(n(147,t));var f=l,m=""+t;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===m?i.ref:(i=function(T){var D=f.refs;T===null?delete D[m]:D[m]=T},i._stringRef=m,i)}if(typeof t!="string")throw Error(n(284));if(!o._owner)throw Error(n(290,t))}return t}function ma(t,i){throw t=Object.prototype.toString.call(i),Error(n(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t))}function Kf(t){var i=t._init;return i(t._payload)}function Zf(t){function i(Z,W){if(t){var ee=Z.deletions;ee===null?(Z.deletions=[W],Z.flags|=16):ee.push(W)}}function o(Z,W){if(!t)return null;for(;W!==null;)i(Z,W),W=W.sibling;return null}function l(Z,W){for(Z=new Map;W!==null;)W.key!==null?Z.set(W.key,W):Z.set(W.index,W),W=W.sibling;return Z}function f(Z,W){return Z=cr(Z,W),Z.index=0,Z.sibling=null,Z}function m(Z,W,ee){return Z.index=ee,t?(ee=Z.alternate,ee!==null?(ee=ee.index,ee<W?(Z.flags|=2,W):ee):(Z.flags|=2,W)):(Z.flags|=1048576,W)}function T(Z){return t&&Z.alternate===null&&(Z.flags|=2),Z}function D(Z,W,ee,be){return W===null||W.tag!==6?(W=au(ee,Z.mode,be),W.return=Z,W):(W=f(W,ee),W.return=Z,W)}function H(Z,W,ee,be){var Ye=ee.type;return Ye===k?Me(Z,W,ee.props.children,be,ee.key):W!==null&&(W.elementType===Ye||typeof Ye=="object"&&Ye!==null&&Ye.$$typeof===de&&Kf(Ye)===W.type)?(be=f(W,ee.props),be.ref=fo(Z,W,ee),be.return=Z,be):(be=za(ee.type,ee.key,ee.props,null,Z.mode,be),be.ref=fo(Z,W,ee),be.return=Z,be)}function se(Z,W,ee,be){return W===null||W.tag!==4||W.stateNode.containerInfo!==ee.containerInfo||W.stateNode.implementation!==ee.implementation?(W=lu(ee,Z.mode,be),W.return=Z,W):(W=f(W,ee.children||[]),W.return=Z,W)}function Me(Z,W,ee,be,Ye){return W===null||W.tag!==7?(W=Ur(ee,Z.mode,be,Ye),W.return=Z,W):(W=f(W,ee),W.return=Z,W)}function Te(Z,W,ee){if(typeof W=="string"&&W!==""||typeof W=="number")return W=au(""+W,Z.mode,ee),W.return=Z,W;if(typeof W=="object"&&W!==null){switch(W.$$typeof){case Y:return ee=za(W.type,W.key,W.props,null,Z.mode,ee),ee.ref=fo(Z,null,W),ee.return=Z,ee;case z:return W=lu(W,Z.mode,ee),W.return=Z,W;case de:var be=W._init;return Te(Z,be(W._payload),ee)}if(Ue(W)||fe(W))return W=Ur(W,Z.mode,ee,null),W.return=Z,W;ma(Z,W)}return null}function Se(Z,W,ee,be){var Ye=W!==null?W.key:null;if(typeof ee=="string"&&ee!==""||typeof ee=="number")return Ye!==null?null:D(Z,W,""+ee,be);if(typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case Y:return ee.key===Ye?H(Z,W,ee,be):null;case z:return ee.key===Ye?se(Z,W,ee,be):null;case de:return Ye=ee._init,Se(Z,W,Ye(ee._payload),be)}if(Ue(ee)||fe(ee))return Ye!==null?null:Me(Z,W,ee,be,null);ma(Z,ee)}return null}function Oe(Z,W,ee,be,Ye){if(typeof be=="string"&&be!==""||typeof be=="number")return Z=Z.get(ee)||null,D(W,Z,""+be,Ye);if(typeof be=="object"&&be!==null){switch(be.$$typeof){case Y:return Z=Z.get(be.key===null?ee:be.key)||null,H(W,Z,be,Ye);case z:return Z=Z.get(be.key===null?ee:be.key)||null,se(W,Z,be,Ye);case de:var Je=be._init;return Oe(Z,W,ee,Je(be._payload),Ye)}if(Ue(be)||fe(be))return Z=Z.get(ee)||null,Me(W,Z,be,Ye,null);ma(W,be)}return null}function Ge(Z,W,ee,be){for(var Ye=null,Je=null,et=W,lt=W=0,on=null;et!==null&&lt<ee.length;lt++){et.index>lt?(on=et,et=null):on=et.sibling;var At=Se(Z,et,ee[lt],be);if(At===null){et===null&&(et=on);break}t&&et&&At.alternate===null&&i(Z,et),W=m(At,W,lt),Je===null?Ye=At:Je.sibling=At,Je=At,et=on}if(lt===ee.length)return o(Z,et),zt&&Ar(Z,lt),Ye;if(et===null){for(;lt<ee.length;lt++)et=Te(Z,ee[lt],be),et!==null&&(W=m(et,W,lt),Je===null?Ye=et:Je.sibling=et,Je=et);return zt&&Ar(Z,lt),Ye}for(et=l(Z,et);lt<ee.length;lt++)on=Oe(et,Z,lt,ee[lt],be),on!==null&&(t&&on.alternate!==null&&et.delete(on.key===null?lt:on.key),W=m(on,W,lt),Je===null?Ye=on:Je.sibling=on,Je=on);return t&&et.forEach(function(ur){return i(Z,ur)}),zt&&Ar(Z,lt),Ye}function qe(Z,W,ee,be){var Ye=fe(ee);if(typeof Ye!="function")throw Error(n(150));if(ee=Ye.call(ee),ee==null)throw Error(n(151));for(var Je=Ye=null,et=W,lt=W=0,on=null,At=ee.next();et!==null&&!At.done;lt++,At=ee.next()){et.index>lt?(on=et,et=null):on=et.sibling;var ur=Se(Z,et,At.value,be);if(ur===null){et===null&&(et=on);break}t&&et&&ur.alternate===null&&i(Z,et),W=m(ur,W,lt),Je===null?Ye=ur:Je.sibling=ur,Je=ur,et=on}if(At.done)return o(Z,et),zt&&Ar(Z,lt),Ye;if(et===null){for(;!At.done;lt++,At=ee.next())At=Te(Z,At.value,be),At!==null&&(W=m(At,W,lt),Je===null?Ye=At:Je.sibling=At,Je=At);return zt&&Ar(Z,lt),Ye}for(et=l(Z,et);!At.done;lt++,At=ee.next())At=Oe(et,Z,lt,At.value,be),At!==null&&(t&&At.alternate!==null&&et.delete(At.key===null?lt:At.key),W=m(At,W,lt),Je===null?Ye=At:Je.sibling=At,Je=At);return t&&et.forEach(function(X0){return i(Z,X0)}),zt&&Ar(Z,lt),Ye}function Wt(Z,W,ee,be){if(typeof ee=="object"&&ee!==null&&ee.type===k&&ee.key===null&&(ee=ee.props.children),typeof ee=="object"&&ee!==null){switch(ee.$$typeof){case Y:e:{for(var Ye=ee.key,Je=W;Je!==null;){if(Je.key===Ye){if(Ye=ee.type,Ye===k){if(Je.tag===7){o(Z,Je.sibling),W=f(Je,ee.props.children),W.return=Z,Z=W;break e}}else if(Je.elementType===Ye||typeof Ye=="object"&&Ye!==null&&Ye.$$typeof===de&&Kf(Ye)===Je.type){o(Z,Je.sibling),W=f(Je,ee.props),W.ref=fo(Z,Je,ee),W.return=Z,Z=W;break e}o(Z,Je);break}else i(Z,Je);Je=Je.sibling}ee.type===k?(W=Ur(ee.props.children,Z.mode,be,ee.key),W.return=Z,Z=W):(be=za(ee.type,ee.key,ee.props,null,Z.mode,be),be.ref=fo(Z,W,ee),be.return=Z,Z=be)}return T(Z);case z:e:{for(Je=ee.key;W!==null;){if(W.key===Je)if(W.tag===4&&W.stateNode.containerInfo===ee.containerInfo&&W.stateNode.implementation===ee.implementation){o(Z,W.sibling),W=f(W,ee.children||[]),W.return=Z,Z=W;break e}else{o(Z,W);break}else i(Z,W);W=W.sibling}W=lu(ee,Z.mode,be),W.return=Z,Z=W}return T(Z);case de:return Je=ee._init,Wt(Z,W,Je(ee._payload),be)}if(Ue(ee))return Ge(Z,W,ee,be);if(fe(ee))return qe(Z,W,ee,be);ma(Z,ee)}return typeof ee=="string"&&ee!==""||typeof ee=="number"?(ee=""+ee,W!==null&&W.tag===6?(o(Z,W.sibling),W=f(W,ee),W.return=Z,Z=W):(o(Z,W),W=au(ee,Z.mode,be),W.return=Z,Z=W),T(Z)):o(Z,W)}return Wt}var ds=Zf(!0),Qf=Zf(!1),ga=Ji(null),xa=null,fs=null,xc=null;function vc(){xc=fs=xa=null}function _c(t){var i=ga.current;kt(ga),t._currentValue=i}function yc(t,i,o){for(;t!==null;){var l=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),t===o)break;t=t.return}}function hs(t,i){xa=t,xc=fs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&i)!==0&&(Cn=!0),t.firstContext=null)}function jn(t){var i=t._currentValue;if(xc!==t)if(t={context:t,memoizedValue:i,next:null},fs===null){if(xa===null)throw Error(n(308));fs=t,xa.dependencies={lanes:0,firstContext:t}}else fs=fs.next=t;return i}var Cr=null;function Sc(t){Cr===null?Cr=[t]:Cr.push(t)}function Jf(t,i,o,l){var f=i.interleaved;return f===null?(o.next=o,Sc(i)):(o.next=f.next,f.next=o),i.interleaved=o,Ai(t,l)}function Ai(t,i){t.lanes|=i;var o=t.alternate;for(o!==null&&(o.lanes|=i),o=t,t=t.return;t!==null;)t.childLanes|=i,o=t.alternate,o!==null&&(o.childLanes|=i),o=t,t=t.return;return o.tag===3?o.stateNode:null}var nr=!1;function Mc(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function eh(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ci(t,i){return{eventTime:t,lane:i,tag:0,payload:null,callback:null,next:null}}function ir(t,i,o){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(wt&2)!==0){var f=l.pending;return f===null?i.next=i:(i.next=f.next,f.next=i),l.pending=i,Ai(t,o)}return f=l.interleaved,f===null?(i.next=i,Sc(l)):(i.next=f.next,f.next=i),l.interleaved=i,Ai(t,o)}function va(t,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var l=i.lanes;l&=t.pendingLanes,o|=l,i.lanes=o,nn(t,o)}}function th(t,i){var o=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,o===l)){var f=null,m=null;if(o=o.firstBaseUpdate,o!==null){do{var T={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};m===null?f=m=T:m=m.next=T,o=o.next}while(o!==null);m===null?f=m=i:m=m.next=i}else f=m=i;o={baseState:l.baseState,firstBaseUpdate:f,lastBaseUpdate:m,shared:l.shared,effects:l.effects},t.updateQueue=o;return}t=o.lastBaseUpdate,t===null?o.firstBaseUpdate=i:t.next=i,o.lastBaseUpdate=i}function _a(t,i,o,l){var f=t.updateQueue;nr=!1;var m=f.firstBaseUpdate,T=f.lastBaseUpdate,D=f.shared.pending;if(D!==null){f.shared.pending=null;var H=D,se=H.next;H.next=null,T===null?m=se:T.next=se,T=H;var Me=t.alternate;Me!==null&&(Me=Me.updateQueue,D=Me.lastBaseUpdate,D!==T&&(D===null?Me.firstBaseUpdate=se:D.next=se,Me.lastBaseUpdate=H))}if(m!==null){var Te=f.baseState;T=0,Me=se=H=null,D=m;do{var Se=D.lane,Oe=D.eventTime;if((l&Se)===Se){Me!==null&&(Me=Me.next={eventTime:Oe,lane:0,tag:D.tag,payload:D.payload,callback:D.callback,next:null});e:{var Ge=t,qe=D;switch(Se=i,Oe=o,qe.tag){case 1:if(Ge=qe.payload,typeof Ge=="function"){Te=Ge.call(Oe,Te,Se);break e}Te=Ge;break e;case 3:Ge.flags=Ge.flags&-65537|128;case 0:if(Ge=qe.payload,Se=typeof Ge=="function"?Ge.call(Oe,Te,Se):Ge,Se==null)break e;Te=N({},Te,Se);break e;case 2:nr=!0}}D.callback!==null&&D.lane!==0&&(t.flags|=64,Se=f.effects,Se===null?f.effects=[D]:Se.push(D))}else Oe={eventTime:Oe,lane:Se,tag:D.tag,payload:D.payload,callback:D.callback,next:null},Me===null?(se=Me=Oe,H=Te):Me=Me.next=Oe,T|=Se;if(D=D.next,D===null){if(D=f.shared.pending,D===null)break;Se=D,D=Se.next,Se.next=null,f.lastBaseUpdate=Se,f.shared.pending=null}}while(!0);if(Me===null&&(H=Te),f.baseState=H,f.firstBaseUpdate=se,f.lastBaseUpdate=Me,i=f.shared.interleaved,i!==null){f=i;do T|=f.lane,f=f.next;while(f!==i)}else m===null&&(f.shared.lanes=0);Lr|=T,t.lanes=T,t.memoizedState=Te}}function nh(t,i,o){if(t=i.effects,i.effects=null,t!==null)for(i=0;i<t.length;i++){var l=t[i],f=l.callback;if(f!==null){if(l.callback=null,l=o,typeof f!="function")throw Error(n(191,f));f.call(l)}}}var ho={},hi=Ji(ho),po=Ji(ho),mo=Ji(ho);function Rr(t){if(t===ho)throw Error(n(174));return t}function Ec(t,i){switch(Dt(mo,i),Dt(po,t),Dt(hi,ho),t=i.nodeType,t){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:Xe(null,"");break;default:t=t===8?i.parentNode:i,i=t.namespaceURI||null,t=t.tagName,i=Xe(i,t)}kt(hi),Dt(hi,i)}function ps(){kt(hi),kt(po),kt(mo)}function ih(t){Rr(mo.current);var i=Rr(hi.current),o=Xe(i,t.type);i!==o&&(Dt(po,t),Dt(hi,o))}function Tc(t){po.current===t&&(kt(hi),kt(po))}var Bt=Ji(0);function ya(t){for(var i=t;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var wc=[];function bc(){for(var t=0;t<wc.length;t++)wc[t]._workInProgressVersionPrimary=null;wc.length=0}var Sa=L.ReactCurrentDispatcher,Ac=L.ReactCurrentBatchConfig,Pr=0,Ht=null,Zt=null,rn=null,Ma=!1,go=!1,xo=0,p0=0;function pn(){throw Error(n(321))}function Cc(t,i){if(i===null)return!1;for(var o=0;o<i.length&&o<t.length;o++)if(!Zn(t[o],i[o]))return!1;return!0}function Rc(t,i,o,l,f,m){if(Pr=m,Ht=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Sa.current=t===null||t.memoizedState===null?v0:_0,t=o(l,f),go){m=0;do{if(go=!1,xo=0,25<=m)throw Error(n(301));m+=1,rn=Zt=null,i.updateQueue=null,Sa.current=y0,t=o(l,f)}while(go)}if(Sa.current=wa,i=Zt!==null&&Zt.next!==null,Pr=0,rn=Zt=Ht=null,Ma=!1,i)throw Error(n(300));return t}function Pc(){var t=xo!==0;return xo=0,t}function pi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return rn===null?Ht.memoizedState=rn=t:rn=rn.next=t,rn}function Gn(){if(Zt===null){var t=Ht.alternate;t=t!==null?t.memoizedState:null}else t=Zt.next;var i=rn===null?Ht.memoizedState:rn.next;if(i!==null)rn=i,Zt=t;else{if(t===null)throw Error(n(310));Zt=t,t={memoizedState:Zt.memoizedState,baseState:Zt.baseState,baseQueue:Zt.baseQueue,queue:Zt.queue,next:null},rn===null?Ht.memoizedState=rn=t:rn=rn.next=t}return rn}function vo(t,i){return typeof i=="function"?i(t):i}function Lc(t){var i=Gn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var l=Zt,f=l.baseQueue,m=o.pending;if(m!==null){if(f!==null){var T=f.next;f.next=m.next,m.next=T}l.baseQueue=f=m,o.pending=null}if(f!==null){m=f.next,l=l.baseState;var D=T=null,H=null,se=m;do{var Me=se.lane;if((Pr&Me)===Me)H!==null&&(H=H.next={lane:0,action:se.action,hasEagerState:se.hasEagerState,eagerState:se.eagerState,next:null}),l=se.hasEagerState?se.eagerState:t(l,se.action);else{var Te={lane:Me,action:se.action,hasEagerState:se.hasEagerState,eagerState:se.eagerState,next:null};H===null?(D=H=Te,T=l):H=H.next=Te,Ht.lanes|=Me,Lr|=Me}se=se.next}while(se!==null&&se!==m);H===null?T=l:H.next=D,Zn(l,i.memoizedState)||(Cn=!0),i.memoizedState=l,i.baseState=T,i.baseQueue=H,o.lastRenderedState=l}if(t=o.interleaved,t!==null){f=t;do m=f.lane,Ht.lanes|=m,Lr|=m,f=f.next;while(f!==t)}else f===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function Nc(t){var i=Gn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var l=o.dispatch,f=o.pending,m=i.memoizedState;if(f!==null){o.pending=null;var T=f=f.next;do m=t(m,T.action),T=T.next;while(T!==f);Zn(m,i.memoizedState)||(Cn=!0),i.memoizedState=m,i.baseQueue===null&&(i.baseState=m),o.lastRenderedState=m}return[m,l]}function rh(){}function sh(t,i){var o=Ht,l=Gn(),f=i(),m=!Zn(l.memoizedState,f);if(m&&(l.memoizedState=f,Cn=!0),l=l.queue,Ic(lh.bind(null,o,l,t),[t]),l.getSnapshot!==i||m||rn!==null&&rn.memoizedState.tag&1){if(o.flags|=2048,_o(9,ah.bind(null,o,l,f,i),void 0,null),sn===null)throw Error(n(349));(Pr&30)!==0||oh(o,i,f)}return f}function oh(t,i,o){t.flags|=16384,t={getSnapshot:i,value:o},i=Ht.updateQueue,i===null?(i={lastEffect:null,stores:null},Ht.updateQueue=i,i.stores=[t]):(o=i.stores,o===null?i.stores=[t]:o.push(t))}function ah(t,i,o,l){i.value=o,i.getSnapshot=l,ch(i)&&uh(t)}function lh(t,i,o){return o(function(){ch(i)&&uh(t)})}function ch(t){var i=t.getSnapshot;t=t.value;try{var o=i();return!Zn(t,o)}catch{return!0}}function uh(t){var i=Ai(t,1);i!==null&&ni(i,t,1,-1)}function dh(t){var i=pi();return typeof t=="function"&&(t=t()),i.memoizedState=i.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:vo,lastRenderedState:t},i.queue=t,t=t.dispatch=x0.bind(null,Ht,t),[i.memoizedState,t]}function _o(t,i,o,l){return t={tag:t,create:i,destroy:o,deps:l,next:null},i=Ht.updateQueue,i===null?(i={lastEffect:null,stores:null},Ht.updateQueue=i,i.lastEffect=t.next=t):(o=i.lastEffect,o===null?i.lastEffect=t.next=t:(l=o.next,o.next=t,t.next=l,i.lastEffect=t)),t}function fh(){return Gn().memoizedState}function Ea(t,i,o,l){var f=pi();Ht.flags|=t,f.memoizedState=_o(1|i,o,void 0,l===void 0?null:l)}function Ta(t,i,o,l){var f=Gn();l=l===void 0?null:l;var m=void 0;if(Zt!==null){var T=Zt.memoizedState;if(m=T.destroy,l!==null&&Cc(l,T.deps)){f.memoizedState=_o(i,o,m,l);return}}Ht.flags|=t,f.memoizedState=_o(1|i,o,m,l)}function hh(t,i){return Ea(8390656,8,t,i)}function Ic(t,i){return Ta(2048,8,t,i)}function ph(t,i){return Ta(4,2,t,i)}function mh(t,i){return Ta(4,4,t,i)}function gh(t,i){if(typeof i=="function")return t=t(),i(t),function(){i(null)};if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function xh(t,i,o){return o=o!=null?o.concat([t]):null,Ta(4,4,gh.bind(null,i,t),o)}function Dc(){}function vh(t,i){var o=Gn();i=i===void 0?null:i;var l=o.memoizedState;return l!==null&&i!==null&&Cc(i,l[1])?l[0]:(o.memoizedState=[t,i],t)}function _h(t,i){var o=Gn();i=i===void 0?null:i;var l=o.memoizedState;return l!==null&&i!==null&&Cc(i,l[1])?l[0]:(t=t(),o.memoizedState=[t,i],t)}function yh(t,i,o){return(Pr&21)===0?(t.baseState&&(t.baseState=!1,Cn=!0),t.memoizedState=o):(Zn(o,i)||(o=Nt(),Ht.lanes|=o,Lr|=o,t.baseState=!0),i)}function m0(t,i){var o=Tt;Tt=o!==0&&4>o?o:4,t(!0);var l=Ac.transition;Ac.transition={};try{t(!1),i()}finally{Tt=o,Ac.transition=l}}function Sh(){return Gn().memoizedState}function g0(t,i,o){var l=ar(t);if(o={lane:l,action:o,hasEagerState:!1,eagerState:null,next:null},Mh(t))Eh(i,o);else if(o=Jf(t,i,o,l),o!==null){var f=Mn();ni(o,t,l,f),Th(o,i,l)}}function x0(t,i,o){var l=ar(t),f={lane:l,action:o,hasEagerState:!1,eagerState:null,next:null};if(Mh(t))Eh(i,f);else{var m=t.alternate;if(t.lanes===0&&(m===null||m.lanes===0)&&(m=i.lastRenderedReducer,m!==null))try{var T=i.lastRenderedState,D=m(T,o);if(f.hasEagerState=!0,f.eagerState=D,Zn(D,T)){var H=i.interleaved;H===null?(f.next=f,Sc(i)):(f.next=H.next,H.next=f),i.interleaved=f;return}}catch{}finally{}o=Jf(t,i,f,l),o!==null&&(f=Mn(),ni(o,t,l,f),Th(o,i,l))}}function Mh(t){var i=t.alternate;return t===Ht||i!==null&&i===Ht}function Eh(t,i){go=Ma=!0;var o=t.pending;o===null?i.next=i:(i.next=o.next,o.next=i),t.pending=i}function Th(t,i,o){if((o&4194240)!==0){var l=i.lanes;l&=t.pendingLanes,o|=l,i.lanes=o,nn(t,o)}}var wa={readContext:jn,useCallback:pn,useContext:pn,useEffect:pn,useImperativeHandle:pn,useInsertionEffect:pn,useLayoutEffect:pn,useMemo:pn,useReducer:pn,useRef:pn,useState:pn,useDebugValue:pn,useDeferredValue:pn,useTransition:pn,useMutableSource:pn,useSyncExternalStore:pn,useId:pn,unstable_isNewReconciler:!1},v0={readContext:jn,useCallback:function(t,i){return pi().memoizedState=[t,i===void 0?null:i],t},useContext:jn,useEffect:hh,useImperativeHandle:function(t,i,o){return o=o!=null?o.concat([t]):null,Ea(4194308,4,gh.bind(null,i,t),o)},useLayoutEffect:function(t,i){return Ea(4194308,4,t,i)},useInsertionEffect:function(t,i){return Ea(4,2,t,i)},useMemo:function(t,i){var o=pi();return i=i===void 0?null:i,t=t(),o.memoizedState=[t,i],t},useReducer:function(t,i,o){var l=pi();return i=o!==void 0?o(i):i,l.memoizedState=l.baseState=i,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:i},l.queue=t,t=t.dispatch=g0.bind(null,Ht,t),[l.memoizedState,t]},useRef:function(t){var i=pi();return t={current:t},i.memoizedState=t},useState:dh,useDebugValue:Dc,useDeferredValue:function(t){return pi().memoizedState=t},useTransition:function(){var t=dh(!1),i=t[0];return t=m0.bind(null,t[1]),pi().memoizedState=t,[i,t]},useMutableSource:function(){},useSyncExternalStore:function(t,i,o){var l=Ht,f=pi();if(zt){if(o===void 0)throw Error(n(407));o=o()}else{if(o=i(),sn===null)throw Error(n(349));(Pr&30)!==0||oh(l,i,o)}f.memoizedState=o;var m={value:o,getSnapshot:i};return f.queue=m,hh(lh.bind(null,l,m,t),[t]),l.flags|=2048,_o(9,ah.bind(null,l,m,o,i),void 0,null),o},useId:function(){var t=pi(),i=sn.identifierPrefix;if(zt){var o=bi,l=wi;o=(l&~(1<<32-ht(l)-1)).toString(32)+o,i=":"+i+"R"+o,o=xo++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=p0++,i=":"+i+"r"+o.toString(32)+":";return t.memoizedState=i},unstable_isNewReconciler:!1},_0={readContext:jn,useCallback:vh,useContext:jn,useEffect:Ic,useImperativeHandle:xh,useInsertionEffect:ph,useLayoutEffect:mh,useMemo:_h,useReducer:Lc,useRef:fh,useState:function(){return Lc(vo)},useDebugValue:Dc,useDeferredValue:function(t){var i=Gn();return yh(i,Zt.memoizedState,t)},useTransition:function(){var t=Lc(vo)[0],i=Gn().memoizedState;return[t,i]},useMutableSource:rh,useSyncExternalStore:sh,useId:Sh,unstable_isNewReconciler:!1},y0={readContext:jn,useCallback:vh,useContext:jn,useEffect:Ic,useImperativeHandle:xh,useInsertionEffect:ph,useLayoutEffect:mh,useMemo:_h,useReducer:Nc,useRef:fh,useState:function(){return Nc(vo)},useDebugValue:Dc,useDeferredValue:function(t){var i=Gn();return Zt===null?i.memoizedState=t:yh(i,Zt.memoizedState,t)},useTransition:function(){var t=Nc(vo)[0],i=Gn().memoizedState;return[t,i]},useMutableSource:rh,useSyncExternalStore:sh,useId:Sh,unstable_isNewReconciler:!1};function Jn(t,i){if(t&&t.defaultProps){i=N({},i),t=t.defaultProps;for(var o in t)i[o]===void 0&&(i[o]=t[o]);return i}return i}function Uc(t,i,o,l){i=t.memoizedState,o=o(l,i),o=o==null?i:N({},i,o),t.memoizedState=o,t.lanes===0&&(t.updateQueue.baseState=o)}var ba={isMounted:function(t){return(t=t._reactInternals)?ui(t)===t:!1},enqueueSetState:function(t,i,o){t=t._reactInternals;var l=Mn(),f=ar(t),m=Ci(l,f);m.payload=i,o!=null&&(m.callback=o),i=ir(t,m,f),i!==null&&(ni(i,t,f,l),va(i,t,f))},enqueueReplaceState:function(t,i,o){t=t._reactInternals;var l=Mn(),f=ar(t),m=Ci(l,f);m.tag=1,m.payload=i,o!=null&&(m.callback=o),i=ir(t,m,f),i!==null&&(ni(i,t,f,l),va(i,t,f))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var o=Mn(),l=ar(t),f=Ci(o,l);f.tag=2,i!=null&&(f.callback=i),i=ir(t,f,l),i!==null&&(ni(i,t,l,o),va(i,t,l))}};function wh(t,i,o,l,f,m,T){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,m,T):i.prototype&&i.prototype.isPureReactComponent?!ro(o,l)||!ro(f,m):!0}function bh(t,i,o){var l=!1,f=er,m=i.contextType;return typeof m=="object"&&m!==null?m=jn(m):(f=An(i)?wr:hn.current,l=i.contextTypes,m=(l=l!=null)?as(t,f):er),i=new i(o,m),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=ba,t.stateNode=i,i._reactInternals=t,l&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=f,t.__reactInternalMemoizedMaskedChildContext=m),i}function Ah(t,i,o,l){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,l),i.state!==t&&ba.enqueueReplaceState(i,i.state,null)}function Fc(t,i,o,l){var f=t.stateNode;f.props=o,f.state=t.memoizedState,f.refs={},Mc(t);var m=i.contextType;typeof m=="object"&&m!==null?f.context=jn(m):(m=An(i)?wr:hn.current,f.context=as(t,m)),f.state=t.memoizedState,m=i.getDerivedStateFromProps,typeof m=="function"&&(Uc(t,i,m,o),f.state=t.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(i=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),i!==f.state&&ba.enqueueReplaceState(f,f.state,null),_a(t,o,f,l),f.state=t.memoizedState),typeof f.componentDidMount=="function"&&(t.flags|=4194308)}function ms(t,i){try{var o="",l=i;do o+=J(l),l=l.return;while(l);var f=o}catch(m){f=`
Error generating stack: `+m.message+`
`+m.stack}return{value:t,source:i,stack:f,digest:null}}function kc(t,i,o){return{value:t,source:null,stack:o??null,digest:i??null}}function Oc(t,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var S0=typeof WeakMap=="function"?WeakMap:Map;function Ch(t,i,o){o=Ci(-1,o),o.tag=3,o.payload={element:null};var l=i.value;return o.callback=function(){Ia||(Ia=!0,Jc=l),Oc(t,i)},o}function Rh(t,i,o){o=Ci(-1,o),o.tag=3;var l=t.type.getDerivedStateFromError;if(typeof l=="function"){var f=i.value;o.payload=function(){return l(f)},o.callback=function(){Oc(t,i)}}var m=t.stateNode;return m!==null&&typeof m.componentDidCatch=="function"&&(o.callback=function(){Oc(t,i),typeof l!="function"&&(sr===null?sr=new Set([this]):sr.add(this));var T=i.stack;this.componentDidCatch(i.value,{componentStack:T!==null?T:""})}),o}function Ph(t,i,o){var l=t.pingCache;if(l===null){l=t.pingCache=new S0;var f=new Set;l.set(i,f)}else f=l.get(i),f===void 0&&(f=new Set,l.set(i,f));f.has(o)||(f.add(o),t=U0.bind(null,t,i,o),i.then(t,t))}function Lh(t){do{var i;if((i=t.tag===13)&&(i=t.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return t;t=t.return}while(t!==null);return null}function Nh(t,i,o,l,f){return(t.mode&1)===0?(t===i?t.flags|=65536:(t.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=Ci(-1,1),i.tag=2,ir(o,i,1))),o.lanes|=1),t):(t.flags|=65536,t.lanes=f,t)}var M0=L.ReactCurrentOwner,Cn=!1;function Sn(t,i,o,l){i.child=t===null?Qf(i,null,o,l):ds(i,t.child,o,l)}function Ih(t,i,o,l,f){o=o.render;var m=i.ref;return hs(i,f),l=Rc(t,i,o,l,m,f),o=Pc(),t!==null&&!Cn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~f,Ri(t,i,f)):(zt&&o&&fc(i),i.flags|=1,Sn(t,i,l,f),i.child)}function Dh(t,i,o,l,f){if(t===null){var m=o.type;return typeof m=="function"&&!ou(m)&&m.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=m,Uh(t,i,m,l,f)):(t=za(o.type,null,l,i,i.mode,f),t.ref=i.ref,t.return=i,i.child=t)}if(m=t.child,(t.lanes&f)===0){var T=m.memoizedProps;if(o=o.compare,o=o!==null?o:ro,o(T,l)&&t.ref===i.ref)return Ri(t,i,f)}return i.flags|=1,t=cr(m,l),t.ref=i.ref,t.return=i,i.child=t}function Uh(t,i,o,l,f){if(t!==null){var m=t.memoizedProps;if(ro(m,l)&&t.ref===i.ref)if(Cn=!1,i.pendingProps=l=m,(t.lanes&f)!==0)(t.flags&131072)!==0&&(Cn=!0);else return i.lanes=t.lanes,Ri(t,i,f)}return zc(t,i,o,l,f)}function Fh(t,i,o){var l=i.pendingProps,f=l.children,m=t!==null?t.memoizedState:null;if(l.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Dt(xs,On),On|=o;else{if((o&1073741824)===0)return t=m!==null?m.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:t,cachePool:null,transitions:null},i.updateQueue=null,Dt(xs,On),On|=t,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},l=m!==null?m.baseLanes:o,Dt(xs,On),On|=l}else m!==null?(l=m.baseLanes|o,i.memoizedState=null):l=o,Dt(xs,On),On|=l;return Sn(t,i,f,o),i.child}function kh(t,i){var o=i.ref;(t===null&&o!==null||t!==null&&t.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function zc(t,i,o,l,f){var m=An(o)?wr:hn.current;return m=as(i,m),hs(i,f),o=Rc(t,i,o,l,m,f),l=Pc(),t!==null&&!Cn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~f,Ri(t,i,f)):(zt&&l&&fc(i),i.flags|=1,Sn(t,i,o,f),i.child)}function Oh(t,i,o,l,f){if(An(o)){var m=!0;ua(i)}else m=!1;if(hs(i,f),i.stateNode===null)Ca(t,i),bh(i,o,l),Fc(i,o,l,f),l=!0;else if(t===null){var T=i.stateNode,D=i.memoizedProps;T.props=D;var H=T.context,se=o.contextType;typeof se=="object"&&se!==null?se=jn(se):(se=An(o)?wr:hn.current,se=as(i,se));var Me=o.getDerivedStateFromProps,Te=typeof Me=="function"||typeof T.getSnapshotBeforeUpdate=="function";Te||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(D!==l||H!==se)&&Ah(i,T,l,se),nr=!1;var Se=i.memoizedState;T.state=Se,_a(i,l,T,f),H=i.memoizedState,D!==l||Se!==H||bn.current||nr?(typeof Me=="function"&&(Uc(i,o,Me,l),H=i.memoizedState),(D=nr||wh(i,o,D,l,Se,H,se))?(Te||typeof T.UNSAFE_componentWillMount!="function"&&typeof T.componentWillMount!="function"||(typeof T.componentWillMount=="function"&&T.componentWillMount(),typeof T.UNSAFE_componentWillMount=="function"&&T.UNSAFE_componentWillMount()),typeof T.componentDidMount=="function"&&(i.flags|=4194308)):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=H),T.props=l,T.state=H,T.context=se,l=D):(typeof T.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{T=i.stateNode,eh(t,i),D=i.memoizedProps,se=i.type===i.elementType?D:Jn(i.type,D),T.props=se,Te=i.pendingProps,Se=T.context,H=o.contextType,typeof H=="object"&&H!==null?H=jn(H):(H=An(o)?wr:hn.current,H=as(i,H));var Oe=o.getDerivedStateFromProps;(Me=typeof Oe=="function"||typeof T.getSnapshotBeforeUpdate=="function")||typeof T.UNSAFE_componentWillReceiveProps!="function"&&typeof T.componentWillReceiveProps!="function"||(D!==Te||Se!==H)&&Ah(i,T,l,H),nr=!1,Se=i.memoizedState,T.state=Se,_a(i,l,T,f);var Ge=i.memoizedState;D!==Te||Se!==Ge||bn.current||nr?(typeof Oe=="function"&&(Uc(i,o,Oe,l),Ge=i.memoizedState),(se=nr||wh(i,o,se,l,Se,Ge,H)||!1)?(Me||typeof T.UNSAFE_componentWillUpdate!="function"&&typeof T.componentWillUpdate!="function"||(typeof T.componentWillUpdate=="function"&&T.componentWillUpdate(l,Ge,H),typeof T.UNSAFE_componentWillUpdate=="function"&&T.UNSAFE_componentWillUpdate(l,Ge,H)),typeof T.componentDidUpdate=="function"&&(i.flags|=4),typeof T.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof T.componentDidUpdate!="function"||D===t.memoizedProps&&Se===t.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||D===t.memoizedProps&&Se===t.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=Ge),T.props=l,T.state=Ge,T.context=H,l=se):(typeof T.componentDidUpdate!="function"||D===t.memoizedProps&&Se===t.memoizedState||(i.flags|=4),typeof T.getSnapshotBeforeUpdate!="function"||D===t.memoizedProps&&Se===t.memoizedState||(i.flags|=1024),l=!1)}return Bc(t,i,o,l,m,f)}function Bc(t,i,o,l,f,m){kh(t,i);var T=(i.flags&128)!==0;if(!l&&!T)return f&&jf(i,o,!1),Ri(t,i,m);l=i.stateNode,M0.current=i;var D=T&&typeof o.getDerivedStateFromError!="function"?null:l.render();return i.flags|=1,t!==null&&T?(i.child=ds(i,t.child,null,m),i.child=ds(i,null,D,m)):Sn(t,i,D,m),i.memoizedState=l.state,f&&jf(i,o,!0),i.child}function zh(t){var i=t.stateNode;i.pendingContext?Hf(t,i.pendingContext,i.pendingContext!==i.context):i.context&&Hf(t,i.context,!1),Ec(t,i.containerInfo)}function Bh(t,i,o,l,f){return us(),gc(f),i.flags|=256,Sn(t,i,o,l),i.child}var Hc={dehydrated:null,treeContext:null,retryLane:0};function Vc(t){return{baseLanes:t,cachePool:null,transitions:null}}function Hh(t,i,o){var l=i.pendingProps,f=Bt.current,m=!1,T=(i.flags&128)!==0,D;if((D=T)||(D=t!==null&&t.memoizedState===null?!1:(f&2)!==0),D?(m=!0,i.flags&=-129):(t===null||t.memoizedState!==null)&&(f|=1),Dt(Bt,f&1),t===null)return mc(i),t=i.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((i.mode&1)===0?i.lanes=1:t.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(T=l.children,t=l.fallback,m?(l=i.mode,m=i.child,T={mode:"hidden",children:T},(l&1)===0&&m!==null?(m.childLanes=0,m.pendingProps=T):m=Ba(T,l,0,null),t=Ur(t,l,o,null),m.return=i,t.return=i,m.sibling=t,i.child=m,i.child.memoizedState=Vc(o),i.memoizedState=Hc,t):jc(i,T));if(f=t.memoizedState,f!==null&&(D=f.dehydrated,D!==null))return E0(t,i,T,l,D,f,o);if(m){m=l.fallback,T=i.mode,f=t.child,D=f.sibling;var H={mode:"hidden",children:l.children};return(T&1)===0&&i.child!==f?(l=i.child,l.childLanes=0,l.pendingProps=H,i.deletions=null):(l=cr(f,H),l.subtreeFlags=f.subtreeFlags&14680064),D!==null?m=cr(D,m):(m=Ur(m,T,o,null),m.flags|=2),m.return=i,l.return=i,l.sibling=m,i.child=l,l=m,m=i.child,T=t.child.memoizedState,T=T===null?Vc(o):{baseLanes:T.baseLanes|o,cachePool:null,transitions:T.transitions},m.memoizedState=T,m.childLanes=t.childLanes&~o,i.memoizedState=Hc,l}return m=t.child,t=m.sibling,l=cr(m,{mode:"visible",children:l.children}),(i.mode&1)===0&&(l.lanes=o),l.return=i,l.sibling=null,t!==null&&(o=i.deletions,o===null?(i.deletions=[t],i.flags|=16):o.push(t)),i.child=l,i.memoizedState=null,l}function jc(t,i){return i=Ba({mode:"visible",children:i},t.mode,0,null),i.return=t,t.child=i}function Aa(t,i,o,l){return l!==null&&gc(l),ds(i,t.child,null,o),t=jc(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function E0(t,i,o,l,f,m,T){if(o)return i.flags&256?(i.flags&=-257,l=kc(Error(n(422))),Aa(t,i,T,l)):i.memoizedState!==null?(i.child=t.child,i.flags|=128,null):(m=l.fallback,f=i.mode,l=Ba({mode:"visible",children:l.children},f,0,null),m=Ur(m,f,T,null),m.flags|=2,l.return=i,m.return=i,l.sibling=m,i.child=l,(i.mode&1)!==0&&ds(i,t.child,null,T),i.child.memoizedState=Vc(T),i.memoizedState=Hc,m);if((i.mode&1)===0)return Aa(t,i,T,null);if(f.data==="$!"){if(l=f.nextSibling&&f.nextSibling.dataset,l)var D=l.dgst;return l=D,m=Error(n(419)),l=kc(m,l,void 0),Aa(t,i,T,l)}if(D=(T&t.childLanes)!==0,Cn||D){if(l=sn,l!==null){switch(T&-T){case 4:f=2;break;case 16:f=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:f=32;break;case 536870912:f=268435456;break;default:f=0}f=(f&(l.suspendedLanes|T))!==0?0:f,f!==0&&f!==m.retryLane&&(m.retryLane=f,Ai(t,f),ni(l,t,f,-1))}return su(),l=kc(Error(n(421))),Aa(t,i,T,l)}return f.data==="$?"?(i.flags|=128,i.child=t.child,i=F0.bind(null,t),f._reactRetry=i,null):(t=m.treeContext,kn=Qi(f.nextSibling),Fn=i,zt=!0,Qn=null,t!==null&&(Hn[Vn++]=wi,Hn[Vn++]=bi,Hn[Vn++]=br,wi=t.id,bi=t.overflow,br=i),i=jc(i,l.children),i.flags|=4096,i)}function Vh(t,i,o){t.lanes|=i;var l=t.alternate;l!==null&&(l.lanes|=i),yc(t.return,i,o)}function Gc(t,i,o,l,f){var m=t.memoizedState;m===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:o,tailMode:f}:(m.isBackwards=i,m.rendering=null,m.renderingStartTime=0,m.last=l,m.tail=o,m.tailMode=f)}function jh(t,i,o){var l=i.pendingProps,f=l.revealOrder,m=l.tail;if(Sn(t,i,l.children,o),l=Bt.current,(l&2)!==0)l=l&1|2,i.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Vh(t,o,i);else if(t.tag===19)Vh(t,o,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}l&=1}if(Dt(Bt,l),(i.mode&1)===0)i.memoizedState=null;else switch(f){case"forwards":for(o=i.child,f=null;o!==null;)t=o.alternate,t!==null&&ya(t)===null&&(f=o),o=o.sibling;o=f,o===null?(f=i.child,i.child=null):(f=o.sibling,o.sibling=null),Gc(i,!1,f,o,m);break;case"backwards":for(o=null,f=i.child,i.child=null;f!==null;){if(t=f.alternate,t!==null&&ya(t)===null){i.child=f;break}t=f.sibling,f.sibling=o,o=f,f=t}Gc(i,!0,o,null,m);break;case"together":Gc(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Ca(t,i){(i.mode&1)===0&&t!==null&&(t.alternate=null,i.alternate=null,i.flags|=2)}function Ri(t,i,o){if(t!==null&&(i.dependencies=t.dependencies),Lr|=i.lanes,(o&i.childLanes)===0)return null;if(t!==null&&i.child!==t.child)throw Error(n(153));if(i.child!==null){for(t=i.child,o=cr(t,t.pendingProps),i.child=o,o.return=i;t.sibling!==null;)t=t.sibling,o=o.sibling=cr(t,t.pendingProps),o.return=i;o.sibling=null}return i.child}function T0(t,i,o){switch(i.tag){case 3:zh(i),us();break;case 5:ih(i);break;case 1:An(i.type)&&ua(i);break;case 4:Ec(i,i.stateNode.containerInfo);break;case 10:var l=i.type._context,f=i.memoizedProps.value;Dt(ga,l._currentValue),l._currentValue=f;break;case 13:if(l=i.memoizedState,l!==null)return l.dehydrated!==null?(Dt(Bt,Bt.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?Hh(t,i,o):(Dt(Bt,Bt.current&1),t=Ri(t,i,o),t!==null?t.sibling:null);Dt(Bt,Bt.current&1);break;case 19:if(l=(o&i.childLanes)!==0,(t.flags&128)!==0){if(l)return jh(t,i,o);i.flags|=128}if(f=i.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),Dt(Bt,Bt.current),l)break;return null;case 22:case 23:return i.lanes=0,Fh(t,i,o)}return Ri(t,i,o)}var Gh,Wc,Wh,Xh;Gh=function(t,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},Wc=function(){},Wh=function(t,i,o,l){var f=t.memoizedProps;if(f!==l){t=i.stateNode,Rr(hi.current);var m=null;switch(o){case"input":f=F(t,f),l=F(t,l),m=[];break;case"select":f=N({},f,{value:void 0}),l=N({},l,{value:void 0}),m=[];break;case"textarea":f=b(t,f),l=b(t,l),m=[];break;default:typeof f.onClick!="function"&&typeof l.onClick=="function"&&(t.onclick=aa)}gt(o,l);var T;o=null;for(se in f)if(!l.hasOwnProperty(se)&&f.hasOwnProperty(se)&&f[se]!=null)if(se==="style"){var D=f[se];for(T in D)D.hasOwnProperty(T)&&(o||(o={}),o[T]="")}else se!=="dangerouslySetInnerHTML"&&se!=="children"&&se!=="suppressContentEditableWarning"&&se!=="suppressHydrationWarning"&&se!=="autoFocus"&&(a.hasOwnProperty(se)?m||(m=[]):(m=m||[]).push(se,null));for(se in l){var H=l[se];if(D=f!=null?f[se]:void 0,l.hasOwnProperty(se)&&H!==D&&(H!=null||D!=null))if(se==="style")if(D){for(T in D)!D.hasOwnProperty(T)||H&&H.hasOwnProperty(T)||(o||(o={}),o[T]="");for(T in H)H.hasOwnProperty(T)&&D[T]!==H[T]&&(o||(o={}),o[T]=H[T])}else o||(m||(m=[]),m.push(se,o)),o=H;else se==="dangerouslySetInnerHTML"?(H=H?H.__html:void 0,D=D?D.__html:void 0,H!=null&&D!==H&&(m=m||[]).push(se,H)):se==="children"?typeof H!="string"&&typeof H!="number"||(m=m||[]).push(se,""+H):se!=="suppressContentEditableWarning"&&se!=="suppressHydrationWarning"&&(a.hasOwnProperty(se)?(H!=null&&se==="onScroll"&&Ft("scroll",t),m||D===H||(m=[])):(m=m||[]).push(se,H))}o&&(m=m||[]).push("style",o);var se=m;(i.updateQueue=se)&&(i.flags|=4)}},Xh=function(t,i,o,l){o!==l&&(i.flags|=4)};function yo(t,i){if(!zt)switch(t.tailMode){case"hidden":i=t.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?t.tail=null:o.sibling=null;break;case"collapsed":o=t.tail;for(var l=null;o!==null;)o.alternate!==null&&(l=o),o=o.sibling;l===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function mn(t){var i=t.alternate!==null&&t.alternate.child===t.child,o=0,l=0;if(i)for(var f=t.child;f!==null;)o|=f.lanes|f.childLanes,l|=f.subtreeFlags&14680064,l|=f.flags&14680064,f.return=t,f=f.sibling;else for(f=t.child;f!==null;)o|=f.lanes|f.childLanes,l|=f.subtreeFlags,l|=f.flags,f.return=t,f=f.sibling;return t.subtreeFlags|=l,t.childLanes=o,i}function w0(t,i,o){var l=i.pendingProps;switch(hc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return mn(i),null;case 1:return An(i.type)&&ca(),mn(i),null;case 3:return l=i.stateNode,ps(),kt(bn),kt(hn),bc(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),(t===null||t.child===null)&&(pa(i)?i.flags|=4:t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Qn!==null&&(nu(Qn),Qn=null))),Wc(t,i),mn(i),null;case 5:Tc(i);var f=Rr(mo.current);if(o=i.type,t!==null&&i.stateNode!=null)Wh(t,i,o,l,f),t.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!l){if(i.stateNode===null)throw Error(n(166));return mn(i),null}if(t=Rr(hi.current),pa(i)){l=i.stateNode,o=i.type;var m=i.memoizedProps;switch(l[fi]=i,l[co]=m,t=(i.mode&1)!==0,o){case"dialog":Ft("cancel",l),Ft("close",l);break;case"iframe":case"object":case"embed":Ft("load",l);break;case"video":case"audio":for(f=0;f<oo.length;f++)Ft(oo[f],l);break;case"source":Ft("error",l);break;case"img":case"image":case"link":Ft("error",l),Ft("load",l);break;case"details":Ft("toggle",l);break;case"input":Rt(l,m),Ft("invalid",l);break;case"select":l._wrapperState={wasMultiple:!!m.multiple},Ft("invalid",l);break;case"textarea":te(l,m),Ft("invalid",l)}gt(o,m),f=null;for(var T in m)if(m.hasOwnProperty(T)){var D=m[T];T==="children"?typeof D=="string"?l.textContent!==D&&(m.suppressHydrationWarning!==!0&&oa(l.textContent,D,t),f=["children",D]):typeof D=="number"&&l.textContent!==""+D&&(m.suppressHydrationWarning!==!0&&oa(l.textContent,D,t),f=["children",""+D]):a.hasOwnProperty(T)&&D!=null&&T==="onScroll"&&Ft("scroll",l)}switch(o){case"input":Qe(l),Be(l,m,!0);break;case"textarea":Qe(l),ye(l);break;case"select":case"option":break;default:typeof m.onClick=="function"&&(l.onclick=aa)}l=f,i.updateQueue=l,l!==null&&(i.flags|=4)}else{T=f.nodeType===9?f:f.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=ge(o)),t==="http://www.w3.org/1999/xhtml"?o==="script"?(t=T.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof l.is=="string"?t=T.createElement(o,{is:l.is}):(t=T.createElement(o),o==="select"&&(T=t,l.multiple?T.multiple=!0:l.size&&(T.size=l.size))):t=T.createElementNS(t,o),t[fi]=i,t[co]=l,Gh(t,i,!1,!1),i.stateNode=t;e:{switch(T=ct(o,l),o){case"dialog":Ft("cancel",t),Ft("close",t),f=l;break;case"iframe":case"object":case"embed":Ft("load",t),f=l;break;case"video":case"audio":for(f=0;f<oo.length;f++)Ft(oo[f],t);f=l;break;case"source":Ft("error",t),f=l;break;case"img":case"image":case"link":Ft("error",t),Ft("load",t),f=l;break;case"details":Ft("toggle",t),f=l;break;case"input":Rt(t,l),f=F(t,l),Ft("invalid",t);break;case"option":f=l;break;case"select":t._wrapperState={wasMultiple:!!l.multiple},f=N({},l,{value:void 0}),Ft("invalid",t);break;case"textarea":te(t,l),f=b(t,l),Ft("invalid",t);break;default:f=l}gt(o,f),D=f;for(m in D)if(D.hasOwnProperty(m)){var H=D[m];m==="style"?st(t,H):m==="dangerouslySetInnerHTML"?(H=H?H.__html:void 0,H!=null&&Fe(t,H)):m==="children"?typeof H=="string"?(o!=="textarea"||H!=="")&&ft(t,H):typeof H=="number"&&ft(t,""+H):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&(a.hasOwnProperty(m)?H!=null&&m==="onScroll"&&Ft("scroll",t):H!=null&&U(t,m,H,T))}switch(o){case"input":Qe(t),Be(t,l,!1);break;case"textarea":Qe(t),ye(t);break;case"option":l.value!=null&&t.setAttribute("value",""+xe(l.value));break;case"select":t.multiple=!!l.multiple,m=l.value,m!=null?I(t,!!l.multiple,m,!1):l.defaultValue!=null&&I(t,!!l.multiple,l.defaultValue,!0);break;default:typeof f.onClick=="function"&&(t.onclick=aa)}switch(o){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}}l&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return mn(i),null;case 6:if(t&&i.stateNode!=null)Xh(t,i,t.memoizedProps,l);else{if(typeof l!="string"&&i.stateNode===null)throw Error(n(166));if(o=Rr(mo.current),Rr(hi.current),pa(i)){if(l=i.stateNode,o=i.memoizedProps,l[fi]=i,(m=l.nodeValue!==o)&&(t=Fn,t!==null))switch(t.tag){case 3:oa(l.nodeValue,o,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&oa(l.nodeValue,o,(t.mode&1)!==0)}m&&(i.flags|=4)}else l=(o.nodeType===9?o:o.ownerDocument).createTextNode(l),l[fi]=i,i.stateNode=l}return mn(i),null;case 13:if(kt(Bt),l=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(zt&&kn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)$f(),us(),i.flags|=98560,m=!1;else if(m=pa(i),l!==null&&l.dehydrated!==null){if(t===null){if(!m)throw Error(n(318));if(m=i.memoizedState,m=m!==null?m.dehydrated:null,!m)throw Error(n(317));m[fi]=i}else us(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;mn(i),m=!1}else Qn!==null&&(nu(Qn),Qn=null),m=!0;if(!m)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(l=l!==null,l!==(t!==null&&t.memoizedState!==null)&&l&&(i.child.flags|=8192,(i.mode&1)!==0&&(t===null||(Bt.current&1)!==0?Qt===0&&(Qt=3):su())),i.updateQueue!==null&&(i.flags|=4),mn(i),null);case 4:return ps(),Wc(t,i),t===null&&ao(i.stateNode.containerInfo),mn(i),null;case 10:return _c(i.type._context),mn(i),null;case 17:return An(i.type)&&ca(),mn(i),null;case 19:if(kt(Bt),m=i.memoizedState,m===null)return mn(i),null;if(l=(i.flags&128)!==0,T=m.rendering,T===null)if(l)yo(m,!1);else{if(Qt!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(T=ya(t),T!==null){for(i.flags|=128,yo(m,!1),l=T.updateQueue,l!==null&&(i.updateQueue=l,i.flags|=4),i.subtreeFlags=0,l=o,o=i.child;o!==null;)m=o,t=l,m.flags&=14680066,T=m.alternate,T===null?(m.childLanes=0,m.lanes=t,m.child=null,m.subtreeFlags=0,m.memoizedProps=null,m.memoizedState=null,m.updateQueue=null,m.dependencies=null,m.stateNode=null):(m.childLanes=T.childLanes,m.lanes=T.lanes,m.child=T.child,m.subtreeFlags=0,m.deletions=null,m.memoizedProps=T.memoizedProps,m.memoizedState=T.memoizedState,m.updateQueue=T.updateQueue,m.type=T.type,t=T.dependencies,m.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),o=o.sibling;return Dt(Bt,Bt.current&1|2),i.child}t=t.sibling}m.tail!==null&&Q()>vs&&(i.flags|=128,l=!0,yo(m,!1),i.lanes=4194304)}else{if(!l)if(t=ya(T),t!==null){if(i.flags|=128,l=!0,o=t.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),yo(m,!0),m.tail===null&&m.tailMode==="hidden"&&!T.alternate&&!zt)return mn(i),null}else 2*Q()-m.renderingStartTime>vs&&o!==1073741824&&(i.flags|=128,l=!0,yo(m,!1),i.lanes=4194304);m.isBackwards?(T.sibling=i.child,i.child=T):(o=m.last,o!==null?o.sibling=T:i.child=T,m.last=T)}return m.tail!==null?(i=m.tail,m.rendering=i,m.tail=i.sibling,m.renderingStartTime=Q(),i.sibling=null,o=Bt.current,Dt(Bt,l?o&1|2:o&1),i):(mn(i),null);case 22:case 23:return ru(),l=i.memoizedState!==null,t!==null&&t.memoizedState!==null!==l&&(i.flags|=8192),l&&(i.mode&1)!==0?(On&1073741824)!==0&&(mn(i),i.subtreeFlags&6&&(i.flags|=8192)):mn(i),null;case 24:return null;case 25:return null}throw Error(n(156,i.tag))}function b0(t,i){switch(hc(i),i.tag){case 1:return An(i.type)&&ca(),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return ps(),kt(bn),kt(hn),bc(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 5:return Tc(i),null;case 13:if(kt(Bt),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(n(340));us()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return kt(Bt),null;case 4:return ps(),null;case 10:return _c(i.type._context),null;case 22:case 23:return ru(),null;case 24:return null;default:return null}}var Ra=!1,gn=!1,A0=typeof WeakSet=="function"?WeakSet:Set,He=null;function gs(t,i){var o=t.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(l){Gt(t,i,l)}else o.current=null}function Xc(t,i,o){try{o()}catch(l){Gt(t,i,l)}}var qh=!1;function C0(t,i){if(rc=$o,t=wf(),Kl(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else e:{o=(o=t.ownerDocument)&&o.defaultView||window;var l=o.getSelection&&o.getSelection();if(l&&l.rangeCount!==0){o=l.anchorNode;var f=l.anchorOffset,m=l.focusNode;l=l.focusOffset;try{o.nodeType,m.nodeType}catch{o=null;break e}var T=0,D=-1,H=-1,se=0,Me=0,Te=t,Se=null;t:for(;;){for(var Oe;Te!==o||f!==0&&Te.nodeType!==3||(D=T+f),Te!==m||l!==0&&Te.nodeType!==3||(H=T+l),Te.nodeType===3&&(T+=Te.nodeValue.length),(Oe=Te.firstChild)!==null;)Se=Te,Te=Oe;for(;;){if(Te===t)break t;if(Se===o&&++se===f&&(D=T),Se===m&&++Me===l&&(H=T),(Oe=Te.nextSibling)!==null)break;Te=Se,Se=Te.parentNode}Te=Oe}o=D===-1||H===-1?null:{start:D,end:H}}else o=null}o=o||{start:0,end:0}}else o=null;for(sc={focusedElem:t,selectionRange:o},$o=!1,He=i;He!==null;)if(i=He,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,He=t;else for(;He!==null;){i=He;try{var Ge=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Ge!==null){var qe=Ge.memoizedProps,Wt=Ge.memoizedState,Z=i.stateNode,W=Z.getSnapshotBeforeUpdate(i.elementType===i.type?qe:Jn(i.type,qe),Wt);Z.__reactInternalSnapshotBeforeUpdate=W}break;case 3:var ee=i.stateNode.containerInfo;ee.nodeType===1?ee.textContent="":ee.nodeType===9&&ee.documentElement&&ee.removeChild(ee.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(be){Gt(i,i.return,be)}if(t=i.sibling,t!==null){t.return=i.return,He=t;break}He=i.return}return Ge=qh,qh=!1,Ge}function So(t,i,o){var l=i.updateQueue;if(l=l!==null?l.lastEffect:null,l!==null){var f=l=l.next;do{if((f.tag&t)===t){var m=f.destroy;f.destroy=void 0,m!==void 0&&Xc(i,o,m)}f=f.next}while(f!==l)}}function Pa(t,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&t)===t){var l=o.create;o.destroy=l()}o=o.next}while(o!==i)}}function qc(t){var i=t.ref;if(i!==null){var o=t.stateNode;switch(t.tag){case 5:t=o;break;default:t=o}typeof i=="function"?i(t):i.current=t}}function Yh(t){var i=t.alternate;i!==null&&(t.alternate=null,Yh(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&(delete i[fi],delete i[co],delete i[cc],delete i[u0],delete i[d0])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function $h(t){return t.tag===5||t.tag===3||t.tag===4}function Kh(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||$h(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Yc(t,i,o){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(t,i):o.insertBefore(t,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(t,o)):(i=o,i.appendChild(t)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=aa));else if(l!==4&&(t=t.child,t!==null))for(Yc(t,i,o),t=t.sibling;t!==null;)Yc(t,i,o),t=t.sibling}function $c(t,i,o){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?o.insertBefore(t,i):o.appendChild(t);else if(l!==4&&(t=t.child,t!==null))for($c(t,i,o),t=t.sibling;t!==null;)$c(t,i,o),t=t.sibling}var cn=null,ei=!1;function rr(t,i,o){for(o=o.child;o!==null;)Zh(t,i,o),o=o.sibling}function Zh(t,i,o){if(We&&typeof We.onCommitFiberUnmount=="function")try{We.onCommitFiberUnmount(rt,o)}catch{}switch(o.tag){case 5:gn||gs(o,i);case 6:var l=cn,f=ei;cn=null,rr(t,i,o),cn=l,ei=f,cn!==null&&(ei?(t=cn,o=o.stateNode,t.nodeType===8?t.parentNode.removeChild(o):t.removeChild(o)):cn.removeChild(o.stateNode));break;case 18:cn!==null&&(ei?(t=cn,o=o.stateNode,t.nodeType===8?lc(t.parentNode,o):t.nodeType===1&&lc(t,o),Qs(t)):lc(cn,o.stateNode));break;case 4:l=cn,f=ei,cn=o.stateNode.containerInfo,ei=!0,rr(t,i,o),cn=l,ei=f;break;case 0:case 11:case 14:case 15:if(!gn&&(l=o.updateQueue,l!==null&&(l=l.lastEffect,l!==null))){f=l=l.next;do{var m=f,T=m.destroy;m=m.tag,T!==void 0&&((m&2)!==0||(m&4)!==0)&&Xc(o,i,T),f=f.next}while(f!==l)}rr(t,i,o);break;case 1:if(!gn&&(gs(o,i),l=o.stateNode,typeof l.componentWillUnmount=="function"))try{l.props=o.memoizedProps,l.state=o.memoizedState,l.componentWillUnmount()}catch(D){Gt(o,i,D)}rr(t,i,o);break;case 21:rr(t,i,o);break;case 22:o.mode&1?(gn=(l=gn)||o.memoizedState!==null,rr(t,i,o),gn=l):rr(t,i,o);break;default:rr(t,i,o)}}function Qh(t){var i=t.updateQueue;if(i!==null){t.updateQueue=null;var o=t.stateNode;o===null&&(o=t.stateNode=new A0),i.forEach(function(l){var f=k0.bind(null,t,l);o.has(l)||(o.add(l),l.then(f,f))})}}function ti(t,i){var o=i.deletions;if(o!==null)for(var l=0;l<o.length;l++){var f=o[l];try{var m=t,T=i,D=T;e:for(;D!==null;){switch(D.tag){case 5:cn=D.stateNode,ei=!1;break e;case 3:cn=D.stateNode.containerInfo,ei=!0;break e;case 4:cn=D.stateNode.containerInfo,ei=!0;break e}D=D.return}if(cn===null)throw Error(n(160));Zh(m,T,f),cn=null,ei=!1;var H=f.alternate;H!==null&&(H.return=null),f.return=null}catch(se){Gt(f,i,se)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)Jh(i,t),i=i.sibling}function Jh(t,i){var o=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(ti(i,t),mi(t),l&4){try{So(3,t,t.return),Pa(3,t)}catch(qe){Gt(t,t.return,qe)}try{So(5,t,t.return)}catch(qe){Gt(t,t.return,qe)}}break;case 1:ti(i,t),mi(t),l&512&&o!==null&&gs(o,o.return);break;case 5:if(ti(i,t),mi(t),l&512&&o!==null&&gs(o,o.return),t.flags&32){var f=t.stateNode;try{ft(f,"")}catch(qe){Gt(t,t.return,qe)}}if(l&4&&(f=t.stateNode,f!=null)){var m=t.memoizedProps,T=o!==null?o.memoizedProps:m,D=t.type,H=t.updateQueue;if(t.updateQueue=null,H!==null)try{D==="input"&&m.type==="radio"&&m.name!=null&&it(f,m),ct(D,T);var se=ct(D,m);for(T=0;T<H.length;T+=2){var Me=H[T],Te=H[T+1];Me==="style"?st(f,Te):Me==="dangerouslySetInnerHTML"?Fe(f,Te):Me==="children"?ft(f,Te):U(f,Me,Te,se)}switch(D){case"input":tt(f,m);break;case"textarea":_e(f,m);break;case"select":var Se=f._wrapperState.wasMultiple;f._wrapperState.wasMultiple=!!m.multiple;var Oe=m.value;Oe!=null?I(f,!!m.multiple,Oe,!1):Se!==!!m.multiple&&(m.defaultValue!=null?I(f,!!m.multiple,m.defaultValue,!0):I(f,!!m.multiple,m.multiple?[]:"",!1))}f[co]=m}catch(qe){Gt(t,t.return,qe)}}break;case 6:if(ti(i,t),mi(t),l&4){if(t.stateNode===null)throw Error(n(162));f=t.stateNode,m=t.memoizedProps;try{f.nodeValue=m}catch(qe){Gt(t,t.return,qe)}}break;case 3:if(ti(i,t),mi(t),l&4&&o!==null&&o.memoizedState.isDehydrated)try{Qs(i.containerInfo)}catch(qe){Gt(t,t.return,qe)}break;case 4:ti(i,t),mi(t);break;case 13:ti(i,t),mi(t),f=t.child,f.flags&8192&&(m=f.memoizedState!==null,f.stateNode.isHidden=m,!m||f.alternate!==null&&f.alternate.memoizedState!==null||(Qc=Q())),l&4&&Qh(t);break;case 22:if(Me=o!==null&&o.memoizedState!==null,t.mode&1?(gn=(se=gn)||Me,ti(i,t),gn=se):ti(i,t),mi(t),l&8192){if(se=t.memoizedState!==null,(t.stateNode.isHidden=se)&&!Me&&(t.mode&1)!==0)for(He=t,Me=t.child;Me!==null;){for(Te=He=Me;He!==null;){switch(Se=He,Oe=Se.child,Se.tag){case 0:case 11:case 14:case 15:So(4,Se,Se.return);break;case 1:gs(Se,Se.return);var Ge=Se.stateNode;if(typeof Ge.componentWillUnmount=="function"){l=Se,o=Se.return;try{i=l,Ge.props=i.memoizedProps,Ge.state=i.memoizedState,Ge.componentWillUnmount()}catch(qe){Gt(l,o,qe)}}break;case 5:gs(Se,Se.return);break;case 22:if(Se.memoizedState!==null){np(Te);continue}}Oe!==null?(Oe.return=Se,He=Oe):np(Te)}Me=Me.sibling}e:for(Me=null,Te=t;;){if(Te.tag===5){if(Me===null){Me=Te;try{f=Te.stateNode,se?(m=f.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none"):(D=Te.stateNode,H=Te.memoizedProps.style,T=H!=null&&H.hasOwnProperty("display")?H.display:null,D.style.display=Ze("display",T))}catch(qe){Gt(t,t.return,qe)}}}else if(Te.tag===6){if(Me===null)try{Te.stateNode.nodeValue=se?"":Te.memoizedProps}catch(qe){Gt(t,t.return,qe)}}else if((Te.tag!==22&&Te.tag!==23||Te.memoizedState===null||Te===t)&&Te.child!==null){Te.child.return=Te,Te=Te.child;continue}if(Te===t)break e;for(;Te.sibling===null;){if(Te.return===null||Te.return===t)break e;Me===Te&&(Me=null),Te=Te.return}Me===Te&&(Me=null),Te.sibling.return=Te.return,Te=Te.sibling}}break;case 19:ti(i,t),mi(t),l&4&&Qh(t);break;case 21:break;default:ti(i,t),mi(t)}}function mi(t){var i=t.flags;if(i&2){try{e:{for(var o=t.return;o!==null;){if($h(o)){var l=o;break e}o=o.return}throw Error(n(160))}switch(l.tag){case 5:var f=l.stateNode;l.flags&32&&(ft(f,""),l.flags&=-33);var m=Kh(t);$c(t,m,f);break;case 3:case 4:var T=l.stateNode.containerInfo,D=Kh(t);Yc(t,D,T);break;default:throw Error(n(161))}}catch(H){Gt(t,t.return,H)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function R0(t,i,o){He=t,ep(t)}function ep(t,i,o){for(var l=(t.mode&1)!==0;He!==null;){var f=He,m=f.child;if(f.tag===22&&l){var T=f.memoizedState!==null||Ra;if(!T){var D=f.alternate,H=D!==null&&D.memoizedState!==null||gn;D=Ra;var se=gn;if(Ra=T,(gn=H)&&!se)for(He=f;He!==null;)T=He,H=T.child,T.tag===22&&T.memoizedState!==null?ip(f):H!==null?(H.return=T,He=H):ip(f);for(;m!==null;)He=m,ep(m),m=m.sibling;He=f,Ra=D,gn=se}tp(t)}else(f.subtreeFlags&8772)!==0&&m!==null?(m.return=f,He=m):tp(t)}}function tp(t){for(;He!==null;){var i=He;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:gn||Pa(5,i);break;case 1:var l=i.stateNode;if(i.flags&4&&!gn)if(o===null)l.componentDidMount();else{var f=i.elementType===i.type?o.memoizedProps:Jn(i.type,o.memoizedProps);l.componentDidUpdate(f,o.memoizedState,l.__reactInternalSnapshotBeforeUpdate)}var m=i.updateQueue;m!==null&&nh(i,m,l);break;case 3:var T=i.updateQueue;if(T!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}nh(i,T,o)}break;case 5:var D=i.stateNode;if(o===null&&i.flags&4){o=D;var H=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":H.autoFocus&&o.focus();break;case"img":H.src&&(o.src=H.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var se=i.alternate;if(se!==null){var Me=se.memoizedState;if(Me!==null){var Te=Me.dehydrated;Te!==null&&Qs(Te)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}gn||i.flags&512&&qc(i)}catch(Se){Gt(i,i.return,Se)}}if(i===t){He=null;break}if(o=i.sibling,o!==null){o.return=i.return,He=o;break}He=i.return}}function np(t){for(;He!==null;){var i=He;if(i===t){He=null;break}var o=i.sibling;if(o!==null){o.return=i.return,He=o;break}He=i.return}}function ip(t){for(;He!==null;){var i=He;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{Pa(4,i)}catch(H){Gt(i,o,H)}break;case 1:var l=i.stateNode;if(typeof l.componentDidMount=="function"){var f=i.return;try{l.componentDidMount()}catch(H){Gt(i,f,H)}}var m=i.return;try{qc(i)}catch(H){Gt(i,m,H)}break;case 5:var T=i.return;try{qc(i)}catch(H){Gt(i,T,H)}}}catch(H){Gt(i,i.return,H)}if(i===t){He=null;break}var D=i.sibling;if(D!==null){D.return=i.return,He=D;break}He=i.return}}var P0=Math.ceil,La=L.ReactCurrentDispatcher,Kc=L.ReactCurrentOwner,Wn=L.ReactCurrentBatchConfig,wt=0,sn=null,Yt=null,un=0,On=0,xs=Ji(0),Qt=0,Mo=null,Lr=0,Na=0,Zc=0,Eo=null,Rn=null,Qc=0,vs=1/0,Pi=null,Ia=!1,Jc=null,sr=null,Da=!1,or=null,Ua=0,To=0,eu=null,Fa=-1,ka=0;function Mn(){return(wt&6)!==0?Q():Fa!==-1?Fa:Fa=Q()}function ar(t){return(t.mode&1)===0?1:(wt&2)!==0&&un!==0?un&-un:h0.transition!==null?(ka===0&&(ka=Nt()),ka):(t=Tt,t!==0||(t=window.event,t=t===void 0?16:sf(t.type)),t)}function ni(t,i,o,l){if(50<To)throw To=0,eu=null,Error(n(185));tn(t,o,l),((wt&2)===0||t!==sn)&&(t===sn&&((wt&2)===0&&(Na|=o),Qt===4&&lr(t,un)),Pn(t,l),o===1&&wt===0&&(i.mode&1)===0&&(vs=Q()+500,da&&tr()))}function Pn(t,i){var o=t.callbackNode;yn(t,i);var l=dn(t,t===sn?un:0);if(l===0)o!==null&&A(o),t.callbackNode=null,t.callbackPriority=0;else if(i=l&-l,t.callbackPriority!==i){if(o!=null&&A(o),i===1)t.tag===0?f0(sp.bind(null,t)):Gf(sp.bind(null,t)),l0(function(){(wt&6)===0&&tr()}),o=null;else{switch(di(l)){case 1:o=we;break;case 4:o=Le;break;case 16:o=ke;break;case 536870912:o=ot;break;default:o=ke}o=hp(o,rp.bind(null,t))}t.callbackPriority=i,t.callbackNode=o}}function rp(t,i){if(Fa=-1,ka=0,(wt&6)!==0)throw Error(n(327));var o=t.callbackNode;if(_s()&&t.callbackNode!==o)return null;var l=dn(t,t===sn?un:0);if(l===0)return null;if((l&30)!==0||(l&t.expiredLanes)!==0||i)i=Oa(t,l);else{i=l;var f=wt;wt|=2;var m=ap();(sn!==t||un!==i)&&(Pi=null,vs=Q()+500,Ir(t,i));do try{I0();break}catch(D){op(t,D)}while(!0);vc(),La.current=m,wt=f,Yt!==null?i=0:(sn=null,un=0,i=Qt)}if(i!==0){if(i===2&&(f=Mi(t),f!==0&&(l=f,i=tu(t,f))),i===1)throw o=Mo,Ir(t,0),lr(t,l),Pn(t,Q()),o;if(i===6)lr(t,l);else{if(f=t.current.alternate,(l&30)===0&&!L0(f)&&(i=Oa(t,l),i===2&&(m=Mi(t),m!==0&&(l=m,i=tu(t,m))),i===1))throw o=Mo,Ir(t,0),lr(t,l),Pn(t,Q()),o;switch(t.finishedWork=f,t.finishedLanes=l,i){case 0:case 1:throw Error(n(345));case 2:Dr(t,Rn,Pi);break;case 3:if(lr(t,l),(l&130023424)===l&&(i=Qc+500-Q(),10<i)){if(dn(t,0)!==0)break;if(f=t.suspendedLanes,(f&l)!==l){Mn(),t.pingedLanes|=t.suspendedLanes&f;break}t.timeoutHandle=ac(Dr.bind(null,t,Rn,Pi),i);break}Dr(t,Rn,Pi);break;case 4:if(lr(t,l),(l&4194240)===l)break;for(i=t.eventTimes,f=-1;0<l;){var T=31-ht(l);m=1<<T,T=i[T],T>f&&(f=T),l&=~m}if(l=f,l=Q()-l,l=(120>l?120:480>l?480:1080>l?1080:1920>l?1920:3e3>l?3e3:4320>l?4320:1960*P0(l/1960))-l,10<l){t.timeoutHandle=ac(Dr.bind(null,t,Rn,Pi),l);break}Dr(t,Rn,Pi);break;case 5:Dr(t,Rn,Pi);break;default:throw Error(n(329))}}}return Pn(t,Q()),t.callbackNode===o?rp.bind(null,t):null}function tu(t,i){var o=Eo;return t.current.memoizedState.isDehydrated&&(Ir(t,i).flags|=256),t=Oa(t,i),t!==2&&(i=Rn,Rn=o,i!==null&&nu(i)),t}function nu(t){Rn===null?Rn=t:Rn.push.apply(Rn,t)}function L0(t){for(var i=t;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var l=0;l<o.length;l++){var f=o[l],m=f.getSnapshot;f=f.value;try{if(!Zn(m(),f))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function lr(t,i){for(i&=~Zc,i&=~Na,t.suspendedLanes|=i,t.pingedLanes&=~i,t=t.expirationTimes;0<i;){var o=31-ht(i),l=1<<o;t[o]=-1,i&=~l}}function sp(t){if((wt&6)!==0)throw Error(n(327));_s();var i=dn(t,0);if((i&1)===0)return Pn(t,Q()),null;var o=Oa(t,i);if(t.tag!==0&&o===2){var l=Mi(t);l!==0&&(i=l,o=tu(t,l))}if(o===1)throw o=Mo,Ir(t,0),lr(t,i),Pn(t,Q()),o;if(o===6)throw Error(n(345));return t.finishedWork=t.current.alternate,t.finishedLanes=i,Dr(t,Rn,Pi),Pn(t,Q()),null}function iu(t,i){var o=wt;wt|=1;try{return t(i)}finally{wt=o,wt===0&&(vs=Q()+500,da&&tr())}}function Nr(t){or!==null&&or.tag===0&&(wt&6)===0&&_s();var i=wt;wt|=1;var o=Wn.transition,l=Tt;try{if(Wn.transition=null,Tt=1,t)return t()}finally{Tt=l,Wn.transition=o,wt=i,(wt&6)===0&&tr()}}function ru(){On=xs.current,kt(xs)}function Ir(t,i){t.finishedWork=null,t.finishedLanes=0;var o=t.timeoutHandle;if(o!==-1&&(t.timeoutHandle=-1,a0(o)),Yt!==null)for(o=Yt.return;o!==null;){var l=o;switch(hc(l),l.tag){case 1:l=l.type.childContextTypes,l!=null&&ca();break;case 3:ps(),kt(bn),kt(hn),bc();break;case 5:Tc(l);break;case 4:ps();break;case 13:kt(Bt);break;case 19:kt(Bt);break;case 10:_c(l.type._context);break;case 22:case 23:ru()}o=o.return}if(sn=t,Yt=t=cr(t.current,null),un=On=i,Qt=0,Mo=null,Zc=Na=Lr=0,Rn=Eo=null,Cr!==null){for(i=0;i<Cr.length;i++)if(o=Cr[i],l=o.interleaved,l!==null){o.interleaved=null;var f=l.next,m=o.pending;if(m!==null){var T=m.next;m.next=f,l.next=T}o.pending=l}Cr=null}return t}function op(t,i){do{var o=Yt;try{if(vc(),Sa.current=wa,Ma){for(var l=Ht.memoizedState;l!==null;){var f=l.queue;f!==null&&(f.pending=null),l=l.next}Ma=!1}if(Pr=0,rn=Zt=Ht=null,go=!1,xo=0,Kc.current=null,o===null||o.return===null){Qt=1,Mo=i,Yt=null;break}e:{var m=t,T=o.return,D=o,H=i;if(i=un,D.flags|=32768,H!==null&&typeof H=="object"&&typeof H.then=="function"){var se=H,Me=D,Te=Me.tag;if((Me.mode&1)===0&&(Te===0||Te===11||Te===15)){var Se=Me.alternate;Se?(Me.updateQueue=Se.updateQueue,Me.memoizedState=Se.memoizedState,Me.lanes=Se.lanes):(Me.updateQueue=null,Me.memoizedState=null)}var Oe=Lh(T);if(Oe!==null){Oe.flags&=-257,Nh(Oe,T,D,m,i),Oe.mode&1&&Ph(m,se,i),i=Oe,H=se;var Ge=i.updateQueue;if(Ge===null){var qe=new Set;qe.add(H),i.updateQueue=qe}else Ge.add(H);break e}else{if((i&1)===0){Ph(m,se,i),su();break e}H=Error(n(426))}}else if(zt&&D.mode&1){var Wt=Lh(T);if(Wt!==null){(Wt.flags&65536)===0&&(Wt.flags|=256),Nh(Wt,T,D,m,i),gc(ms(H,D));break e}}m=H=ms(H,D),Qt!==4&&(Qt=2),Eo===null?Eo=[m]:Eo.push(m),m=T;do{switch(m.tag){case 3:m.flags|=65536,i&=-i,m.lanes|=i;var Z=Ch(m,H,i);th(m,Z);break e;case 1:D=H;var W=m.type,ee=m.stateNode;if((m.flags&128)===0&&(typeof W.getDerivedStateFromError=="function"||ee!==null&&typeof ee.componentDidCatch=="function"&&(sr===null||!sr.has(ee)))){m.flags|=65536,i&=-i,m.lanes|=i;var be=Rh(m,D,i);th(m,be);break e}}m=m.return}while(m!==null)}cp(o)}catch(Ye){i=Ye,Yt===o&&o!==null&&(Yt=o=o.return);continue}break}while(!0)}function ap(){var t=La.current;return La.current=wa,t===null?wa:t}function su(){(Qt===0||Qt===3||Qt===2)&&(Qt=4),sn===null||(Lr&268435455)===0&&(Na&268435455)===0||lr(sn,un)}function Oa(t,i){var o=wt;wt|=2;var l=ap();(sn!==t||un!==i)&&(Pi=null,Ir(t,i));do try{N0();break}catch(f){op(t,f)}while(!0);if(vc(),wt=o,La.current=l,Yt!==null)throw Error(n(261));return sn=null,un=0,Qt}function N0(){for(;Yt!==null;)lp(Yt)}function I0(){for(;Yt!==null&&!$();)lp(Yt)}function lp(t){var i=fp(t.alternate,t,On);t.memoizedProps=t.pendingProps,i===null?cp(t):Yt=i,Kc.current=null}function cp(t){var i=t;do{var o=i.alternate;if(t=i.return,(i.flags&32768)===0){if(o=w0(o,i,On),o!==null){Yt=o;return}}else{if(o=b0(o,i),o!==null){o.flags&=32767,Yt=o;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Qt=6,Yt=null;return}}if(i=i.sibling,i!==null){Yt=i;return}Yt=i=t}while(i!==null);Qt===0&&(Qt=5)}function Dr(t,i,o){var l=Tt,f=Wn.transition;try{Wn.transition=null,Tt=1,D0(t,i,o,l)}finally{Wn.transition=f,Tt=l}return null}function D0(t,i,o,l){do _s();while(or!==null);if((wt&6)!==0)throw Error(n(327));o=t.finishedWork;var f=t.finishedLanes;if(o===null)return null;if(t.finishedWork=null,t.finishedLanes=0,o===t.current)throw Error(n(177));t.callbackNode=null,t.callbackPriority=0;var m=o.lanes|o.childLanes;if(ln(t,m),t===sn&&(Yt=sn=null,un=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||Da||(Da=!0,hp(ke,function(){return _s(),null})),m=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||m){m=Wn.transition,Wn.transition=null;var T=Tt;Tt=1;var D=wt;wt|=4,Kc.current=null,C0(t,o),Jh(o,t),e0(sc),$o=!!rc,sc=rc=null,t.current=o,R0(o),re(),wt=D,Tt=T,Wn.transition=m}else t.current=o;if(Da&&(Da=!1,or=t,Ua=f),m=t.pendingLanes,m===0&&(sr=null),yt(o.stateNode),Pn(t,Q()),i!==null)for(l=t.onRecoverableError,o=0;o<i.length;o++)f=i[o],l(f.value,{componentStack:f.stack,digest:f.digest});if(Ia)throw Ia=!1,t=Jc,Jc=null,t;return(Ua&1)!==0&&t.tag!==0&&_s(),m=t.pendingLanes,(m&1)!==0?t===eu?To++:(To=0,eu=t):To=0,tr(),null}function _s(){if(or!==null){var t=di(Ua),i=Wn.transition,o=Tt;try{if(Wn.transition=null,Tt=16>t?16:t,or===null)var l=!1;else{if(t=or,or=null,Ua=0,(wt&6)!==0)throw Error(n(331));var f=wt;for(wt|=4,He=t.current;He!==null;){var m=He,T=m.child;if((He.flags&16)!==0){var D=m.deletions;if(D!==null){for(var H=0;H<D.length;H++){var se=D[H];for(He=se;He!==null;){var Me=He;switch(Me.tag){case 0:case 11:case 15:So(8,Me,m)}var Te=Me.child;if(Te!==null)Te.return=Me,He=Te;else for(;He!==null;){Me=He;var Se=Me.sibling,Oe=Me.return;if(Yh(Me),Me===se){He=null;break}if(Se!==null){Se.return=Oe,He=Se;break}He=Oe}}}var Ge=m.alternate;if(Ge!==null){var qe=Ge.child;if(qe!==null){Ge.child=null;do{var Wt=qe.sibling;qe.sibling=null,qe=Wt}while(qe!==null)}}He=m}}if((m.subtreeFlags&2064)!==0&&T!==null)T.return=m,He=T;else e:for(;He!==null;){if(m=He,(m.flags&2048)!==0)switch(m.tag){case 0:case 11:case 15:So(9,m,m.return)}var Z=m.sibling;if(Z!==null){Z.return=m.return,He=Z;break e}He=m.return}}var W=t.current;for(He=W;He!==null;){T=He;var ee=T.child;if((T.subtreeFlags&2064)!==0&&ee!==null)ee.return=T,He=ee;else e:for(T=W;He!==null;){if(D=He,(D.flags&2048)!==0)try{switch(D.tag){case 0:case 11:case 15:Pa(9,D)}}catch(Ye){Gt(D,D.return,Ye)}if(D===T){He=null;break e}var be=D.sibling;if(be!==null){be.return=D.return,He=be;break e}He=D.return}}if(wt=f,tr(),We&&typeof We.onPostCommitFiberRoot=="function")try{We.onPostCommitFiberRoot(rt,t)}catch{}l=!0}return l}finally{Tt=o,Wn.transition=i}}return!1}function up(t,i,o){i=ms(o,i),i=Ch(t,i,1),t=ir(t,i,1),i=Mn(),t!==null&&(tn(t,1,i),Pn(t,i))}function Gt(t,i,o){if(t.tag===3)up(t,t,o);else for(;i!==null;){if(i.tag===3){up(i,t,o);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(sr===null||!sr.has(l))){t=ms(o,t),t=Rh(i,t,1),i=ir(i,t,1),t=Mn(),i!==null&&(tn(i,1,t),Pn(i,t));break}}i=i.return}}function U0(t,i,o){var l=t.pingCache;l!==null&&l.delete(i),i=Mn(),t.pingedLanes|=t.suspendedLanes&o,sn===t&&(un&o)===o&&(Qt===4||Qt===3&&(un&130023424)===un&&500>Q()-Qc?Ir(t,0):Zc|=o),Pn(t,i)}function dp(t,i){i===0&&((t.mode&1)===0?i=1:(i=jt,jt<<=1,(jt&130023424)===0&&(jt=4194304)));var o=Mn();t=Ai(t,i),t!==null&&(tn(t,i,o),Pn(t,o))}function F0(t){var i=t.memoizedState,o=0;i!==null&&(o=i.retryLane),dp(t,o)}function k0(t,i){var o=0;switch(t.tag){case 13:var l=t.stateNode,f=t.memoizedState;f!==null&&(o=f.retryLane);break;case 19:l=t.stateNode;break;default:throw Error(n(314))}l!==null&&l.delete(i),dp(t,o)}var fp;fp=function(t,i,o){if(t!==null)if(t.memoizedProps!==i.pendingProps||bn.current)Cn=!0;else{if((t.lanes&o)===0&&(i.flags&128)===0)return Cn=!1,T0(t,i,o);Cn=(t.flags&131072)!==0}else Cn=!1,zt&&(i.flags&1048576)!==0&&Wf(i,ha,i.index);switch(i.lanes=0,i.tag){case 2:var l=i.type;Ca(t,i),t=i.pendingProps;var f=as(i,hn.current);hs(i,o),f=Rc(null,i,l,t,f,o);var m=Pc();return i.flags|=1,typeof f=="object"&&f!==null&&typeof f.render=="function"&&f.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,An(l)?(m=!0,ua(i)):m=!1,i.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,Mc(i),f.updater=ba,i.stateNode=f,f._reactInternals=i,Fc(i,l,t,o),i=Bc(null,i,l,!0,m,o)):(i.tag=0,zt&&m&&fc(i),Sn(null,i,f,o),i=i.child),i;case 16:l=i.elementType;e:{switch(Ca(t,i),t=i.pendingProps,f=l._init,l=f(l._payload),i.type=l,f=i.tag=z0(l),t=Jn(l,t),f){case 0:i=zc(null,i,l,t,o);break e;case 1:i=Oh(null,i,l,t,o);break e;case 11:i=Ih(null,i,l,t,o);break e;case 14:i=Dh(null,i,l,Jn(l.type,t),o);break e}throw Error(n(306,l,""))}return i;case 0:return l=i.type,f=i.pendingProps,f=i.elementType===l?f:Jn(l,f),zc(t,i,l,f,o);case 1:return l=i.type,f=i.pendingProps,f=i.elementType===l?f:Jn(l,f),Oh(t,i,l,f,o);case 3:e:{if(zh(i),t===null)throw Error(n(387));l=i.pendingProps,m=i.memoizedState,f=m.element,eh(t,i),_a(i,l,null,o);var T=i.memoizedState;if(l=T.element,m.isDehydrated)if(m={element:l,isDehydrated:!1,cache:T.cache,pendingSuspenseBoundaries:T.pendingSuspenseBoundaries,transitions:T.transitions},i.updateQueue.baseState=m,i.memoizedState=m,i.flags&256){f=ms(Error(n(423)),i),i=Bh(t,i,l,o,f);break e}else if(l!==f){f=ms(Error(n(424)),i),i=Bh(t,i,l,o,f);break e}else for(kn=Qi(i.stateNode.containerInfo.firstChild),Fn=i,zt=!0,Qn=null,o=Qf(i,null,l,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(us(),l===f){i=Ri(t,i,o);break e}Sn(t,i,l,o)}i=i.child}return i;case 5:return ih(i),t===null&&mc(i),l=i.type,f=i.pendingProps,m=t!==null?t.memoizedProps:null,T=f.children,oc(l,f)?T=null:m!==null&&oc(l,m)&&(i.flags|=32),kh(t,i),Sn(t,i,T,o),i.child;case 6:return t===null&&mc(i),null;case 13:return Hh(t,i,o);case 4:return Ec(i,i.stateNode.containerInfo),l=i.pendingProps,t===null?i.child=ds(i,null,l,o):Sn(t,i,l,o),i.child;case 11:return l=i.type,f=i.pendingProps,f=i.elementType===l?f:Jn(l,f),Ih(t,i,l,f,o);case 7:return Sn(t,i,i.pendingProps,o),i.child;case 8:return Sn(t,i,i.pendingProps.children,o),i.child;case 12:return Sn(t,i,i.pendingProps.children,o),i.child;case 10:e:{if(l=i.type._context,f=i.pendingProps,m=i.memoizedProps,T=f.value,Dt(ga,l._currentValue),l._currentValue=T,m!==null)if(Zn(m.value,T)){if(m.children===f.children&&!bn.current){i=Ri(t,i,o);break e}}else for(m=i.child,m!==null&&(m.return=i);m!==null;){var D=m.dependencies;if(D!==null){T=m.child;for(var H=D.firstContext;H!==null;){if(H.context===l){if(m.tag===1){H=Ci(-1,o&-o),H.tag=2;var se=m.updateQueue;if(se!==null){se=se.shared;var Me=se.pending;Me===null?H.next=H:(H.next=Me.next,Me.next=H),se.pending=H}}m.lanes|=o,H=m.alternate,H!==null&&(H.lanes|=o),yc(m.return,o,i),D.lanes|=o;break}H=H.next}}else if(m.tag===10)T=m.type===i.type?null:m.child;else if(m.tag===18){if(T=m.return,T===null)throw Error(n(341));T.lanes|=o,D=T.alternate,D!==null&&(D.lanes|=o),yc(T,o,i),T=m.sibling}else T=m.child;if(T!==null)T.return=m;else for(T=m;T!==null;){if(T===i){T=null;break}if(m=T.sibling,m!==null){m.return=T.return,T=m;break}T=T.return}m=T}Sn(t,i,f.children,o),i=i.child}return i;case 9:return f=i.type,l=i.pendingProps.children,hs(i,o),f=jn(f),l=l(f),i.flags|=1,Sn(t,i,l,o),i.child;case 14:return l=i.type,f=Jn(l,i.pendingProps),f=Jn(l.type,f),Dh(t,i,l,f,o);case 15:return Uh(t,i,i.type,i.pendingProps,o);case 17:return l=i.type,f=i.pendingProps,f=i.elementType===l?f:Jn(l,f),Ca(t,i),i.tag=1,An(l)?(t=!0,ua(i)):t=!1,hs(i,o),bh(i,l,f),Fc(i,l,f,o),Bc(null,i,l,!0,t,o);case 19:return jh(t,i,o);case 22:return Fh(t,i,o)}throw Error(n(156,i.tag))};function hp(t,i){return Xo(t,i)}function O0(t,i,o,l){this.tag=t,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Xn(t,i,o,l){return new O0(t,i,o,l)}function ou(t){return t=t.prototype,!(!t||!t.isReactComponent)}function z0(t){if(typeof t=="function")return ou(t)?1:0;if(t!=null){if(t=t.$$typeof,t===he)return 11;if(t===me)return 14}return 2}function cr(t,i){var o=t.alternate;return o===null?(o=Xn(t.tag,i,t.key,t.mode),o.elementType=t.elementType,o.type=t.type,o.stateNode=t.stateNode,o.alternate=t,t.alternate=o):(o.pendingProps=i,o.type=t.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=t.flags&14680064,o.childLanes=t.childLanes,o.lanes=t.lanes,o.child=t.child,o.memoizedProps=t.memoizedProps,o.memoizedState=t.memoizedState,o.updateQueue=t.updateQueue,i=t.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=t.sibling,o.index=t.index,o.ref=t.ref,o}function za(t,i,o,l,f,m){var T=2;if(l=t,typeof t=="function")ou(t)&&(T=1);else if(typeof t=="string")T=5;else e:switch(t){case k:return Ur(o.children,f,m,i);case X:T=8,f|=8;break;case P:return t=Xn(12,o,i,f|2),t.elementType=P,t.lanes=m,t;case ne:return t=Xn(13,o,i,f),t.elementType=ne,t.lanes=m,t;case pe:return t=Xn(19,o,i,f),t.elementType=pe,t.lanes=m,t;case ae:return Ba(o,f,m,i);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case R:T=10;break e;case j:T=9;break e;case he:T=11;break e;case me:T=14;break e;case de:T=16,l=null;break e}throw Error(n(130,t==null?t:typeof t,""))}return i=Xn(T,o,i,f),i.elementType=t,i.type=l,i.lanes=m,i}function Ur(t,i,o,l){return t=Xn(7,t,l,i),t.lanes=o,t}function Ba(t,i,o,l){return t=Xn(22,t,l,i),t.elementType=ae,t.lanes=o,t.stateNode={isHidden:!1},t}function au(t,i,o){return t=Xn(6,t,null,i),t.lanes=o,t}function lu(t,i,o){return i=Xn(4,t.children!==null?t.children:[],t.key,i),i.lanes=o,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}function B0(t,i,o,l,f){this.tag=i,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=fn(0),this.expirationTimes=fn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=fn(0),this.identifierPrefix=l,this.onRecoverableError=f,this.mutableSourceEagerHydrationData=null}function cu(t,i,o,l,f,m,T,D,H){return t=new B0(t,i,o,D,H),i===1?(i=1,m===!0&&(i|=8)):i=0,m=Xn(3,null,null,i),t.current=m,m.stateNode=t,m.memoizedState={element:l,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},Mc(m),t}function H0(t,i,o){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:z,key:l==null?null:""+l,children:t,containerInfo:i,implementation:o}}function pp(t){if(!t)return er;t=t._reactInternals;e:{if(ui(t)!==t||t.tag!==1)throw Error(n(170));var i=t;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(An(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(n(171))}if(t.tag===1){var o=t.type;if(An(o))return Vf(t,o,i)}return i}function mp(t,i,o,l,f,m,T,D,H){return t=cu(o,l,!0,t,f,m,T,D,H),t.context=pp(null),o=t.current,l=Mn(),f=ar(o),m=Ci(l,f),m.callback=i??null,ir(o,m,f),t.current.lanes=f,tn(t,f,l),Pn(t,l),t}function Ha(t,i,o,l){var f=i.current,m=Mn(),T=ar(f);return o=pp(o),i.context===null?i.context=o:i.pendingContext=o,i=Ci(m,T),i.payload={element:t},l=l===void 0?null:l,l!==null&&(i.callback=l),t=ir(f,i,T),t!==null&&(ni(t,f,T,m),va(t,f,T)),T}function Va(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function gp(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var o=t.retryLane;t.retryLane=o!==0&&o<i?o:i}}function uu(t,i){gp(t,i),(t=t.alternate)&&gp(t,i)}function V0(){return null}var xp=typeof reportError=="function"?reportError:function(t){console.error(t)};function du(t){this._internalRoot=t}ja.prototype.render=du.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(n(409));Ha(t,i,null,null)},ja.prototype.unmount=du.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;Nr(function(){Ha(null,t,null,null)}),i[Ei]=null}};function ja(t){this._internalRoot=t}ja.prototype.unstable_scheduleHydration=function(t){if(t){var i=Jd();t={blockedOn:null,target:t,priority:i};for(var o=0;o<$i.length&&i!==0&&i<$i[o].priority;o++);$i.splice(o,0,t),o===0&&nf(t)}};function fu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ga(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function vp(){}function j0(t,i,o,l,f){if(f){if(typeof l=="function"){var m=l;l=function(){var se=Va(T);m.call(se)}}var T=mp(i,l,t,0,null,!1,!1,"",vp);return t._reactRootContainer=T,t[Ei]=T.current,ao(t.nodeType===8?t.parentNode:t),Nr(),T}for(;f=t.lastChild;)t.removeChild(f);if(typeof l=="function"){var D=l;l=function(){var se=Va(H);D.call(se)}}var H=cu(t,0,!1,null,null,!1,!1,"",vp);return t._reactRootContainer=H,t[Ei]=H.current,ao(t.nodeType===8?t.parentNode:t),Nr(function(){Ha(i,H,o,l)}),H}function Wa(t,i,o,l,f){var m=o._reactRootContainer;if(m){var T=m;if(typeof f=="function"){var D=f;f=function(){var H=Va(T);D.call(H)}}Ha(i,T,t,f)}else T=j0(o,i,t,f,l);return Va(T)}Zd=function(t){switch(t.tag){case 3:var i=t.stateNode;if(i.current.memoizedState.isDehydrated){var o=_t(i.pendingLanes);o!==0&&(nn(i,o|1),Pn(i,Q()),(wt&6)===0&&(vs=Q()+500,tr()))}break;case 13:Nr(function(){var l=Ai(t,1);if(l!==null){var f=Mn();ni(l,t,1,f)}}),uu(t,1)}},kl=function(t){if(t.tag===13){var i=Ai(t,134217728);if(i!==null){var o=Mn();ni(i,t,134217728,o)}uu(t,134217728)}},Qd=function(t){if(t.tag===13){var i=ar(t),o=Ai(t,i);if(o!==null){var l=Mn();ni(o,t,i,l)}uu(t,i)}},Jd=function(){return Tt},ef=function(t,i){var o=Tt;try{return Tt=t,i()}finally{Tt=o}},Pe=function(t,i,o){switch(i){case"input":if(tt(t,o),i=o.name,o.type==="radio"&&i!=null){for(o=t;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var l=o[i];if(l!==t&&l.form===t.form){var f=la(l);if(!f)throw Error(n(90));nt(l),tt(l,f)}}}break;case"textarea":_e(t,o);break;case"select":i=o.value,i!=null&&I(t,!!o.multiple,i,!1)}},Ut=iu,Kt=Nr;var G0={usingClientEntryPoint:!1,Events:[uo,ss,la,Ie,ut,iu]},wo={findFiberByHostInstance:Tr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},W0={bundleType:wo.bundleType,version:wo.version,rendererPackageName:wo.rendererPackageName,rendererConfig:wo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:L.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Go(t),t===null?null:t.stateNode},findFiberByHostInstance:wo.findFiberByHostInstance||V0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Xa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xa.isDisabled&&Xa.supportsFiber)try{rt=Xa.inject(W0),We=Xa}catch{}}return Ln.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=G0,Ln.createPortal=function(t,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!fu(i))throw Error(n(200));return H0(t,i,null,o)},Ln.createRoot=function(t,i){if(!fu(t))throw Error(n(299));var o=!1,l="",f=xp;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onRecoverableError!==void 0&&(f=i.onRecoverableError)),i=cu(t,1,!1,null,null,o,!1,l,f),t[Ei]=i.current,ao(t.nodeType===8?t.parentNode:t),new du(i)},Ln.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(n(188)):(t=Object.keys(t).join(","),Error(n(268,t)));return t=Go(i),t=t===null?null:t.stateNode,t},Ln.flushSync=function(t){return Nr(t)},Ln.hydrate=function(t,i,o){if(!Ga(i))throw Error(n(200));return Wa(null,t,i,!0,o)},Ln.hydrateRoot=function(t,i,o){if(!fu(t))throw Error(n(405));var l=o!=null&&o.hydratedSources||null,f=!1,m="",T=xp;if(o!=null&&(o.unstable_strictMode===!0&&(f=!0),o.identifierPrefix!==void 0&&(m=o.identifierPrefix),o.onRecoverableError!==void 0&&(T=o.onRecoverableError)),i=mp(i,null,t,1,o??null,f,!1,m,T),t[Ei]=i.current,ao(t),l)for(t=0;t<l.length;t++)o=l[t],f=o._getVersion,f=f(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,f]:i.mutableSourceEagerHydrationData.push(o,f);return new ja(i)},Ln.render=function(t,i,o){if(!Ga(i))throw Error(n(200));return Wa(null,t,i,!1,o)},Ln.unmountComponentAtNode=function(t){if(!Ga(t))throw Error(n(40));return t._reactRootContainer?(Nr(function(){Wa(null,null,t,!1,function(){t._reactRootContainer=null,t[Ei]=null})}),!0):!1},Ln.unstable_batchedUpdates=iu,Ln.unstable_renderSubtreeIntoContainer=function(t,i,o,l){if(!Ga(o))throw Error(n(200));if(t==null||t._reactInternals===void 0)throw Error(n(38));return Wa(t,i,o,!1,l)},Ln.version="18.3.1-next-f1338f8080-20240426",Ln}var bp;function ex(){if(bp)return mu.exports;bp=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),mu.exports=J0(),mu.exports}var Ap;function tx(){if(Ap)return qa;Ap=1;var s=ex();return qa.createRoot=s.createRoot,qa.hydrateRoot=s.hydrateRoot,qa}var nx=tx();const ix=Pm(nx);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const zd="173",rx=0,Cp=1,sx=2,Lm=1,ox=2,Fi=3,yr=0,In=1,ki=2,vr=0,Fs=1,$u=2,Rp=3,Pp=4,ax=5,Gr=100,lx=101,cx=102,ux=103,dx=104,fx=200,hx=201,px=202,mx=203,Ku=204,Zu=205,gx=206,xx=207,vx=208,_x=209,yx=210,Sx=211,Mx=212,Ex=213,Tx=214,Qu=0,Ju=1,ed=2,zs=3,td=4,nd=5,id=6,rd=7,Nm=0,wx=1,bx=2,_r=0,Ax=1,Cx=2,Rx=3,Px=4,Lx=5,Nx=6,Ix=7,Im=300,Bs=301,Hs=302,sd=303,od=304,Pl=306,ad=1e3,Xr=1001,ld=1002,ci=1003,Dx=1004,Ya=1005,xi=1006,vu=1007,qr=1008,Hi=1009,Dm=1010,Um=1011,Io=1012,Bd=1013,Yr=1014,Oi=1015,Do=1016,Hd=1017,Vd=1018,Vs=1020,Fm=35902,km=1021,Om=1022,ai=1023,zm=1024,Bm=1025,ks=1026,js=1027,Hm=1028,jd=1029,Vm=1030,Gd=1031,Wd=1033,vl=33776,_l=33777,yl=33778,Sl=33779,cd=35840,ud=35841,dd=35842,fd=35843,hd=36196,pd=37492,md=37496,gd=37808,xd=37809,vd=37810,_d=37811,yd=37812,Sd=37813,Md=37814,Ed=37815,Td=37816,wd=37817,bd=37818,Ad=37819,Cd=37820,Rd=37821,Ml=36492,Pd=36494,Ld=36495,jm=36283,Nd=36284,Id=36285,Dd=36286,Ux=3200,Fx=3201,kx=0,Ox=1,xr="",Yn="srgb",Gs="srgb-linear",Tl="linear",Lt="srgb",ys=7680,Lp=519,zx=512,Bx=513,Hx=514,Gm=515,Vx=516,jx=517,Gx=518,Wx=519,Np=35044,Ip="300 es",zi=2e3,wl=2001;class Xs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(n)===-1&&r[e].push(n)}hasEventListener(e,n){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(n)!==-1}removeEventListener(e,n){const r=this._listeners;if(r===void 0)return;const a=r[e];if(a!==void 0){const c=a.indexOf(n);c!==-1&&a.splice(c,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const r=n[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let c=0,u=a.length;c<u;c++)a[c].call(this,e);e.target=null}}}const xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_u=Math.PI/180,Ud=180/Math.PI;function Uo(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(xn[s&255]+xn[s>>8&255]+xn[s>>16&255]+xn[s>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[n&63|128]+xn[n>>8&255]+"-"+xn[n>>16&255]+xn[n>>24&255]+xn[r&255]+xn[r>>8&255]+xn[r>>16&255]+xn[r>>24&255]).toLowerCase()}function St(s,e,n){return Math.max(e,Math.min(n,s))}function Xx(s,e){return(s%e+e)%e}function yu(s,e,n){return(1-n)*s+n*e}function Ao(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Nn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class It{constructor(e=0,n=0){It.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,r=this.y,a=e.elements;return this.x=a[0]*n+a[3]*r+a[6],this.y=a[1]*n+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=St(this.x,e.x,n.x),this.y=St(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=St(this.x,e,n),this.y=St(this.y,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(St(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(St(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y;return n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const r=Math.cos(n),a=Math.sin(n),c=this.x-e.x,u=this.y-e.y;return this.x=c*r-u*a+e.x,this.y=c*a+u*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class pt{constructor(e,n,r,a,c,u,d,h,g){pt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,r,a,c,u,d,h,g)}set(e,n,r,a,c,u,d,h,g){const _=this.elements;return _[0]=e,_[1]=a,_[2]=d,_[3]=n,_[4]=c,_[5]=h,_[6]=r,_[7]=u,_[8]=g,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],this}extractBasis(e,n,r){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,c=this.elements,u=r[0],d=r[3],h=r[6],g=r[1],_=r[4],S=r[7],v=r[2],E=r[5],w=r[8],C=a[0],M=a[3],y=a[6],O=a[1],U=a[4],L=a[7],Y=a[2],z=a[5],k=a[8];return c[0]=u*C+d*O+h*Y,c[3]=u*M+d*U+h*z,c[6]=u*y+d*L+h*k,c[1]=g*C+_*O+S*Y,c[4]=g*M+_*U+S*z,c[7]=g*y+_*L+S*k,c[2]=v*C+E*O+w*Y,c[5]=v*M+E*U+w*z,c[8]=v*y+E*L+w*k,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[1],a=e[2],c=e[3],u=e[4],d=e[5],h=e[6],g=e[7],_=e[8];return n*u*_-n*d*g-r*c*_+r*d*h+a*c*g-a*u*h}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],c=e[3],u=e[4],d=e[5],h=e[6],g=e[7],_=e[8],S=_*u-d*g,v=d*h-_*c,E=g*c-u*h,w=n*S+r*v+a*E;if(w===0)return this.set(0,0,0,0,0,0,0,0,0);const C=1/w;return e[0]=S*C,e[1]=(a*g-_*r)*C,e[2]=(d*r-a*u)*C,e[3]=v*C,e[4]=(_*n-a*h)*C,e[5]=(a*c-d*n)*C,e[6]=E*C,e[7]=(r*h-g*n)*C,e[8]=(u*n-r*c)*C,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,r,a,c,u,d){const h=Math.cos(c),g=Math.sin(c);return this.set(r*h,r*g,-r*(h*u+g*d)+u+e,-a*g,a*h,-a*(-g*u+h*d)+d+n,0,0,1),this}scale(e,n){return this.premultiply(Su.makeScale(e,n)),this}rotate(e){return this.premultiply(Su.makeRotation(-e)),this}translate(e,n){return this.premultiply(Su.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,r,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<9;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<9;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Su=new pt;function Wm(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function bl(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function qx(){const s=bl("canvas");return s.style.display="block",s}const Dp={};function Ds(s){s in Dp||(Dp[s]=!0,console.warn(s))}function Yx(s,e,n){return new Promise(function(r,a){function c(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:a();break;case s.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:r()}}setTimeout(c,n)})}function $x(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Kx(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Up=new pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fp=new pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zx(){const s={enabled:!0,workingColorSpace:Gs,spaces:{},convert:function(a,c,u){return this.enabled===!1||c===u||!c||!u||(this.spaces[c].transfer===Lt&&(a.r=Bi(a.r),a.g=Bi(a.g),a.b=Bi(a.b)),this.spaces[c].primaries!==this.spaces[u].primaries&&(a.applyMatrix3(this.spaces[c].toXYZ),a.applyMatrix3(this.spaces[u].fromXYZ)),this.spaces[u].transfer===Lt&&(a.r=Os(a.r),a.g=Os(a.g),a.b=Os(a.b))),a},fromWorkingColorSpace:function(a,c){return this.convert(a,this.workingColorSpace,c)},toWorkingColorSpace:function(a,c){return this.convert(a,c,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===xr?Tl:this.spaces[a].transfer},getLuminanceCoefficients:function(a,c=this.workingColorSpace){return a.fromArray(this.spaces[c].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,c,u){return a.copy(this.spaces[c].toXYZ).multiply(this.spaces[u].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[Gs]:{primaries:e,whitePoint:r,transfer:Tl,toXYZ:Up,fromXYZ:Fp,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Yn},outputColorSpaceConfig:{drawingBufferColorSpace:Yn}},[Yn]:{primaries:e,whitePoint:r,transfer:Lt,toXYZ:Up,fromXYZ:Fp,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Yn}}}),s}const Ct=Zx();function Bi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Os(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ss;class Qx{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ss===void 0&&(Ss=bl("canvas")),Ss.width=e.width,Ss.height=e.height;const r=Ss.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Ss}return n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=bl("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),c=a.data;for(let u=0;u<c.length;u++)c[u]=Bi(c[u]/255)*255;return r.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let r=0;r<n.length;r++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[r]=Math.floor(Bi(n[r]/255)*255):n[r]=Bi(n[r]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Jx=0;class Xm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jx++}),this.uuid=Uo(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let c;if(Array.isArray(a)){c=[];for(let u=0,d=a.length;u<d;u++)a[u].isDataTexture?c.push(Mu(a[u].image)):c.push(Mu(a[u]))}else c=Mu(a);r.url=c}return n||(e.images[this.uuid]=r),r}}function Mu(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Qx.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ev=0;class Tn extends Xs{constructor(e=Tn.DEFAULT_IMAGE,n=Tn.DEFAULT_MAPPING,r=Xr,a=Xr,c=xi,u=qr,d=ai,h=Hi,g=Tn.DEFAULT_ANISOTROPY,_=xr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ev++}),this.uuid=Uo(),this.name="",this.source=new Xm(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=c,this.minFilter=u,this.anisotropy=g,this.format=d,this.internalFormat=null,this.type=h,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),n||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Im)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ad:e.x=e.x-Math.floor(e.x);break;case Xr:e.x=e.x<0?0:1;break;case ld:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ad:e.y=e.y-Math.floor(e.y);break;case Xr:e.y=e.y<0?0:1;break;case ld:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Tn.DEFAULT_IMAGE=null;Tn.DEFAULT_MAPPING=Im;Tn.DEFAULT_ANISOTROPY=1;class Xt{constructor(e=0,n=0,r=0,a=1){Xt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,r,a){return this.x=e,this.y=n,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,c=this.w,u=e.elements;return this.x=u[0]*n+u[4]*r+u[8]*a+u[12]*c,this.y=u[1]*n+u[5]*r+u[9]*a+u[13]*c,this.z=u[2]*n+u[6]*r+u[10]*a+u[14]*c,this.w=u[3]*n+u[7]*r+u[11]*a+u[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,r,a,c;const h=e.elements,g=h[0],_=h[4],S=h[8],v=h[1],E=h[5],w=h[9],C=h[2],M=h[6],y=h[10];if(Math.abs(_-v)<.01&&Math.abs(S-C)<.01&&Math.abs(w-M)<.01){if(Math.abs(_+v)<.1&&Math.abs(S+C)<.1&&Math.abs(w+M)<.1&&Math.abs(g+E+y-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const U=(g+1)/2,L=(E+1)/2,Y=(y+1)/2,z=(_+v)/4,k=(S+C)/4,X=(w+M)/4;return U>L&&U>Y?U<.01?(r=0,a=.707106781,c=.707106781):(r=Math.sqrt(U),a=z/r,c=k/r):L>Y?L<.01?(r=.707106781,a=0,c=.707106781):(a=Math.sqrt(L),r=z/a,c=X/a):Y<.01?(r=.707106781,a=.707106781,c=0):(c=Math.sqrt(Y),r=k/c,a=X/c),this.set(r,a,c,n),this}let O=Math.sqrt((M-w)*(M-w)+(S-C)*(S-C)+(v-_)*(v-_));return Math.abs(O)<.001&&(O=1),this.x=(M-w)/O,this.y=(S-C)/O,this.z=(v-_)/O,this.w=Math.acos((g+E+y-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=St(this.x,e.x,n.x),this.y=St(this.y,e.y,n.y),this.z=St(this.z,e.z,n.z),this.w=St(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=St(this.x,e,n),this.y=St(this.y,e,n),this.z=St(this.z,e,n),this.w=St(this.w,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(St(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this.w=e.w+(n.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tv extends Xs{constructor(e=1,n=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Xt(0,0,e,n),this.scissorTest=!1,this.viewport=new Xt(0,0,e,n);const a={width:e,height:n,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const c=new Tn(a,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);c.flipY=!1,c.generateMipmaps=r.generateMipmaps,c.internalFormat=r.internalFormat,this.textures=[];const u=r.count;for(let d=0;d<u;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,r=1){if(this.width!==e||this.height!==n||this.depth!==r){this.width=e,this.height=n,this.depth=r;for(let a=0,c=this.textures.length;a<c;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=r;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,a=e.textures.length;r<a;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;const n=Object.assign({},e.texture.image);return this.texture.source=new Xm(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $r extends tv{constructor(e=1,n=1,r={}){super(e,n,r),this.isWebGLRenderTarget=!0}}class qm extends Tn{constructor(e=null,n=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=ci,this.minFilter=ci,this.wrapR=Xr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class nv extends Tn{constructor(e=null,n=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:r,depth:a},this.magFilter=ci,this.minFilter=ci,this.wrapR=Xr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fo{constructor(e=0,n=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=r,this._w=a}static slerpFlat(e,n,r,a,c,u,d){let h=r[a+0],g=r[a+1],_=r[a+2],S=r[a+3];const v=c[u+0],E=c[u+1],w=c[u+2],C=c[u+3];if(d===0){e[n+0]=h,e[n+1]=g,e[n+2]=_,e[n+3]=S;return}if(d===1){e[n+0]=v,e[n+1]=E,e[n+2]=w,e[n+3]=C;return}if(S!==C||h!==v||g!==E||_!==w){let M=1-d;const y=h*v+g*E+_*w+S*C,O=y>=0?1:-1,U=1-y*y;if(U>Number.EPSILON){const Y=Math.sqrt(U),z=Math.atan2(Y,y*O);M=Math.sin(M*z)/Y,d=Math.sin(d*z)/Y}const L=d*O;if(h=h*M+v*L,g=g*M+E*L,_=_*M+w*L,S=S*M+C*L,M===1-d){const Y=1/Math.sqrt(h*h+g*g+_*_+S*S);h*=Y,g*=Y,_*=Y,S*=Y}}e[n]=h,e[n+1]=g,e[n+2]=_,e[n+3]=S}static multiplyQuaternionsFlat(e,n,r,a,c,u){const d=r[a],h=r[a+1],g=r[a+2],_=r[a+3],S=c[u],v=c[u+1],E=c[u+2],w=c[u+3];return e[n]=d*w+_*S+h*E-g*v,e[n+1]=h*w+_*v+g*S-d*E,e[n+2]=g*w+_*E+d*v-h*S,e[n+3]=_*w-d*S-h*v-g*E,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,r,a){return this._x=e,this._y=n,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const r=e._x,a=e._y,c=e._z,u=e._order,d=Math.cos,h=Math.sin,g=d(r/2),_=d(a/2),S=d(c/2),v=h(r/2),E=h(a/2),w=h(c/2);switch(u){case"XYZ":this._x=v*_*S+g*E*w,this._y=g*E*S-v*_*w,this._z=g*_*w+v*E*S,this._w=g*_*S-v*E*w;break;case"YXZ":this._x=v*_*S+g*E*w,this._y=g*E*S-v*_*w,this._z=g*_*w-v*E*S,this._w=g*_*S+v*E*w;break;case"ZXY":this._x=v*_*S-g*E*w,this._y=g*E*S+v*_*w,this._z=g*_*w+v*E*S,this._w=g*_*S-v*E*w;break;case"ZYX":this._x=v*_*S-g*E*w,this._y=g*E*S+v*_*w,this._z=g*_*w-v*E*S,this._w=g*_*S+v*E*w;break;case"YZX":this._x=v*_*S+g*E*w,this._y=g*E*S+v*_*w,this._z=g*_*w-v*E*S,this._w=g*_*S-v*E*w;break;case"XZY":this._x=v*_*S-g*E*w,this._y=g*E*S-v*_*w,this._z=g*_*w+v*E*S,this._w=g*_*S+v*E*w;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const r=n/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,r=n[0],a=n[4],c=n[8],u=n[1],d=n[5],h=n[9],g=n[2],_=n[6],S=n[10],v=r+d+S;if(v>0){const E=.5/Math.sqrt(v+1);this._w=.25/E,this._x=(_-h)*E,this._y=(c-g)*E,this._z=(u-a)*E}else if(r>d&&r>S){const E=2*Math.sqrt(1+r-d-S);this._w=(_-h)/E,this._x=.25*E,this._y=(a+u)/E,this._z=(c+g)/E}else if(d>S){const E=2*Math.sqrt(1+d-r-S);this._w=(c-g)/E,this._x=(a+u)/E,this._y=.25*E,this._z=(h+_)/E}else{const E=2*Math.sqrt(1+S-r-d);this._w=(u-a)/E,this._x=(c+g)/E,this._y=(h+_)/E,this._z=.25*E}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let r=e.dot(n)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(St(this.dot(e),-1,1)))}rotateTowards(e,n){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,n/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const r=e._x,a=e._y,c=e._z,u=e._w,d=n._x,h=n._y,g=n._z,_=n._w;return this._x=r*_+u*d+a*g-c*h,this._y=a*_+u*h+c*d-r*g,this._z=c*_+u*g+r*h-a*d,this._w=u*_-r*d-a*h-c*g,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const r=this._x,a=this._y,c=this._z,u=this._w;let d=u*e._w+r*e._x+a*e._y+c*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=u,this._x=r,this._y=a,this._z=c,this;const h=1-d*d;if(h<=Number.EPSILON){const E=1-n;return this._w=E*u+n*this._w,this._x=E*r+n*this._x,this._y=E*a+n*this._y,this._z=E*c+n*this._z,this.normalize(),this}const g=Math.sqrt(h),_=Math.atan2(g,d),S=Math.sin((1-n)*_)/g,v=Math.sin(n*_)/g;return this._w=u*S+this._w*v,this._x=r*S+this._x*v,this._y=a*S+this._y*v,this._z=c*S+this._z*v,this._onChangeCallback(),this}slerpQuaternions(e,n,r){return this.copy(e).slerp(n,r)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),c=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),c*Math.sin(n),c*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class le{constructor(e=0,n=0,r=0){le.prototype.isVector3=!0,this.x=e,this.y=n,this.z=r}set(e,n,r){return r===void 0&&(r=this.z),this.x=e,this.y=n,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(kp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(kp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,r=this.y,a=this.z,c=e.elements;return this.x=c[0]*n+c[3]*r+c[6]*a,this.y=c[1]*n+c[4]*r+c[7]*a,this.z=c[2]*n+c[5]*r+c[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,r=this.y,a=this.z,c=e.elements,u=1/(c[3]*n+c[7]*r+c[11]*a+c[15]);return this.x=(c[0]*n+c[4]*r+c[8]*a+c[12])*u,this.y=(c[1]*n+c[5]*r+c[9]*a+c[13])*u,this.z=(c[2]*n+c[6]*r+c[10]*a+c[14])*u,this}applyQuaternion(e){const n=this.x,r=this.y,a=this.z,c=e.x,u=e.y,d=e.z,h=e.w,g=2*(u*a-d*r),_=2*(d*n-c*a),S=2*(c*r-u*n);return this.x=n+h*g+u*S-d*_,this.y=r+h*_+d*g-c*S,this.z=a+h*S+c*_-u*g,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,r=this.y,a=this.z,c=e.elements;return this.x=c[0]*n+c[4]*r+c[8]*a,this.y=c[1]*n+c[5]*r+c[9]*a,this.z=c[2]*n+c[6]*r+c[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=St(this.x,e.x,n.x),this.y=St(this.y,e.y,n.y),this.z=St(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=St(this.x,e,n),this.y=St(this.y,e,n),this.z=St(this.z,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(St(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const r=e.x,a=e.y,c=e.z,u=n.x,d=n.y,h=n.z;return this.x=a*h-c*d,this.y=c*u-r*h,this.z=r*d-a*u,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const r=e.dot(this)/n;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Eu.copy(this).projectOnVector(e),this.sub(Eu)}reflect(e){return this.sub(Eu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(St(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return n*n+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,r){const a=Math.sin(n)*e;return this.x=a*Math.sin(r),this.y=Math.cos(n)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,r){return this.x=e*Math.sin(n),this.y=r,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=r,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,r=Math.sqrt(1-n*n);return this.x=r*Math.cos(e),this.y=n,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Eu=new le,kp=new Fo;class ko{constructor(e=new le(1/0,1/0,1/0),n=new le(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n+=3)this.expandByPoint(ii.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,r=e.count;n<r;n++)this.expandByPoint(ii.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const r=ii.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const c=r.getAttribute("position");if(n===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let u=0,d=c.count;u<d;u++)e.isMesh===!0?e.getVertexPosition(u,ii):ii.fromBufferAttribute(c,u),ii.applyMatrix4(e.matrixWorld),this.expandByPoint(ii);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$a.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),$a.copy(r.boundingBox)),$a.applyMatrix4(e.matrixWorld),this.union($a)}const a=e.children;for(let c=0,u=a.length;c<u;c++)this.expandByObject(a[c],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ii),ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,r;return e.normal.x>0?(n=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),n<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Co),Ka.subVectors(this.max,Co),Ms.subVectors(e.a,Co),Es.subVectors(e.b,Co),Ts.subVectors(e.c,Co),dr.subVectors(Es,Ms),fr.subVectors(Ts,Es),Fr.subVectors(Ms,Ts);let n=[0,-dr.z,dr.y,0,-fr.z,fr.y,0,-Fr.z,Fr.y,dr.z,0,-dr.x,fr.z,0,-fr.x,Fr.z,0,-Fr.x,-dr.y,dr.x,0,-fr.y,fr.x,0,-Fr.y,Fr.x,0];return!Tu(n,Ms,Es,Ts,Ka)||(n=[1,0,0,0,1,0,0,0,1],!Tu(n,Ms,Es,Ts,Ka))?!1:(Za.crossVectors(dr,fr),n=[Za.x,Za.y,Za.z],Tu(n,Ms,Es,Ts,Ka))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ii).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ii).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Li=[new le,new le,new le,new le,new le,new le,new le,new le],ii=new le,$a=new ko,Ms=new le,Es=new le,Ts=new le,dr=new le,fr=new le,Fr=new le,Co=new le,Ka=new le,Za=new le,kr=new le;function Tu(s,e,n,r,a){for(let c=0,u=s.length-3;c<=u;c+=3){kr.fromArray(s,c);const d=a.x*Math.abs(kr.x)+a.y*Math.abs(kr.y)+a.z*Math.abs(kr.z),h=e.dot(kr),g=n.dot(kr),_=r.dot(kr);if(Math.max(-Math.max(h,g,_),Math.min(h,g,_))>d)return!1}return!0}const iv=new ko,Ro=new le,wu=new le;class Ll{constructor(e=new le,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const r=this.center;n!==void 0?r.copy(n):iv.setFromPoints(e).getCenter(r);let a=0;for(let c=0,u=e.length;c<u;c++)a=Math.max(a,r.distanceToSquared(e[c]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const r=this.center.distanceToSquared(e);return n.copy(e),r>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ro.subVectors(e,this.center);const n=Ro.lengthSq();if(n>this.radius*this.radius){const r=Math.sqrt(n),a=(r-this.radius)*.5;this.center.addScaledVector(Ro,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ro.copy(e.center).add(wu)),this.expandByPoint(Ro.copy(e.center).sub(wu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ni=new le,bu=new le,Qa=new le,hr=new le,Au=new le,Ja=new le,Cu=new le;class Ym{constructor(e=new le,n=new le(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ni)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const r=n.dot(this.direction);return r<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ni.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ni.copy(this.origin).addScaledVector(this.direction,n),Ni.distanceToSquared(e))}distanceSqToSegment(e,n,r,a){bu.copy(e).add(n).multiplyScalar(.5),Qa.copy(n).sub(e).normalize(),hr.copy(this.origin).sub(bu);const c=e.distanceTo(n)*.5,u=-this.direction.dot(Qa),d=hr.dot(this.direction),h=-hr.dot(Qa),g=hr.lengthSq(),_=Math.abs(1-u*u);let S,v,E,w;if(_>0)if(S=u*h-d,v=u*d-h,w=c*_,S>=0)if(v>=-w)if(v<=w){const C=1/_;S*=C,v*=C,E=S*(S+u*v+2*d)+v*(u*S+v+2*h)+g}else v=c,S=Math.max(0,-(u*v+d)),E=-S*S+v*(v+2*h)+g;else v=-c,S=Math.max(0,-(u*v+d)),E=-S*S+v*(v+2*h)+g;else v<=-w?(S=Math.max(0,-(-u*c+d)),v=S>0?-c:Math.min(Math.max(-c,-h),c),E=-S*S+v*(v+2*h)+g):v<=w?(S=0,v=Math.min(Math.max(-c,-h),c),E=v*(v+2*h)+g):(S=Math.max(0,-(u*c+d)),v=S>0?c:Math.min(Math.max(-c,-h),c),E=-S*S+v*(v+2*h)+g);else v=u>0?-c:c,S=Math.max(0,-(u*v+d)),E=-S*S+v*(v+2*h)+g;return r&&r.copy(this.origin).addScaledVector(this.direction,S),a&&a.copy(bu).addScaledVector(Qa,v),E}intersectSphere(e,n){Ni.subVectors(e.center,this.origin);const r=Ni.dot(this.direction),a=Ni.dot(Ni)-r*r,c=e.radius*e.radius;if(a>c)return null;const u=Math.sqrt(c-a),d=r-u,h=r+u;return h<0?null:d<0?this.at(h,n):this.at(d,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/n;return r>=0?r:null}intersectPlane(e,n){const r=this.distanceToPlane(e);return r===null?null:this.at(r,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let r,a,c,u,d,h;const g=1/this.direction.x,_=1/this.direction.y,S=1/this.direction.z,v=this.origin;return g>=0?(r=(e.min.x-v.x)*g,a=(e.max.x-v.x)*g):(r=(e.max.x-v.x)*g,a=(e.min.x-v.x)*g),_>=0?(c=(e.min.y-v.y)*_,u=(e.max.y-v.y)*_):(c=(e.max.y-v.y)*_,u=(e.min.y-v.y)*_),r>u||c>a||((c>r||isNaN(r))&&(r=c),(u<a||isNaN(a))&&(a=u),S>=0?(d=(e.min.z-v.z)*S,h=(e.max.z-v.z)*S):(d=(e.max.z-v.z)*S,h=(e.min.z-v.z)*S),r>h||d>a)||((d>r||r!==r)&&(r=d),(h<a||a!==a)&&(a=h),a<0)?null:this.at(r>=0?r:a,n)}intersectsBox(e){return this.intersectBox(e,Ni)!==null}intersectTriangle(e,n,r,a,c){Au.subVectors(n,e),Ja.subVectors(r,e),Cu.crossVectors(Au,Ja);let u=this.direction.dot(Cu),d;if(u>0){if(a)return null;d=1}else if(u<0)d=-1,u=-u;else return null;hr.subVectors(this.origin,e);const h=d*this.direction.dot(Ja.crossVectors(hr,Ja));if(h<0)return null;const g=d*this.direction.dot(Au.cross(hr));if(g<0||h+g>u)return null;const _=-d*hr.dot(Cu);return _<0?null:this.at(_/u,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qt{constructor(e,n,r,a,c,u,d,h,g,_,S,v,E,w,C,M){qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,r,a,c,u,d,h,g,_,S,v,E,w,C,M)}set(e,n,r,a,c,u,d,h,g,_,S,v,E,w,C,M){const y=this.elements;return y[0]=e,y[4]=n,y[8]=r,y[12]=a,y[1]=c,y[5]=u,y[9]=d,y[13]=h,y[2]=g,y[6]=_,y[10]=S,y[14]=v,y[3]=E,y[7]=w,y[11]=C,y[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qt().fromArray(this.elements)}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],n[9]=r[9],n[10]=r[10],n[11]=r[11],n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15],this}copyPosition(e){const n=this.elements,r=e.elements;return n[12]=r[12],n[13]=r[13],n[14]=r[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,r){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,n,r){return this.set(e.x,n.x,r.x,0,e.y,n.y,r.y,0,e.z,n.z,r.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,r=e.elements,a=1/ws.setFromMatrixColumn(e,0).length(),c=1/ws.setFromMatrixColumn(e,1).length(),u=1/ws.setFromMatrixColumn(e,2).length();return n[0]=r[0]*a,n[1]=r[1]*a,n[2]=r[2]*a,n[3]=0,n[4]=r[4]*c,n[5]=r[5]*c,n[6]=r[6]*c,n[7]=0,n[8]=r[8]*u,n[9]=r[9]*u,n[10]=r[10]*u,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,r=e.x,a=e.y,c=e.z,u=Math.cos(r),d=Math.sin(r),h=Math.cos(a),g=Math.sin(a),_=Math.cos(c),S=Math.sin(c);if(e.order==="XYZ"){const v=u*_,E=u*S,w=d*_,C=d*S;n[0]=h*_,n[4]=-h*S,n[8]=g,n[1]=E+w*g,n[5]=v-C*g,n[9]=-d*h,n[2]=C-v*g,n[6]=w+E*g,n[10]=u*h}else if(e.order==="YXZ"){const v=h*_,E=h*S,w=g*_,C=g*S;n[0]=v+C*d,n[4]=w*d-E,n[8]=u*g,n[1]=u*S,n[5]=u*_,n[9]=-d,n[2]=E*d-w,n[6]=C+v*d,n[10]=u*h}else if(e.order==="ZXY"){const v=h*_,E=h*S,w=g*_,C=g*S;n[0]=v-C*d,n[4]=-u*S,n[8]=w+E*d,n[1]=E+w*d,n[5]=u*_,n[9]=C-v*d,n[2]=-u*g,n[6]=d,n[10]=u*h}else if(e.order==="ZYX"){const v=u*_,E=u*S,w=d*_,C=d*S;n[0]=h*_,n[4]=w*g-E,n[8]=v*g+C,n[1]=h*S,n[5]=C*g+v,n[9]=E*g-w,n[2]=-g,n[6]=d*h,n[10]=u*h}else if(e.order==="YZX"){const v=u*h,E=u*g,w=d*h,C=d*g;n[0]=h*_,n[4]=C-v*S,n[8]=w*S+E,n[1]=S,n[5]=u*_,n[9]=-d*_,n[2]=-g*_,n[6]=E*S+w,n[10]=v-C*S}else if(e.order==="XZY"){const v=u*h,E=u*g,w=d*h,C=d*g;n[0]=h*_,n[4]=-S,n[8]=g*_,n[1]=v*S+C,n[5]=u*_,n[9]=E*S-w,n[2]=w*S-E,n[6]=d*_,n[10]=C*S+v}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(rv,e,sv)}lookAt(e,n,r){const a=this.elements;return zn.subVectors(e,n),zn.lengthSq()===0&&(zn.z=1),zn.normalize(),pr.crossVectors(r,zn),pr.lengthSq()===0&&(Math.abs(r.z)===1?zn.x+=1e-4:zn.z+=1e-4,zn.normalize(),pr.crossVectors(r,zn)),pr.normalize(),el.crossVectors(zn,pr),a[0]=pr.x,a[4]=el.x,a[8]=zn.x,a[1]=pr.y,a[5]=el.y,a[9]=zn.y,a[2]=pr.z,a[6]=el.z,a[10]=zn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,a=n.elements,c=this.elements,u=r[0],d=r[4],h=r[8],g=r[12],_=r[1],S=r[5],v=r[9],E=r[13],w=r[2],C=r[6],M=r[10],y=r[14],O=r[3],U=r[7],L=r[11],Y=r[15],z=a[0],k=a[4],X=a[8],P=a[12],R=a[1],j=a[5],he=a[9],ne=a[13],pe=a[2],me=a[6],de=a[10],ae=a[14],G=a[3],fe=a[7],N=a[11],x=a[15];return c[0]=u*z+d*R+h*pe+g*G,c[4]=u*k+d*j+h*me+g*fe,c[8]=u*X+d*he+h*de+g*N,c[12]=u*P+d*ne+h*ae+g*x,c[1]=_*z+S*R+v*pe+E*G,c[5]=_*k+S*j+v*me+E*fe,c[9]=_*X+S*he+v*de+E*N,c[13]=_*P+S*ne+v*ae+E*x,c[2]=w*z+C*R+M*pe+y*G,c[6]=w*k+C*j+M*me+y*fe,c[10]=w*X+C*he+M*de+y*N,c[14]=w*P+C*ne+M*ae+y*x,c[3]=O*z+U*R+L*pe+Y*G,c[7]=O*k+U*j+L*me+Y*fe,c[11]=O*X+U*he+L*de+Y*N,c[15]=O*P+U*ne+L*ae+Y*x,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[4],a=e[8],c=e[12],u=e[1],d=e[5],h=e[9],g=e[13],_=e[2],S=e[6],v=e[10],E=e[14],w=e[3],C=e[7],M=e[11],y=e[15];return w*(+c*h*S-a*g*S-c*d*v+r*g*v+a*d*E-r*h*E)+C*(+n*h*E-n*g*v+c*u*v-a*u*E+a*g*_-c*h*_)+M*(+n*g*S-n*d*E-c*u*S+r*u*E+c*d*_-r*g*_)+y*(-a*d*_-n*h*S+n*d*v+a*u*S-r*u*v+r*h*_)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=r),this}invert(){const e=this.elements,n=e[0],r=e[1],a=e[2],c=e[3],u=e[4],d=e[5],h=e[6],g=e[7],_=e[8],S=e[9],v=e[10],E=e[11],w=e[12],C=e[13],M=e[14],y=e[15],O=S*M*g-C*v*g+C*h*E-d*M*E-S*h*y+d*v*y,U=w*v*g-_*M*g-w*h*E+u*M*E+_*h*y-u*v*y,L=_*C*g-w*S*g+w*d*E-u*C*E-_*d*y+u*S*y,Y=w*S*h-_*C*h-w*d*v+u*C*v+_*d*M-u*S*M,z=n*O+r*U+a*L+c*Y;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/z;return e[0]=O*k,e[1]=(C*v*c-S*M*c-C*a*E+r*M*E+S*a*y-r*v*y)*k,e[2]=(d*M*c-C*h*c+C*a*g-r*M*g-d*a*y+r*h*y)*k,e[3]=(S*h*c-d*v*c-S*a*g+r*v*g+d*a*E-r*h*E)*k,e[4]=U*k,e[5]=(_*M*c-w*v*c+w*a*E-n*M*E-_*a*y+n*v*y)*k,e[6]=(w*h*c-u*M*c-w*a*g+n*M*g+u*a*y-n*h*y)*k,e[7]=(u*v*c-_*h*c+_*a*g-n*v*g-u*a*E+n*h*E)*k,e[8]=L*k,e[9]=(w*S*c-_*C*c-w*r*E+n*C*E+_*r*y-n*S*y)*k,e[10]=(u*C*c-w*d*c+w*r*g-n*C*g-u*r*y+n*d*y)*k,e[11]=(_*d*c-u*S*c-_*r*g+n*S*g+u*r*E-n*d*E)*k,e[12]=Y*k,e[13]=(_*C*a-w*S*a+w*r*v-n*C*v-_*r*M+n*S*M)*k,e[14]=(w*d*a-u*C*a-w*r*h+n*C*h+u*r*M-n*d*M)*k,e[15]=(u*S*a-_*d*a+_*r*h-n*S*h-u*r*v+n*d*v)*k,this}scale(e){const n=this.elements,r=e.x,a=e.y,c=e.z;return n[0]*=r,n[4]*=a,n[8]*=c,n[1]*=r,n[5]*=a,n[9]*=c,n[2]*=r,n[6]*=a,n[10]*=c,n[3]*=r,n[7]*=a,n[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,r,a))}makeTranslation(e,n,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,r,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,n,-r,0,0,r,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,0,r,0,0,1,0,0,-r,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,0,r,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const r=Math.cos(n),a=Math.sin(n),c=1-r,u=e.x,d=e.y,h=e.z,g=c*u,_=c*d;return this.set(g*u+r,g*d-a*h,g*h+a*d,0,g*d+a*h,_*d+r,_*h-a*u,0,g*h-a*d,_*h+a*u,c*h*h+r,0,0,0,0,1),this}makeScale(e,n,r){return this.set(e,0,0,0,0,n,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,n,r,a,c,u){return this.set(1,r,c,0,e,1,u,0,n,a,1,0,0,0,0,1),this}compose(e,n,r){const a=this.elements,c=n._x,u=n._y,d=n._z,h=n._w,g=c+c,_=u+u,S=d+d,v=c*g,E=c*_,w=c*S,C=u*_,M=u*S,y=d*S,O=h*g,U=h*_,L=h*S,Y=r.x,z=r.y,k=r.z;return a[0]=(1-(C+y))*Y,a[1]=(E+L)*Y,a[2]=(w-U)*Y,a[3]=0,a[4]=(E-L)*z,a[5]=(1-(v+y))*z,a[6]=(M+O)*z,a[7]=0,a[8]=(w+U)*k,a[9]=(M-O)*k,a[10]=(1-(v+C))*k,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,r){const a=this.elements;let c=ws.set(a[0],a[1],a[2]).length();const u=ws.set(a[4],a[5],a[6]).length(),d=ws.set(a[8],a[9],a[10]).length();this.determinant()<0&&(c=-c),e.x=a[12],e.y=a[13],e.z=a[14],ri.copy(this);const g=1/c,_=1/u,S=1/d;return ri.elements[0]*=g,ri.elements[1]*=g,ri.elements[2]*=g,ri.elements[4]*=_,ri.elements[5]*=_,ri.elements[6]*=_,ri.elements[8]*=S,ri.elements[9]*=S,ri.elements[10]*=S,n.setFromRotationMatrix(ri),r.x=c,r.y=u,r.z=d,this}makePerspective(e,n,r,a,c,u,d=zi){const h=this.elements,g=2*c/(n-e),_=2*c/(r-a),S=(n+e)/(n-e),v=(r+a)/(r-a);let E,w;if(d===zi)E=-(u+c)/(u-c),w=-2*u*c/(u-c);else if(d===wl)E=-u/(u-c),w=-u*c/(u-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return h[0]=g,h[4]=0,h[8]=S,h[12]=0,h[1]=0,h[5]=_,h[9]=v,h[13]=0,h[2]=0,h[6]=0,h[10]=E,h[14]=w,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,n,r,a,c,u,d=zi){const h=this.elements,g=1/(n-e),_=1/(r-a),S=1/(u-c),v=(n+e)*g,E=(r+a)*_;let w,C;if(d===zi)w=(u+c)*S,C=-2*S;else if(d===wl)w=c*S,C=-1*S;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return h[0]=2*g,h[4]=0,h[8]=0,h[12]=-v,h[1]=0,h[5]=2*_,h[9]=0,h[13]=-E,h[2]=0,h[6]=0,h[10]=C,h[14]=-w,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const n=this.elements,r=e.elements;for(let a=0;a<16;a++)if(n[a]!==r[a])return!1;return!0}fromArray(e,n=0){for(let r=0;r<16;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e[n+9]=r[9],e[n+10]=r[10],e[n+11]=r[11],e[n+12]=r[12],e[n+13]=r[13],e[n+14]=r[14],e[n+15]=r[15],e}}const ws=new le,ri=new qt,rv=new le(0,0,0),sv=new le(1,1,1),pr=new le,el=new le,zn=new le,Op=new qt,zp=new Fo;class Vi{constructor(e=0,n=0,r=0,a=Vi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,r,a=this._order){return this._x=e,this._y=n,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,r=!0){const a=e.elements,c=a[0],u=a[4],d=a[8],h=a[1],g=a[5],_=a[9],S=a[2],v=a[6],E=a[10];switch(n){case"XYZ":this._y=Math.asin(St(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-_,E),this._z=Math.atan2(-u,c)):(this._x=Math.atan2(v,g),this._z=0);break;case"YXZ":this._x=Math.asin(-St(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(d,E),this._z=Math.atan2(h,g)):(this._y=Math.atan2(-S,c),this._z=0);break;case"ZXY":this._x=Math.asin(St(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-S,E),this._z=Math.atan2(-u,g)):(this._y=0,this._z=Math.atan2(h,c));break;case"ZYX":this._y=Math.asin(-St(S,-1,1)),Math.abs(S)<.9999999?(this._x=Math.atan2(v,E),this._z=Math.atan2(h,c)):(this._x=0,this._z=Math.atan2(-u,g));break;case"YZX":this._z=Math.asin(St(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-_,g),this._y=Math.atan2(-S,c)):(this._x=0,this._y=Math.atan2(d,E));break;case"XZY":this._z=Math.asin(-St(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(v,g),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-_,E),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,r){return Op.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Op,n,r)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return zp.setFromEuler(this),this.setFromQuaternion(zp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vi.DEFAULT_ORDER="XYZ";class $m{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ov=0;const Bp=new le,bs=new Fo,Ii=new qt,tl=new le,Po=new le,av=new le,lv=new Fo,Hp=new le(1,0,0),Vp=new le(0,1,0),jp=new le(0,0,1),Gp={type:"added"},cv={type:"removed"},As={type:"childadded",child:null},Ru={type:"childremoved",child:null};class Dn extends Xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ov++}),this.uuid=Uo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Dn.DEFAULT_UP.clone();const e=new le,n=new Vi,r=new Fo,a=new le(1,1,1);function c(){r.setFromEuler(n,!1)}function u(){n.setFromQuaternion(r,void 0,!1)}n._onChange(c),r._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new qt},normalMatrix:{value:new pt}}),this.matrix=new qt,this.matrixWorld=new qt,this.matrixAutoUpdate=Dn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $m,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return bs.setFromAxisAngle(e,n),this.quaternion.multiply(bs),this}rotateOnWorldAxis(e,n){return bs.setFromAxisAngle(e,n),this.quaternion.premultiply(bs),this}rotateX(e){return this.rotateOnAxis(Hp,e)}rotateY(e){return this.rotateOnAxis(Vp,e)}rotateZ(e){return this.rotateOnAxis(jp,e)}translateOnAxis(e,n){return Bp.copy(e).applyQuaternion(this.quaternion),this.position.add(Bp.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Hp,e)}translateY(e){return this.translateOnAxis(Vp,e)}translateZ(e){return this.translateOnAxis(jp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ii.copy(this.matrixWorld).invert())}lookAt(e,n,r){e.isVector3?tl.copy(e):tl.set(e,n,r);const a=this.parent;this.updateWorldMatrix(!0,!1),Po.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ii.lookAt(Po,tl,this.up):Ii.lookAt(tl,Po,this.up),this.quaternion.setFromRotationMatrix(Ii),a&&(Ii.extractRotation(a.matrixWorld),bs.setFromRotationMatrix(Ii),this.quaternion.premultiply(bs.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Gp),As.child=e,this.dispatchEvent(As),As.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(cv),Ru.child=e,this.dispatchEvent(Ru),Ru.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ii.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ii.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ii),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Gp),As.child=e,this.dispatchEvent(As),As.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let r=0,a=this.children.length;r<a;r++){const u=this.children[r].getObjectByProperty(e,n);if(u!==void 0)return u}}getObjectsByProperty(e,n,r=[]){this[e]===n&&r.push(this);const a=this.children;for(let c=0,u=a.length;c<u;c++)a[c].getObjectsByProperty(e,n,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Po,e,av),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Po,lv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].updateMatrixWorld(e)}updateWorldMatrix(e,n){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const a=this.children;for(let c=0,u=a.length;c<u;c++)a[c].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",r={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function c(d,h){return d[h.uuid]===void 0&&(d[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=c(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const h=d.shapes;if(Array.isArray(h))for(let g=0,_=h.length;g<_;g++){const S=h[g];c(e.shapes,S)}else c(e.shapes,h)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let h=0,g=this.material.length;h<g;h++)d.push(c(e.materials,this.material[h]));a.material=d}else a.material=c(e.materials,this.material);if(this.children.length>0){a.children=[];for(let d=0;d<this.children.length;d++)a.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let d=0;d<this.animations.length;d++){const h=this.animations[d];a.animations.push(c(e.animations,h))}}if(n){const d=u(e.geometries),h=u(e.materials),g=u(e.textures),_=u(e.images),S=u(e.shapes),v=u(e.skeletons),E=u(e.animations),w=u(e.nodes);d.length>0&&(r.geometries=d),h.length>0&&(r.materials=h),g.length>0&&(r.textures=g),_.length>0&&(r.images=_),S.length>0&&(r.shapes=S),v.length>0&&(r.skeletons=v),E.length>0&&(r.animations=E),w.length>0&&(r.nodes=w)}return r.object=a,r;function u(d){const h=[];for(const g in d){const _=d[g];delete _.metadata,h.push(_)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}}Dn.DEFAULT_UP=new le(0,1,0);Dn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const si=new le,Di=new le,Pu=new le,Ui=new le,Cs=new le,Rs=new le,Wp=new le,Lu=new le,Nu=new le,Iu=new le,Du=new Xt,Uu=new Xt,Fu=new Xt;class oi{constructor(e=new le,n=new le,r=new le){this.a=e,this.b=n,this.c=r}static getNormal(e,n,r,a){a.subVectors(r,n),si.subVectors(e,n),a.cross(si);const c=a.lengthSq();return c>0?a.multiplyScalar(1/Math.sqrt(c)):a.set(0,0,0)}static getBarycoord(e,n,r,a,c){si.subVectors(a,n),Di.subVectors(r,n),Pu.subVectors(e,n);const u=si.dot(si),d=si.dot(Di),h=si.dot(Pu),g=Di.dot(Di),_=Di.dot(Pu),S=u*g-d*d;if(S===0)return c.set(0,0,0),null;const v=1/S,E=(g*h-d*_)*v,w=(u*_-d*h)*v;return c.set(1-E-w,w,E)}static containsPoint(e,n,r,a){return this.getBarycoord(e,n,r,a,Ui)===null?!1:Ui.x>=0&&Ui.y>=0&&Ui.x+Ui.y<=1}static getInterpolation(e,n,r,a,c,u,d,h){return this.getBarycoord(e,n,r,a,Ui)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(c,Ui.x),h.addScaledVector(u,Ui.y),h.addScaledVector(d,Ui.z),h)}static getInterpolatedAttribute(e,n,r,a,c,u){return Du.setScalar(0),Uu.setScalar(0),Fu.setScalar(0),Du.fromBufferAttribute(e,n),Uu.fromBufferAttribute(e,r),Fu.fromBufferAttribute(e,a),u.setScalar(0),u.addScaledVector(Du,c.x),u.addScaledVector(Uu,c.y),u.addScaledVector(Fu,c.z),u}static isFrontFacing(e,n,r,a){return si.subVectors(r,n),Di.subVectors(e,n),si.cross(Di).dot(a)<0}set(e,n,r){return this.a.copy(e),this.b.copy(n),this.c.copy(r),this}setFromPointsAndIndices(e,n,r,a){return this.a.copy(e[n]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,r,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return si.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),si.cross(Di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return oi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return oi.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,r,a,c){return oi.getInterpolation(e,this.a,this.b,this.c,n,r,a,c)}containsPoint(e){return oi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return oi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const r=this.a,a=this.b,c=this.c;let u,d;Cs.subVectors(a,r),Rs.subVectors(c,r),Lu.subVectors(e,r);const h=Cs.dot(Lu),g=Rs.dot(Lu);if(h<=0&&g<=0)return n.copy(r);Nu.subVectors(e,a);const _=Cs.dot(Nu),S=Rs.dot(Nu);if(_>=0&&S<=_)return n.copy(a);const v=h*S-_*g;if(v<=0&&h>=0&&_<=0)return u=h/(h-_),n.copy(r).addScaledVector(Cs,u);Iu.subVectors(e,c);const E=Cs.dot(Iu),w=Rs.dot(Iu);if(w>=0&&E<=w)return n.copy(c);const C=E*g-h*w;if(C<=0&&g>=0&&w<=0)return d=g/(g-w),n.copy(r).addScaledVector(Rs,d);const M=_*w-E*S;if(M<=0&&S-_>=0&&E-w>=0)return Wp.subVectors(c,a),d=(S-_)/(S-_+(E-w)),n.copy(a).addScaledVector(Wp,d);const y=1/(M+C+v);return u=C*y,d=v*y,n.copy(r).addScaledVector(Cs,u).addScaledVector(Rs,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Km={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mr={h:0,s:0,l:0},nl={h:0,s:0,l:0};function ku(s,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?s+(e-s)*6*n:n<1/2?e:n<2/3?s+(e-s)*6*(2/3-n):s}class bt{constructor(e,n,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,r)}set(e,n,r){if(n===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Yn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ct.toWorkingColorSpace(this,n),this}setRGB(e,n,r,a=Ct.workingColorSpace){return this.r=e,this.g=n,this.b=r,Ct.toWorkingColorSpace(this,a),this}setHSL(e,n,r,a=Ct.workingColorSpace){if(e=Xx(e,1),n=St(n,0,1),r=St(r,0,1),n===0)this.r=this.g=this.b=r;else{const c=r<=.5?r*(1+n):r+n-r*n,u=2*r-c;this.r=ku(u,c,e+1/3),this.g=ku(u,c,e),this.b=ku(u,c,e-1/3)}return Ct.toWorkingColorSpace(this,a),this}setStyle(e,n=Yn){function r(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const u=a[1],d=a[2];switch(u){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=a[1],u=c.length;if(u===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(u===6)return this.setHex(parseInt(c,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Yn){const r=Km[e.toLowerCase()];return r!==void 0?this.setHex(r,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}copyLinearToSRGB(e){return this.r=Os(e.r),this.g=Os(e.g),this.b=Os(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yn){return Ct.fromWorkingColorSpace(vn.copy(this),e),Math.round(St(vn.r*255,0,255))*65536+Math.round(St(vn.g*255,0,255))*256+Math.round(St(vn.b*255,0,255))}getHexString(e=Yn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Ct.workingColorSpace){Ct.fromWorkingColorSpace(vn.copy(this),n);const r=vn.r,a=vn.g,c=vn.b,u=Math.max(r,a,c),d=Math.min(r,a,c);let h,g;const _=(d+u)/2;if(d===u)h=0,g=0;else{const S=u-d;switch(g=_<=.5?S/(u+d):S/(2-u-d),u){case r:h=(a-c)/S+(a<c?6:0);break;case a:h=(c-r)/S+2;break;case c:h=(r-a)/S+4;break}h/=6}return e.h=h,e.s=g,e.l=_,e}getRGB(e,n=Ct.workingColorSpace){return Ct.fromWorkingColorSpace(vn.copy(this),n),e.r=vn.r,e.g=vn.g,e.b=vn.b,e}getStyle(e=Yn){Ct.fromWorkingColorSpace(vn.copy(this),e);const n=vn.r,r=vn.g,a=vn.b;return e!==Yn?`color(${e} ${n.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,n,r){return this.getHSL(mr),this.setHSL(mr.h+e,mr.s+n,mr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,r){return this.r=e.r+(n.r-e.r)*r,this.g=e.g+(n.g-e.g)*r,this.b=e.b+(n.b-e.b)*r,this}lerpHSL(e,n){this.getHSL(mr),e.getHSL(nl);const r=yu(mr.h,nl.h,n),a=yu(mr.s,nl.s,n),c=yu(mr.l,nl.l,n);return this.setHSL(r,a,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,r=this.g,a=this.b,c=e.elements;return this.r=c[0]*n+c[3]*r+c[6]*a,this.g=c[1]*n+c[4]*r+c[7]*a,this.b=c[2]*n+c[5]*r+c[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const vn=new bt;bt.NAMES=Km;let uv=0;class Oo extends Xs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uv++}),this.uuid=Uo(),this.name="",this.type="Material",this.blending=Fs,this.side=yr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ku,this.blendDst=Zu,this.blendEquation=Gr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new bt(0,0,0),this.blendAlpha=0,this.depthFunc=zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ys,this.stencilZFail=ys,this.stencilZPass=ys,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const r=e[n];if(r===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Fs&&(r.blending=this.blending),this.side!==yr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Ku&&(r.blendSrc=this.blendSrc),this.blendDst!==Zu&&(r.blendDst=this.blendDst),this.blendEquation!==Gr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==zs&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Lp&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ys&&(r.stencilFail=this.stencilFail),this.stencilZFail!==ys&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==ys&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(c){const u=[];for(const d in c){const h=c[d];delete h.metadata,u.push(h)}return u}if(n){const c=a(e.textures),u=a(e.images);c.length>0&&(r.textures=c),u.length>0&&(r.images=u)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let r=null;if(n!==null){const a=n.length;r=new Array(a);for(let c=0;c!==a;++c)r[c]=n[c].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Al extends Oo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vi,this.combine=Nm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const $t=new le,il=new It;let dv=0;class Kn{constructor(e,n,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:dv++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=r,this.usage=Np,this.updateRanges=[],this.gpuType=Oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,r){e*=this.itemSize,r*=n.itemSize;for(let a=0,c=this.itemSize;a<c;a++)this.array[e+a]=n.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,r=this.count;n<r;n++)il.fromBufferAttribute(this,n),il.applyMatrix3(e),this.setXY(n,il.x,il.y);else if(this.itemSize===3)for(let n=0,r=this.count;n<r;n++)$t.fromBufferAttribute(this,n),$t.applyMatrix3(e),this.setXYZ(n,$t.x,$t.y,$t.z);return this}applyMatrix4(e){for(let n=0,r=this.count;n<r;n++)$t.fromBufferAttribute(this,n),$t.applyMatrix4(e),this.setXYZ(n,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let n=0,r=this.count;n<r;n++)$t.fromBufferAttribute(this,n),$t.applyNormalMatrix(e),this.setXYZ(n,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let n=0,r=this.count;n<r;n++)$t.fromBufferAttribute(this,n),$t.transformDirection(e),this.setXYZ(n,$t.x,$t.y,$t.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let r=this.array[e*this.itemSize+n];return this.normalized&&(r=Ao(r,this.array)),r}setComponent(e,n,r){return this.normalized&&(r=Nn(r,this.array)),this.array[e*this.itemSize+n]=r,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Ao(n,this.array)),n}setX(e,n){return this.normalized&&(n=Nn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Ao(n,this.array)),n}setY(e,n){return this.normalized&&(n=Nn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Ao(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Nn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Ao(n,this.array)),n}setW(e,n){return this.normalized&&(n=Nn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,r){return e*=this.itemSize,this.normalized&&(n=Nn(n,this.array),r=Nn(r,this.array)),this.array[e+0]=n,this.array[e+1]=r,this}setXYZ(e,n,r,a){return e*=this.itemSize,this.normalized&&(n=Nn(n,this.array),r=Nn(r,this.array),a=Nn(a,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,n,r,a,c){return e*=this.itemSize,this.normalized&&(n=Nn(n,this.array),r=Nn(r,this.array),a=Nn(a,this.array),c=Nn(c,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Np&&(e.usage=this.usage),e}}class Zm extends Kn{constructor(e,n,r){super(new Uint16Array(e),n,r)}}class Qm extends Kn{constructor(e,n,r){super(new Uint32Array(e),n,r)}}class vi extends Kn{constructor(e,n,r){super(new Float32Array(e),n,r)}}let fv=0;const qn=new qt,Ou=new Dn,Ps=new le,Bn=new ko,Lo=new ko,an=new le;class _i extends Xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fv++}),this.uuid=Uo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wm(e)?Qm:Zm)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,r=0){this.groups.push({start:e,count:n,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const c=new pt().getNormalMatrix(e);r.applyNormalMatrix(c),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qn.makeRotationFromQuaternion(e),this.applyMatrix4(qn),this}rotateX(e){return qn.makeRotationX(e),this.applyMatrix4(qn),this}rotateY(e){return qn.makeRotationY(e),this.applyMatrix4(qn),this}rotateZ(e){return qn.makeRotationZ(e),this.applyMatrix4(qn),this}translate(e,n,r){return qn.makeTranslation(e,n,r),this.applyMatrix4(qn),this}scale(e,n,r){return qn.makeScale(e,n,r),this.applyMatrix4(qn),this}lookAt(e){return Ou.lookAt(e),Ou.updateMatrix(),this.applyMatrix4(Ou.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ps).negate(),this.translate(Ps.x,Ps.y,Ps.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const r=[];for(let a=0,c=e.length;a<c;a++){const u=e[a];r.push(u.x,u.y,u.z||0)}this.setAttribute("position",new vi(r,3))}else{const r=Math.min(e.length,n.count);for(let a=0;a<r;a++){const c=e[a];n.setXYZ(a,c.x,c.y,c.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ko);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new le(-1/0,-1/0,-1/0),new le(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let r=0,a=n.length;r<a;r++){const c=n[r];Bn.setFromBufferAttribute(c),this.morphTargetsRelative?(an.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(an),an.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(an)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ll);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new le,1/0);return}if(e){const r=this.boundingSphere.center;if(Bn.setFromBufferAttribute(e),n)for(let c=0,u=n.length;c<u;c++){const d=n[c];Lo.setFromBufferAttribute(d),this.morphTargetsRelative?(an.addVectors(Bn.min,Lo.min),Bn.expandByPoint(an),an.addVectors(Bn.max,Lo.max),Bn.expandByPoint(an)):(Bn.expandByPoint(Lo.min),Bn.expandByPoint(Lo.max))}Bn.getCenter(r);let a=0;for(let c=0,u=e.count;c<u;c++)an.fromBufferAttribute(e,c),a=Math.max(a,r.distanceToSquared(an));if(n)for(let c=0,u=n.length;c<u;c++){const d=n[c],h=this.morphTargetsRelative;for(let g=0,_=d.count;g<_;g++)an.fromBufferAttribute(d,g),h&&(Ps.fromBufferAttribute(e,g),an.add(Ps)),a=Math.max(a,r.distanceToSquared(an))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=n.position,a=n.normal,c=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Kn(new Float32Array(4*r.count),4));const u=this.getAttribute("tangent"),d=[],h=[];for(let X=0;X<r.count;X++)d[X]=new le,h[X]=new le;const g=new le,_=new le,S=new le,v=new It,E=new It,w=new It,C=new le,M=new le;function y(X,P,R){g.fromBufferAttribute(r,X),_.fromBufferAttribute(r,P),S.fromBufferAttribute(r,R),v.fromBufferAttribute(c,X),E.fromBufferAttribute(c,P),w.fromBufferAttribute(c,R),_.sub(g),S.sub(g),E.sub(v),w.sub(v);const j=1/(E.x*w.y-w.x*E.y);isFinite(j)&&(C.copy(_).multiplyScalar(w.y).addScaledVector(S,-E.y).multiplyScalar(j),M.copy(S).multiplyScalar(E.x).addScaledVector(_,-w.x).multiplyScalar(j),d[X].add(C),d[P].add(C),d[R].add(C),h[X].add(M),h[P].add(M),h[R].add(M))}let O=this.groups;O.length===0&&(O=[{start:0,count:e.count}]);for(let X=0,P=O.length;X<P;++X){const R=O[X],j=R.start,he=R.count;for(let ne=j,pe=j+he;ne<pe;ne+=3)y(e.getX(ne+0),e.getX(ne+1),e.getX(ne+2))}const U=new le,L=new le,Y=new le,z=new le;function k(X){Y.fromBufferAttribute(a,X),z.copy(Y);const P=d[X];U.copy(P),U.sub(Y.multiplyScalar(Y.dot(P))).normalize(),L.crossVectors(z,P);const j=L.dot(h[X])<0?-1:1;u.setXYZW(X,U.x,U.y,U.z,j)}for(let X=0,P=O.length;X<P;++X){const R=O[X],j=R.start,he=R.count;for(let ne=j,pe=j+he;ne<pe;ne+=3)k(e.getX(ne+0)),k(e.getX(ne+1)),k(e.getX(ne+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Kn(new Float32Array(n.count*3),3),this.setAttribute("normal",r);else for(let v=0,E=r.count;v<E;v++)r.setXYZ(v,0,0,0);const a=new le,c=new le,u=new le,d=new le,h=new le,g=new le,_=new le,S=new le;if(e)for(let v=0,E=e.count;v<E;v+=3){const w=e.getX(v+0),C=e.getX(v+1),M=e.getX(v+2);a.fromBufferAttribute(n,w),c.fromBufferAttribute(n,C),u.fromBufferAttribute(n,M),_.subVectors(u,c),S.subVectors(a,c),_.cross(S),d.fromBufferAttribute(r,w),h.fromBufferAttribute(r,C),g.fromBufferAttribute(r,M),d.add(_),h.add(_),g.add(_),r.setXYZ(w,d.x,d.y,d.z),r.setXYZ(C,h.x,h.y,h.z),r.setXYZ(M,g.x,g.y,g.z)}else for(let v=0,E=n.count;v<E;v+=3)a.fromBufferAttribute(n,v+0),c.fromBufferAttribute(n,v+1),u.fromBufferAttribute(n,v+2),_.subVectors(u,c),S.subVectors(a,c),_.cross(S),r.setXYZ(v+0,_.x,_.y,_.z),r.setXYZ(v+1,_.x,_.y,_.z),r.setXYZ(v+2,_.x,_.y,_.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,r=e.count;n<r;n++)an.fromBufferAttribute(e,n),an.normalize(),e.setXYZ(n,an.x,an.y,an.z)}toNonIndexed(){function e(d,h){const g=d.array,_=d.itemSize,S=d.normalized,v=new g.constructor(h.length*_);let E=0,w=0;for(let C=0,M=h.length;C<M;C++){d.isInterleavedBufferAttribute?E=h[C]*d.data.stride+d.offset:E=h[C]*_;for(let y=0;y<_;y++)v[w++]=g[E++]}return new Kn(v,_,S)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new _i,r=this.index.array,a=this.attributes;for(const d in a){const h=a[d],g=e(h,r);n.setAttribute(d,g)}const c=this.morphAttributes;for(const d in c){const h=[],g=c[d];for(let _=0,S=g.length;_<S;_++){const v=g[_],E=e(v,r);h.push(E)}n.morphAttributes[d]=h}n.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let d=0,h=u.length;d<h;d++){const g=u[d];n.addGroup(g.start,g.count,g.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const g in h)h[g]!==void 0&&(e[g]=h[g]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const r=this.attributes;for(const h in r){const g=r[h];e.data.attributes[h]=g.toJSON(e.data)}const a={};let c=!1;for(const h in this.morphAttributes){const g=this.morphAttributes[h],_=[];for(let S=0,v=g.length;S<v;S++){const E=g[S];_.push(E.toJSON(e.data))}_.length>0&&(a[h]=_,c=!0)}c&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(n));const a=e.attributes;for(const g in a){const _=a[g];this.setAttribute(g,_.clone(n))}const c=e.morphAttributes;for(const g in c){const _=[],S=c[g];for(let v=0,E=S.length;v<E;v++)_.push(S[v].clone(n));this.morphAttributes[g]=_}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let g=0,_=u.length;g<_;g++){const S=u[g];this.addGroup(S.start,S.count,S.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Xp=new qt,Or=new Ym,rl=new Ll,qp=new le,sl=new le,ol=new le,al=new le,zu=new le,ll=new le,Yp=new le,cl=new le;class li extends Dn{constructor(e=new _i,n=new Al){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const a=n[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=a.length;c<u;c++){const d=a[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(e,n){const r=this.geometry,a=r.attributes.position,c=r.morphAttributes.position,u=r.morphTargetsRelative;n.fromBufferAttribute(a,e);const d=this.morphTargetInfluences;if(c&&d){ll.set(0,0,0);for(let h=0,g=c.length;h<g;h++){const _=d[h],S=c[h];_!==0&&(zu.fromBufferAttribute(S,e),u?ll.addScaledVector(zu,_):ll.addScaledVector(zu.sub(n),_))}n.add(ll)}return n}raycast(e,n){const r=this.geometry,a=this.material,c=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),rl.copy(r.boundingSphere),rl.applyMatrix4(c),Or.copy(e.ray).recast(e.near),!(rl.containsPoint(Or.origin)===!1&&(Or.intersectSphere(rl,qp)===null||Or.origin.distanceToSquared(qp)>(e.far-e.near)**2))&&(Xp.copy(c).invert(),Or.copy(e.ray).applyMatrix4(Xp),!(r.boundingBox!==null&&Or.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,n,Or)))}_computeIntersections(e,n,r){let a;const c=this.geometry,u=this.material,d=c.index,h=c.attributes.position,g=c.attributes.uv,_=c.attributes.uv1,S=c.attributes.normal,v=c.groups,E=c.drawRange;if(d!==null)if(Array.isArray(u))for(let w=0,C=v.length;w<C;w++){const M=v[w],y=u[M.materialIndex],O=Math.max(M.start,E.start),U=Math.min(d.count,Math.min(M.start+M.count,E.start+E.count));for(let L=O,Y=U;L<Y;L+=3){const z=d.getX(L),k=d.getX(L+1),X=d.getX(L+2);a=ul(this,y,e,r,g,_,S,z,k,X),a&&(a.faceIndex=Math.floor(L/3),a.face.materialIndex=M.materialIndex,n.push(a))}}else{const w=Math.max(0,E.start),C=Math.min(d.count,E.start+E.count);for(let M=w,y=C;M<y;M+=3){const O=d.getX(M),U=d.getX(M+1),L=d.getX(M+2);a=ul(this,u,e,r,g,_,S,O,U,L),a&&(a.faceIndex=Math.floor(M/3),n.push(a))}}else if(h!==void 0)if(Array.isArray(u))for(let w=0,C=v.length;w<C;w++){const M=v[w],y=u[M.materialIndex],O=Math.max(M.start,E.start),U=Math.min(h.count,Math.min(M.start+M.count,E.start+E.count));for(let L=O,Y=U;L<Y;L+=3){const z=L,k=L+1,X=L+2;a=ul(this,y,e,r,g,_,S,z,k,X),a&&(a.faceIndex=Math.floor(L/3),a.face.materialIndex=M.materialIndex,n.push(a))}}else{const w=Math.max(0,E.start),C=Math.min(h.count,E.start+E.count);for(let M=w,y=C;M<y;M+=3){const O=M,U=M+1,L=M+2;a=ul(this,u,e,r,g,_,S,O,U,L),a&&(a.faceIndex=Math.floor(M/3),n.push(a))}}}}function hv(s,e,n,r,a,c,u,d){let h;if(e.side===In?h=r.intersectTriangle(u,c,a,!0,d):h=r.intersectTriangle(a,c,u,e.side===yr,d),h===null)return null;cl.copy(d),cl.applyMatrix4(s.matrixWorld);const g=n.ray.origin.distanceTo(cl);return g<n.near||g>n.far?null:{distance:g,point:cl.clone(),object:s}}function ul(s,e,n,r,a,c,u,d,h,g){s.getVertexPosition(d,sl),s.getVertexPosition(h,ol),s.getVertexPosition(g,al);const _=hv(s,e,n,r,sl,ol,al,Yp);if(_){const S=new le;oi.getBarycoord(Yp,sl,ol,al,S),a&&(_.uv=oi.getInterpolatedAttribute(a,d,h,g,S,new It)),c&&(_.uv1=oi.getInterpolatedAttribute(c,d,h,g,S,new It)),u&&(_.normal=oi.getInterpolatedAttribute(u,d,h,g,S,new le),_.normal.dot(r.direction)>0&&_.normal.multiplyScalar(-1));const v={a:d,b:h,c:g,normal:new le,materialIndex:0};oi.getNormal(sl,ol,al,v.normal),_.face=v,_.barycoord=S}return _}class zo extends _i{constructor(e=1,n=1,r=1,a=1,c=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:r,widthSegments:a,heightSegments:c,depthSegments:u};const d=this;a=Math.floor(a),c=Math.floor(c),u=Math.floor(u);const h=[],g=[],_=[],S=[];let v=0,E=0;w("z","y","x",-1,-1,r,n,e,u,c,0),w("z","y","x",1,-1,r,n,-e,u,c,1),w("x","z","y",1,1,e,r,n,a,u,2),w("x","z","y",1,-1,e,r,-n,a,u,3),w("x","y","z",1,-1,e,n,r,a,c,4),w("x","y","z",-1,-1,e,n,-r,a,c,5),this.setIndex(h),this.setAttribute("position",new vi(g,3)),this.setAttribute("normal",new vi(_,3)),this.setAttribute("uv",new vi(S,2));function w(C,M,y,O,U,L,Y,z,k,X,P){const R=L/k,j=Y/X,he=L/2,ne=Y/2,pe=z/2,me=k+1,de=X+1;let ae=0,G=0;const fe=new le;for(let N=0;N<de;N++){const x=N*j-ne;for(let B=0;B<me;B++){const oe=B*R-he;fe[C]=oe*O,fe[M]=x*U,fe[y]=pe,g.push(fe.x,fe.y,fe.z),fe[C]=0,fe[M]=0,fe[y]=z>0?1:-1,_.push(fe.x,fe.y,fe.z),S.push(B/k),S.push(1-N/X),ae+=1}}for(let N=0;N<X;N++)for(let x=0;x<k;x++){const B=v+x+me*N,oe=v+x+me*(N+1),V=v+(x+1)+me*(N+1),J=v+(x+1)+me*N;h.push(B,oe,J),h.push(oe,V,J),G+=6}d.addGroup(E,G,P),E+=G,v+=ae}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ws(s){const e={};for(const n in s){e[n]={};for(const r in s[n]){const a=s[n][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][r]=null):e[n][r]=a.clone():Array.isArray(a)?e[n][r]=a.slice():e[n][r]=a}}return e}function En(s){const e={};for(let n=0;n<s.length;n++){const r=Ws(s[n]);for(const a in r)e[a]=r[a]}return e}function pv(s){const e=[];for(let n=0;n<s.length;n++)e.push(s[n].clone());return e}function Jm(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ct.workingColorSpace}const mv={clone:Ws,merge:En};var gv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Sr extends Oo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gv,this.fragmentShader=xv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ws(e.uniforms),this.uniformsGroups=pv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const u=this.uniforms[a].value;u&&u.isTexture?n.uniforms[a]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?n.uniforms[a]={type:"c",value:u.getHex()}:u&&u.isVector2?n.uniforms[a]={type:"v2",value:u.toArray()}:u&&u.isVector3?n.uniforms[a]={type:"v3",value:u.toArray()}:u&&u.isVector4?n.uniforms[a]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?n.uniforms[a]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?n.uniforms[a]={type:"m4",value:u.toArray()}:n.uniforms[a]={value:u}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(n.extensions=r),n}}class eg extends Dn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qt,this.projectionMatrix=new qt,this.projectionMatrixInverse=new qt,this.coordinateSystem=zi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const gr=new le,$p=new It,Kp=new It;class $n extends eg{constructor(e=50,n=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Ud*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(_u*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ud*2*Math.atan(Math.tan(_u*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,r){gr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(gr.x,gr.y).multiplyScalar(-e/gr.z),gr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(gr.x,gr.y).multiplyScalar(-e/gr.z)}getViewSize(e,n){return this.getViewBounds(e,$p,Kp),n.subVectors(Kp,$p)}setViewOffset(e,n,r,a,c,u){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(_u*.5*this.fov)/this.zoom,r=2*n,a=this.aspect*r,c=-.5*a;const u=this.view;if(this.view!==null&&this.view.enabled){const h=u.fullWidth,g=u.fullHeight;c+=u.offsetX*a/h,n-=u.offsetY*r/g,a*=u.width/h,r*=u.height/g}const d=this.filmOffset;d!==0&&(c+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+a,n,n-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Ls=-90,Ns=1;class vv extends Dn{constructor(e,n,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new $n(Ls,Ns,e,n);a.layers=this.layers,this.add(a);const c=new $n(Ls,Ns,e,n);c.layers=this.layers,this.add(c);const u=new $n(Ls,Ns,e,n);u.layers=this.layers,this.add(u);const d=new $n(Ls,Ns,e,n);d.layers=this.layers,this.add(d);const h=new $n(Ls,Ns,e,n);h.layers=this.layers,this.add(h);const g=new $n(Ls,Ns,e,n);g.layers=this.layers,this.add(g)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[r,a,c,u,d,h]=n;for(const g of n)this.remove(g);if(e===zi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===wl)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const g of n)this.add(g),g.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,u,d,h,g,_]=this.children,S=e.getRenderTarget(),v=e.getActiveCubeFace(),E=e.getActiveMipmapLevel(),w=e.xr.enabled;e.xr.enabled=!1;const C=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,a),e.render(n,c),e.setRenderTarget(r,1,a),e.render(n,u),e.setRenderTarget(r,2,a),e.render(n,d),e.setRenderTarget(r,3,a),e.render(n,h),e.setRenderTarget(r,4,a),e.render(n,g),r.texture.generateMipmaps=C,e.setRenderTarget(r,5,a),e.render(n,_),e.setRenderTarget(S,v,E),e.xr.enabled=w,r.texture.needsPMREMUpdate=!0}}class tg extends Tn{constructor(e,n,r,a,c,u,d,h,g,_){e=e!==void 0?e:[],n=n!==void 0?n:Bs,super(e,n,r,a,c,u,d,h,g,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _v extends $r{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new tg(a,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:xi}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new zo(5,5,5),c=new Sr({name:"CubemapFromEquirect",uniforms:Ws(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:In,blending:vr});c.uniforms.tEquirect.value=n;const u=new li(a,c),d=n.minFilter;return n.minFilter===qr&&(n.minFilter=xi),new vv(1,10,this).update(e,u),n.minFilter=d,u.geometry.dispose(),u.material.dispose(),this}clear(e,n,r,a){const c=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(n,r,a);e.setRenderTarget(c)}}class dl extends Dn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yv={type:"move"};class Bu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new le,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new le),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new le,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new le),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const r of e.hand.values())this._getHandJoint(n,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,r){let a=null,c=null,u=null;const d=this._targetRay,h=this._grip,g=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(g&&e.hand){u=!0;for(const C of e.hand.values()){const M=n.getJointPose(C,r),y=this._getHandJoint(g,C);M!==null&&(y.matrix.fromArray(M.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=M.radius),y.visible=M!==null}const _=g.joints["index-finger-tip"],S=g.joints["thumb-tip"],v=_.position.distanceTo(S.position),E=.02,w=.005;g.inputState.pinching&&v>E+w?(g.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!g.inputState.pinching&&v<=E-w&&(g.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(c=n.getPose(e.gripSpace,r),c!==null&&(h.matrix.fromArray(c.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,c.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(c.linearVelocity)):h.hasLinearVelocity=!1,c.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(c.angularVelocity)):h.hasAngularVelocity=!1));d!==null&&(a=n.getPose(e.targetRaySpace,r),a===null&&c!==null&&(a=c),a!==null&&(d.matrix.fromArray(a.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,a.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(a.linearVelocity)):d.hasLinearVelocity=!1,a.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(a.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(yv)))}return d!==null&&(d.visible=a!==null),h!==null&&(h.visible=c!==null),g!==null&&(g.visible=u!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const r=new dl;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[n.jointName]=r,e.add(r)}return e.joints[n.jointName]}}class Xd{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new bt(e),this.density=n}clone(){return new Xd(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Sv extends Dn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vi,this.environmentIntensity=1,this.environmentRotation=new Vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Hu=new le,Mv=new le,Ev=new pt;class Vr{constructor(e=new le(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,r,a){return this.normal.set(e,n,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,r){const a=Hu.subVectors(r,n).cross(Mv.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const r=e.delta(Hu),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const c=-(e.start.dot(this.normal)+this.constant)/a;return c<0||c>1?null:n.copy(e.start).addScaledVector(r,c)}intersectsLine(e){const n=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return n<0&&r>0||r<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const r=n||Ev.getNormalMatrix(e),a=this.coplanarPoint(Hu).applyMatrix4(e),c=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zr=new Ll,fl=new le;class ng{constructor(e=new Vr,n=new Vr,r=new Vr,a=new Vr,c=new Vr,u=new Vr){this.planes=[e,n,r,a,c,u]}set(e,n,r,a,c,u){const d=this.planes;return d[0].copy(e),d[1].copy(n),d[2].copy(r),d[3].copy(a),d[4].copy(c),d[5].copy(u),this}copy(e){const n=this.planes;for(let r=0;r<6;r++)n[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,n=zi){const r=this.planes,a=e.elements,c=a[0],u=a[1],d=a[2],h=a[3],g=a[4],_=a[5],S=a[6],v=a[7],E=a[8],w=a[9],C=a[10],M=a[11],y=a[12],O=a[13],U=a[14],L=a[15];if(r[0].setComponents(h-c,v-g,M-E,L-y).normalize(),r[1].setComponents(h+c,v+g,M+E,L+y).normalize(),r[2].setComponents(h+u,v+_,M+w,L+O).normalize(),r[3].setComponents(h-u,v-_,M-w,L-O).normalize(),r[4].setComponents(h-d,v-S,M-C,L-U).normalize(),n===zi)r[5].setComponents(h+d,v+S,M+C,L+U).normalize();else if(n===wl)r[5].setComponents(d,S,C,U).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zr)}intersectsSprite(e){return zr.center.set(0,0,0),zr.radius=.7071067811865476,zr.applyMatrix4(e.matrixWorld),this.intersectsSphere(zr)}intersectsSphere(e){const n=this.planes,r=e.center,a=-e.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let r=0;r<6;r++){const a=n[r];if(fl.x=a.normal.x>0?e.max.x:e.min.x,fl.y=a.normal.y>0?e.max.y:e.min.y,fl.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(fl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let r=0;r<6;r++)if(n[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ig extends Oo{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new bt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Zp=new qt,Fd=new Ym,hl=new Ll,pl=new le;class Tv extends Dn{constructor(e=new _i,n=new ig){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const r=this.geometry,a=this.matrixWorld,c=e.params.Points.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),hl.copy(r.boundingSphere),hl.applyMatrix4(a),hl.radius+=c,e.ray.intersectsSphere(hl)===!1)return;Zp.copy(a).invert(),Fd.copy(e.ray).applyMatrix4(Zp);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),h=d*d,g=r.index,S=r.attributes.position;if(g!==null){const v=Math.max(0,u.start),E=Math.min(g.count,u.start+u.count);for(let w=v,C=E;w<C;w++){const M=g.getX(w);pl.fromBufferAttribute(S,M),Qp(pl,M,h,a,e,n,this)}}else{const v=Math.max(0,u.start),E=Math.min(S.count,u.start+u.count);for(let w=v,C=E;w<C;w++)pl.fromBufferAttribute(S,w),Qp(pl,w,h,a,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const a=n[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,u=a.length;c<u;c++){const d=a[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Qp(s,e,n,r,a,c,u){const d=Fd.distanceSqToPoint(s);if(d<n){const h=new le;Fd.closestPointToPoint(s,h),h.applyMatrix4(r);const g=a.ray.origin.distanceTo(h);if(g<a.near||g>a.far)return;c.push({distance:g,distanceToRay:Math.sqrt(d),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:u})}}class wv extends Tn{constructor(e,n,r,a,c,u,d,h,g){super(e,n,r,a,c,u,d,h,g),this.isCanvasTexture=!0,this.needsUpdate=!0}}class rg extends Tn{constructor(e,n,r,a,c,u,d,h,g,_=ks){if(_!==ks&&_!==js)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&_===ks&&(r=Yr),r===void 0&&_===js&&(r=Vs),super(null,a,c,u,d,h,_,r,g),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=d!==void 0?d:ci,this.minFilter=h!==void 0?h:ci,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class Nl extends _i{constructor(e=1,n=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:r,heightSegments:a};const c=e/2,u=n/2,d=Math.floor(r),h=Math.floor(a),g=d+1,_=h+1,S=e/d,v=n/h,E=[],w=[],C=[],M=[];for(let y=0;y<_;y++){const O=y*v-u;for(let U=0;U<g;U++){const L=U*S-c;w.push(L,-O,0),C.push(0,0,1),M.push(U/d),M.push(1-y/h)}}for(let y=0;y<h;y++)for(let O=0;O<d;O++){const U=O+g*y,L=O+g*(y+1),Y=O+1+g*(y+1),z=O+1+g*y;E.push(U,L,z),E.push(L,Y,z)}this.setIndex(E),this.setAttribute("position",new vi(w,3)),this.setAttribute("normal",new vi(C,3)),this.setAttribute("uv",new vi(M,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nl(e.width,e.height,e.widthSegments,e.heightSegments)}}class Cl extends _i{constructor(e=1,n=.4,r=12,a=48,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:r,tubularSegments:a,arc:c},r=Math.floor(r),a=Math.floor(a);const u=[],d=[],h=[],g=[],_=new le,S=new le,v=new le;for(let E=0;E<=r;E++)for(let w=0;w<=a;w++){const C=w/a*c,M=E/r*Math.PI*2;S.x=(e+n*Math.cos(M))*Math.cos(C),S.y=(e+n*Math.cos(M))*Math.sin(C),S.z=n*Math.sin(M),d.push(S.x,S.y,S.z),_.x=e*Math.cos(C),_.y=e*Math.sin(C),v.subVectors(S,_).normalize(),h.push(v.x,v.y,v.z),g.push(w/a),g.push(E/r)}for(let E=1;E<=r;E++)for(let w=1;w<=a;w++){const C=(a+1)*E+w-1,M=(a+1)*(E-1)+w-1,y=(a+1)*(E-1)+w,O=(a+1)*E+w;u.push(C,M,O),u.push(M,y,O)}this.setIndex(u),this.setAttribute("position",new vi(d,3)),this.setAttribute("normal",new vi(h,3)),this.setAttribute("uv",new vi(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cl(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class bv extends Oo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ux,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Av extends Oo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Cv extends eg{constructor(e=-1,n=1,r=1,a=-1,c=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=r,this.bottom=a,this.near=c,this.far=u,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,r,a,c,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=a,this.view.width=c,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let c=r-e,u=r+e,d=a+n,h=a-n;if(this.view!==null&&this.view.enabled){const g=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=g*this.view.offsetX,u=c+g*this.view.width,d-=_*this.view.offsetY,h=d-_*this.view.height}this.projectionMatrix.makeOrthographic(c,u,d,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class Rv extends $n{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class Pv{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Jp(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=Jp();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function Jp(){return performance.now()}function em(s,e,n,r){const a=Lv(r);switch(n){case km:return s*e;case zm:return s*e;case Bm:return s*e*2;case Hm:return s*e/a.components*a.byteLength;case jd:return s*e/a.components*a.byteLength;case Vm:return s*e*2/a.components*a.byteLength;case Gd:return s*e*2/a.components*a.byteLength;case Om:return s*e*3/a.components*a.byteLength;case ai:return s*e*4/a.components*a.byteLength;case Wd:return s*e*4/a.components*a.byteLength;case vl:case _l:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case yl:case Sl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ud:case fd:return Math.max(s,16)*Math.max(e,8)/4;case cd:case dd:return Math.max(s,8)*Math.max(e,8)/2;case hd:case pd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case md:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case gd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case xd:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case vd:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case _d:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case yd:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Sd:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Md:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Ed:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Td:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case wd:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case bd:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Ad:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Cd:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Rd:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ml:case Pd:case Ld:return Math.ceil(s/4)*Math.ceil(e/4)*16;case jm:case Nd:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Id:case Dd:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Lv(s){switch(s){case Hi:case Dm:return{byteLength:1,components:1};case Io:case Um:case Do:return{byteLength:2,components:1};case Hd:case Vd:return{byteLength:2,components:4};case Yr:case Bd:case Oi:return{byteLength:4,components:1};case Fm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zd);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function sg(){let s=null,e=!1,n=null,r=null;function a(c,u){n(c,u),r=s.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&(r=s.requestAnimationFrame(a),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(c){n=c},setContext:function(c){s=c}}}function Nv(s){const e=new WeakMap;function n(d,h){const g=d.array,_=d.usage,S=g.byteLength,v=s.createBuffer();s.bindBuffer(h,v),s.bufferData(h,g,_),d.onUploadCallback();let E;if(g instanceof Float32Array)E=s.FLOAT;else if(g instanceof Uint16Array)d.isFloat16BufferAttribute?E=s.HALF_FLOAT:E=s.UNSIGNED_SHORT;else if(g instanceof Int16Array)E=s.SHORT;else if(g instanceof Uint32Array)E=s.UNSIGNED_INT;else if(g instanceof Int32Array)E=s.INT;else if(g instanceof Int8Array)E=s.BYTE;else if(g instanceof Uint8Array)E=s.UNSIGNED_BYTE;else if(g instanceof Uint8ClampedArray)E=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+g);return{buffer:v,type:E,bytesPerElement:g.BYTES_PER_ELEMENT,version:d.version,size:S}}function r(d,h,g){const _=h.array,S=h.updateRanges;if(s.bindBuffer(g,d),S.length===0)s.bufferSubData(g,0,_);else{S.sort((E,w)=>E.start-w.start);let v=0;for(let E=1;E<S.length;E++){const w=S[v],C=S[E];C.start<=w.start+w.count+1?w.count=Math.max(w.count,C.start+C.count-w.start):(++v,S[v]=C)}S.length=v+1;for(let E=0,w=S.length;E<w;E++){const C=S[E];s.bufferSubData(g,C.start*_.BYTES_PER_ELEMENT,_,C.start,C.count)}h.clearUpdateRanges()}h.onUploadCallback()}function a(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const h=e.get(d);h&&(s.deleteBuffer(h.buffer),e.delete(d))}function u(d,h){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const _=e.get(d);(!_||_.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const g=e.get(d);if(g===void 0)e.set(d,n(d,h));else if(g.version<d.version){if(g.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(g.buffer,d,h),g.version=d.version}}return{get:a,remove:c,update:u}}var Iv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Uv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ov=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Bv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Vv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Xv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Yv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$v=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Kv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Jv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,e_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,t_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,n_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,i_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,r_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,s_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,o_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,a_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,l_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,c_="gl_FragColor = linearToOutputTexel( gl_FragColor );",u_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,d_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,f_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,h_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,p_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,m_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,g_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,x_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,v_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,__=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,y_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,S_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,M_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,E_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,T_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,w_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,b_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,A_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,C_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,R_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,P_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,L_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,N_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,I_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,D_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,U_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,F_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,O_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,z_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,B_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,H_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,V_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,j_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,G_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,W_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,X_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,q_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Y_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,K_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Z_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Q_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,J_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ey=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ty=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ny=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,iy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ry=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,oy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ay=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ly=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,uy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,py=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,my=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,gy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,xy=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,vy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_y=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,yy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sy=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,My=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ey=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ty=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wy=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,by=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ay=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Cy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ry=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Py=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ly=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ny=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Iy=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ky=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Oy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,By=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Hy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Vy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Wy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,qy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$y=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ky=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Zy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Jy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,e1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,i1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,a1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,l1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,c1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,u1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,d1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,mt={alphahash_fragment:Iv,alphahash_pars_fragment:Dv,alphamap_fragment:Uv,alphamap_pars_fragment:Fv,alphatest_fragment:kv,alphatest_pars_fragment:Ov,aomap_fragment:zv,aomap_pars_fragment:Bv,batching_pars_vertex:Hv,batching_vertex:Vv,begin_vertex:jv,beginnormal_vertex:Gv,bsdfs:Wv,iridescence_fragment:Xv,bumpmap_pars_fragment:qv,clipping_planes_fragment:Yv,clipping_planes_pars_fragment:$v,clipping_planes_pars_vertex:Kv,clipping_planes_vertex:Zv,color_fragment:Qv,color_pars_fragment:Jv,color_pars_vertex:e_,color_vertex:t_,common:n_,cube_uv_reflection_fragment:i_,defaultnormal_vertex:r_,displacementmap_pars_vertex:s_,displacementmap_vertex:o_,emissivemap_fragment:a_,emissivemap_pars_fragment:l_,colorspace_fragment:c_,colorspace_pars_fragment:u_,envmap_fragment:d_,envmap_common_pars_fragment:f_,envmap_pars_fragment:h_,envmap_pars_vertex:p_,envmap_physical_pars_fragment:w_,envmap_vertex:m_,fog_vertex:g_,fog_pars_vertex:x_,fog_fragment:v_,fog_pars_fragment:__,gradientmap_pars_fragment:y_,lightmap_pars_fragment:S_,lights_lambert_fragment:M_,lights_lambert_pars_fragment:E_,lights_pars_begin:T_,lights_toon_fragment:b_,lights_toon_pars_fragment:A_,lights_phong_fragment:C_,lights_phong_pars_fragment:R_,lights_physical_fragment:P_,lights_physical_pars_fragment:L_,lights_fragment_begin:N_,lights_fragment_maps:I_,lights_fragment_end:D_,logdepthbuf_fragment:U_,logdepthbuf_pars_fragment:F_,logdepthbuf_pars_vertex:k_,logdepthbuf_vertex:O_,map_fragment:z_,map_pars_fragment:B_,map_particle_fragment:H_,map_particle_pars_fragment:V_,metalnessmap_fragment:j_,metalnessmap_pars_fragment:G_,morphinstance_vertex:W_,morphcolor_vertex:X_,morphnormal_vertex:q_,morphtarget_pars_vertex:Y_,morphtarget_vertex:$_,normal_fragment_begin:K_,normal_fragment_maps:Z_,normal_pars_fragment:Q_,normal_pars_vertex:J_,normal_vertex:ey,normalmap_pars_fragment:ty,clearcoat_normal_fragment_begin:ny,clearcoat_normal_fragment_maps:iy,clearcoat_pars_fragment:ry,iridescence_pars_fragment:sy,opaque_fragment:oy,packing:ay,premultiplied_alpha_fragment:ly,project_vertex:cy,dithering_fragment:uy,dithering_pars_fragment:dy,roughnessmap_fragment:fy,roughnessmap_pars_fragment:hy,shadowmap_pars_fragment:py,shadowmap_pars_vertex:my,shadowmap_vertex:gy,shadowmask_pars_fragment:xy,skinbase_vertex:vy,skinning_pars_vertex:_y,skinning_vertex:yy,skinnormal_vertex:Sy,specularmap_fragment:My,specularmap_pars_fragment:Ey,tonemapping_fragment:Ty,tonemapping_pars_fragment:wy,transmission_fragment:by,transmission_pars_fragment:Ay,uv_pars_fragment:Cy,uv_pars_vertex:Ry,uv_vertex:Py,worldpos_vertex:Ly,background_vert:Ny,background_frag:Iy,backgroundCube_vert:Dy,backgroundCube_frag:Uy,cube_vert:Fy,cube_frag:ky,depth_vert:Oy,depth_frag:zy,distanceRGBA_vert:By,distanceRGBA_frag:Hy,equirect_vert:Vy,equirect_frag:jy,linedashed_vert:Gy,linedashed_frag:Wy,meshbasic_vert:Xy,meshbasic_frag:qy,meshlambert_vert:Yy,meshlambert_frag:$y,meshmatcap_vert:Ky,meshmatcap_frag:Zy,meshnormal_vert:Qy,meshnormal_frag:Jy,meshphong_vert:e1,meshphong_frag:t1,meshphysical_vert:n1,meshphysical_frag:i1,meshtoon_vert:r1,meshtoon_frag:s1,points_vert:o1,points_frag:a1,shadow_vert:l1,shadow_frag:c1,sprite_vert:u1,sprite_frag:d1},Ne={common:{diffuse:{value:new bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pt}},envmap:{envMap:{value:null},envMapRotation:{value:new pt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pt},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0},uvTransform:{value:new pt}},sprite:{diffuse:{value:new bt(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}}},gi={basic:{uniforms:En([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:mt.meshbasic_vert,fragmentShader:mt.meshbasic_frag},lambert:{uniforms:En([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new bt(0)}}]),vertexShader:mt.meshlambert_vert,fragmentShader:mt.meshlambert_frag},phong:{uniforms:En([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new bt(0)},specular:{value:new bt(1118481)},shininess:{value:30}}]),vertexShader:mt.meshphong_vert,fragmentShader:mt.meshphong_frag},standard:{uniforms:En([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag},toon:{uniforms:En([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new bt(0)}}]),vertexShader:mt.meshtoon_vert,fragmentShader:mt.meshtoon_frag},matcap:{uniforms:En([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:mt.meshmatcap_vert,fragmentShader:mt.meshmatcap_frag},points:{uniforms:En([Ne.points,Ne.fog]),vertexShader:mt.points_vert,fragmentShader:mt.points_frag},dashed:{uniforms:En([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mt.linedashed_vert,fragmentShader:mt.linedashed_frag},depth:{uniforms:En([Ne.common,Ne.displacementmap]),vertexShader:mt.depth_vert,fragmentShader:mt.depth_frag},normal:{uniforms:En([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:mt.meshnormal_vert,fragmentShader:mt.meshnormal_frag},sprite:{uniforms:En([Ne.sprite,Ne.fog]),vertexShader:mt.sprite_vert,fragmentShader:mt.sprite_frag},background:{uniforms:{uvTransform:{value:new pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mt.background_vert,fragmentShader:mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pt}},vertexShader:mt.backgroundCube_vert,fragmentShader:mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mt.cube_vert,fragmentShader:mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mt.equirect_vert,fragmentShader:mt.equirect_frag},distanceRGBA:{uniforms:En([Ne.common,Ne.displacementmap,{referencePosition:{value:new le},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:mt.distanceRGBA_vert,fragmentShader:mt.distanceRGBA_frag},shadow:{uniforms:En([Ne.lights,Ne.fog,{color:{value:new bt(0)},opacity:{value:1}}]),vertexShader:mt.shadow_vert,fragmentShader:mt.shadow_frag}};gi.physical={uniforms:En([gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pt},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pt},sheen:{value:0},sheenColor:{value:new bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pt},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pt},attenuationDistance:{value:0},attenuationColor:{value:new bt(0)},specularColor:{value:new bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pt},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pt}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag};const ml={r:0,b:0,g:0},Br=new Vi,f1=new qt;function h1(s,e,n,r,a,c,u){const d=new bt(0);let h=c===!0?0:1,g,_,S=null,v=0,E=null;function w(U){let L=U.isScene===!0?U.background:null;return L&&L.isTexture&&(L=(U.backgroundBlurriness>0?n:e).get(L)),L}function C(U){let L=!1;const Y=w(U);Y===null?y(d,h):Y&&Y.isColor&&(y(Y,1),L=!0);const z=s.xr.getEnvironmentBlendMode();z==="additive"?r.buffers.color.setClear(0,0,0,1,u):z==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,u),(s.autoClear||L)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function M(U,L){const Y=w(L);Y&&(Y.isCubeTexture||Y.mapping===Pl)?(_===void 0&&(_=new li(new zo(1,1,1),new Sr({name:"BackgroundCubeMaterial",uniforms:Ws(gi.backgroundCube.uniforms),vertexShader:gi.backgroundCube.vertexShader,fragmentShader:gi.backgroundCube.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1})),_.geometry.deleteAttribute("normal"),_.geometry.deleteAttribute("uv"),_.onBeforeRender=function(z,k,X){this.matrixWorld.copyPosition(X.matrixWorld)},Object.defineProperty(_.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(_)),Br.copy(L.backgroundRotation),Br.x*=-1,Br.y*=-1,Br.z*=-1,Y.isCubeTexture&&Y.isRenderTargetTexture===!1&&(Br.y*=-1,Br.z*=-1),_.material.uniforms.envMap.value=Y,_.material.uniforms.flipEnvMap.value=Y.isCubeTexture&&Y.isRenderTargetTexture===!1?-1:1,_.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,_.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,_.material.uniforms.backgroundRotation.value.setFromMatrix4(f1.makeRotationFromEuler(Br)),_.material.toneMapped=Ct.getTransfer(Y.colorSpace)!==Lt,(S!==Y||v!==Y.version||E!==s.toneMapping)&&(_.material.needsUpdate=!0,S=Y,v=Y.version,E=s.toneMapping),_.layers.enableAll(),U.unshift(_,_.geometry,_.material,0,0,null)):Y&&Y.isTexture&&(g===void 0&&(g=new li(new Nl(2,2),new Sr({name:"BackgroundMaterial",uniforms:Ws(gi.background.uniforms),vertexShader:gi.background.vertexShader,fragmentShader:gi.background.fragmentShader,side:yr,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),Object.defineProperty(g.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(g)),g.material.uniforms.t2D.value=Y,g.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,g.material.toneMapped=Ct.getTransfer(Y.colorSpace)!==Lt,Y.matrixAutoUpdate===!0&&Y.updateMatrix(),g.material.uniforms.uvTransform.value.copy(Y.matrix),(S!==Y||v!==Y.version||E!==s.toneMapping)&&(g.material.needsUpdate=!0,S=Y,v=Y.version,E=s.toneMapping),g.layers.enableAll(),U.unshift(g,g.geometry,g.material,0,0,null))}function y(U,L){U.getRGB(ml,Jm(s)),r.buffers.color.setClear(ml.r,ml.g,ml.b,L,u)}function O(){_!==void 0&&(_.geometry.dispose(),_.material.dispose(),_=void 0),g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0)}return{getClearColor:function(){return d},setClearColor:function(U,L=1){d.set(U),h=L,y(d,h)},getClearAlpha:function(){return h},setClearAlpha:function(U){h=U,y(d,h)},render:C,addToRenderList:M,dispose:O}}function p1(s,e){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},a=v(null);let c=a,u=!1;function d(R,j,he,ne,pe){let me=!1;const de=S(ne,he,j);c!==de&&(c=de,g(c.object)),me=E(R,ne,he,pe),me&&w(R,ne,he,pe),pe!==null&&e.update(pe,s.ELEMENT_ARRAY_BUFFER),(me||u)&&(u=!1,L(R,j,he,ne),pe!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(pe).buffer))}function h(){return s.createVertexArray()}function g(R){return s.bindVertexArray(R)}function _(R){return s.deleteVertexArray(R)}function S(R,j,he){const ne=he.wireframe===!0;let pe=r[R.id];pe===void 0&&(pe={},r[R.id]=pe);let me=pe[j.id];me===void 0&&(me={},pe[j.id]=me);let de=me[ne];return de===void 0&&(de=v(h()),me[ne]=de),de}function v(R){const j=[],he=[],ne=[];for(let pe=0;pe<n;pe++)j[pe]=0,he[pe]=0,ne[pe]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:j,enabledAttributes:he,attributeDivisors:ne,object:R,attributes:{},index:null}}function E(R,j,he,ne){const pe=c.attributes,me=j.attributes;let de=0;const ae=he.getAttributes();for(const G in ae)if(ae[G].location>=0){const N=pe[G];let x=me[G];if(x===void 0&&(G==="instanceMatrix"&&R.instanceMatrix&&(x=R.instanceMatrix),G==="instanceColor"&&R.instanceColor&&(x=R.instanceColor)),N===void 0||N.attribute!==x||x&&N.data!==x.data)return!0;de++}return c.attributesNum!==de||c.index!==ne}function w(R,j,he,ne){const pe={},me=j.attributes;let de=0;const ae=he.getAttributes();for(const G in ae)if(ae[G].location>=0){let N=me[G];N===void 0&&(G==="instanceMatrix"&&R.instanceMatrix&&(N=R.instanceMatrix),G==="instanceColor"&&R.instanceColor&&(N=R.instanceColor));const x={};x.attribute=N,N&&N.data&&(x.data=N.data),pe[G]=x,de++}c.attributes=pe,c.attributesNum=de,c.index=ne}function C(){const R=c.newAttributes;for(let j=0,he=R.length;j<he;j++)R[j]=0}function M(R){y(R,0)}function y(R,j){const he=c.newAttributes,ne=c.enabledAttributes,pe=c.attributeDivisors;he[R]=1,ne[R]===0&&(s.enableVertexAttribArray(R),ne[R]=1),pe[R]!==j&&(s.vertexAttribDivisor(R,j),pe[R]=j)}function O(){const R=c.newAttributes,j=c.enabledAttributes;for(let he=0,ne=j.length;he<ne;he++)j[he]!==R[he]&&(s.disableVertexAttribArray(he),j[he]=0)}function U(R,j,he,ne,pe,me,de){de===!0?s.vertexAttribIPointer(R,j,he,pe,me):s.vertexAttribPointer(R,j,he,ne,pe,me)}function L(R,j,he,ne){C();const pe=ne.attributes,me=he.getAttributes(),de=j.defaultAttributeValues;for(const ae in me){const G=me[ae];if(G.location>=0){let fe=pe[ae];if(fe===void 0&&(ae==="instanceMatrix"&&R.instanceMatrix&&(fe=R.instanceMatrix),ae==="instanceColor"&&R.instanceColor&&(fe=R.instanceColor)),fe!==void 0){const N=fe.normalized,x=fe.itemSize,B=e.get(fe);if(B===void 0)continue;const oe=B.buffer,V=B.type,J=B.bytesPerElement,ce=V===s.INT||V===s.UNSIGNED_INT||fe.gpuType===Bd;if(fe.isInterleavedBufferAttribute){const ie=fe.data,xe=ie.stride,Ae=fe.offset;if(ie.isInstancedInterleavedBuffer){for(let Ce=0;Ce<G.locationSize;Ce++)y(G.location+Ce,ie.meshPerAttribute);R.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Ce=0;Ce<G.locationSize;Ce++)M(G.location+Ce);s.bindBuffer(s.ARRAY_BUFFER,oe);for(let Ce=0;Ce<G.locationSize;Ce++)U(G.location+Ce,x/G.locationSize,V,N,xe*J,(Ae+x/G.locationSize*Ce)*J,ce)}else{if(fe.isInstancedBufferAttribute){for(let ie=0;ie<G.locationSize;ie++)y(G.location+ie,fe.meshPerAttribute);R.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ie=0;ie<G.locationSize;ie++)M(G.location+ie);s.bindBuffer(s.ARRAY_BUFFER,oe);for(let ie=0;ie<G.locationSize;ie++)U(G.location+ie,x/G.locationSize,V,N,x*J,x/G.locationSize*ie*J,ce)}}else if(de!==void 0){const N=de[ae];if(N!==void 0)switch(N.length){case 2:s.vertexAttrib2fv(G.location,N);break;case 3:s.vertexAttrib3fv(G.location,N);break;case 4:s.vertexAttrib4fv(G.location,N);break;default:s.vertexAttrib1fv(G.location,N)}}}}O()}function Y(){X();for(const R in r){const j=r[R];for(const he in j){const ne=j[he];for(const pe in ne)_(ne[pe].object),delete ne[pe];delete j[he]}delete r[R]}}function z(R){if(r[R.id]===void 0)return;const j=r[R.id];for(const he in j){const ne=j[he];for(const pe in ne)_(ne[pe].object),delete ne[pe];delete j[he]}delete r[R.id]}function k(R){for(const j in r){const he=r[j];if(he[R.id]===void 0)continue;const ne=he[R.id];for(const pe in ne)_(ne[pe].object),delete ne[pe];delete he[R.id]}}function X(){P(),u=!0,c!==a&&(c=a,g(c.object))}function P(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:d,reset:X,resetDefaultState:P,dispose:Y,releaseStatesOfGeometry:z,releaseStatesOfProgram:k,initAttributes:C,enableAttribute:M,disableUnusedAttributes:O}}function m1(s,e,n){let r;function a(g){r=g}function c(g,_){s.drawArrays(r,g,_),n.update(_,r,1)}function u(g,_,S){S!==0&&(s.drawArraysInstanced(r,g,_,S),n.update(_,r,S))}function d(g,_,S){if(S===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,g,0,_,0,S);let E=0;for(let w=0;w<S;w++)E+=_[w];n.update(E,r,1)}function h(g,_,S,v){if(S===0)return;const E=e.get("WEBGL_multi_draw");if(E===null)for(let w=0;w<g.length;w++)u(g[w],_[w],v[w]);else{E.multiDrawArraysInstancedWEBGL(r,g,0,_,0,v,0,S);let w=0;for(let C=0;C<S;C++)w+=_[C]*v[C];n.update(w,r,1)}}this.setMode=a,this.render=c,this.renderInstances=u,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function g1(s,e,n,r){let a;function c(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const k=e.get("EXT_texture_filter_anisotropic");a=s.getParameter(k.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function u(k){return!(k!==ai&&r.convert(k)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(k){const X=k===Do&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(k!==Hi&&r.convert(k)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&k!==Oi&&!X)}function h(k){if(k==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";k="mediump"}return k==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let g=n.precision!==void 0?n.precision:"highp";const _=h(g);_!==g&&(console.warn("THREE.WebGLRenderer:",g,"not supported, using",_,"instead."),g=_);const S=n.logarithmicDepthBuffer===!0,v=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),E=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),w=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=s.getParameter(s.MAX_TEXTURE_SIZE),M=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),y=s.getParameter(s.MAX_VERTEX_ATTRIBS),O=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),U=s.getParameter(s.MAX_VARYING_VECTORS),L=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),Y=w>0,z=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:h,textureFormatReadable:u,textureTypeReadable:d,precision:g,logarithmicDepthBuffer:S,reverseDepthBuffer:v,maxTextures:E,maxVertexTextures:w,maxTextureSize:C,maxCubemapSize:M,maxAttributes:y,maxVertexUniforms:O,maxVaryings:U,maxFragmentUniforms:L,vertexTextures:Y,maxSamples:z}}function x1(s){const e=this;let n=null,r=0,a=!1,c=!1;const u=new Vr,d=new pt,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(S,v){const E=S.length!==0||v||r!==0||a;return a=v,r=S.length,E},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(S,v){n=_(S,v,0)},this.setState=function(S,v,E){const w=S.clippingPlanes,C=S.clipIntersection,M=S.clipShadows,y=s.get(S);if(!a||w===null||w.length===0||c&&!M)c?_(null):g();else{const O=c?0:r,U=O*4;let L=y.clippingState||null;h.value=L,L=_(w,v,U,E);for(let Y=0;Y!==U;++Y)L[Y]=n[Y];y.clippingState=L,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=O}};function g(){h.value!==n&&(h.value=n,h.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function _(S,v,E,w){const C=S!==null?S.length:0;let M=null;if(C!==0){if(M=h.value,w!==!0||M===null){const y=E+C*4,O=v.matrixWorldInverse;d.getNormalMatrix(O),(M===null||M.length<y)&&(M=new Float32Array(y));for(let U=0,L=E;U!==C;++U,L+=4)u.copy(S[U]).applyMatrix4(O,d),u.normal.toArray(M,L),M[L+3]=u.constant}h.value=M,h.needsUpdate=!0}return e.numPlanes=C,e.numIntersection=0,M}}function v1(s){let e=new WeakMap;function n(u,d){return d===sd?u.mapping=Bs:d===od&&(u.mapping=Hs),u}function r(u){if(u&&u.isTexture){const d=u.mapping;if(d===sd||d===od)if(e.has(u)){const h=e.get(u).texture;return n(h,u.mapping)}else{const h=u.image;if(h&&h.height>0){const g=new _v(h.height);return g.fromEquirectangularTexture(s,u),e.set(u,g),u.addEventListener("dispose",a),n(g.texture,u.mapping)}else return null}}return u}function a(u){const d=u.target;d.removeEventListener("dispose",a);const h=e.get(d);h!==void 0&&(e.delete(d),h.dispose())}function c(){e=new WeakMap}return{get:r,dispose:c}}const Us=4,tm=[.125,.215,.35,.446,.526,.582],Wr=20,Vu=new Cv,nm=new bt;let ju=null,Gu=0,Wu=0,Xu=!1;const jr=(1+Math.sqrt(5))/2,Is=1/jr,im=[new le(-jr,Is,0),new le(jr,Is,0),new le(-Is,0,jr),new le(Is,0,jr),new le(0,jr,-Is),new le(0,jr,Is),new le(-1,1,-1),new le(1,1,-1),new le(-1,1,1),new le(1,1,1)];class rm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,r=.1,a=100){ju=this._renderer.getRenderTarget(),Gu=this._renderer.getActiveCubeFace(),Wu=this._renderer.getActiveMipmapLevel(),Xu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,r,a,c),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=am(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=om(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ju,Gu,Wu),this._renderer.xr.enabled=Xu,e.scissorTest=!1,gl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Bs||e.mapping===Hs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ju=this._renderer.getRenderTarget(),Gu=this._renderer.getActiveCubeFace(),Wu=this._renderer.getActiveMipmapLevel(),Xu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=n||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,r={magFilter:xi,minFilter:xi,generateMipmaps:!1,type:Do,format:ai,colorSpace:Gs,depthBuffer:!1},a=sm(e,n,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sm(e,n,r);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_1(c)),this._blurMaterial=y1(c,e,n)}return a}_compileMaterial(e){const n=new li(this._lodPlanes[0],e);this._renderer.compile(n,Vu)}_sceneToCubeUV(e,n,r,a){const d=new $n(90,1,n,r),h=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],_=this._renderer,S=_.autoClear,v=_.toneMapping;_.getClearColor(nm),_.toneMapping=_r,_.autoClear=!1;const E=new Al({name:"PMREM.Background",side:In,depthWrite:!1,depthTest:!1}),w=new li(new zo,E);let C=!1;const M=e.background;M?M.isColor&&(E.color.copy(M),e.background=null,C=!0):(E.color.copy(nm),C=!0);for(let y=0;y<6;y++){const O=y%3;O===0?(d.up.set(0,h[y],0),d.lookAt(g[y],0,0)):O===1?(d.up.set(0,0,h[y]),d.lookAt(0,g[y],0)):(d.up.set(0,h[y],0),d.lookAt(0,0,g[y]));const U=this._cubeSize;gl(a,O*U,y>2?U:0,U,U),_.setRenderTarget(a),C&&_.render(w,d),_.render(e,d)}w.geometry.dispose(),w.material.dispose(),_.toneMapping=v,_.autoClear=S,e.background=M}_textureToCubeUV(e,n){const r=this._renderer,a=e.mapping===Bs||e.mapping===Hs;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=am()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=om());const c=a?this._cubemapMaterial:this._equirectMaterial,u=new li(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=e;const h=this._cubeSize;gl(n,0,0,3*h,2*h),r.setRenderTarget(n),r.render(u,Vu)}_applyPMREM(e){const n=this._renderer,r=n.autoClear;n.autoClear=!1;const a=this._lodPlanes.length;for(let c=1;c<a;c++){const u=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=im[(a-c-1)%im.length];this._blur(e,c-1,c,u,d)}n.autoClear=r}_blur(e,n,r,a,c){const u=this._pingPongRenderTarget;this._halfBlur(e,u,n,r,a,"latitudinal",c),this._halfBlur(u,e,r,r,a,"longitudinal",c)}_halfBlur(e,n,r,a,c,u,d){const h=this._renderer,g=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const _=3,S=new li(this._lodPlanes[a],g),v=g.uniforms,E=this._sizeLods[r]-1,w=isFinite(c)?Math.PI/(2*E):2*Math.PI/(2*Wr-1),C=c/w,M=isFinite(c)?1+Math.floor(_*C):Wr;M>Wr&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${M} samples when the maximum is set to ${Wr}`);const y=[];let O=0;for(let k=0;k<Wr;++k){const X=k/C,P=Math.exp(-X*X/2);y.push(P),k===0?O+=P:k<M&&(O+=2*P)}for(let k=0;k<y.length;k++)y[k]=y[k]/O;v.envMap.value=e.texture,v.samples.value=M,v.weights.value=y,v.latitudinal.value=u==="latitudinal",d&&(v.poleAxis.value=d);const{_lodMax:U}=this;v.dTheta.value=w,v.mipInt.value=U-r;const L=this._sizeLods[a],Y=3*L*(a>U-Us?a-U+Us:0),z=4*(this._cubeSize-L);gl(n,Y,z,3*L,2*L),h.setRenderTarget(n),h.render(S,Vu)}}function _1(s){const e=[],n=[],r=[];let a=s;const c=s-Us+1+tm.length;for(let u=0;u<c;u++){const d=Math.pow(2,a);n.push(d);let h=1/d;u>s-Us?h=tm[u-s+Us-1]:u===0&&(h=0),r.push(h);const g=1/(d-2),_=-g,S=1+g,v=[_,_,S,_,S,S,_,_,S,S,_,S],E=6,w=6,C=3,M=2,y=1,O=new Float32Array(C*w*E),U=new Float32Array(M*w*E),L=new Float32Array(y*w*E);for(let z=0;z<E;z++){const k=z%3*2/3-1,X=z>2?0:-1,P=[k,X,0,k+2/3,X,0,k+2/3,X+1,0,k,X,0,k+2/3,X+1,0,k,X+1,0];O.set(P,C*w*z),U.set(v,M*w*z);const R=[z,z,z,z,z,z];L.set(R,y*w*z)}const Y=new _i;Y.setAttribute("position",new Kn(O,C)),Y.setAttribute("uv",new Kn(U,M)),Y.setAttribute("faceIndex",new Kn(L,y)),e.push(Y),a>Us&&a--}return{lodPlanes:e,sizeLods:n,sigmas:r}}function sm(s,e,n){const r=new $r(s,e,n);return r.texture.mapping=Pl,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function gl(s,e,n,r,a){s.viewport.set(e,n,r,a),s.scissor.set(e,n,r,a)}function y1(s,e,n){const r=new Float32Array(Wr),a=new le(0,1,0);return new Sr({name:"SphericalGaussianBlur",defines:{n:Wr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:qd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:vr,depthTest:!1,depthWrite:!1})}function om(){return new Sr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:vr,depthTest:!1,depthWrite:!1})}function am(){return new Sr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vr,depthTest:!1,depthWrite:!1})}function qd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function S1(s){let e=new WeakMap,n=null;function r(d){if(d&&d.isTexture){const h=d.mapping,g=h===sd||h===od,_=h===Bs||h===Hs;if(g||_){let S=e.get(d);const v=S!==void 0?S.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==v)return n===null&&(n=new rm(s)),S=g?n.fromEquirectangular(d,S):n.fromCubemap(d,S),S.texture.pmremVersion=d.pmremVersion,e.set(d,S),S.texture;if(S!==void 0)return S.texture;{const E=d.image;return g&&E&&E.height>0||_&&E&&a(E)?(n===null&&(n=new rm(s)),S=g?n.fromEquirectangular(d):n.fromCubemap(d),S.texture.pmremVersion=d.pmremVersion,e.set(d,S),d.addEventListener("dispose",c),S.texture):null}}}return d}function a(d){let h=0;const g=6;for(let _=0;_<g;_++)d[_]!==void 0&&h++;return h===g}function c(d){const h=d.target;h.removeEventListener("dispose",c);const g=e.get(h);g!==void 0&&(e.delete(h),g.dispose())}function u(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:u}}function M1(s){const e={};function n(r){if(e[r]!==void 0)return e[r];let a;switch(r){case"WEBGL_depth_texture":a=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=s.getExtension(r)}return e[r]=a,a}return{has:function(r){return n(r)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(r){const a=n(r);return a===null&&Ds("THREE.WebGLRenderer: "+r+" extension not supported."),a}}}function E1(s,e,n,r){const a={},c=new WeakMap;function u(S){const v=S.target;v.index!==null&&e.remove(v.index);for(const w in v.attributes)e.remove(v.attributes[w]);v.removeEventListener("dispose",u),delete a[v.id];const E=c.get(v);E&&(e.remove(E),c.delete(v)),r.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,n.memory.geometries--}function d(S,v){return a[v.id]===!0||(v.addEventListener("dispose",u),a[v.id]=!0,n.memory.geometries++),v}function h(S){const v=S.attributes;for(const E in v)e.update(v[E],s.ARRAY_BUFFER)}function g(S){const v=[],E=S.index,w=S.attributes.position;let C=0;if(E!==null){const O=E.array;C=E.version;for(let U=0,L=O.length;U<L;U+=3){const Y=O[U+0],z=O[U+1],k=O[U+2];v.push(Y,z,z,k,k,Y)}}else if(w!==void 0){const O=w.array;C=w.version;for(let U=0,L=O.length/3-1;U<L;U+=3){const Y=U+0,z=U+1,k=U+2;v.push(Y,z,z,k,k,Y)}}else return;const M=new(Wm(v)?Qm:Zm)(v,1);M.version=C;const y=c.get(S);y&&e.remove(y),c.set(S,M)}function _(S){const v=c.get(S);if(v){const E=S.index;E!==null&&v.version<E.version&&g(S)}else g(S);return c.get(S)}return{get:d,update:h,getWireframeAttribute:_}}function T1(s,e,n){let r;function a(v){r=v}let c,u;function d(v){c=v.type,u=v.bytesPerElement}function h(v,E){s.drawElements(r,E,c,v*u),n.update(E,r,1)}function g(v,E,w){w!==0&&(s.drawElementsInstanced(r,E,c,v*u,w),n.update(E,r,w))}function _(v,E,w){if(w===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,E,0,c,v,0,w);let M=0;for(let y=0;y<w;y++)M+=E[y];n.update(M,r,1)}function S(v,E,w,C){if(w===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let y=0;y<v.length;y++)g(v[y]/u,E[y],C[y]);else{M.multiDrawElementsInstancedWEBGL(r,E,0,c,v,0,C,0,w);let y=0;for(let O=0;O<w;O++)y+=E[O]*C[O];n.update(y,r,1)}}this.setMode=a,this.setIndex=d,this.render=h,this.renderInstances=g,this.renderMultiDraw=_,this.renderMultiDrawInstances=S}function w1(s){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(c,u,d){switch(n.calls++,u){case s.TRIANGLES:n.triangles+=d*(c/3);break;case s.LINES:n.lines+=d*(c/2);break;case s.LINE_STRIP:n.lines+=d*(c-1);break;case s.LINE_LOOP:n.lines+=d*c;break;case s.POINTS:n.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:r}}function b1(s,e,n){const r=new WeakMap,a=new Xt;function c(u,d,h){const g=u.morphTargetInfluences,_=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,S=_!==void 0?_.length:0;let v=r.get(d);if(v===void 0||v.count!==S){let R=function(){X.dispose(),r.delete(d),d.removeEventListener("dispose",R)};var E=R;v!==void 0&&v.texture.dispose();const w=d.morphAttributes.position!==void 0,C=d.morphAttributes.normal!==void 0,M=d.morphAttributes.color!==void 0,y=d.morphAttributes.position||[],O=d.morphAttributes.normal||[],U=d.morphAttributes.color||[];let L=0;w===!0&&(L=1),C===!0&&(L=2),M===!0&&(L=3);let Y=d.attributes.position.count*L,z=1;Y>e.maxTextureSize&&(z=Math.ceil(Y/e.maxTextureSize),Y=e.maxTextureSize);const k=new Float32Array(Y*z*4*S),X=new qm(k,Y,z,S);X.type=Oi,X.needsUpdate=!0;const P=L*4;for(let j=0;j<S;j++){const he=y[j],ne=O[j],pe=U[j],me=Y*z*4*j;for(let de=0;de<he.count;de++){const ae=de*P;w===!0&&(a.fromBufferAttribute(he,de),k[me+ae+0]=a.x,k[me+ae+1]=a.y,k[me+ae+2]=a.z,k[me+ae+3]=0),C===!0&&(a.fromBufferAttribute(ne,de),k[me+ae+4]=a.x,k[me+ae+5]=a.y,k[me+ae+6]=a.z,k[me+ae+7]=0),M===!0&&(a.fromBufferAttribute(pe,de),k[me+ae+8]=a.x,k[me+ae+9]=a.y,k[me+ae+10]=a.z,k[me+ae+11]=pe.itemSize===4?a.w:1)}}v={count:S,texture:X,size:new It(Y,z)},r.set(d,v),d.addEventListener("dispose",R)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",u.morphTexture,n);else{let w=0;for(let M=0;M<g.length;M++)w+=g[M];const C=d.morphTargetsRelative?1:1-w;h.getUniforms().setValue(s,"morphTargetBaseInfluence",C),h.getUniforms().setValue(s,"morphTargetInfluences",g)}h.getUniforms().setValue(s,"morphTargetsTexture",v.texture,n),h.getUniforms().setValue(s,"morphTargetsTextureSize",v.size)}return{update:c}}function A1(s,e,n,r){let a=new WeakMap;function c(h){const g=r.render.frame,_=h.geometry,S=e.get(h,_);if(a.get(S)!==g&&(e.update(S),a.set(S,g)),h.isInstancedMesh&&(h.hasEventListener("dispose",d)===!1&&h.addEventListener("dispose",d),a.get(h)!==g&&(n.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&n.update(h.instanceColor,s.ARRAY_BUFFER),a.set(h,g))),h.isSkinnedMesh){const v=h.skeleton;a.get(v)!==g&&(v.update(),a.set(v,g))}return S}function u(){a=new WeakMap}function d(h){const g=h.target;g.removeEventListener("dispose",d),n.remove(g.instanceMatrix),g.instanceColor!==null&&n.remove(g.instanceColor)}return{update:c,dispose:u}}const og=new Tn,lm=new rg(1,1),ag=new qm,lg=new nv,cg=new tg,cm=[],um=[],dm=new Float32Array(16),fm=new Float32Array(9),hm=new Float32Array(4);function qs(s,e,n){const r=s[0];if(r<=0||r>0)return s;const a=e*n;let c=cm[a];if(c===void 0&&(c=new Float32Array(a),cm[a]=c),e!==0){r.toArray(c,0);for(let u=1,d=0;u!==e;++u)d+=n,s[u].toArray(c,d)}return c}function Jt(s,e){if(s.length!==e.length)return!1;for(let n=0,r=s.length;n<r;n++)if(s[n]!==e[n])return!1;return!0}function en(s,e){for(let n=0,r=e.length;n<r;n++)s[n]=e[n]}function Il(s,e){let n=um[e];n===void 0&&(n=new Int32Array(e),um[e]=n);for(let r=0;r!==e;++r)n[r]=s.allocateTextureUnit();return n}function C1(s,e){const n=this.cache;n[0]!==e&&(s.uniform1f(this.addr,e),n[0]=e)}function R1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Jt(n,e))return;s.uniform2fv(this.addr,e),en(n,e)}}function P1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Jt(n,e))return;s.uniform3fv(this.addr,e),en(n,e)}}function L1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Jt(n,e))return;s.uniform4fv(this.addr,e),en(n,e)}}function N1(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(Jt(n,e))return;s.uniformMatrix2fv(this.addr,!1,e),en(n,e)}else{if(Jt(n,r))return;hm.set(r),s.uniformMatrix2fv(this.addr,!1,hm),en(n,r)}}function I1(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(Jt(n,e))return;s.uniformMatrix3fv(this.addr,!1,e),en(n,e)}else{if(Jt(n,r))return;fm.set(r),s.uniformMatrix3fv(this.addr,!1,fm),en(n,r)}}function D1(s,e){const n=this.cache,r=e.elements;if(r===void 0){if(Jt(n,e))return;s.uniformMatrix4fv(this.addr,!1,e),en(n,e)}else{if(Jt(n,r))return;dm.set(r),s.uniformMatrix4fv(this.addr,!1,dm),en(n,r)}}function U1(s,e){const n=this.cache;n[0]!==e&&(s.uniform1i(this.addr,e),n[0]=e)}function F1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Jt(n,e))return;s.uniform2iv(this.addr,e),en(n,e)}}function k1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Jt(n,e))return;s.uniform3iv(this.addr,e),en(n,e)}}function O1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Jt(n,e))return;s.uniform4iv(this.addr,e),en(n,e)}}function z1(s,e){const n=this.cache;n[0]!==e&&(s.uniform1ui(this.addr,e),n[0]=e)}function B1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Jt(n,e))return;s.uniform2uiv(this.addr,e),en(n,e)}}function H1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Jt(n,e))return;s.uniform3uiv(this.addr,e),en(n,e)}}function V1(s,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Jt(n,e))return;s.uniform4uiv(this.addr,e),en(n,e)}}function j1(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a);let c;this.type===s.SAMPLER_2D_SHADOW?(lm.compareFunction=Gm,c=lm):c=og,n.setTexture2D(e||c,a)}function G1(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture3D(e||lg,a)}function W1(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTextureCube(e||cg,a)}function X1(s,e,n){const r=this.cache,a=n.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),n.setTexture2DArray(e||ag,a)}function q1(s){switch(s){case 5126:return C1;case 35664:return R1;case 35665:return P1;case 35666:return L1;case 35674:return N1;case 35675:return I1;case 35676:return D1;case 5124:case 35670:return U1;case 35667:case 35671:return F1;case 35668:case 35672:return k1;case 35669:case 35673:return O1;case 5125:return z1;case 36294:return B1;case 36295:return H1;case 36296:return V1;case 35678:case 36198:case 36298:case 36306:case 35682:return j1;case 35679:case 36299:case 36307:return G1;case 35680:case 36300:case 36308:case 36293:return W1;case 36289:case 36303:case 36311:case 36292:return X1}}function Y1(s,e){s.uniform1fv(this.addr,e)}function $1(s,e){const n=qs(e,this.size,2);s.uniform2fv(this.addr,n)}function K1(s,e){const n=qs(e,this.size,3);s.uniform3fv(this.addr,n)}function Z1(s,e){const n=qs(e,this.size,4);s.uniform4fv(this.addr,n)}function Q1(s,e){const n=qs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,n)}function J1(s,e){const n=qs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,n)}function eS(s,e){const n=qs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,n)}function tS(s,e){s.uniform1iv(this.addr,e)}function nS(s,e){s.uniform2iv(this.addr,e)}function iS(s,e){s.uniform3iv(this.addr,e)}function rS(s,e){s.uniform4iv(this.addr,e)}function sS(s,e){s.uniform1uiv(this.addr,e)}function oS(s,e){s.uniform2uiv(this.addr,e)}function aS(s,e){s.uniform3uiv(this.addr,e)}function lS(s,e){s.uniform4uiv(this.addr,e)}function cS(s,e,n){const r=this.cache,a=e.length,c=Il(n,a);Jt(r,c)||(s.uniform1iv(this.addr,c),en(r,c));for(let u=0;u!==a;++u)n.setTexture2D(e[u]||og,c[u])}function uS(s,e,n){const r=this.cache,a=e.length,c=Il(n,a);Jt(r,c)||(s.uniform1iv(this.addr,c),en(r,c));for(let u=0;u!==a;++u)n.setTexture3D(e[u]||lg,c[u])}function dS(s,e,n){const r=this.cache,a=e.length,c=Il(n,a);Jt(r,c)||(s.uniform1iv(this.addr,c),en(r,c));for(let u=0;u!==a;++u)n.setTextureCube(e[u]||cg,c[u])}function fS(s,e,n){const r=this.cache,a=e.length,c=Il(n,a);Jt(r,c)||(s.uniform1iv(this.addr,c),en(r,c));for(let u=0;u!==a;++u)n.setTexture2DArray(e[u]||ag,c[u])}function hS(s){switch(s){case 5126:return Y1;case 35664:return $1;case 35665:return K1;case 35666:return Z1;case 35674:return Q1;case 35675:return J1;case 35676:return eS;case 5124:case 35670:return tS;case 35667:case 35671:return nS;case 35668:case 35672:return iS;case 35669:case 35673:return rS;case 5125:return sS;case 36294:return oS;case 36295:return aS;case 36296:return lS;case 35678:case 36198:case 36298:case 36306:case 35682:return cS;case 35679:case 36299:case 36307:return uS;case 35680:case 36300:case 36308:case 36293:return dS;case 36289:case 36303:case 36311:case 36292:return fS}}class pS{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.setValue=q1(n.type)}}class mS{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=hS(n.type)}}class gS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,r){const a=this.seq;for(let c=0,u=a.length;c!==u;++c){const d=a[c];d.setValue(e,n[d.id],r)}}}const qu=/(\w+)(\])?(\[|\.)?/g;function pm(s,e){s.seq.push(e),s.map[e.id]=e}function xS(s,e,n){const r=s.name,a=r.length;for(qu.lastIndex=0;;){const c=qu.exec(r),u=qu.lastIndex;let d=c[1];const h=c[2]==="]",g=c[3];if(h&&(d=d|0),g===void 0||g==="["&&u+2===a){pm(n,g===void 0?new pS(d,s,e):new mS(d,s,e));break}else{let S=n.map[d];S===void 0&&(S=new gS(d),pm(n,S)),n=S}}}class El{constructor(e,n){this.seq=[],this.map={};const r=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<r;++a){const c=e.getActiveUniform(n,a),u=e.getUniformLocation(n,c.name);xS(c,u,this)}}setValue(e,n,r,a){const c=this.map[n];c!==void 0&&c.setValue(e,r,a)}setOptional(e,n,r){const a=n[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,n,r,a){for(let c=0,u=n.length;c!==u;++c){const d=n[c],h=r[d.id];h.needsUpdate!==!1&&d.setValue(e,h.value,a)}}static seqWithValue(e,n){const r=[];for(let a=0,c=e.length;a!==c;++a){const u=e[a];u.id in n&&r.push(u)}return r}}function mm(s,e,n){const r=s.createShader(e);return s.shaderSource(r,n),s.compileShader(r),r}const vS=37297;let _S=0;function yS(s,e){const n=s.split(`
`),r=[],a=Math.max(e-6,0),c=Math.min(e+6,n.length);for(let u=a;u<c;u++){const d=u+1;r.push(`${d===e?">":" "} ${d}: ${n[u]}`)}return r.join(`
`)}const gm=new pt;function SS(s){Ct._getMatrix(gm,Ct.workingColorSpace,s);const e=`mat3( ${gm.elements.map(n=>n.toFixed(4))} )`;switch(Ct.getTransfer(s)){case Tl:return[e,"LinearTransferOETF"];case Lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function xm(s,e,n){const r=s.getShaderParameter(e,s.COMPILE_STATUS),a=s.getShaderInfoLog(e).trim();if(r&&a==="")return"";const c=/ERROR: 0:(\d+)/.exec(a);if(c){const u=parseInt(c[1]);return n.toUpperCase()+`

`+a+`

`+yS(s.getShaderSource(e),u)}else return a}function MS(s,e){const n=SS(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function ES(s,e){let n;switch(e){case Ax:n="Linear";break;case Cx:n="Reinhard";break;case Rx:n="Cineon";break;case Px:n="ACESFilmic";break;case Nx:n="AgX";break;case Ix:n="Neutral";break;case Lx:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+s+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const xl=new le;function TS(){Ct.getLuminanceCoefficients(xl);const s=xl.x.toFixed(4),e=xl.y.toFixed(4),n=xl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wS(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(No).join(`
`)}function bS(s){const e=[];for(const n in s){const r=s[n];r!==!1&&e.push("#define "+n+" "+r)}return e.join(`
`)}function AS(s,e){const n={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const c=s.getActiveAttrib(e,a),u=c.name;let d=1;c.type===s.FLOAT_MAT2&&(d=2),c.type===s.FLOAT_MAT3&&(d=3),c.type===s.FLOAT_MAT4&&(d=4),n[u]={type:c.type,location:s.getAttribLocation(e,u),locationSize:d}}return n}function No(s){return s!==""}function vm(s,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function _m(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const CS=/^[ \t]*#include +<([\w\d./]+)>/gm;function kd(s){return s.replace(CS,PS)}const RS=new Map;function PS(s,e){let n=mt[e];if(n===void 0){const r=RS.get(e);if(r!==void 0)n=mt[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return kd(n)}const LS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ym(s){return s.replace(LS,NS)}function NS(s,e,n,r){let a="";for(let c=parseInt(e);c<parseInt(n);c++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return a}function Sm(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function IS(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Lm?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===ox?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Fi&&(e="SHADOWMAP_TYPE_VSM"),e}function DS(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Bs:case Hs:e="ENVMAP_TYPE_CUBE";break;case Pl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function US(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Hs:e="ENVMAP_MODE_REFRACTION";break}return e}function FS(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Nm:e="ENVMAP_BLENDING_MULTIPLY";break;case wx:e="ENVMAP_BLENDING_MIX";break;case bx:e="ENVMAP_BLENDING_ADD";break}return e}function kS(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:r,maxMip:n}}function OS(s,e,n,r){const a=s.getContext(),c=n.defines;let u=n.vertexShader,d=n.fragmentShader;const h=IS(n),g=DS(n),_=US(n),S=FS(n),v=kS(n),E=wS(n),w=bS(c),C=a.createProgram();let M,y,O=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(M=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,w].filter(No).join(`
`),M.length>0&&(M+=`
`),y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,w].filter(No).join(`
`),y.length>0&&(y+=`
`)):(M=[Sm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,w,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+_:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(No).join(`
`),y=[Sm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,w,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+g:"",n.envMap?"#define "+_:"",n.envMap?"#define "+S:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==_r?"#define TONE_MAPPING":"",n.toneMapping!==_r?mt.tonemapping_pars_fragment:"",n.toneMapping!==_r?ES("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",mt.colorspace_pars_fragment,MS("linearToOutputTexel",n.outputColorSpace),TS(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(No).join(`
`)),u=kd(u),u=vm(u,n),u=_m(u,n),d=kd(d),d=vm(d,n),d=_m(d,n),u=ym(u),d=ym(d),n.isRawShaderMaterial!==!0&&(O=`#version 300 es
`,M=[E,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,y=["#define varying in",n.glslVersion===Ip?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Ip?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const U=O+M+u,L=O+y+d,Y=mm(a,a.VERTEX_SHADER,U),z=mm(a,a.FRAGMENT_SHADER,L);a.attachShader(C,Y),a.attachShader(C,z),n.index0AttributeName!==void 0?a.bindAttribLocation(C,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(C,0,"position"),a.linkProgram(C);function k(j){if(s.debug.checkShaderErrors){const he=a.getProgramInfoLog(C).trim(),ne=a.getShaderInfoLog(Y).trim(),pe=a.getShaderInfoLog(z).trim();let me=!0,de=!0;if(a.getProgramParameter(C,a.LINK_STATUS)===!1)if(me=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(a,C,Y,z);else{const ae=xm(a,Y,"vertex"),G=xm(a,z,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(C,a.VALIDATE_STATUS)+`

Material Name: `+j.name+`
Material Type: `+j.type+`

Program Info Log: `+he+`
`+ae+`
`+G)}else he!==""?console.warn("THREE.WebGLProgram: Program Info Log:",he):(ne===""||pe==="")&&(de=!1);de&&(j.diagnostics={runnable:me,programLog:he,vertexShader:{log:ne,prefix:M},fragmentShader:{log:pe,prefix:y}})}a.deleteShader(Y),a.deleteShader(z),X=new El(a,C),P=AS(a,C)}let X;this.getUniforms=function(){return X===void 0&&k(this),X};let P;this.getAttributes=function(){return P===void 0&&k(this),P};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=a.getProgramParameter(C,vS)),R},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(C),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=_S++,this.cacheKey=e,this.usedTimes=1,this.program=C,this.vertexShader=Y,this.fragmentShader=z,this}let zS=0;class BS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,r=e.fragmentShader,a=this._getShaderStage(n),c=this._getShaderStage(r),u=this._getShaderCacheForMaterial(e);return u.has(a)===!1&&(u.add(a),a.usedTimes++),u.has(c)===!1&&(u.add(c),c.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const r of n)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let r=n.get(e);return r===void 0&&(r=new Set,n.set(e,r)),r}_getShaderStage(e){const n=this.shaderCache;let r=n.get(e);return r===void 0&&(r=new HS(e),n.set(e,r)),r}}class HS{constructor(e){this.id=zS++,this.code=e,this.usedTimes=0}}function VS(s,e,n,r,a,c,u){const d=new $m,h=new BS,g=new Set,_=[],S=a.logarithmicDepthBuffer,v=a.vertexTextures;let E=a.precision;const w={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function C(P){return g.add(P),P===0?"uv":`uv${P}`}function M(P,R,j,he,ne){const pe=he.fog,me=ne.geometry,de=P.isMeshStandardMaterial?he.environment:null,ae=(P.isMeshStandardMaterial?n:e).get(P.envMap||de),G=ae&&ae.mapping===Pl?ae.image.height:null,fe=w[P.type];P.precision!==null&&(E=a.getMaxPrecision(P.precision),E!==P.precision&&console.warn("THREE.WebGLProgram.getParameters:",P.precision,"not supported, using",E,"instead."));const N=me.morphAttributes.position||me.morphAttributes.normal||me.morphAttributes.color,x=N!==void 0?N.length:0;let B=0;me.morphAttributes.position!==void 0&&(B=1),me.morphAttributes.normal!==void 0&&(B=2),me.morphAttributes.color!==void 0&&(B=3);let oe,V,J,ce;if(fe){const Et=gi[fe];oe=Et.vertexShader,V=Et.fragmentShader}else oe=P.vertexShader,V=P.fragmentShader,h.update(P),J=h.getVertexShaderID(P),ce=h.getFragmentShaderID(P);const ie=s.getRenderTarget(),xe=s.state.buffers.depth.getReversed(),Ae=ne.isInstancedMesh===!0,Ce=ne.isBatchedMesh===!0,Qe=!!P.map,nt=!!P.matcap,$e=!!ae,F=!!P.aoMap,Rt=!!P.lightMap,it=!!P.bumpMap,tt=!!P.normalMap,Be=!!P.displacementMap,vt=!!P.emissiveMap,Ue=!!P.metalnessMap,I=!!P.roughnessMap,b=P.anisotropy>0,te=P.clearcoat>0,_e=P.dispersion>0,ye=P.iridescence>0,ge=P.sheen>0,Xe=P.transmission>0,Re=b&&!!P.anisotropyMap,Fe=te&&!!P.clearcoatMap,ft=te&&!!P.clearcoatNormalMap,Ee=te&&!!P.clearcoatRoughnessMap,ze=ye&&!!P.iridescenceMap,Ze=ye&&!!P.iridescenceThicknessMap,st=ge&&!!P.sheenColorMap,Ve=ge&&!!P.sheenRoughnessMap,gt=!!P.specularMap,ct=!!P.specularColorMap,Pt=!!P.specularIntensityMap,q=Xe&&!!P.transmissionMap,Pe=Xe&&!!P.thicknessMap,ue=!!P.gradientMap,ve=!!P.alphaMap,De=P.alphaTest>0,Ie=!!P.alphaHash,ut=!!P.extensions;let Ut=_r;P.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Ut=s.toneMapping);const Kt={shaderID:fe,shaderType:P.type,shaderName:P.name,vertexShader:oe,fragmentShader:V,defines:P.defines,customVertexShaderID:J,customFragmentShaderID:ce,isRawShaderMaterial:P.isRawShaderMaterial===!0,glslVersion:P.glslVersion,precision:E,batching:Ce,batchingColor:Ce&&ne._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&ne.instanceColor!==null,instancingMorph:Ae&&ne.morphTexture!==null,supportsVertexTextures:v,outputColorSpace:ie===null?s.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Gs,alphaToCoverage:!!P.alphaToCoverage,map:Qe,matcap:nt,envMap:$e,envMapMode:$e&&ae.mapping,envMapCubeUVHeight:G,aoMap:F,lightMap:Rt,bumpMap:it,normalMap:tt,displacementMap:v&&Be,emissiveMap:vt,normalMapObjectSpace:tt&&P.normalMapType===Ox,normalMapTangentSpace:tt&&P.normalMapType===kx,metalnessMap:Ue,roughnessMap:I,anisotropy:b,anisotropyMap:Re,clearcoat:te,clearcoatMap:Fe,clearcoatNormalMap:ft,clearcoatRoughnessMap:Ee,dispersion:_e,iridescence:ye,iridescenceMap:ze,iridescenceThicknessMap:Ze,sheen:ge,sheenColorMap:st,sheenRoughnessMap:Ve,specularMap:gt,specularColorMap:ct,specularIntensityMap:Pt,transmission:Xe,transmissionMap:q,thicknessMap:Pe,gradientMap:ue,opaque:P.transparent===!1&&P.blending===Fs&&P.alphaToCoverage===!1,alphaMap:ve,alphaTest:De,alphaHash:Ie,combine:P.combine,mapUv:Qe&&C(P.map.channel),aoMapUv:F&&C(P.aoMap.channel),lightMapUv:Rt&&C(P.lightMap.channel),bumpMapUv:it&&C(P.bumpMap.channel),normalMapUv:tt&&C(P.normalMap.channel),displacementMapUv:Be&&C(P.displacementMap.channel),emissiveMapUv:vt&&C(P.emissiveMap.channel),metalnessMapUv:Ue&&C(P.metalnessMap.channel),roughnessMapUv:I&&C(P.roughnessMap.channel),anisotropyMapUv:Re&&C(P.anisotropyMap.channel),clearcoatMapUv:Fe&&C(P.clearcoatMap.channel),clearcoatNormalMapUv:ft&&C(P.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&C(P.clearcoatRoughnessMap.channel),iridescenceMapUv:ze&&C(P.iridescenceMap.channel),iridescenceThicknessMapUv:Ze&&C(P.iridescenceThicknessMap.channel),sheenColorMapUv:st&&C(P.sheenColorMap.channel),sheenRoughnessMapUv:Ve&&C(P.sheenRoughnessMap.channel),specularMapUv:gt&&C(P.specularMap.channel),specularColorMapUv:ct&&C(P.specularColorMap.channel),specularIntensityMapUv:Pt&&C(P.specularIntensityMap.channel),transmissionMapUv:q&&C(P.transmissionMap.channel),thicknessMapUv:Pe&&C(P.thicknessMap.channel),alphaMapUv:ve&&C(P.alphaMap.channel),vertexTangents:!!me.attributes.tangent&&(tt||b),vertexColors:P.vertexColors,vertexAlphas:P.vertexColors===!0&&!!me.attributes.color&&me.attributes.color.itemSize===4,pointsUvs:ne.isPoints===!0&&!!me.attributes.uv&&(Qe||ve),fog:!!pe,useFog:P.fog===!0,fogExp2:!!pe&&pe.isFogExp2,flatShading:P.flatShading===!0,sizeAttenuation:P.sizeAttenuation===!0,logarithmicDepthBuffer:S,reverseDepthBuffer:xe,skinning:ne.isSkinnedMesh===!0,morphTargets:me.morphAttributes.position!==void 0,morphNormals:me.morphAttributes.normal!==void 0,morphColors:me.morphAttributes.color!==void 0,morphTargetsCount:x,morphTextureStride:B,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:P.dithering,shadowMapEnabled:s.shadowMap.enabled&&j.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ut,decodeVideoTexture:Qe&&P.map.isVideoTexture===!0&&Ct.getTransfer(P.map.colorSpace)===Lt,decodeVideoTextureEmissive:vt&&P.emissiveMap.isVideoTexture===!0&&Ct.getTransfer(P.emissiveMap.colorSpace)===Lt,premultipliedAlpha:P.premultipliedAlpha,doubleSided:P.side===ki,flipSided:P.side===In,useDepthPacking:P.depthPacking>=0,depthPacking:P.depthPacking||0,index0AttributeName:P.index0AttributeName,extensionClipCullDistance:ut&&P.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ut&&P.extensions.multiDraw===!0||Ce)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:P.customProgramCacheKey()};return Kt.vertexUv1s=g.has(1),Kt.vertexUv2s=g.has(2),Kt.vertexUv3s=g.has(3),g.clear(),Kt}function y(P){const R=[];if(P.shaderID?R.push(P.shaderID):(R.push(P.customVertexShaderID),R.push(P.customFragmentShaderID)),P.defines!==void 0)for(const j in P.defines)R.push(j),R.push(P.defines[j]);return P.isRawShaderMaterial===!1&&(O(R,P),U(R,P),R.push(s.outputColorSpace)),R.push(P.customProgramCacheKey),R.join()}function O(P,R){P.push(R.precision),P.push(R.outputColorSpace),P.push(R.envMapMode),P.push(R.envMapCubeUVHeight),P.push(R.mapUv),P.push(R.alphaMapUv),P.push(R.lightMapUv),P.push(R.aoMapUv),P.push(R.bumpMapUv),P.push(R.normalMapUv),P.push(R.displacementMapUv),P.push(R.emissiveMapUv),P.push(R.metalnessMapUv),P.push(R.roughnessMapUv),P.push(R.anisotropyMapUv),P.push(R.clearcoatMapUv),P.push(R.clearcoatNormalMapUv),P.push(R.clearcoatRoughnessMapUv),P.push(R.iridescenceMapUv),P.push(R.iridescenceThicknessMapUv),P.push(R.sheenColorMapUv),P.push(R.sheenRoughnessMapUv),P.push(R.specularMapUv),P.push(R.specularColorMapUv),P.push(R.specularIntensityMapUv),P.push(R.transmissionMapUv),P.push(R.thicknessMapUv),P.push(R.combine),P.push(R.fogExp2),P.push(R.sizeAttenuation),P.push(R.morphTargetsCount),P.push(R.morphAttributeCount),P.push(R.numDirLights),P.push(R.numPointLights),P.push(R.numSpotLights),P.push(R.numSpotLightMaps),P.push(R.numHemiLights),P.push(R.numRectAreaLights),P.push(R.numDirLightShadows),P.push(R.numPointLightShadows),P.push(R.numSpotLightShadows),P.push(R.numSpotLightShadowsWithMaps),P.push(R.numLightProbes),P.push(R.shadowMapType),P.push(R.toneMapping),P.push(R.numClippingPlanes),P.push(R.numClipIntersection),P.push(R.depthPacking)}function U(P,R){d.disableAll(),R.supportsVertexTextures&&d.enable(0),R.instancing&&d.enable(1),R.instancingColor&&d.enable(2),R.instancingMorph&&d.enable(3),R.matcap&&d.enable(4),R.envMap&&d.enable(5),R.normalMapObjectSpace&&d.enable(6),R.normalMapTangentSpace&&d.enable(7),R.clearcoat&&d.enable(8),R.iridescence&&d.enable(9),R.alphaTest&&d.enable(10),R.vertexColors&&d.enable(11),R.vertexAlphas&&d.enable(12),R.vertexUv1s&&d.enable(13),R.vertexUv2s&&d.enable(14),R.vertexUv3s&&d.enable(15),R.vertexTangents&&d.enable(16),R.anisotropy&&d.enable(17),R.alphaHash&&d.enable(18),R.batching&&d.enable(19),R.dispersion&&d.enable(20),R.batchingColor&&d.enable(21),P.push(d.mask),d.disableAll(),R.fog&&d.enable(0),R.useFog&&d.enable(1),R.flatShading&&d.enable(2),R.logarithmicDepthBuffer&&d.enable(3),R.reverseDepthBuffer&&d.enable(4),R.skinning&&d.enable(5),R.morphTargets&&d.enable(6),R.morphNormals&&d.enable(7),R.morphColors&&d.enable(8),R.premultipliedAlpha&&d.enable(9),R.shadowMapEnabled&&d.enable(10),R.doubleSided&&d.enable(11),R.flipSided&&d.enable(12),R.useDepthPacking&&d.enable(13),R.dithering&&d.enable(14),R.transmission&&d.enable(15),R.sheen&&d.enable(16),R.opaque&&d.enable(17),R.pointsUvs&&d.enable(18),R.decodeVideoTexture&&d.enable(19),R.decodeVideoTextureEmissive&&d.enable(20),R.alphaToCoverage&&d.enable(21),P.push(d.mask)}function L(P){const R=w[P.type];let j;if(R){const he=gi[R];j=mv.clone(he.uniforms)}else j=P.uniforms;return j}function Y(P,R){let j;for(let he=0,ne=_.length;he<ne;he++){const pe=_[he];if(pe.cacheKey===R){j=pe,++j.usedTimes;break}}return j===void 0&&(j=new OS(s,R,P,c),_.push(j)),j}function z(P){if(--P.usedTimes===0){const R=_.indexOf(P);_[R]=_[_.length-1],_.pop(),P.destroy()}}function k(P){h.remove(P)}function X(){h.dispose()}return{getParameters:M,getProgramCacheKey:y,getUniforms:L,acquireProgram:Y,releaseProgram:z,releaseShaderCache:k,programs:_,dispose:X}}function jS(){let s=new WeakMap;function e(u){return s.has(u)}function n(u){let d=s.get(u);return d===void 0&&(d={},s.set(u,d)),d}function r(u){s.delete(u)}function a(u,d,h){s.get(u)[d]=h}function c(){s=new WeakMap}return{has:e,get:n,remove:r,update:a,dispose:c}}function GS(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Mm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Em(){const s=[];let e=0;const n=[],r=[],a=[];function c(){e=0,n.length=0,r.length=0,a.length=0}function u(S,v,E,w,C,M){let y=s[e];return y===void 0?(y={id:S.id,object:S,geometry:v,material:E,groupOrder:w,renderOrder:S.renderOrder,z:C,group:M},s[e]=y):(y.id=S.id,y.object=S,y.geometry=v,y.material=E,y.groupOrder=w,y.renderOrder=S.renderOrder,y.z=C,y.group=M),e++,y}function d(S,v,E,w,C,M){const y=u(S,v,E,w,C,M);E.transmission>0?r.push(y):E.transparent===!0?a.push(y):n.push(y)}function h(S,v,E,w,C,M){const y=u(S,v,E,w,C,M);E.transmission>0?r.unshift(y):E.transparent===!0?a.unshift(y):n.unshift(y)}function g(S,v){n.length>1&&n.sort(S||GS),r.length>1&&r.sort(v||Mm),a.length>1&&a.sort(v||Mm)}function _(){for(let S=e,v=s.length;S<v;S++){const E=s[S];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:n,transmissive:r,transparent:a,init:c,push:d,unshift:h,finish:_,sort:g}}function WS(){let s=new WeakMap;function e(r,a){const c=s.get(r);let u;return c===void 0?(u=new Em,s.set(r,[u])):a>=c.length?(u=new Em,c.push(u)):u=c[a],u}function n(){s=new WeakMap}return{get:e,dispose:n}}function XS(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new le,color:new bt};break;case"SpotLight":n={position:new le,direction:new le,color:new bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new le,color:new bt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new le,skyColor:new bt,groundColor:new bt};break;case"RectAreaLight":n={color:new bt,position:new le,halfWidth:new le,halfHeight:new le};break}return s[e.id]=n,n}}}function qS(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=n,n}}}let YS=0;function $S(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function KS(s){const e=new XS,n=qS(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let g=0;g<9;g++)r.probe.push(new le);const a=new le,c=new qt,u=new qt;function d(g){let _=0,S=0,v=0;for(let P=0;P<9;P++)r.probe[P].set(0,0,0);let E=0,w=0,C=0,M=0,y=0,O=0,U=0,L=0,Y=0,z=0,k=0;g.sort($S);for(let P=0,R=g.length;P<R;P++){const j=g[P],he=j.color,ne=j.intensity,pe=j.distance,me=j.shadow&&j.shadow.map?j.shadow.map.texture:null;if(j.isAmbientLight)_+=he.r*ne,S+=he.g*ne,v+=he.b*ne;else if(j.isLightProbe){for(let de=0;de<9;de++)r.probe[de].addScaledVector(j.sh.coefficients[de],ne);k++}else if(j.isDirectionalLight){const de=e.get(j);if(de.color.copy(j.color).multiplyScalar(j.intensity),j.castShadow){const ae=j.shadow,G=n.get(j);G.shadowIntensity=ae.intensity,G.shadowBias=ae.bias,G.shadowNormalBias=ae.normalBias,G.shadowRadius=ae.radius,G.shadowMapSize=ae.mapSize,r.directionalShadow[E]=G,r.directionalShadowMap[E]=me,r.directionalShadowMatrix[E]=j.shadow.matrix,O++}r.directional[E]=de,E++}else if(j.isSpotLight){const de=e.get(j);de.position.setFromMatrixPosition(j.matrixWorld),de.color.copy(he).multiplyScalar(ne),de.distance=pe,de.coneCos=Math.cos(j.angle),de.penumbraCos=Math.cos(j.angle*(1-j.penumbra)),de.decay=j.decay,r.spot[C]=de;const ae=j.shadow;if(j.map&&(r.spotLightMap[Y]=j.map,Y++,ae.updateMatrices(j),j.castShadow&&z++),r.spotLightMatrix[C]=ae.matrix,j.castShadow){const G=n.get(j);G.shadowIntensity=ae.intensity,G.shadowBias=ae.bias,G.shadowNormalBias=ae.normalBias,G.shadowRadius=ae.radius,G.shadowMapSize=ae.mapSize,r.spotShadow[C]=G,r.spotShadowMap[C]=me,L++}C++}else if(j.isRectAreaLight){const de=e.get(j);de.color.copy(he).multiplyScalar(ne),de.halfWidth.set(j.width*.5,0,0),de.halfHeight.set(0,j.height*.5,0),r.rectArea[M]=de,M++}else if(j.isPointLight){const de=e.get(j);if(de.color.copy(j.color).multiplyScalar(j.intensity),de.distance=j.distance,de.decay=j.decay,j.castShadow){const ae=j.shadow,G=n.get(j);G.shadowIntensity=ae.intensity,G.shadowBias=ae.bias,G.shadowNormalBias=ae.normalBias,G.shadowRadius=ae.radius,G.shadowMapSize=ae.mapSize,G.shadowCameraNear=ae.camera.near,G.shadowCameraFar=ae.camera.far,r.pointShadow[w]=G,r.pointShadowMap[w]=me,r.pointShadowMatrix[w]=j.shadow.matrix,U++}r.point[w]=de,w++}else if(j.isHemisphereLight){const de=e.get(j);de.skyColor.copy(j.color).multiplyScalar(ne),de.groundColor.copy(j.groundColor).multiplyScalar(ne),r.hemi[y]=de,y++}}M>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ne.LTC_FLOAT_1,r.rectAreaLTC2=Ne.LTC_FLOAT_2):(r.rectAreaLTC1=Ne.LTC_HALF_1,r.rectAreaLTC2=Ne.LTC_HALF_2)),r.ambient[0]=_,r.ambient[1]=S,r.ambient[2]=v;const X=r.hash;(X.directionalLength!==E||X.pointLength!==w||X.spotLength!==C||X.rectAreaLength!==M||X.hemiLength!==y||X.numDirectionalShadows!==O||X.numPointShadows!==U||X.numSpotShadows!==L||X.numSpotMaps!==Y||X.numLightProbes!==k)&&(r.directional.length=E,r.spot.length=C,r.rectArea.length=M,r.point.length=w,r.hemi.length=y,r.directionalShadow.length=O,r.directionalShadowMap.length=O,r.pointShadow.length=U,r.pointShadowMap.length=U,r.spotShadow.length=L,r.spotShadowMap.length=L,r.directionalShadowMatrix.length=O,r.pointShadowMatrix.length=U,r.spotLightMatrix.length=L+Y-z,r.spotLightMap.length=Y,r.numSpotLightShadowsWithMaps=z,r.numLightProbes=k,X.directionalLength=E,X.pointLength=w,X.spotLength=C,X.rectAreaLength=M,X.hemiLength=y,X.numDirectionalShadows=O,X.numPointShadows=U,X.numSpotShadows=L,X.numSpotMaps=Y,X.numLightProbes=k,r.version=YS++)}function h(g,_){let S=0,v=0,E=0,w=0,C=0;const M=_.matrixWorldInverse;for(let y=0,O=g.length;y<O;y++){const U=g[y];if(U.isDirectionalLight){const L=r.directional[S];L.direction.setFromMatrixPosition(U.matrixWorld),a.setFromMatrixPosition(U.target.matrixWorld),L.direction.sub(a),L.direction.transformDirection(M),S++}else if(U.isSpotLight){const L=r.spot[E];L.position.setFromMatrixPosition(U.matrixWorld),L.position.applyMatrix4(M),L.direction.setFromMatrixPosition(U.matrixWorld),a.setFromMatrixPosition(U.target.matrixWorld),L.direction.sub(a),L.direction.transformDirection(M),E++}else if(U.isRectAreaLight){const L=r.rectArea[w];L.position.setFromMatrixPosition(U.matrixWorld),L.position.applyMatrix4(M),u.identity(),c.copy(U.matrixWorld),c.premultiply(M),u.extractRotation(c),L.halfWidth.set(U.width*.5,0,0),L.halfHeight.set(0,U.height*.5,0),L.halfWidth.applyMatrix4(u),L.halfHeight.applyMatrix4(u),w++}else if(U.isPointLight){const L=r.point[v];L.position.setFromMatrixPosition(U.matrixWorld),L.position.applyMatrix4(M),v++}else if(U.isHemisphereLight){const L=r.hemi[C];L.direction.setFromMatrixPosition(U.matrixWorld),L.direction.transformDirection(M),C++}}}return{setup:d,setupView:h,state:r}}function Tm(s){const e=new KS(s),n=[],r=[];function a(_){g.camera=_,n.length=0,r.length=0}function c(_){n.push(_)}function u(_){r.push(_)}function d(){e.setup(n)}function h(_){e.setupView(n,_)}const g={lightsArray:n,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:g,setupLights:d,setupLightsView:h,pushLight:c,pushShadow:u}}function ZS(s){let e=new WeakMap;function n(a,c=0){const u=e.get(a);let d;return u===void 0?(d=new Tm(s),e.set(a,[d])):c>=u.length?(d=new Tm(s),u.push(d)):d=u[c],d}function r(){e=new WeakMap}return{get:n,dispose:r}}const QS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,JS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function eM(s,e,n){let r=new ng;const a=new It,c=new It,u=new Xt,d=new bv({depthPacking:Fx}),h=new Av,g={},_=n.maxTextureSize,S={[yr]:In,[In]:yr,[ki]:ki},v=new Sr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:QS,fragmentShader:JS}),E=v.clone();E.defines.HORIZONTAL_PASS=1;const w=new _i;w.setAttribute("position",new Kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new li(w,v),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lm;let y=this.type;this.render=function(z,k,X){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||z.length===0)return;const P=s.getRenderTarget(),R=s.getActiveCubeFace(),j=s.getActiveMipmapLevel(),he=s.state;he.setBlending(vr),he.buffers.color.setClear(1,1,1,1),he.buffers.depth.setTest(!0),he.setScissorTest(!1);const ne=y!==Fi&&this.type===Fi,pe=y===Fi&&this.type!==Fi;for(let me=0,de=z.length;me<de;me++){const ae=z[me],G=ae.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",ae,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;a.copy(G.mapSize);const fe=G.getFrameExtents();if(a.multiply(fe),c.copy(G.mapSize),(a.x>_||a.y>_)&&(a.x>_&&(c.x=Math.floor(_/fe.x),a.x=c.x*fe.x,G.mapSize.x=c.x),a.y>_&&(c.y=Math.floor(_/fe.y),a.y=c.y*fe.y,G.mapSize.y=c.y)),G.map===null||ne===!0||pe===!0){const x=this.type!==Fi?{minFilter:ci,magFilter:ci}:{};G.map!==null&&G.map.dispose(),G.map=new $r(a.x,a.y,x),G.map.texture.name=ae.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const N=G.getViewportCount();for(let x=0;x<N;x++){const B=G.getViewport(x);u.set(c.x*B.x,c.y*B.y,c.x*B.z,c.y*B.w),he.viewport(u),G.updateMatrices(ae,x),r=G.getFrustum(),L(k,X,G.camera,ae,this.type)}G.isPointLightShadow!==!0&&this.type===Fi&&O(G,X),G.needsUpdate=!1}y=this.type,M.needsUpdate=!1,s.setRenderTarget(P,R,j)};function O(z,k){const X=e.update(C);v.defines.VSM_SAMPLES!==z.blurSamples&&(v.defines.VSM_SAMPLES=z.blurSamples,E.defines.VSM_SAMPLES=z.blurSamples,v.needsUpdate=!0,E.needsUpdate=!0),z.mapPass===null&&(z.mapPass=new $r(a.x,a.y)),v.uniforms.shadow_pass.value=z.map.texture,v.uniforms.resolution.value=z.mapSize,v.uniforms.radius.value=z.radius,s.setRenderTarget(z.mapPass),s.clear(),s.renderBufferDirect(k,null,X,v,C,null),E.uniforms.shadow_pass.value=z.mapPass.texture,E.uniforms.resolution.value=z.mapSize,E.uniforms.radius.value=z.radius,s.setRenderTarget(z.map),s.clear(),s.renderBufferDirect(k,null,X,E,C,null)}function U(z,k,X,P){let R=null;const j=X.isPointLight===!0?z.customDistanceMaterial:z.customDepthMaterial;if(j!==void 0)R=j;else if(R=X.isPointLight===!0?h:d,s.localClippingEnabled&&k.clipShadows===!0&&Array.isArray(k.clippingPlanes)&&k.clippingPlanes.length!==0||k.displacementMap&&k.displacementScale!==0||k.alphaMap&&k.alphaTest>0||k.map&&k.alphaTest>0){const he=R.uuid,ne=k.uuid;let pe=g[he];pe===void 0&&(pe={},g[he]=pe);let me=pe[ne];me===void 0&&(me=R.clone(),pe[ne]=me,k.addEventListener("dispose",Y)),R=me}if(R.visible=k.visible,R.wireframe=k.wireframe,P===Fi?R.side=k.shadowSide!==null?k.shadowSide:k.side:R.side=k.shadowSide!==null?k.shadowSide:S[k.side],R.alphaMap=k.alphaMap,R.alphaTest=k.alphaTest,R.map=k.map,R.clipShadows=k.clipShadows,R.clippingPlanes=k.clippingPlanes,R.clipIntersection=k.clipIntersection,R.displacementMap=k.displacementMap,R.displacementScale=k.displacementScale,R.displacementBias=k.displacementBias,R.wireframeLinewidth=k.wireframeLinewidth,R.linewidth=k.linewidth,X.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const he=s.properties.get(R);he.light=X}return R}function L(z,k,X,P,R){if(z.visible===!1)return;if(z.layers.test(k.layers)&&(z.isMesh||z.isLine||z.isPoints)&&(z.castShadow||z.receiveShadow&&R===Fi)&&(!z.frustumCulled||r.intersectsObject(z))){z.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,z.matrixWorld);const ne=e.update(z),pe=z.material;if(Array.isArray(pe)){const me=ne.groups;for(let de=0,ae=me.length;de<ae;de++){const G=me[de],fe=pe[G.materialIndex];if(fe&&fe.visible){const N=U(z,fe,P,R);z.onBeforeShadow(s,z,k,X,ne,N,G),s.renderBufferDirect(X,null,ne,N,z,G),z.onAfterShadow(s,z,k,X,ne,N,G)}}}else if(pe.visible){const me=U(z,pe,P,R);z.onBeforeShadow(s,z,k,X,ne,me,null),s.renderBufferDirect(X,null,ne,me,z,null),z.onAfterShadow(s,z,k,X,ne,me,null)}}const he=z.children;for(let ne=0,pe=he.length;ne<pe;ne++)L(he[ne],k,X,P,R)}function Y(z){z.target.removeEventListener("dispose",Y);for(const X in g){const P=g[X],R=z.target.uuid;R in P&&(P[R].dispose(),delete P[R])}}}const tM={[Qu]:Ju,[ed]:id,[td]:rd,[zs]:nd,[Ju]:Qu,[id]:ed,[rd]:td,[nd]:zs};function nM(s,e){function n(){let q=!1;const Pe=new Xt;let ue=null;const ve=new Xt(0,0,0,0);return{setMask:function(De){ue!==De&&!q&&(s.colorMask(De,De,De,De),ue=De)},setLocked:function(De){q=De},setClear:function(De,Ie,ut,Ut,Kt){Kt===!0&&(De*=Ut,Ie*=Ut,ut*=Ut),Pe.set(De,Ie,ut,Ut),ve.equals(Pe)===!1&&(s.clearColor(De,Ie,ut,Ut),ve.copy(Pe))},reset:function(){q=!1,ue=null,ve.set(-1,0,0,0)}}}function r(){let q=!1,Pe=!1,ue=null,ve=null,De=null;return{setReversed:function(Ie){if(Pe!==Ie){const ut=e.get("EXT_clip_control");Pe?ut.clipControlEXT(ut.LOWER_LEFT_EXT,ut.ZERO_TO_ONE_EXT):ut.clipControlEXT(ut.LOWER_LEFT_EXT,ut.NEGATIVE_ONE_TO_ONE_EXT);const Ut=De;De=null,this.setClear(Ut)}Pe=Ie},getReversed:function(){return Pe},setTest:function(Ie){Ie?ie(s.DEPTH_TEST):xe(s.DEPTH_TEST)},setMask:function(Ie){ue!==Ie&&!q&&(s.depthMask(Ie),ue=Ie)},setFunc:function(Ie){if(Pe&&(Ie=tM[Ie]),ve!==Ie){switch(Ie){case Qu:s.depthFunc(s.NEVER);break;case Ju:s.depthFunc(s.ALWAYS);break;case ed:s.depthFunc(s.LESS);break;case zs:s.depthFunc(s.LEQUAL);break;case td:s.depthFunc(s.EQUAL);break;case nd:s.depthFunc(s.GEQUAL);break;case id:s.depthFunc(s.GREATER);break;case rd:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ve=Ie}},setLocked:function(Ie){q=Ie},setClear:function(Ie){De!==Ie&&(Pe&&(Ie=1-Ie),s.clearDepth(Ie),De=Ie)},reset:function(){q=!1,ue=null,ve=null,De=null,Pe=!1}}}function a(){let q=!1,Pe=null,ue=null,ve=null,De=null,Ie=null,ut=null,Ut=null,Kt=null;return{setTest:function(Et){q||(Et?ie(s.STENCIL_TEST):xe(s.STENCIL_TEST))},setMask:function(Et){Pe!==Et&&!q&&(s.stencilMask(Et),Pe=Et)},setFunc:function(Et,wn,_n){(ue!==Et||ve!==wn||De!==_n)&&(s.stencilFunc(Et,wn,_n),ue=Et,ve=wn,De=_n)},setOp:function(Et,wn,_n){(Ie!==Et||ut!==wn||Ut!==_n)&&(s.stencilOp(Et,wn,_n),Ie=Et,ut=wn,Ut=_n)},setLocked:function(Et){q=Et},setClear:function(Et){Kt!==Et&&(s.clearStencil(Et),Kt=Et)},reset:function(){q=!1,Pe=null,ue=null,ve=null,De=null,Ie=null,ut=null,Ut=null,Kt=null}}}const c=new n,u=new r,d=new a,h=new WeakMap,g=new WeakMap;let _={},S={},v=new WeakMap,E=[],w=null,C=!1,M=null,y=null,O=null,U=null,L=null,Y=null,z=null,k=new bt(0,0,0),X=0,P=!1,R=null,j=null,he=null,ne=null,pe=null;const me=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let de=!1,ae=0;const G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(G)[1]),de=ae>=1):G.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),de=ae>=2);let fe=null,N={};const x=s.getParameter(s.SCISSOR_BOX),B=s.getParameter(s.VIEWPORT),oe=new Xt().fromArray(x),V=new Xt().fromArray(B);function J(q,Pe,ue,ve){const De=new Uint8Array(4),Ie=s.createTexture();s.bindTexture(q,Ie),s.texParameteri(q,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(q,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ut=0;ut<ue;ut++)q===s.TEXTURE_3D||q===s.TEXTURE_2D_ARRAY?s.texImage3D(Pe,0,s.RGBA,1,1,ve,0,s.RGBA,s.UNSIGNED_BYTE,De):s.texImage2D(Pe+ut,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,De);return Ie}const ce={};ce[s.TEXTURE_2D]=J(s.TEXTURE_2D,s.TEXTURE_2D,1),ce[s.TEXTURE_CUBE_MAP]=J(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[s.TEXTURE_2D_ARRAY]=J(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ce[s.TEXTURE_3D]=J(s.TEXTURE_3D,s.TEXTURE_3D,1,1),c.setClear(0,0,0,1),u.setClear(1),d.setClear(0),ie(s.DEPTH_TEST),u.setFunc(zs),it(!1),tt(Cp),ie(s.CULL_FACE),F(vr);function ie(q){_[q]!==!0&&(s.enable(q),_[q]=!0)}function xe(q){_[q]!==!1&&(s.disable(q),_[q]=!1)}function Ae(q,Pe){return S[q]!==Pe?(s.bindFramebuffer(q,Pe),S[q]=Pe,q===s.DRAW_FRAMEBUFFER&&(S[s.FRAMEBUFFER]=Pe),q===s.FRAMEBUFFER&&(S[s.DRAW_FRAMEBUFFER]=Pe),!0):!1}function Ce(q,Pe){let ue=E,ve=!1;if(q){ue=v.get(Pe),ue===void 0&&(ue=[],v.set(Pe,ue));const De=q.textures;if(ue.length!==De.length||ue[0]!==s.COLOR_ATTACHMENT0){for(let Ie=0,ut=De.length;Ie<ut;Ie++)ue[Ie]=s.COLOR_ATTACHMENT0+Ie;ue.length=De.length,ve=!0}}else ue[0]!==s.BACK&&(ue[0]=s.BACK,ve=!0);ve&&s.drawBuffers(ue)}function Qe(q){return w!==q?(s.useProgram(q),w=q,!0):!1}const nt={[Gr]:s.FUNC_ADD,[lx]:s.FUNC_SUBTRACT,[cx]:s.FUNC_REVERSE_SUBTRACT};nt[ux]=s.MIN,nt[dx]=s.MAX;const $e={[fx]:s.ZERO,[hx]:s.ONE,[px]:s.SRC_COLOR,[Ku]:s.SRC_ALPHA,[yx]:s.SRC_ALPHA_SATURATE,[vx]:s.DST_COLOR,[gx]:s.DST_ALPHA,[mx]:s.ONE_MINUS_SRC_COLOR,[Zu]:s.ONE_MINUS_SRC_ALPHA,[_x]:s.ONE_MINUS_DST_COLOR,[xx]:s.ONE_MINUS_DST_ALPHA,[Sx]:s.CONSTANT_COLOR,[Mx]:s.ONE_MINUS_CONSTANT_COLOR,[Ex]:s.CONSTANT_ALPHA,[Tx]:s.ONE_MINUS_CONSTANT_ALPHA};function F(q,Pe,ue,ve,De,Ie,ut,Ut,Kt,Et){if(q===vr){C===!0&&(xe(s.BLEND),C=!1);return}if(C===!1&&(ie(s.BLEND),C=!0),q!==ax){if(q!==M||Et!==P){if((y!==Gr||L!==Gr)&&(s.blendEquation(s.FUNC_ADD),y=Gr,L=Gr),Et)switch(q){case Fs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case $u:s.blendFunc(s.ONE,s.ONE);break;case Rp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Pp:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}else switch(q){case Fs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case $u:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Rp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Pp:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}O=null,U=null,Y=null,z=null,k.set(0,0,0),X=0,M=q,P=Et}return}De=De||Pe,Ie=Ie||ue,ut=ut||ve,(Pe!==y||De!==L)&&(s.blendEquationSeparate(nt[Pe],nt[De]),y=Pe,L=De),(ue!==O||ve!==U||Ie!==Y||ut!==z)&&(s.blendFuncSeparate($e[ue],$e[ve],$e[Ie],$e[ut]),O=ue,U=ve,Y=Ie,z=ut),(Ut.equals(k)===!1||Kt!==X)&&(s.blendColor(Ut.r,Ut.g,Ut.b,Kt),k.copy(Ut),X=Kt),M=q,P=!1}function Rt(q,Pe){q.side===ki?xe(s.CULL_FACE):ie(s.CULL_FACE);let ue=q.side===In;Pe&&(ue=!ue),it(ue),q.blending===Fs&&q.transparent===!1?F(vr):F(q.blending,q.blendEquation,q.blendSrc,q.blendDst,q.blendEquationAlpha,q.blendSrcAlpha,q.blendDstAlpha,q.blendColor,q.blendAlpha,q.premultipliedAlpha),u.setFunc(q.depthFunc),u.setTest(q.depthTest),u.setMask(q.depthWrite),c.setMask(q.colorWrite);const ve=q.stencilWrite;d.setTest(ve),ve&&(d.setMask(q.stencilWriteMask),d.setFunc(q.stencilFunc,q.stencilRef,q.stencilFuncMask),d.setOp(q.stencilFail,q.stencilZFail,q.stencilZPass)),vt(q.polygonOffset,q.polygonOffsetFactor,q.polygonOffsetUnits),q.alphaToCoverage===!0?ie(s.SAMPLE_ALPHA_TO_COVERAGE):xe(s.SAMPLE_ALPHA_TO_COVERAGE)}function it(q){R!==q&&(q?s.frontFace(s.CW):s.frontFace(s.CCW),R=q)}function tt(q){q!==rx?(ie(s.CULL_FACE),q!==j&&(q===Cp?s.cullFace(s.BACK):q===sx?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):xe(s.CULL_FACE),j=q}function Be(q){q!==he&&(de&&s.lineWidth(q),he=q)}function vt(q,Pe,ue){q?(ie(s.POLYGON_OFFSET_FILL),(ne!==Pe||pe!==ue)&&(s.polygonOffset(Pe,ue),ne=Pe,pe=ue)):xe(s.POLYGON_OFFSET_FILL)}function Ue(q){q?ie(s.SCISSOR_TEST):xe(s.SCISSOR_TEST)}function I(q){q===void 0&&(q=s.TEXTURE0+me-1),fe!==q&&(s.activeTexture(q),fe=q)}function b(q,Pe,ue){ue===void 0&&(fe===null?ue=s.TEXTURE0+me-1:ue=fe);let ve=N[ue];ve===void 0&&(ve={type:void 0,texture:void 0},N[ue]=ve),(ve.type!==q||ve.texture!==Pe)&&(fe!==ue&&(s.activeTexture(ue),fe=ue),s.bindTexture(q,Pe||ce[q]),ve.type=q,ve.texture=Pe)}function te(){const q=N[fe];q!==void 0&&q.type!==void 0&&(s.bindTexture(q.type,null),q.type=void 0,q.texture=void 0)}function _e(){try{s.compressedTexImage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ye(){try{s.compressedTexImage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ge(){try{s.texSubImage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Xe(){try{s.texSubImage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Re(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Fe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ft(){try{s.texStorage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Ee(){try{s.texStorage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ze(){try{s.texImage2D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Ze(){try{s.texImage3D.apply(s,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function st(q){oe.equals(q)===!1&&(s.scissor(q.x,q.y,q.z,q.w),oe.copy(q))}function Ve(q){V.equals(q)===!1&&(s.viewport(q.x,q.y,q.z,q.w),V.copy(q))}function gt(q,Pe){let ue=g.get(Pe);ue===void 0&&(ue=new WeakMap,g.set(Pe,ue));let ve=ue.get(q);ve===void 0&&(ve=s.getUniformBlockIndex(Pe,q.name),ue.set(q,ve))}function ct(q,Pe){const ve=g.get(Pe).get(q);h.get(Pe)!==ve&&(s.uniformBlockBinding(Pe,ve,q.__bindingPointIndex),h.set(Pe,ve))}function Pt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),u.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),_={},fe=null,N={},S={},v=new WeakMap,E=[],w=null,C=!1,M=null,y=null,O=null,U=null,L=null,Y=null,z=null,k=new bt(0,0,0),X=0,P=!1,R=null,j=null,he=null,ne=null,pe=null,oe.set(0,0,s.canvas.width,s.canvas.height),V.set(0,0,s.canvas.width,s.canvas.height),c.reset(),u.reset(),d.reset()}return{buffers:{color:c,depth:u,stencil:d},enable:ie,disable:xe,bindFramebuffer:Ae,drawBuffers:Ce,useProgram:Qe,setBlending:F,setMaterial:Rt,setFlipSided:it,setCullFace:tt,setLineWidth:Be,setPolygonOffset:vt,setScissorTest:Ue,activeTexture:I,bindTexture:b,unbindTexture:te,compressedTexImage2D:_e,compressedTexImage3D:ye,texImage2D:ze,texImage3D:Ze,updateUBOMapping:gt,uniformBlockBinding:ct,texStorage2D:ft,texStorage3D:Ee,texSubImage2D:ge,texSubImage3D:Xe,compressedTexSubImage2D:Re,compressedTexSubImage3D:Fe,scissor:st,viewport:Ve,reset:Pt}}function iM(s,e,n,r,a,c,u){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new It,_=new WeakMap;let S;const v=new WeakMap;let E=!1;try{E=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(I,b){return E?new OffscreenCanvas(I,b):bl("canvas")}function C(I,b,te){let _e=1;const ye=Ue(I);if((ye.width>te||ye.height>te)&&(_e=te/Math.max(ye.width,ye.height)),_e<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const ge=Math.floor(_e*ye.width),Xe=Math.floor(_e*ye.height);S===void 0&&(S=w(ge,Xe));const Re=b?w(ge,Xe):S;return Re.width=ge,Re.height=Xe,Re.getContext("2d").drawImage(I,0,0,ge,Xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ye.width+"x"+ye.height+") to ("+ge+"x"+Xe+")."),Re}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ye.width+"x"+ye.height+")."),I;return I}function M(I){return I.generateMipmaps}function y(I){s.generateMipmap(I)}function O(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function U(I,b,te,_e,ye=!1){if(I!==null){if(s[I]!==void 0)return s[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let ge=b;if(b===s.RED&&(te===s.FLOAT&&(ge=s.R32F),te===s.HALF_FLOAT&&(ge=s.R16F),te===s.UNSIGNED_BYTE&&(ge=s.R8)),b===s.RED_INTEGER&&(te===s.UNSIGNED_BYTE&&(ge=s.R8UI),te===s.UNSIGNED_SHORT&&(ge=s.R16UI),te===s.UNSIGNED_INT&&(ge=s.R32UI),te===s.BYTE&&(ge=s.R8I),te===s.SHORT&&(ge=s.R16I),te===s.INT&&(ge=s.R32I)),b===s.RG&&(te===s.FLOAT&&(ge=s.RG32F),te===s.HALF_FLOAT&&(ge=s.RG16F),te===s.UNSIGNED_BYTE&&(ge=s.RG8)),b===s.RG_INTEGER&&(te===s.UNSIGNED_BYTE&&(ge=s.RG8UI),te===s.UNSIGNED_SHORT&&(ge=s.RG16UI),te===s.UNSIGNED_INT&&(ge=s.RG32UI),te===s.BYTE&&(ge=s.RG8I),te===s.SHORT&&(ge=s.RG16I),te===s.INT&&(ge=s.RG32I)),b===s.RGB_INTEGER&&(te===s.UNSIGNED_BYTE&&(ge=s.RGB8UI),te===s.UNSIGNED_SHORT&&(ge=s.RGB16UI),te===s.UNSIGNED_INT&&(ge=s.RGB32UI),te===s.BYTE&&(ge=s.RGB8I),te===s.SHORT&&(ge=s.RGB16I),te===s.INT&&(ge=s.RGB32I)),b===s.RGBA_INTEGER&&(te===s.UNSIGNED_BYTE&&(ge=s.RGBA8UI),te===s.UNSIGNED_SHORT&&(ge=s.RGBA16UI),te===s.UNSIGNED_INT&&(ge=s.RGBA32UI),te===s.BYTE&&(ge=s.RGBA8I),te===s.SHORT&&(ge=s.RGBA16I),te===s.INT&&(ge=s.RGBA32I)),b===s.RGB&&te===s.UNSIGNED_INT_5_9_9_9_REV&&(ge=s.RGB9_E5),b===s.RGBA){const Xe=ye?Tl:Ct.getTransfer(_e);te===s.FLOAT&&(ge=s.RGBA32F),te===s.HALF_FLOAT&&(ge=s.RGBA16F),te===s.UNSIGNED_BYTE&&(ge=Xe===Lt?s.SRGB8_ALPHA8:s.RGBA8),te===s.UNSIGNED_SHORT_4_4_4_4&&(ge=s.RGBA4),te===s.UNSIGNED_SHORT_5_5_5_1&&(ge=s.RGB5_A1)}return(ge===s.R16F||ge===s.R32F||ge===s.RG16F||ge===s.RG32F||ge===s.RGBA16F||ge===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ge}function L(I,b){let te;return I?b===null||b===Yr||b===Vs?te=s.DEPTH24_STENCIL8:b===Oi?te=s.DEPTH32F_STENCIL8:b===Io&&(te=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Yr||b===Vs?te=s.DEPTH_COMPONENT24:b===Oi?te=s.DEPTH_COMPONENT32F:b===Io&&(te=s.DEPTH_COMPONENT16),te}function Y(I,b){return M(I)===!0||I.isFramebufferTexture&&I.minFilter!==ci&&I.minFilter!==xi?Math.log2(Math.max(b.width,b.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?b.mipmaps.length:1}function z(I){const b=I.target;b.removeEventListener("dispose",z),X(b),b.isVideoTexture&&_.delete(b)}function k(I){const b=I.target;b.removeEventListener("dispose",k),R(b)}function X(I){const b=r.get(I);if(b.__webglInit===void 0)return;const te=I.source,_e=v.get(te);if(_e){const ye=_e[b.__cacheKey];ye.usedTimes--,ye.usedTimes===0&&P(I),Object.keys(_e).length===0&&v.delete(te)}r.remove(I)}function P(I){const b=r.get(I);s.deleteTexture(b.__webglTexture);const te=I.source,_e=v.get(te);delete _e[b.__cacheKey],u.memory.textures--}function R(I){const b=r.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),r.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let _e=0;_e<6;_e++){if(Array.isArray(b.__webglFramebuffer[_e]))for(let ye=0;ye<b.__webglFramebuffer[_e].length;ye++)s.deleteFramebuffer(b.__webglFramebuffer[_e][ye]);else s.deleteFramebuffer(b.__webglFramebuffer[_e]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[_e])}else{if(Array.isArray(b.__webglFramebuffer))for(let _e=0;_e<b.__webglFramebuffer.length;_e++)s.deleteFramebuffer(b.__webglFramebuffer[_e]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let _e=0;_e<b.__webglColorRenderbuffer.length;_e++)b.__webglColorRenderbuffer[_e]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[_e]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const te=I.textures;for(let _e=0,ye=te.length;_e<ye;_e++){const ge=r.get(te[_e]);ge.__webglTexture&&(s.deleteTexture(ge.__webglTexture),u.memory.textures--),r.remove(te[_e])}r.remove(I)}let j=0;function he(){j=0}function ne(){const I=j;return I>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+a.maxTextures),j+=1,I}function pe(I){const b=[];return b.push(I.wrapS),b.push(I.wrapT),b.push(I.wrapR||0),b.push(I.magFilter),b.push(I.minFilter),b.push(I.anisotropy),b.push(I.internalFormat),b.push(I.format),b.push(I.type),b.push(I.generateMipmaps),b.push(I.premultiplyAlpha),b.push(I.flipY),b.push(I.unpackAlignment),b.push(I.colorSpace),b.join()}function me(I,b){const te=r.get(I);if(I.isVideoTexture&&Be(I),I.isRenderTargetTexture===!1&&I.version>0&&te.__version!==I.version){const _e=I.image;if(_e===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(_e.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{V(te,I,b);return}}n.bindTexture(s.TEXTURE_2D,te.__webglTexture,s.TEXTURE0+b)}function de(I,b){const te=r.get(I);if(I.version>0&&te.__version!==I.version){V(te,I,b);return}n.bindTexture(s.TEXTURE_2D_ARRAY,te.__webglTexture,s.TEXTURE0+b)}function ae(I,b){const te=r.get(I);if(I.version>0&&te.__version!==I.version){V(te,I,b);return}n.bindTexture(s.TEXTURE_3D,te.__webglTexture,s.TEXTURE0+b)}function G(I,b){const te=r.get(I);if(I.version>0&&te.__version!==I.version){J(te,I,b);return}n.bindTexture(s.TEXTURE_CUBE_MAP,te.__webglTexture,s.TEXTURE0+b)}const fe={[ad]:s.REPEAT,[Xr]:s.CLAMP_TO_EDGE,[ld]:s.MIRRORED_REPEAT},N={[ci]:s.NEAREST,[Dx]:s.NEAREST_MIPMAP_NEAREST,[Ya]:s.NEAREST_MIPMAP_LINEAR,[xi]:s.LINEAR,[vu]:s.LINEAR_MIPMAP_NEAREST,[qr]:s.LINEAR_MIPMAP_LINEAR},x={[zx]:s.NEVER,[Wx]:s.ALWAYS,[Bx]:s.LESS,[Gm]:s.LEQUAL,[Hx]:s.EQUAL,[Gx]:s.GEQUAL,[Vx]:s.GREATER,[jx]:s.NOTEQUAL};function B(I,b){if(b.type===Oi&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===xi||b.magFilter===vu||b.magFilter===Ya||b.magFilter===qr||b.minFilter===xi||b.minFilter===vu||b.minFilter===Ya||b.minFilter===qr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,fe[b.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,fe[b.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,fe[b.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,N[b.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,N[b.minFilter]),b.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,x[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===ci||b.minFilter!==Ya&&b.minFilter!==qr||b.type===Oi&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||r.get(b).__currentAnisotropy){const te=e.get("EXT_texture_filter_anisotropic");s.texParameterf(I,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,a.getMaxAnisotropy())),r.get(b).__currentAnisotropy=b.anisotropy}}}function oe(I,b){let te=!1;I.__webglInit===void 0&&(I.__webglInit=!0,b.addEventListener("dispose",z));const _e=b.source;let ye=v.get(_e);ye===void 0&&(ye={},v.set(_e,ye));const ge=pe(b);if(ge!==I.__cacheKey){ye[ge]===void 0&&(ye[ge]={texture:s.createTexture(),usedTimes:0},u.memory.textures++,te=!0),ye[ge].usedTimes++;const Xe=ye[I.__cacheKey];Xe!==void 0&&(ye[I.__cacheKey].usedTimes--,Xe.usedTimes===0&&P(b)),I.__cacheKey=ge,I.__webglTexture=ye[ge].texture}return te}function V(I,b,te){let _e=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(_e=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(_e=s.TEXTURE_3D);const ye=oe(I,b),ge=b.source;n.bindTexture(_e,I.__webglTexture,s.TEXTURE0+te);const Xe=r.get(ge);if(ge.version!==Xe.__version||ye===!0){n.activeTexture(s.TEXTURE0+te);const Re=Ct.getPrimaries(Ct.workingColorSpace),Fe=b.colorSpace===xr?null:Ct.getPrimaries(b.colorSpace),ft=b.colorSpace===xr||Re===Fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);let Ee=C(b.image,!1,a.maxTextureSize);Ee=vt(b,Ee);const ze=c.convert(b.format,b.colorSpace),Ze=c.convert(b.type);let st=U(b.internalFormat,ze,Ze,b.colorSpace,b.isVideoTexture);B(_e,b);let Ve;const gt=b.mipmaps,ct=b.isVideoTexture!==!0,Pt=Xe.__version===void 0||ye===!0,q=ge.dataReady,Pe=Y(b,Ee);if(b.isDepthTexture)st=L(b.format===js,b.type),Pt&&(ct?n.texStorage2D(s.TEXTURE_2D,1,st,Ee.width,Ee.height):n.texImage2D(s.TEXTURE_2D,0,st,Ee.width,Ee.height,0,ze,Ze,null));else if(b.isDataTexture)if(gt.length>0){ct&&Pt&&n.texStorage2D(s.TEXTURE_2D,Pe,st,gt[0].width,gt[0].height);for(let ue=0,ve=gt.length;ue<ve;ue++)Ve=gt[ue],ct?q&&n.texSubImage2D(s.TEXTURE_2D,ue,0,0,Ve.width,Ve.height,ze,Ze,Ve.data):n.texImage2D(s.TEXTURE_2D,ue,st,Ve.width,Ve.height,0,ze,Ze,Ve.data);b.generateMipmaps=!1}else ct?(Pt&&n.texStorage2D(s.TEXTURE_2D,Pe,st,Ee.width,Ee.height),q&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,Ee.width,Ee.height,ze,Ze,Ee.data)):n.texImage2D(s.TEXTURE_2D,0,st,Ee.width,Ee.height,0,ze,Ze,Ee.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){ct&&Pt&&n.texStorage3D(s.TEXTURE_2D_ARRAY,Pe,st,gt[0].width,gt[0].height,Ee.depth);for(let ue=0,ve=gt.length;ue<ve;ue++)if(Ve=gt[ue],b.format!==ai)if(ze!==null)if(ct){if(q)if(b.layerUpdates.size>0){const De=em(Ve.width,Ve.height,b.format,b.type);for(const Ie of b.layerUpdates){const ut=Ve.data.subarray(Ie*De/Ve.data.BYTES_PER_ELEMENT,(Ie+1)*De/Ve.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,Ie,Ve.width,Ve.height,1,ze,ut)}b.clearLayerUpdates()}else n.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,0,Ve.width,Ve.height,Ee.depth,ze,Ve.data)}else n.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ue,st,Ve.width,Ve.height,Ee.depth,0,Ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ct?q&&n.texSubImage3D(s.TEXTURE_2D_ARRAY,ue,0,0,0,Ve.width,Ve.height,Ee.depth,ze,Ze,Ve.data):n.texImage3D(s.TEXTURE_2D_ARRAY,ue,st,Ve.width,Ve.height,Ee.depth,0,ze,Ze,Ve.data)}else{ct&&Pt&&n.texStorage2D(s.TEXTURE_2D,Pe,st,gt[0].width,gt[0].height);for(let ue=0,ve=gt.length;ue<ve;ue++)Ve=gt[ue],b.format!==ai?ze!==null?ct?q&&n.compressedTexSubImage2D(s.TEXTURE_2D,ue,0,0,Ve.width,Ve.height,ze,Ve.data):n.compressedTexImage2D(s.TEXTURE_2D,ue,st,Ve.width,Ve.height,0,Ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ct?q&&n.texSubImage2D(s.TEXTURE_2D,ue,0,0,Ve.width,Ve.height,ze,Ze,Ve.data):n.texImage2D(s.TEXTURE_2D,ue,st,Ve.width,Ve.height,0,ze,Ze,Ve.data)}else if(b.isDataArrayTexture)if(ct){if(Pt&&n.texStorage3D(s.TEXTURE_2D_ARRAY,Pe,st,Ee.width,Ee.height,Ee.depth),q)if(b.layerUpdates.size>0){const ue=em(Ee.width,Ee.height,b.format,b.type);for(const ve of b.layerUpdates){const De=Ee.data.subarray(ve*ue/Ee.data.BYTES_PER_ELEMENT,(ve+1)*ue/Ee.data.BYTES_PER_ELEMENT);n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ve,Ee.width,Ee.height,1,ze,Ze,De)}b.clearLayerUpdates()}else n.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Ee.width,Ee.height,Ee.depth,ze,Ze,Ee.data)}else n.texImage3D(s.TEXTURE_2D_ARRAY,0,st,Ee.width,Ee.height,Ee.depth,0,ze,Ze,Ee.data);else if(b.isData3DTexture)ct?(Pt&&n.texStorage3D(s.TEXTURE_3D,Pe,st,Ee.width,Ee.height,Ee.depth),q&&n.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Ee.width,Ee.height,Ee.depth,ze,Ze,Ee.data)):n.texImage3D(s.TEXTURE_3D,0,st,Ee.width,Ee.height,Ee.depth,0,ze,Ze,Ee.data);else if(b.isFramebufferTexture){if(Pt)if(ct)n.texStorage2D(s.TEXTURE_2D,Pe,st,Ee.width,Ee.height);else{let ue=Ee.width,ve=Ee.height;for(let De=0;De<Pe;De++)n.texImage2D(s.TEXTURE_2D,De,st,ue,ve,0,ze,Ze,null),ue>>=1,ve>>=1}}else if(gt.length>0){if(ct&&Pt){const ue=Ue(gt[0]);n.texStorage2D(s.TEXTURE_2D,Pe,st,ue.width,ue.height)}for(let ue=0,ve=gt.length;ue<ve;ue++)Ve=gt[ue],ct?q&&n.texSubImage2D(s.TEXTURE_2D,ue,0,0,ze,Ze,Ve):n.texImage2D(s.TEXTURE_2D,ue,st,ze,Ze,Ve);b.generateMipmaps=!1}else if(ct){if(Pt){const ue=Ue(Ee);n.texStorage2D(s.TEXTURE_2D,Pe,st,ue.width,ue.height)}q&&n.texSubImage2D(s.TEXTURE_2D,0,0,0,ze,Ze,Ee)}else n.texImage2D(s.TEXTURE_2D,0,st,ze,Ze,Ee);M(b)&&y(_e),Xe.__version=ge.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function J(I,b,te){if(b.image.length!==6)return;const _e=oe(I,b),ye=b.source;n.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+te);const ge=r.get(ye);if(ye.version!==ge.__version||_e===!0){n.activeTexture(s.TEXTURE0+te);const Xe=Ct.getPrimaries(Ct.workingColorSpace),Re=b.colorSpace===xr?null:Ct.getPrimaries(b.colorSpace),Fe=b.colorSpace===xr||Xe===Re?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);const ft=b.isCompressedTexture||b.image[0].isCompressedTexture,Ee=b.image[0]&&b.image[0].isDataTexture,ze=[];for(let ve=0;ve<6;ve++)!ft&&!Ee?ze[ve]=C(b.image[ve],!0,a.maxCubemapSize):ze[ve]=Ee?b.image[ve].image:b.image[ve],ze[ve]=vt(b,ze[ve]);const Ze=ze[0],st=c.convert(b.format,b.colorSpace),Ve=c.convert(b.type),gt=U(b.internalFormat,st,Ve,b.colorSpace),ct=b.isVideoTexture!==!0,Pt=ge.__version===void 0||_e===!0,q=ye.dataReady;let Pe=Y(b,Ze);B(s.TEXTURE_CUBE_MAP,b);let ue;if(ft){ct&&Pt&&n.texStorage2D(s.TEXTURE_CUBE_MAP,Pe,gt,Ze.width,Ze.height);for(let ve=0;ve<6;ve++){ue=ze[ve].mipmaps;for(let De=0;De<ue.length;De++){const Ie=ue[De];b.format!==ai?st!==null?ct?q&&n.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De,0,0,Ie.width,Ie.height,st,Ie.data):n.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De,gt,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ct?q&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De,0,0,Ie.width,Ie.height,st,Ve,Ie.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De,gt,Ie.width,Ie.height,0,st,Ve,Ie.data)}}}else{if(ue=b.mipmaps,ct&&Pt){ue.length>0&&Pe++;const ve=Ue(ze[0]);n.texStorage2D(s.TEXTURE_CUBE_MAP,Pe,gt,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(Ee){ct?q&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,ze[ve].width,ze[ve].height,st,Ve,ze[ve].data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,gt,ze[ve].width,ze[ve].height,0,st,Ve,ze[ve].data);for(let De=0;De<ue.length;De++){const ut=ue[De].image[ve].image;ct?q&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De+1,0,0,ut.width,ut.height,st,Ve,ut.data):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De+1,gt,ut.width,ut.height,0,st,Ve,ut.data)}}else{ct?q&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,st,Ve,ze[ve]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,gt,st,Ve,ze[ve]);for(let De=0;De<ue.length;De++){const Ie=ue[De];ct?q&&n.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De+1,0,0,st,Ve,Ie.image[ve]):n.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ve,De+1,gt,st,Ve,Ie.image[ve])}}}M(b)&&y(s.TEXTURE_CUBE_MAP),ge.__version=ye.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function ce(I,b,te,_e,ye,ge){const Xe=c.convert(te.format,te.colorSpace),Re=c.convert(te.type),Fe=U(te.internalFormat,Xe,Re,te.colorSpace),ft=r.get(b),Ee=r.get(te);if(Ee.__renderTarget=b,!ft.__hasExternalTextures){const ze=Math.max(1,b.width>>ge),Ze=Math.max(1,b.height>>ge);ye===s.TEXTURE_3D||ye===s.TEXTURE_2D_ARRAY?n.texImage3D(ye,ge,Fe,ze,Ze,b.depth,0,Xe,Re,null):n.texImage2D(ye,ge,Fe,ze,Ze,0,Xe,Re,null)}n.bindFramebuffer(s.FRAMEBUFFER,I),tt(b)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,_e,ye,Ee.__webglTexture,0,it(b)):(ye===s.TEXTURE_2D||ye>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ye<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,_e,ye,Ee.__webglTexture,ge),n.bindFramebuffer(s.FRAMEBUFFER,null)}function ie(I,b,te){if(s.bindRenderbuffer(s.RENDERBUFFER,I),b.depthBuffer){const _e=b.depthTexture,ye=_e&&_e.isDepthTexture?_e.type:null,ge=L(b.stencilBuffer,ye),Xe=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Re=it(b);tt(b)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Re,ge,b.width,b.height):te?s.renderbufferStorageMultisample(s.RENDERBUFFER,Re,ge,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,ge,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Xe,s.RENDERBUFFER,I)}else{const _e=b.textures;for(let ye=0;ye<_e.length;ye++){const ge=_e[ye],Xe=c.convert(ge.format,ge.colorSpace),Re=c.convert(ge.type),Fe=U(ge.internalFormat,Xe,Re,ge.colorSpace),ft=it(b);te&&tt(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ft,Fe,b.width,b.height):tt(b)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ft,Fe,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,Fe,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function xe(I,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(s.FRAMEBUFFER,I),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const _e=r.get(b.depthTexture);_e.__renderTarget=b,(!_e.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),me(b.depthTexture,0);const ye=_e.__webglTexture,ge=it(b);if(b.depthTexture.format===ks)tt(b)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ye,0,ge):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ye,0);else if(b.depthTexture.format===js)tt(b)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ye,0,ge):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ye,0);else throw new Error("Unknown depthTexture format")}function Ae(I){const b=r.get(I),te=I.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==I.depthTexture){const _e=I.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),_e){const ye=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,_e.removeEventListener("dispose",ye)};_e.addEventListener("dispose",ye),b.__depthDisposeCallback=ye}b.__boundDepthTexture=_e}if(I.depthTexture&&!b.__autoAllocateDepthBuffer){if(te)throw new Error("target.depthTexture not supported in Cube render targets");xe(b.__webglFramebuffer,I)}else if(te){b.__webglDepthbuffer=[];for(let _e=0;_e<6;_e++)if(n.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[_e]),b.__webglDepthbuffer[_e]===void 0)b.__webglDepthbuffer[_e]=s.createRenderbuffer(),ie(b.__webglDepthbuffer[_e],I,!1);else{const ye=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ge=b.__webglDepthbuffer[_e];s.bindRenderbuffer(s.RENDERBUFFER,ge),s.framebufferRenderbuffer(s.FRAMEBUFFER,ye,s.RENDERBUFFER,ge)}}else if(n.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),ie(b.__webglDepthbuffer,I,!1);else{const _e=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ye=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ye),s.framebufferRenderbuffer(s.FRAMEBUFFER,_e,s.RENDERBUFFER,ye)}n.bindFramebuffer(s.FRAMEBUFFER,null)}function Ce(I,b,te){const _e=r.get(I);b!==void 0&&ce(_e.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),te!==void 0&&Ae(I)}function Qe(I){const b=I.texture,te=r.get(I),_e=r.get(b);I.addEventListener("dispose",k);const ye=I.textures,ge=I.isWebGLCubeRenderTarget===!0,Xe=ye.length>1;if(Xe||(_e.__webglTexture===void 0&&(_e.__webglTexture=s.createTexture()),_e.__version=b.version,u.memory.textures++),ge){te.__webglFramebuffer=[];for(let Re=0;Re<6;Re++)if(b.mipmaps&&b.mipmaps.length>0){te.__webglFramebuffer[Re]=[];for(let Fe=0;Fe<b.mipmaps.length;Fe++)te.__webglFramebuffer[Re][Fe]=s.createFramebuffer()}else te.__webglFramebuffer[Re]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){te.__webglFramebuffer=[];for(let Re=0;Re<b.mipmaps.length;Re++)te.__webglFramebuffer[Re]=s.createFramebuffer()}else te.__webglFramebuffer=s.createFramebuffer();if(Xe)for(let Re=0,Fe=ye.length;Re<Fe;Re++){const ft=r.get(ye[Re]);ft.__webglTexture===void 0&&(ft.__webglTexture=s.createTexture(),u.memory.textures++)}if(I.samples>0&&tt(I)===!1){te.__webglMultisampledFramebuffer=s.createFramebuffer(),te.__webglColorRenderbuffer=[],n.bindFramebuffer(s.FRAMEBUFFER,te.__webglMultisampledFramebuffer);for(let Re=0;Re<ye.length;Re++){const Fe=ye[Re];te.__webglColorRenderbuffer[Re]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,te.__webglColorRenderbuffer[Re]);const ft=c.convert(Fe.format,Fe.colorSpace),Ee=c.convert(Fe.type),ze=U(Fe.internalFormat,ft,Ee,Fe.colorSpace,I.isXRRenderTarget===!0),Ze=it(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ze,ze,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Re,s.RENDERBUFFER,te.__webglColorRenderbuffer[Re])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(te.__webglDepthRenderbuffer=s.createRenderbuffer(),ie(te.__webglDepthRenderbuffer,I,!0)),n.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ge){n.bindTexture(s.TEXTURE_CUBE_MAP,_e.__webglTexture),B(s.TEXTURE_CUBE_MAP,b);for(let Re=0;Re<6;Re++)if(b.mipmaps&&b.mipmaps.length>0)for(let Fe=0;Fe<b.mipmaps.length;Fe++)ce(te.__webglFramebuffer[Re][Fe],I,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Fe);else ce(te.__webglFramebuffer[Re],I,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0);M(b)&&y(s.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Xe){for(let Re=0,Fe=ye.length;Re<Fe;Re++){const ft=ye[Re],Ee=r.get(ft);n.bindTexture(s.TEXTURE_2D,Ee.__webglTexture),B(s.TEXTURE_2D,ft),ce(te.__webglFramebuffer,I,ft,s.COLOR_ATTACHMENT0+Re,s.TEXTURE_2D,0),M(ft)&&y(s.TEXTURE_2D)}n.unbindTexture()}else{let Re=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Re=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),n.bindTexture(Re,_e.__webglTexture),B(Re,b),b.mipmaps&&b.mipmaps.length>0)for(let Fe=0;Fe<b.mipmaps.length;Fe++)ce(te.__webglFramebuffer[Fe],I,b,s.COLOR_ATTACHMENT0,Re,Fe);else ce(te.__webglFramebuffer,I,b,s.COLOR_ATTACHMENT0,Re,0);M(b)&&y(Re),n.unbindTexture()}I.depthBuffer&&Ae(I)}function nt(I){const b=I.textures;for(let te=0,_e=b.length;te<_e;te++){const ye=b[te];if(M(ye)){const ge=O(I),Xe=r.get(ye).__webglTexture;n.bindTexture(ge,Xe),y(ge),n.unbindTexture()}}}const $e=[],F=[];function Rt(I){if(I.samples>0){if(tt(I)===!1){const b=I.textures,te=I.width,_e=I.height;let ye=s.COLOR_BUFFER_BIT;const ge=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Xe=r.get(I),Re=b.length>1;if(Re)for(let Fe=0;Fe<b.length;Fe++)n.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,null),n.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,null,0);n.bindFramebuffer(s.READ_FRAMEBUFFER,Xe.__webglMultisampledFramebuffer),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Xe.__webglFramebuffer);for(let Fe=0;Fe<b.length;Fe++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ye|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ye|=s.STENCIL_BUFFER_BIT)),Re){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Xe.__webglColorRenderbuffer[Fe]);const ft=r.get(b[Fe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ft,0)}s.blitFramebuffer(0,0,te,_e,0,0,te,_e,ye,s.NEAREST),h===!0&&($e.length=0,F.length=0,$e.push(s.COLOR_ATTACHMENT0+Fe),I.depthBuffer&&I.resolveDepthBuffer===!1&&($e.push(ge),F.push(ge),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,F)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,$e))}if(n.bindFramebuffer(s.READ_FRAMEBUFFER,null),n.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Re)for(let Fe=0;Fe<b.length;Fe++){n.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,Xe.__webglColorRenderbuffer[Fe]);const ft=r.get(b[Fe]).__webglTexture;n.bindFramebuffer(s.FRAMEBUFFER,Xe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,ft,0)}n.bindFramebuffer(s.DRAW_FRAMEBUFFER,Xe.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&h){const b=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function it(I){return Math.min(a.maxSamples,I.samples)}function tt(I){const b=r.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Be(I){const b=u.render.frame;_.get(I)!==b&&(_.set(I,b),I.update())}function vt(I,b){const te=I.colorSpace,_e=I.format,ye=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||te!==Gs&&te!==xr&&(Ct.getTransfer(te)===Lt?(_e!==ai||ye!==Hi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",te)),b}function Ue(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(g.width=I.naturalWidth||I.width,g.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(g.width=I.displayWidth,g.height=I.displayHeight):(g.width=I.width,g.height=I.height),g}this.allocateTextureUnit=ne,this.resetTextureUnits=he,this.setTexture2D=me,this.setTexture2DArray=de,this.setTexture3D=ae,this.setTextureCube=G,this.rebindTextures=Ce,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=Rt,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=tt}function rM(s,e){function n(r,a=xr){let c;const u=Ct.getTransfer(a);if(r===Hi)return s.UNSIGNED_BYTE;if(r===Hd)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Vd)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Fm)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===Dm)return s.BYTE;if(r===Um)return s.SHORT;if(r===Io)return s.UNSIGNED_SHORT;if(r===Bd)return s.INT;if(r===Yr)return s.UNSIGNED_INT;if(r===Oi)return s.FLOAT;if(r===Do)return s.HALF_FLOAT;if(r===km)return s.ALPHA;if(r===Om)return s.RGB;if(r===ai)return s.RGBA;if(r===zm)return s.LUMINANCE;if(r===Bm)return s.LUMINANCE_ALPHA;if(r===ks)return s.DEPTH_COMPONENT;if(r===js)return s.DEPTH_STENCIL;if(r===Hm)return s.RED;if(r===jd)return s.RED_INTEGER;if(r===Vm)return s.RG;if(r===Gd)return s.RG_INTEGER;if(r===Wd)return s.RGBA_INTEGER;if(r===vl||r===_l||r===yl||r===Sl)if(u===Lt)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(r===vl)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===_l)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===yl)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Sl)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(r===vl)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===_l)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===yl)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Sl)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===cd||r===ud||r===dd||r===fd)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(r===cd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ud)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===dd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===fd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===hd||r===pd||r===md)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(r===hd||r===pd)return u===Lt?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(r===md)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===gd||r===xd||r===vd||r===_d||r===yd||r===Sd||r===Md||r===Ed||r===Td||r===wd||r===bd||r===Ad||r===Cd||r===Rd)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(r===gd)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===xd)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===vd)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===_d)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===yd)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Sd)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Md)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Ed)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Td)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===wd)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===bd)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ad)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Cd)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Rd)return u===Lt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ml||r===Pd||r===Ld)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(r===Ml)return u===Lt?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Pd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Ld)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===jm||r===Nd||r===Id||r===Dd)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(r===Ml)return c.COMPRESSED_RED_RGTC1_EXT;if(r===Nd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Id)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Dd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Vs?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:n}}const sM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,oM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class aM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,r){if(this.texture===null){const a=new Tn,c=e.properties.get(a);c.__webglTexture=n.texture,(n.depthNear!==r.depthNear||n.depthFar!==r.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,r=new Sr({vertexShader:sM,fragmentShader:oM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new li(new Nl(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class lM extends Xs{constructor(e,n){super();const r=this;let a=null,c=1,u=null,d="local-floor",h=1,g=null,_=null,S=null,v=null,E=null,w=null;const C=new aM,M=n.getContextAttributes();let y=null,O=null;const U=[],L=[],Y=new It;let z=null;const k=new $n;k.viewport=new Xt;const X=new $n;X.viewport=new Xt;const P=[k,X],R=new Rv;let j=null,he=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let J=U[V];return J===void 0&&(J=new Bu,U[V]=J),J.getTargetRaySpace()},this.getControllerGrip=function(V){let J=U[V];return J===void 0&&(J=new Bu,U[V]=J),J.getGripSpace()},this.getHand=function(V){let J=U[V];return J===void 0&&(J=new Bu,U[V]=J),J.getHandSpace()};function ne(V){const J=L.indexOf(V.inputSource);if(J===-1)return;const ce=U[J];ce!==void 0&&(ce.update(V.inputSource,V.frame,g||u),ce.dispatchEvent({type:V.type,data:V.inputSource}))}function pe(){a.removeEventListener("select",ne),a.removeEventListener("selectstart",ne),a.removeEventListener("selectend",ne),a.removeEventListener("squeeze",ne),a.removeEventListener("squeezestart",ne),a.removeEventListener("squeezeend",ne),a.removeEventListener("end",pe),a.removeEventListener("inputsourceschange",me);for(let V=0;V<U.length;V++){const J=L[V];J!==null&&(L[V]=null,U[V].disconnect(J))}j=null,he=null,C.reset(),e.setRenderTarget(y),E=null,v=null,S=null,a=null,O=null,oe.stop(),r.isPresenting=!1,e.setPixelRatio(z),e.setSize(Y.width,Y.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){c=V,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){d=V,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return g||u},this.setReferenceSpace=function(V){g=V},this.getBaseLayer=function(){return v!==null?v:E},this.getBinding=function(){return S},this.getFrame=function(){return w},this.getSession=function(){return a},this.setSession=async function(V){if(a=V,a!==null){if(y=e.getRenderTarget(),a.addEventListener("select",ne),a.addEventListener("selectstart",ne),a.addEventListener("selectend",ne),a.addEventListener("squeeze",ne),a.addEventListener("squeezestart",ne),a.addEventListener("squeezeend",ne),a.addEventListener("end",pe),a.addEventListener("inputsourceschange",me),M.xrCompatible!==!0&&await n.makeXRCompatible(),z=e.getPixelRatio(),e.getSize(Y),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,ie=null,xe=null;M.depth&&(xe=M.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ce=M.stencil?js:ks,ie=M.stencil?Vs:Yr);const Ae={colorFormat:n.RGBA8,depthFormat:xe,scaleFactor:c};S=new XRWebGLBinding(a,n),v=S.createProjectionLayer(Ae),a.updateRenderState({layers:[v]}),e.setPixelRatio(1),e.setSize(v.textureWidth,v.textureHeight,!1),O=new $r(v.textureWidth,v.textureHeight,{format:ai,type:Hi,depthTexture:new rg(v.textureWidth,v.textureHeight,ie,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1})}else{const ce={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:c};E=new XRWebGLLayer(a,n,ce),a.updateRenderState({baseLayer:E}),e.setPixelRatio(1),e.setSize(E.framebufferWidth,E.framebufferHeight,!1),O=new $r(E.framebufferWidth,E.framebufferHeight,{format:ai,type:Hi,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil})}O.isXRRenderTarget=!0,this.setFoveation(h),g=null,u=await a.requestReferenceSpace(d),oe.setContext(a),oe.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return C.getDepthTexture()};function me(V){for(let J=0;J<V.removed.length;J++){const ce=V.removed[J],ie=L.indexOf(ce);ie>=0&&(L[ie]=null,U[ie].disconnect(ce))}for(let J=0;J<V.added.length;J++){const ce=V.added[J];let ie=L.indexOf(ce);if(ie===-1){for(let Ae=0;Ae<U.length;Ae++)if(Ae>=L.length){L.push(ce),ie=Ae;break}else if(L[Ae]===null){L[Ae]=ce,ie=Ae;break}if(ie===-1)break}const xe=U[ie];xe&&xe.connect(ce)}}const de=new le,ae=new le;function G(V,J,ce){de.setFromMatrixPosition(J.matrixWorld),ae.setFromMatrixPosition(ce.matrixWorld);const ie=de.distanceTo(ae),xe=J.projectionMatrix.elements,Ae=ce.projectionMatrix.elements,Ce=xe[14]/(xe[10]-1),Qe=xe[14]/(xe[10]+1),nt=(xe[9]+1)/xe[5],$e=(xe[9]-1)/xe[5],F=(xe[8]-1)/xe[0],Rt=(Ae[8]+1)/Ae[0],it=Ce*F,tt=Ce*Rt,Be=ie/(-F+Rt),vt=Be*-F;if(J.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(vt),V.translateZ(Be),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),xe[10]===-1)V.projectionMatrix.copy(J.projectionMatrix),V.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const Ue=Ce+Be,I=Qe+Be,b=it-vt,te=tt+(ie-vt),_e=nt*Qe/I*Ue,ye=$e*Qe/I*Ue;V.projectionMatrix.makePerspective(b,te,_e,ye,Ue,I),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function fe(V,J){J===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(J.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(a===null)return;let J=V.near,ce=V.far;C.texture!==null&&(C.depthNear>0&&(J=C.depthNear),C.depthFar>0&&(ce=C.depthFar)),R.near=X.near=k.near=J,R.far=X.far=k.far=ce,(j!==R.near||he!==R.far)&&(a.updateRenderState({depthNear:R.near,depthFar:R.far}),j=R.near,he=R.far),k.layers.mask=V.layers.mask|2,X.layers.mask=V.layers.mask|4,R.layers.mask=k.layers.mask|X.layers.mask;const ie=V.parent,xe=R.cameras;fe(R,ie);for(let Ae=0;Ae<xe.length;Ae++)fe(xe[Ae],ie);xe.length===2?G(R,k,X):R.projectionMatrix.copy(k.projectionMatrix),N(V,R,ie)};function N(V,J,ce){ce===null?V.matrix.copy(J.matrixWorld):(V.matrix.copy(ce.matrixWorld),V.matrix.invert(),V.matrix.multiply(J.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(J.projectionMatrix),V.projectionMatrixInverse.copy(J.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Ud*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(v===null&&E===null))return h},this.setFoveation=function(V){h=V,v!==null&&(v.fixedFoveation=V),E!==null&&E.fixedFoveation!==void 0&&(E.fixedFoveation=V)},this.hasDepthSensing=function(){return C.texture!==null},this.getDepthSensingMesh=function(){return C.getMesh(R)};let x=null;function B(V,J){if(_=J.getViewerPose(g||u),w=J,_!==null){const ce=_.views;E!==null&&(e.setRenderTargetFramebuffer(O,E.framebuffer),e.setRenderTarget(O));let ie=!1;ce.length!==R.cameras.length&&(R.cameras.length=0,ie=!0);for(let Ce=0;Ce<ce.length;Ce++){const Qe=ce[Ce];let nt=null;if(E!==null)nt=E.getViewport(Qe);else{const F=S.getViewSubImage(v,Qe);nt=F.viewport,Ce===0&&(e.setRenderTargetTextures(O,F.colorTexture,v.ignoreDepthValues?void 0:F.depthStencilTexture),e.setRenderTarget(O))}let $e=P[Ce];$e===void 0&&($e=new $n,$e.layers.enable(Ce),$e.viewport=new Xt,P[Ce]=$e),$e.matrix.fromArray(Qe.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(Qe.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(nt.x,nt.y,nt.width,nt.height),Ce===0&&(R.matrix.copy($e.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),ie===!0&&R.cameras.push($e)}const xe=a.enabledFeatures;if(xe&&xe.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&S){const Ce=S.getDepthInformation(ce[0]);Ce&&Ce.isValid&&Ce.texture&&C.init(e,Ce,a.renderState)}}for(let ce=0;ce<U.length;ce++){const ie=L[ce],xe=U[ce];ie!==null&&xe!==void 0&&xe.update(ie,J,g||u)}x&&x(V,J),J.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:J}),w=null}const oe=new sg;oe.setAnimationLoop(B),this.setAnimationLoop=function(V){x=V},this.dispose=function(){}}}const Hr=new Vi,cM=new qt;function uM(s,e){function n(M,y){M.matrixAutoUpdate===!0&&M.updateMatrix(),y.value.copy(M.matrix)}function r(M,y){y.color.getRGB(M.fogColor.value,Jm(s)),y.isFog?(M.fogNear.value=y.near,M.fogFar.value=y.far):y.isFogExp2&&(M.fogDensity.value=y.density)}function a(M,y,O,U,L){y.isMeshBasicMaterial||y.isMeshLambertMaterial?c(M,y):y.isMeshToonMaterial?(c(M,y),S(M,y)):y.isMeshPhongMaterial?(c(M,y),_(M,y)):y.isMeshStandardMaterial?(c(M,y),v(M,y),y.isMeshPhysicalMaterial&&E(M,y,L)):y.isMeshMatcapMaterial?(c(M,y),w(M,y)):y.isMeshDepthMaterial?c(M,y):y.isMeshDistanceMaterial?(c(M,y),C(M,y)):y.isMeshNormalMaterial?c(M,y):y.isLineBasicMaterial?(u(M,y),y.isLineDashedMaterial&&d(M,y)):y.isPointsMaterial?h(M,y,O,U):y.isSpriteMaterial?g(M,y):y.isShadowMaterial?(M.color.value.copy(y.color),M.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function c(M,y){M.opacity.value=y.opacity,y.color&&M.diffuse.value.copy(y.color),y.emissive&&M.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(M.map.value=y.map,n(y.map,M.mapTransform)),y.alphaMap&&(M.alphaMap.value=y.alphaMap,n(y.alphaMap,M.alphaMapTransform)),y.bumpMap&&(M.bumpMap.value=y.bumpMap,n(y.bumpMap,M.bumpMapTransform),M.bumpScale.value=y.bumpScale,y.side===In&&(M.bumpScale.value*=-1)),y.normalMap&&(M.normalMap.value=y.normalMap,n(y.normalMap,M.normalMapTransform),M.normalScale.value.copy(y.normalScale),y.side===In&&M.normalScale.value.negate()),y.displacementMap&&(M.displacementMap.value=y.displacementMap,n(y.displacementMap,M.displacementMapTransform),M.displacementScale.value=y.displacementScale,M.displacementBias.value=y.displacementBias),y.emissiveMap&&(M.emissiveMap.value=y.emissiveMap,n(y.emissiveMap,M.emissiveMapTransform)),y.specularMap&&(M.specularMap.value=y.specularMap,n(y.specularMap,M.specularMapTransform)),y.alphaTest>0&&(M.alphaTest.value=y.alphaTest);const O=e.get(y),U=O.envMap,L=O.envMapRotation;U&&(M.envMap.value=U,Hr.copy(L),Hr.x*=-1,Hr.y*=-1,Hr.z*=-1,U.isCubeTexture&&U.isRenderTargetTexture===!1&&(Hr.y*=-1,Hr.z*=-1),M.envMapRotation.value.setFromMatrix4(cM.makeRotationFromEuler(Hr)),M.flipEnvMap.value=U.isCubeTexture&&U.isRenderTargetTexture===!1?-1:1,M.reflectivity.value=y.reflectivity,M.ior.value=y.ior,M.refractionRatio.value=y.refractionRatio),y.lightMap&&(M.lightMap.value=y.lightMap,M.lightMapIntensity.value=y.lightMapIntensity,n(y.lightMap,M.lightMapTransform)),y.aoMap&&(M.aoMap.value=y.aoMap,M.aoMapIntensity.value=y.aoMapIntensity,n(y.aoMap,M.aoMapTransform))}function u(M,y){M.diffuse.value.copy(y.color),M.opacity.value=y.opacity,y.map&&(M.map.value=y.map,n(y.map,M.mapTransform))}function d(M,y){M.dashSize.value=y.dashSize,M.totalSize.value=y.dashSize+y.gapSize,M.scale.value=y.scale}function h(M,y,O,U){M.diffuse.value.copy(y.color),M.opacity.value=y.opacity,M.size.value=y.size*O,M.scale.value=U*.5,y.map&&(M.map.value=y.map,n(y.map,M.uvTransform)),y.alphaMap&&(M.alphaMap.value=y.alphaMap,n(y.alphaMap,M.alphaMapTransform)),y.alphaTest>0&&(M.alphaTest.value=y.alphaTest)}function g(M,y){M.diffuse.value.copy(y.color),M.opacity.value=y.opacity,M.rotation.value=y.rotation,y.map&&(M.map.value=y.map,n(y.map,M.mapTransform)),y.alphaMap&&(M.alphaMap.value=y.alphaMap,n(y.alphaMap,M.alphaMapTransform)),y.alphaTest>0&&(M.alphaTest.value=y.alphaTest)}function _(M,y){M.specular.value.copy(y.specular),M.shininess.value=Math.max(y.shininess,1e-4)}function S(M,y){y.gradientMap&&(M.gradientMap.value=y.gradientMap)}function v(M,y){M.metalness.value=y.metalness,y.metalnessMap&&(M.metalnessMap.value=y.metalnessMap,n(y.metalnessMap,M.metalnessMapTransform)),M.roughness.value=y.roughness,y.roughnessMap&&(M.roughnessMap.value=y.roughnessMap,n(y.roughnessMap,M.roughnessMapTransform)),y.envMap&&(M.envMapIntensity.value=y.envMapIntensity)}function E(M,y,O){M.ior.value=y.ior,y.sheen>0&&(M.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),M.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(M.sheenColorMap.value=y.sheenColorMap,n(y.sheenColorMap,M.sheenColorMapTransform)),y.sheenRoughnessMap&&(M.sheenRoughnessMap.value=y.sheenRoughnessMap,n(y.sheenRoughnessMap,M.sheenRoughnessMapTransform))),y.clearcoat>0&&(M.clearcoat.value=y.clearcoat,M.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(M.clearcoatMap.value=y.clearcoatMap,n(y.clearcoatMap,M.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,n(y.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(M.clearcoatNormalMap.value=y.clearcoatNormalMap,n(y.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===In&&M.clearcoatNormalScale.value.negate())),y.dispersion>0&&(M.dispersion.value=y.dispersion),y.iridescence>0&&(M.iridescence.value=y.iridescence,M.iridescenceIOR.value=y.iridescenceIOR,M.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(M.iridescenceMap.value=y.iridescenceMap,n(y.iridescenceMap,M.iridescenceMapTransform)),y.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=y.iridescenceThicknessMap,n(y.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),y.transmission>0&&(M.transmission.value=y.transmission,M.transmissionSamplerMap.value=O.texture,M.transmissionSamplerSize.value.set(O.width,O.height),y.transmissionMap&&(M.transmissionMap.value=y.transmissionMap,n(y.transmissionMap,M.transmissionMapTransform)),M.thickness.value=y.thickness,y.thicknessMap&&(M.thicknessMap.value=y.thicknessMap,n(y.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=y.attenuationDistance,M.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(M.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(M.anisotropyMap.value=y.anisotropyMap,n(y.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=y.specularIntensity,M.specularColor.value.copy(y.specularColor),y.specularColorMap&&(M.specularColorMap.value=y.specularColorMap,n(y.specularColorMap,M.specularColorMapTransform)),y.specularIntensityMap&&(M.specularIntensityMap.value=y.specularIntensityMap,n(y.specularIntensityMap,M.specularIntensityMapTransform))}function w(M,y){y.matcap&&(M.matcap.value=y.matcap)}function C(M,y){const O=e.get(y).light;M.referencePosition.value.setFromMatrixPosition(O.matrixWorld),M.nearDistance.value=O.shadow.camera.near,M.farDistance.value=O.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function dM(s,e,n,r){let a={},c={},u=[];const d=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(O,U){const L=U.program;r.uniformBlockBinding(O,L)}function g(O,U){let L=a[O.id];L===void 0&&(w(O),L=_(O),a[O.id]=L,O.addEventListener("dispose",M));const Y=U.program;r.updateUBOMapping(O,Y);const z=e.render.frame;c[O.id]!==z&&(v(O),c[O.id]=z)}function _(O){const U=S();O.__bindingPointIndex=U;const L=s.createBuffer(),Y=O.__size,z=O.usage;return s.bindBuffer(s.UNIFORM_BUFFER,L),s.bufferData(s.UNIFORM_BUFFER,Y,z),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,U,L),L}function S(){for(let O=0;O<d;O++)if(u.indexOf(O)===-1)return u.push(O),O;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(O){const U=a[O.id],L=O.uniforms,Y=O.__cache;s.bindBuffer(s.UNIFORM_BUFFER,U);for(let z=0,k=L.length;z<k;z++){const X=Array.isArray(L[z])?L[z]:[L[z]];for(let P=0,R=X.length;P<R;P++){const j=X[P];if(E(j,z,P,Y)===!0){const he=j.__offset,ne=Array.isArray(j.value)?j.value:[j.value];let pe=0;for(let me=0;me<ne.length;me++){const de=ne[me],ae=C(de);typeof de=="number"||typeof de=="boolean"?(j.__data[0]=de,s.bufferSubData(s.UNIFORM_BUFFER,he+pe,j.__data)):de.isMatrix3?(j.__data[0]=de.elements[0],j.__data[1]=de.elements[1],j.__data[2]=de.elements[2],j.__data[3]=0,j.__data[4]=de.elements[3],j.__data[5]=de.elements[4],j.__data[6]=de.elements[5],j.__data[7]=0,j.__data[8]=de.elements[6],j.__data[9]=de.elements[7],j.__data[10]=de.elements[8],j.__data[11]=0):(de.toArray(j.__data,pe),pe+=ae.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,he,j.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function E(O,U,L,Y){const z=O.value,k=U+"_"+L;if(Y[k]===void 0)return typeof z=="number"||typeof z=="boolean"?Y[k]=z:Y[k]=z.clone(),!0;{const X=Y[k];if(typeof z=="number"||typeof z=="boolean"){if(X!==z)return Y[k]=z,!0}else if(X.equals(z)===!1)return X.copy(z),!0}return!1}function w(O){const U=O.uniforms;let L=0;const Y=16;for(let k=0,X=U.length;k<X;k++){const P=Array.isArray(U[k])?U[k]:[U[k]];for(let R=0,j=P.length;R<j;R++){const he=P[R],ne=Array.isArray(he.value)?he.value:[he.value];for(let pe=0,me=ne.length;pe<me;pe++){const de=ne[pe],ae=C(de),G=L%Y,fe=G%ae.boundary,N=G+fe;L+=fe,N!==0&&Y-N<ae.storage&&(L+=Y-N),he.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),he.__offset=L,L+=ae.storage}}}const z=L%Y;return z>0&&(L+=Y-z),O.__size=L,O.__cache={},this}function C(O){const U={boundary:0,storage:0};return typeof O=="number"||typeof O=="boolean"?(U.boundary=4,U.storage=4):O.isVector2?(U.boundary=8,U.storage=8):O.isVector3||O.isColor?(U.boundary=16,U.storage=12):O.isVector4?(U.boundary=16,U.storage=16):O.isMatrix3?(U.boundary=48,U.storage=48):O.isMatrix4?(U.boundary=64,U.storage=64):O.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",O),U}function M(O){const U=O.target;U.removeEventListener("dispose",M);const L=u.indexOf(U.__bindingPointIndex);u.splice(L,1),s.deleteBuffer(a[U.id]),delete a[U.id],delete c[U.id]}function y(){for(const O in a)s.deleteBuffer(a[O]);u=[],a={},c={}}return{bind:h,update:g,dispose:y}}class fM{constructor(e={}){const{canvas:n=qx(),context:r=null,depth:a=!0,stencil:c=!1,alpha:u=!1,antialias:d=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:g=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:S=!1,reverseDepthBuffer:v=!1}=e;this.isWebGLRenderer=!0;let E;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=r.getContextAttributes().alpha}else E=u;const w=new Uint32Array(4),C=new Int32Array(4);let M=null,y=null;const O=[],U=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Yn,this.toneMapping=_r,this.toneMappingExposure=1;const L=this;let Y=!1,z=0,k=0,X=null,P=-1,R=null;const j=new Xt,he=new Xt;let ne=null;const pe=new bt(0);let me=0,de=n.width,ae=n.height,G=1,fe=null,N=null;const x=new Xt(0,0,de,ae),B=new Xt(0,0,de,ae);let oe=!1;const V=new ng;let J=!1,ce=!1;this.transmissionResolutionScale=1;const ie=new qt,xe=new qt,Ae=new le,Ce=new Xt,Qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let nt=!1;function $e(){return X===null?G:1}let F=r;function Rt(A,$){return n.getContext(A,$)}try{const A={alpha:!0,depth:a,stencil:c,antialias:d,premultipliedAlpha:h,preserveDrawingBuffer:g,powerPreference:_,failIfMajorPerformanceCaveat:S};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${zd}`),n.addEventListener("webglcontextlost",ve,!1),n.addEventListener("webglcontextrestored",De,!1),n.addEventListener("webglcontextcreationerror",Ie,!1),F===null){const $="webgl2";if(F=Rt($,A),F===null)throw Rt($)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let it,tt,Be,vt,Ue,I,b,te,_e,ye,ge,Xe,Re,Fe,ft,Ee,ze,Ze,st,Ve,gt,ct,Pt,q;function Pe(){it=new M1(F),it.init(),ct=new rM(F,it),tt=new g1(F,it,e,ct),Be=new nM(F,it),tt.reverseDepthBuffer&&v&&Be.buffers.depth.setReversed(!0),vt=new w1(F),Ue=new jS,I=new iM(F,it,Be,Ue,tt,ct,vt),b=new v1(L),te=new S1(L),_e=new Nv(F),Pt=new p1(F,_e),ye=new E1(F,_e,vt,Pt),ge=new A1(F,ye,_e,vt),st=new b1(F,tt,I),Ee=new x1(Ue),Xe=new VS(L,b,te,it,tt,Pt,Ee),Re=new uM(L,Ue),Fe=new WS,ft=new ZS(it),Ze=new h1(L,b,te,Be,ge,E,h),ze=new eM(L,ge,tt),q=new dM(F,vt,tt,Be),Ve=new m1(F,it,vt),gt=new T1(F,it,vt),vt.programs=Xe.programs,L.capabilities=tt,L.extensions=it,L.properties=Ue,L.renderLists=Fe,L.shadowMap=ze,L.state=Be,L.info=vt}Pe();const ue=new lM(L,F);this.xr=ue,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const A=it.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=it.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(A){A!==void 0&&(G=A,this.setSize(de,ae,!1))},this.getSize=function(A){return A.set(de,ae)},this.setSize=function(A,$,re=!0){if(ue.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}de=A,ae=$,n.width=Math.floor(A*G),n.height=Math.floor($*G),re===!0&&(n.style.width=A+"px",n.style.height=$+"px"),this.setViewport(0,0,A,$)},this.getDrawingBufferSize=function(A){return A.set(de*G,ae*G).floor()},this.setDrawingBufferSize=function(A,$,re){de=A,ae=$,G=re,n.width=Math.floor(A*re),n.height=Math.floor($*re),this.setViewport(0,0,A,$)},this.getCurrentViewport=function(A){return A.copy(j)},this.getViewport=function(A){return A.copy(x)},this.setViewport=function(A,$,re,Q){A.isVector4?x.set(A.x,A.y,A.z,A.w):x.set(A,$,re,Q),Be.viewport(j.copy(x).multiplyScalar(G).round())},this.getScissor=function(A){return A.copy(B)},this.setScissor=function(A,$,re,Q){A.isVector4?B.set(A.x,A.y,A.z,A.w):B.set(A,$,re,Q),Be.scissor(he.copy(B).multiplyScalar(G).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(A){Be.setScissorTest(oe=A)},this.setOpaqueSort=function(A){fe=A},this.setTransparentSort=function(A){N=A},this.getClearColor=function(A){return A.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor.apply(Ze,arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha.apply(Ze,arguments)},this.clear=function(A=!0,$=!0,re=!0){let Q=0;if(A){let K=!1;if(X!==null){const we=X.texture.format;K=we===Wd||we===Gd||we===jd}if(K){const we=X.texture.type,Le=we===Hi||we===Yr||we===Io||we===Vs||we===Hd||we===Vd,ke=Ze.getClearColor(),je=Ze.getClearAlpha(),ot=ke.r,rt=ke.g,We=ke.b;Le?(w[0]=ot,w[1]=rt,w[2]=We,w[3]=je,F.clearBufferuiv(F.COLOR,0,w)):(C[0]=ot,C[1]=rt,C[2]=We,C[3]=je,F.clearBufferiv(F.COLOR,0,C))}else Q|=F.COLOR_BUFFER_BIT}$&&(Q|=F.DEPTH_BUFFER_BIT),re&&(Q|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ve,!1),n.removeEventListener("webglcontextrestored",De,!1),n.removeEventListener("webglcontextcreationerror",Ie,!1),Ze.dispose(),Fe.dispose(),ft.dispose(),Ue.dispose(),b.dispose(),te.dispose(),ge.dispose(),Pt.dispose(),q.dispose(),Xe.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",Kr),ue.removeEventListener("sessionend",ji),yi.stop()};function ve(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),Y=!0}function De(){console.log("THREE.WebGLRenderer: Context Restored."),Y=!1;const A=vt.autoReset,$=ze.enabled,re=ze.autoUpdate,Q=ze.needsUpdate,K=ze.type;Pe(),vt.autoReset=A,ze.enabled=$,ze.autoUpdate=re,ze.needsUpdate=Q,ze.type=K}function Ie(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ut(A){const $=A.target;$.removeEventListener("dispose",ut),Ut($)}function Ut(A){Kt(A),Ue.remove(A)}function Kt(A){const $=Ue.get(A).programs;$!==void 0&&($.forEach(function(re){Xe.releaseProgram(re)}),A.isShaderMaterial&&Xe.releaseShaderCache(A))}this.renderBufferDirect=function(A,$,re,Q,K,we){$===null&&($=Qe);const Le=K.isMesh&&K.matrixWorld.determinant()<0,ke=Vo(A,$,re,Q,K);Be.setMaterial(Q,Le);let je=re.index,ot=1;if(Q.wireframe===!0){if(je=ye.getWireframeAttribute(re),je===void 0)return;ot=2}const rt=re.drawRange,We=re.attributes.position;let yt=rt.start*ot,ht=(rt.start+rt.count)*ot;we!==null&&(yt=Math.max(yt,we.start*ot),ht=Math.min(ht,(we.start+we.count)*ot)),je!==null?(yt=Math.max(yt,0),ht=Math.min(ht,je.count)):We!=null&&(yt=Math.max(yt,0),ht=Math.min(ht,We.count));const Vt=ht-yt;if(Vt<0||Vt===1/0)return;Pt.setup(K,Q,ke,re,je);let Ot,Mt=Ve;if(je!==null&&(Ot=_e.get(je),Mt=gt,Mt.setIndex(Ot)),K.isMesh)Q.wireframe===!0?(Be.setLineWidth(Q.wireframeLinewidth*$e()),Mt.setMode(F.LINES)):Mt.setMode(F.TRIANGLES);else if(K.isLine){let Ke=Q.linewidth;Ke===void 0&&(Ke=1),Be.setLineWidth(Ke*$e()),K.isLineSegments?Mt.setMode(F.LINES):K.isLineLoop?Mt.setMode(F.LINE_LOOP):Mt.setMode(F.LINE_STRIP)}else K.isPoints?Mt.setMode(F.POINTS):K.isSprite&&Mt.setMode(F.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)Mt.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if(it.get("WEBGL_multi_draw"))Mt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Ke=K._multiDrawStarts,jt=K._multiDrawCounts,_t=K._multiDrawCount,dn=je?_e.get(je).bytesPerElement:1,Wi=Ue.get(Q).currentProgram.getUniforms();for(let yn=0;yn<_t;yn++)Wi.setValue(F,"_gl_DrawID",yn),Mt.render(Ke[yn]/dn,jt[yn])}else if(K.isInstancedMesh)Mt.renderInstances(yt,Vt,K.count);else if(re.isInstancedBufferGeometry){const Ke=re._maxInstanceCount!==void 0?re._maxInstanceCount:1/0,jt=Math.min(re.instanceCount,Ke);Mt.renderInstances(yt,Vt,jt)}else Mt.render(yt,Vt)};function Et(A,$,re){A.transparent===!0&&A.side===ki&&A.forceSinglePass===!1?(A.side=In,A.needsUpdate=!0,Zr(A,$,re),A.side=yr,A.needsUpdate=!0,Zr(A,$,re),A.side=ki):Zr(A,$,re)}this.compile=function(A,$,re=null){re===null&&(re=A),y=ft.get(re),y.init($),U.push(y),re.traverseVisible(function(K){K.isLight&&K.layers.test($.layers)&&(y.pushLight(K),K.castShadow&&y.pushShadow(K))}),A!==re&&A.traverseVisible(function(K){K.isLight&&K.layers.test($.layers)&&(y.pushLight(K),K.castShadow&&y.pushShadow(K))}),y.setupLights();const Q=new Set;return A.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const we=K.material;if(we)if(Array.isArray(we))for(let Le=0;Le<we.length;Le++){const ke=we[Le];Et(ke,re,K),Q.add(ke)}else Et(we,re,K),Q.add(we)}),U.pop(),y=null,Q},this.compileAsync=function(A,$,re=null){const Q=this.compile(A,$,re);return new Promise(K=>{function we(){if(Q.forEach(function(Le){Ue.get(Le).currentProgram.isReady()&&Q.delete(Le)}),Q.size===0){K(A);return}setTimeout(we,10)}it.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let wn=null;function _n(A){wn&&wn(A)}function Kr(){yi.stop()}function ji(){yi.start()}const yi=new sg;yi.setAnimationLoop(_n),typeof self<"u"&&yi.setContext(self),this.setAnimationLoop=function(A){wn=A,ue.setAnimationLoop(A),A===null?yi.stop():yi.start()},ue.addEventListener("sessionstart",Kr),ue.addEventListener("sessionend",ji),this.render=function(A,$){if($!==void 0&&$.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Y===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(ue.cameraAutoUpdate===!0&&ue.updateCamera($),$=ue.getCamera()),A.isScene===!0&&A.onBeforeRender(L,A,$,X),y=ft.get(A,U.length),y.init($),U.push(y),xe.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),V.setFromProjectionMatrix(xe),ce=this.localClippingEnabled,J=Ee.init(this.clippingPlanes,ce),M=Fe.get(A,O.length),M.init(),O.push(M),ue.enabled===!0&&ue.isPresenting===!0){const we=L.xr.getDepthSensingMesh();we!==null&&Si(we,$,-1/0,L.sortObjects)}Si(A,$,0,L.sortObjects),M.finish(),L.sortObjects===!0&&M.sort(fe,N),nt=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,nt&&Ze.addToRenderList(M,A),this.info.render.frame++,J===!0&&Ee.beginShadows();const re=y.state.shadowsArray;ze.render(re,A,$),J===!0&&Ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const Q=M.opaque,K=M.transmissive;if(y.setupLights(),$.isArrayCamera){const we=$.cameras;if(K.length>0)for(let Le=0,ke=we.length;Le<ke;Le++){const je=we[Le];Er(Q,K,A,je)}nt&&Ze.render(A);for(let Le=0,ke=we.length;Le<ke;Le++){const je=we[Le];Mr(M,A,je,je.viewport)}}else K.length>0&&Er(Q,K,A,$),nt&&Ze.render(A),Mr(M,A,$);X!==null&&k===0&&(I.updateMultisampleRenderTarget(X),I.updateRenderTargetMipmap(X)),A.isScene===!0&&A.onAfterRender(L,A,$),Pt.resetDefaultState(),P=-1,R=null,U.pop(),U.length>0?(y=U[U.length-1],J===!0&&Ee.setGlobalState(L.clippingPlanes,y.state.camera)):y=null,O.pop(),O.length>0?M=O[O.length-1]:M=null};function Si(A,$,re,Q){if(A.visible===!1)return;if(A.layers.test($.layers)){if(A.isGroup)re=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update($);else if(A.isLight)y.pushLight(A),A.castShadow&&y.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||V.intersectsSprite(A)){Q&&Ce.setFromMatrixPosition(A.matrixWorld).applyMatrix4(xe);const Le=ge.update(A),ke=A.material;ke.visible&&M.push(A,Le,ke,re,Ce.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||V.intersectsObject(A))){const Le=ge.update(A),ke=A.material;if(Q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ce.copy(A.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),Ce.copy(Le.boundingSphere.center)),Ce.applyMatrix4(A.matrixWorld).applyMatrix4(xe)),Array.isArray(ke)){const je=Le.groups;for(let ot=0,rt=je.length;ot<rt;ot++){const We=je[ot],yt=ke[We.materialIndex];yt&&yt.visible&&M.push(A,Le,yt,re,Ce.z,We)}}else ke.visible&&M.push(A,Le,ke,re,Ce.z,null)}}const we=A.children;for(let Le=0,ke=we.length;Le<ke;Le++)Si(we[Le],$,re,Q)}function Mr(A,$,re,Q){const K=A.opaque,we=A.transmissive,Le=A.transparent;y.setupLightsView(re),J===!0&&Ee.setGlobalState(L.clippingPlanes,re),Q&&Be.viewport(j.copy(Q)),K.length>0&&Gi(K,$,re),we.length>0&&Gi(we,$,re),Le.length>0&&Gi(Le,$,re),Be.buffers.depth.setTest(!0),Be.buffers.depth.setMask(!0),Be.buffers.color.setMask(!0),Be.setPolygonOffset(!1)}function Er(A,$,re,Q){if((re.isScene===!0?re.overrideMaterial:null)!==null)return;y.state.transmissionRenderTarget[Q.id]===void 0&&(y.state.transmissionRenderTarget[Q.id]=new $r(1,1,{generateMipmaps:!0,type:it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float")?Do:Hi,minFilter:qr,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ct.workingColorSpace}));const we=y.state.transmissionRenderTarget[Q.id],Le=Q.viewport||j;we.setSize(Le.z*L.transmissionResolutionScale,Le.w*L.transmissionResolutionScale);const ke=L.getRenderTarget();L.setRenderTarget(we),L.getClearColor(pe),me=L.getClearAlpha(),me<1&&L.setClearColor(16777215,.5),L.clear(),nt&&Ze.render(re);const je=L.toneMapping;L.toneMapping=_r;const ot=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),y.setupLightsView(Q),J===!0&&Ee.setGlobalState(L.clippingPlanes,Q),Gi(A,re,Q),I.updateMultisampleRenderTarget(we),I.updateRenderTargetMipmap(we),it.has("WEBGL_multisampled_render_to_texture")===!1){let rt=!1;for(let We=0,yt=$.length;We<yt;We++){const ht=$[We],Vt=ht.object,Ot=ht.geometry,Mt=ht.material,Ke=ht.group;if(Mt.side===ki&&Vt.layers.test(Q.layers)){const jt=Mt.side;Mt.side=In,Mt.needsUpdate=!0,Bo(Vt,re,Q,Ot,Mt,Ke),Mt.side=jt,Mt.needsUpdate=!0,rt=!0}}rt===!0&&(I.updateMultisampleRenderTarget(we),I.updateRenderTargetMipmap(we))}L.setRenderTarget(ke),L.setClearColor(pe,me),ot!==void 0&&(Q.viewport=ot),L.toneMapping=je}function Gi(A,$,re){const Q=$.isScene===!0?$.overrideMaterial:null;for(let K=0,we=A.length;K<we;K++){const Le=A[K],ke=Le.object,je=Le.geometry,ot=Q===null?Le.material:Q,rt=Le.group;ke.layers.test(re.layers)&&Bo(ke,$,re,je,ot,rt)}}function Bo(A,$,re,Q,K,we){A.onBeforeRender(L,$,re,Q,K,we),A.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),K.onBeforeRender(L,$,re,Q,A,we),K.transparent===!0&&K.side===ki&&K.forceSinglePass===!1?(K.side=In,K.needsUpdate=!0,L.renderBufferDirect(re,$,Q,K,A,we),K.side=yr,K.needsUpdate=!0,L.renderBufferDirect(re,$,Q,K,A,we),K.side=ki):L.renderBufferDirect(re,$,Q,K,A,we),A.onAfterRender(L,$,re,Q,K,we)}function Zr(A,$,re){$.isScene!==!0&&($=Qe);const Q=Ue.get(A),K=y.state.lights,we=y.state.shadowsArray,Le=K.state.version,ke=Xe.getParameters(A,K.state,we,$,re),je=Xe.getProgramCacheKey(ke);let ot=Q.programs;Q.environment=A.isMeshStandardMaterial?$.environment:null,Q.fog=$.fog,Q.envMap=(A.isMeshStandardMaterial?te:b).get(A.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&A.envMap===null?$.environmentRotation:A.envMapRotation,ot===void 0&&(A.addEventListener("dispose",ut),ot=new Map,Q.programs=ot);let rt=ot.get(je);if(rt!==void 0){if(Q.currentProgram===rt&&Q.lightsStateVersion===Le)return ui(A,ke),rt}else ke.uniforms=Xe.getUniforms(A),A.onBeforeCompile(ke,L),rt=Xe.acquireProgram(ke,je),ot.set(je,rt),Q.uniforms=ke.uniforms;const We=Q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(We.clippingPlanes=Ee.uniform),ui(A,ke),Q.needsLights=Fl(A),Q.lightsStateVersion=Le,Q.needsLights&&(We.ambientLightColor.value=K.state.ambient,We.lightProbe.value=K.state.probe,We.directionalLights.value=K.state.directional,We.directionalLightShadows.value=K.state.directionalShadow,We.spotLights.value=K.state.spot,We.spotLightShadows.value=K.state.spotShadow,We.rectAreaLights.value=K.state.rectArea,We.ltc_1.value=K.state.rectAreaLTC1,We.ltc_2.value=K.state.rectAreaLTC2,We.pointLights.value=K.state.point,We.pointLightShadows.value=K.state.pointShadow,We.hemisphereLights.value=K.state.hemi,We.directionalShadowMap.value=K.state.directionalShadowMap,We.directionalShadowMatrix.value=K.state.directionalShadowMatrix,We.spotShadowMap.value=K.state.spotShadowMap,We.spotLightMatrix.value=K.state.spotLightMatrix,We.spotLightMap.value=K.state.spotLightMap,We.pointShadowMap.value=K.state.pointShadowMap,We.pointShadowMatrix.value=K.state.pointShadowMatrix),Q.currentProgram=rt,Q.uniformsList=null,rt}function Ho(A){if(A.uniformsList===null){const $=A.currentProgram.getUniforms();A.uniformsList=El.seqWithValue($.seq,A.uniforms)}return A.uniformsList}function ui(A,$){const re=Ue.get(A);re.outputColorSpace=$.outputColorSpace,re.batching=$.batching,re.batchingColor=$.batchingColor,re.instancing=$.instancing,re.instancingColor=$.instancingColor,re.instancingMorph=$.instancingMorph,re.skinning=$.skinning,re.morphTargets=$.morphTargets,re.morphNormals=$.morphNormals,re.morphColors=$.morphColors,re.morphTargetsCount=$.morphTargetsCount,re.numClippingPlanes=$.numClippingPlanes,re.numIntersection=$.numClipIntersection,re.vertexAlphas=$.vertexAlphas,re.vertexTangents=$.vertexTangents,re.toneMapping=$.toneMapping}function Vo(A,$,re,Q,K){$.isScene!==!0&&($=Qe),I.resetTextureUnits();const we=$.fog,Le=Q.isMeshStandardMaterial?$.environment:null,ke=X===null?L.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:Gs,je=(Q.isMeshStandardMaterial?te:b).get(Q.envMap||Le),ot=Q.vertexColors===!0&&!!re.attributes.color&&re.attributes.color.itemSize===4,rt=!!re.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),We=!!re.morphAttributes.position,yt=!!re.morphAttributes.normal,ht=!!re.morphAttributes.color;let Vt=_r;Q.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Vt=L.toneMapping);const Ot=re.morphAttributes.position||re.morphAttributes.normal||re.morphAttributes.color,Mt=Ot!==void 0?Ot.length:0,Ke=Ue.get(Q),jt=y.state.lights;if(J===!0&&(ce===!0||A!==R)){const ln=A===R&&Q.id===P;Ee.setState(Q,A,ln)}let _t=!1;Q.version===Ke.__version?(Ke.needsLights&&Ke.lightsStateVersion!==jt.state.version||Ke.outputColorSpace!==ke||K.isBatchedMesh&&Ke.batching===!1||!K.isBatchedMesh&&Ke.batching===!0||K.isBatchedMesh&&Ke.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Ke.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Ke.instancing===!1||!K.isInstancedMesh&&Ke.instancing===!0||K.isSkinnedMesh&&Ke.skinning===!1||!K.isSkinnedMesh&&Ke.skinning===!0||K.isInstancedMesh&&Ke.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ke.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ke.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ke.instancingMorph===!1&&K.morphTexture!==null||Ke.envMap!==je||Q.fog===!0&&Ke.fog!==we||Ke.numClippingPlanes!==void 0&&(Ke.numClippingPlanes!==Ee.numPlanes||Ke.numIntersection!==Ee.numIntersection)||Ke.vertexAlphas!==ot||Ke.vertexTangents!==rt||Ke.morphTargets!==We||Ke.morphNormals!==yt||Ke.morphColors!==ht||Ke.toneMapping!==Vt||Ke.morphTargetsCount!==Mt)&&(_t=!0):(_t=!0,Ke.__version=Q.version);let dn=Ke.currentProgram;_t===!0&&(dn=Zr(Q,$,K));let Wi=!1,yn=!1,Mi=!1;const Nt=dn.getUniforms(),fn=Ke.uniforms;if(Be.useProgram(dn.program)&&(Wi=!0,yn=!0,Mi=!0),Q.id!==P&&(P=Q.id,yn=!0),Wi||R!==A){Be.buffers.depth.getReversed()?(ie.copy(A.projectionMatrix),$x(ie),Kx(ie),Nt.setValue(F,"projectionMatrix",ie)):Nt.setValue(F,"projectionMatrix",A.projectionMatrix),Nt.setValue(F,"viewMatrix",A.matrixWorldInverse);const nn=Nt.map.cameraPosition;nn!==void 0&&nn.setValue(F,Ae.setFromMatrixPosition(A.matrixWorld)),tt.logarithmicDepthBuffer&&Nt.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&Nt.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),R!==A&&(R=A,yn=!0,Mi=!0)}if(K.isSkinnedMesh){Nt.setOptional(F,K,"bindMatrix"),Nt.setOptional(F,K,"bindMatrixInverse");const ln=K.skeleton;ln&&(ln.boneTexture===null&&ln.computeBoneTexture(),Nt.setValue(F,"boneTexture",ln.boneTexture,I))}K.isBatchedMesh&&(Nt.setOptional(F,K,"batchingTexture"),Nt.setValue(F,"batchingTexture",K._matricesTexture,I),Nt.setOptional(F,K,"batchingIdTexture"),Nt.setValue(F,"batchingIdTexture",K._indirectTexture,I),Nt.setOptional(F,K,"batchingColorTexture"),K._colorsTexture!==null&&Nt.setValue(F,"batchingColorTexture",K._colorsTexture,I));const tn=re.morphAttributes;if((tn.position!==void 0||tn.normal!==void 0||tn.color!==void 0)&&st.update(K,re,dn),(yn||Ke.receiveShadow!==K.receiveShadow)&&(Ke.receiveShadow=K.receiveShadow,Nt.setValue(F,"receiveShadow",K.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(fn.envMap.value=je,fn.flipEnvMap.value=je.isCubeTexture&&je.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&$.environment!==null&&(fn.envMapIntensity.value=$.environmentIntensity),yn&&(Nt.setValue(F,"toneMappingExposure",L.toneMappingExposure),Ke.needsLights&&jo(fn,Mi),we&&Q.fog===!0&&Re.refreshFogUniforms(fn,we),Re.refreshMaterialUniforms(fn,Q,G,ae,y.state.transmissionRenderTarget[A.id]),El.upload(F,Ho(Ke),fn,I)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(El.upload(F,Ho(Ke),fn,I),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&Nt.setValue(F,"center",K.center),Nt.setValue(F,"modelViewMatrix",K.modelViewMatrix),Nt.setValue(F,"normalMatrix",K.normalMatrix),Nt.setValue(F,"modelMatrix",K.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){const ln=Q.uniformsGroups;for(let nn=0,Tt=ln.length;nn<Tt;nn++){const di=ln[nn];q.update(di,dn),q.bind(di,dn)}}return dn}function jo(A,$){A.ambientLightColor.needsUpdate=$,A.lightProbe.needsUpdate=$,A.directionalLights.needsUpdate=$,A.directionalLightShadows.needsUpdate=$,A.pointLights.needsUpdate=$,A.pointLightShadows.needsUpdate=$,A.spotLights.needsUpdate=$,A.spotLightShadows.needsUpdate=$,A.rectAreaLights.needsUpdate=$,A.hemisphereLights.needsUpdate=$}function Fl(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(A,$,re){Ue.get(A.texture).__webglTexture=$,Ue.get(A.depthTexture).__webglTexture=re;const Q=Ue.get(A);Q.__hasExternalTextures=!0,Q.__autoAllocateDepthBuffer=re===void 0,Q.__autoAllocateDepthBuffer||it.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,$){const re=Ue.get(A);re.__webglFramebuffer=$,re.__useDefaultFramebuffer=$===void 0};const Go=F.createFramebuffer();this.setRenderTarget=function(A,$=0,re=0){X=A,z=$,k=re;let Q=!0,K=null,we=!1,Le=!1;if(A){const je=Ue.get(A);if(je.__useDefaultFramebuffer!==void 0)Be.bindFramebuffer(F.FRAMEBUFFER,null),Q=!1;else if(je.__webglFramebuffer===void 0)I.setupRenderTarget(A);else if(je.__hasExternalTextures)I.rebindTextures(A,Ue.get(A.texture).__webglTexture,Ue.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const We=A.depthTexture;if(je.__boundDepthTexture!==We){if(We!==null&&Ue.has(We)&&(A.width!==We.image.width||A.height!==We.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(A)}}const ot=A.texture;(ot.isData3DTexture||ot.isDataArrayTexture||ot.isCompressedArrayTexture)&&(Le=!0);const rt=Ue.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(rt[$])?K=rt[$][re]:K=rt[$],we=!0):A.samples>0&&I.useMultisampledRTT(A)===!1?K=Ue.get(A).__webglMultisampledFramebuffer:Array.isArray(rt)?K=rt[re]:K=rt,j.copy(A.viewport),he.copy(A.scissor),ne=A.scissorTest}else j.copy(x).multiplyScalar(G).floor(),he.copy(B).multiplyScalar(G).floor(),ne=oe;if(re!==0&&(K=Go),Be.bindFramebuffer(F.FRAMEBUFFER,K)&&Q&&Be.drawBuffers(A,K),Be.viewport(j),Be.scissor(he),Be.setScissorTest(ne),we){const je=Ue.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+$,je.__webglTexture,re)}else if(Le){const je=Ue.get(A.texture),ot=$;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,je.__webglTexture,re,ot)}else if(A!==null&&re!==0){const je=Ue.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,je.__webglTexture,re)}P=-1},this.readRenderTargetPixels=function(A,$,re,Q,K,we,Le){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=Ue.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(ke=ke[Le]),ke){Be.bindFramebuffer(F.FRAMEBUFFER,ke);try{const je=A.texture,ot=je.format,rt=je.type;if(!tt.textureFormatReadable(ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!tt.textureTypeReadable(rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=A.width-Q&&re>=0&&re<=A.height-K&&F.readPixels($,re,Q,K,ct.convert(ot),ct.convert(rt),we)}finally{const je=X!==null?Ue.get(X).__webglFramebuffer:null;Be.bindFramebuffer(F.FRAMEBUFFER,je)}}},this.readRenderTargetPixelsAsync=async function(A,$,re,Q,K,we,Le){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=Ue.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Le!==void 0&&(ke=ke[Le]),ke){const je=A.texture,ot=je.format,rt=je.type;if(!tt.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!tt.textureTypeReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if($>=0&&$<=A.width-Q&&re>=0&&re<=A.height-K){Be.bindFramebuffer(F.FRAMEBUFFER,ke);const We=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,We),F.bufferData(F.PIXEL_PACK_BUFFER,we.byteLength,F.STREAM_READ),F.readPixels($,re,Q,K,ct.convert(ot),ct.convert(rt),0);const yt=X!==null?Ue.get(X).__webglFramebuffer:null;Be.bindFramebuffer(F.FRAMEBUFFER,yt);const ht=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Yx(F,ht,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,We),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,we),F.deleteBuffer(We),F.deleteSync(ht),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,$=null,re=0){A.isTexture!==!0&&(Ds("WebGLRenderer: copyFramebufferToTexture function signature has changed."),$=arguments[0]||null,A=arguments[1]);const Q=Math.pow(2,-re),K=Math.floor(A.image.width*Q),we=Math.floor(A.image.height*Q),Le=$!==null?$.x:0,ke=$!==null?$.y:0;I.setTexture2D(A,0),F.copyTexSubImage2D(F.TEXTURE_2D,re,0,0,Le,ke,K,we),Be.unbindTexture()};const Wo=F.createFramebuffer(),Xo=F.createFramebuffer();this.copyTextureToTexture=function(A,$,re=null,Q=null,K=0,we=null){A.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture function signature has changed."),Q=arguments[0]||null,A=arguments[1],$=arguments[2],we=arguments[3]||0,re=null),we===null&&(K!==0?(Ds("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),we=K,K=0):we=0);let Le,ke,je,ot,rt,We,yt,ht,Vt;const Ot=A.isCompressedTexture?A.mipmaps[we]:A.image;if(re!==null)Le=re.max.x-re.min.x,ke=re.max.y-re.min.y,je=re.isBox3?re.max.z-re.min.z:1,ot=re.min.x,rt=re.min.y,We=re.isBox3?re.min.z:0;else{const tn=Math.pow(2,-K);Le=Math.floor(Ot.width*tn),ke=Math.floor(Ot.height*tn),A.isDataArrayTexture?je=Ot.depth:A.isData3DTexture?je=Math.floor(Ot.depth*tn):je=1,ot=0,rt=0,We=0}Q!==null?(yt=Q.x,ht=Q.y,Vt=Q.z):(yt=0,ht=0,Vt=0);const Mt=ct.convert($.format),Ke=ct.convert($.type);let jt;$.isData3DTexture?(I.setTexture3D($,0),jt=F.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(I.setTexture2DArray($,0),jt=F.TEXTURE_2D_ARRAY):(I.setTexture2D($,0),jt=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,$.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,$.unpackAlignment);const _t=F.getParameter(F.UNPACK_ROW_LENGTH),dn=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Wi=F.getParameter(F.UNPACK_SKIP_PIXELS),yn=F.getParameter(F.UNPACK_SKIP_ROWS),Mi=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,Ot.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ot.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,ot),F.pixelStorei(F.UNPACK_SKIP_ROWS,rt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,We);const Nt=A.isDataArrayTexture||A.isData3DTexture,fn=$.isDataArrayTexture||$.isData3DTexture;if(A.isDepthTexture){const tn=Ue.get(A),ln=Ue.get($),nn=Ue.get(tn.__renderTarget),Tt=Ue.get(ln.__renderTarget);Be.bindFramebuffer(F.READ_FRAMEBUFFER,nn.__webglFramebuffer),Be.bindFramebuffer(F.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let di=0;di<je;di++)Nt&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ue.get(A).__webglTexture,K,We+di),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ue.get($).__webglTexture,we,Vt+di)),F.blitFramebuffer(ot,rt,Le,ke,yt,ht,Le,ke,F.DEPTH_BUFFER_BIT,F.NEAREST);Be.bindFramebuffer(F.READ_FRAMEBUFFER,null),Be.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(K!==0||A.isRenderTargetTexture||Ue.has(A)){const tn=Ue.get(A),ln=Ue.get($);Be.bindFramebuffer(F.READ_FRAMEBUFFER,Wo),Be.bindFramebuffer(F.DRAW_FRAMEBUFFER,Xo);for(let nn=0;nn<je;nn++)Nt?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,tn.__webglTexture,K,We+nn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,tn.__webglTexture,K),fn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ln.__webglTexture,we,Vt+nn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ln.__webglTexture,we),K!==0?F.blitFramebuffer(ot,rt,Le,ke,yt,ht,Le,ke,F.COLOR_BUFFER_BIT,F.NEAREST):fn?F.copyTexSubImage3D(jt,we,yt,ht,Vt+nn,ot,rt,Le,ke):F.copyTexSubImage2D(jt,we,yt,ht,ot,rt,Le,ke);Be.bindFramebuffer(F.READ_FRAMEBUFFER,null),Be.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else fn?A.isDataTexture||A.isData3DTexture?F.texSubImage3D(jt,we,yt,ht,Vt,Le,ke,je,Mt,Ke,Ot.data):$.isCompressedArrayTexture?F.compressedTexSubImage3D(jt,we,yt,ht,Vt,Le,ke,je,Mt,Ot.data):F.texSubImage3D(jt,we,yt,ht,Vt,Le,ke,je,Mt,Ke,Ot):A.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,we,yt,ht,Le,ke,Mt,Ke,Ot.data):A.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,we,yt,ht,Ot.width,Ot.height,Mt,Ot.data):F.texSubImage2D(F.TEXTURE_2D,we,yt,ht,Le,ke,Mt,Ke,Ot);F.pixelStorei(F.UNPACK_ROW_LENGTH,_t),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,dn),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Wi),F.pixelStorei(F.UNPACK_SKIP_ROWS,yn),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Mi),we===0&&$.generateMipmaps&&F.generateMipmap(jt),Be.unbindTexture()},this.copyTextureToTexture3D=function(A,$,re=null,Q=null,K=0){return A.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture3D function signature has changed."),re=arguments[0]||null,Q=arguments[1]||null,A=arguments[2],$=arguments[3],K=arguments[4]||0),Ds('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,$,re,Q,K)},this.initRenderTarget=function(A){Ue.get(A).__webglFramebuffer===void 0&&I.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?I.setTextureCube(A,0):A.isData3DTexture?I.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?I.setTexture2DArray(A,0):I.setTexture2D(A,0),Be.unbindTexture()},this.resetState=function(){z=0,k=0,X=null,Be.reset(),Pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=Ct._getDrawingBufferColorSpace(e),n.unpackColorSpace=Ct._getUnpackColorSpace()}}function hM(){const s=at.useRef(null);return at.useEffect(()=>{const e=s.current;if(!e)return;const n=new Sv;n.fog=new Xd(395277,.0018);const r=new $n(60,window.innerWidth/window.innerHeight,.1,1e3);r.position.z=85;const a=new fM({alpha:!0,antialias:!0,powerPreference:"high-performance"});a.setSize(window.innerWidth,window.innerHeight),a.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.appendChild(a.domElement);const c=180,u=new _i,d=new Float32Array(c*3),h=new Float32Array(c*3),g=new bt(13938487),_=new bt(3718648),S=new bt(16096779);for(let ae=0;ae<c;ae++){d[ae*3]=(Math.random()-.5)*160,d[ae*3+1]=(Math.random()-.5)*140,d[ae*3+2]=(Math.random()-.5)*90;const fe=Math.random()>.3?Math.random()>.5?g:S:_;h[ae*3]=fe.r,h[ae*3+1]=fe.g,h[ae*3+2]=fe.b}u.setAttribute("position",new Kn(d,3)),u.setAttribute("color",new Kn(h,3));const v=document.createElement("canvas");v.width=32,v.height=32;const E=v.getContext("2d"),w=E.createRadialGradient(16,16,0,16,16,16);w.addColorStop(0,"rgba(255,255,255,1)"),w.addColorStop(.3,"rgba(255,255,255,0.7)"),w.addColorStop(.8,"rgba(255,255,255,0.1)"),w.addColorStop(1,"rgba(255,255,255,0)"),E.fillStyle=w,E.fillRect(0,0,32,32);const C=new wv(v),M=new ig({size:1.8,vertexColors:!0,map:C,transparent:!0,opacity:.75,blending:$u,depthWrite:!1}),y=new Tv(u,M);n.add(y);const O=new Cl(32,.08,16,100),U=new Al({color:13938487,transparent:!0,opacity:.16,wireframe:!0}),L=new li(O,U);L.rotation.x=Math.PI/3,n.add(L);const Y=new Cl(36,.06,16,120),z=new Al({color:6333946,transparent:!0,opacity:.12,wireframe:!0}),k=new li(Y,z);k.rotation.y=Math.PI/4,n.add(k);let X=0,P=0,R=0,j=0;const he=ae=>{X=(ae.clientX/window.innerWidth-.5)*2,P=-(ae.clientY/window.innerHeight-.5)*2};window.addEventListener("mousemove",he,{passive:!0});const ne=()=>{r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight),a.setPixelRatio(Math.min(window.devicePixelRatio,2))};window.addEventListener("resize",ne);let pe,me=new Pv;const de=()=>{pe=requestAnimationFrame(de);const ae=me.getElapsedTime();R+=(X*12-R)*.04,j+=(P*8-j)*.04,r.position.x=R,r.position.y=j,r.lookAt(0,0,0),y.rotation.y=ae*.02,y.rotation.x=Math.sin(ae*.015)*.08,L.rotation.z=ae*.035,L.rotation.x=Math.PI/3+Math.cos(ae*.02)*.1,k.rotation.y=-ae*.025,k.rotation.z=Math.sin(ae*.03)*.08,a.render(n,r)};return de(),()=>{cancelAnimationFrame(pe),window.removeEventListener("mousemove",he),window.removeEventListener("resize",ne),e.contains(a.domElement)&&e.removeChild(a.domElement),u.dispose(),M.dispose(),O.dispose(),U.dispose(),Y.dispose(),z.dispose(),a.dispose()}},[]),p.jsx("div",{ref:s,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0,opacity:.85},"aria-hidden":"true"})}function pM(){const[s,e]=at.useState({x:-100,y:-100}),[n,r]=at.useState({x:-100,y:-100}),[a,c]=at.useState(!1),[u,d]=at.useState(!1);return at.useEffect(()=>{if(window.matchMedia("(pointer: coarse)").matches)return;let h=-100,g=-100,_=-100,S=-100,v;const E=O=>{h=O.clientX,g=O.clientY,e({x:h,y:g}),u||d(!0)},w=()=>{_+=(h-_)*.15,S+=(g-S)*.15,r({x:_,y:S}),v=requestAnimationFrame(w)};v=requestAnimationFrame(w);const C=()=>d(!0),M=()=>d(!1);window.addEventListener("mousemove",E),document.addEventListener("mouseenter",C),document.addEventListener("mouseleave",M);const y=O=>{const U=O.target;U.tagName==="A"||U.tagName==="BUTTON"||U.closest("a")||U.closest("button")||U.getAttribute("role")==="button"||U.classList.contains("interactive-hover")?c(!0):c(!1)};return document.addEventListener("mouseover",y),()=>{cancelAnimationFrame(v),window.removeEventListener("mousemove",E),document.removeEventListener("mouseenter",C),document.removeEventListener("mouseleave",M),document.removeEventListener("mouseover",y)}},[u]),u?p.jsxs(p.Fragment,{children:[p.jsx("div",{style:{position:"fixed",top:0,left:0,transform:`translate3d(${s.x-3}px, ${s.y-3}px, 0)`,width:"6px",height:"6px",backgroundColor:"#f6d87e",borderRadius:"50%",pointerEvents:"none",zIndex:9999,transition:"transform 0.05s ease-out, opacity 0.2s",boxShadow:"0 0 10px #d4af37"}}),p.jsx("div",{style:{position:"fixed",top:0,left:0,transform:`translate3d(${n.x-(a?24:16)}px, ${n.y-(a?24:16)}px, 0)`,width:a?"48px":"32px",height:a?"48px":"32px",border:"1px solid rgba(212, 175, 55, 0.45)",backgroundColor:a?"rgba(212, 175, 55, 0.08)":"transparent",borderRadius:"50%",pointerEvents:"none",zIndex:9998,transition:"width 0.25s ease-out, height 0.25s ease-out, background-color 0.25s ease-out, border-color 0.25s ease-out",boxShadow:a?"0 0 20px rgba(212, 175, 55, 0.25)":"none"}})]}):null}/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mM=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),ug=(...s)=>s.filter((e,n,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var gM={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xM=at.forwardRef(({color:s="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:a="",children:c,iconNode:u,...d},h)=>at.createElement("svg",{ref:h,...gM,width:e,height:e,stroke:s,strokeWidth:r?Number(n)*24/Number(e):n,className:ug("lucide",a),...d},[...u.map(([g,_])=>at.createElement(g,_)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dt=(s,e)=>{const n=at.forwardRef(({className:r,...a},c)=>at.createElement(xM,{ref:c,iconNode:e,className:ug(`lucide-${mM(s)}`,r),...a}));return n.displayName=`${s}`,n};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vM=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],_M=dt("ArrowDown",vM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yM=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],SM=dt("ArrowRight",yM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MM=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],Dl=dt("ArrowUpRight",MM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EM=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],TM=dt("ArrowUp",EM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wM=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],bM=dt("Calendar",wM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AM=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Yu=dt("Check",AM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CM=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],RM=dt("CircleAlert",CM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PM=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],dg=dt("CircleCheckBig",PM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LM=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],NM=dt("CircleCheck",LM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IM=[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]],DM=dt("Code",IM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UM=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],wm=dt("Copy",UM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FM=[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2",key:"14l7u7"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1",key:"5aljv4"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]],fg=dt("Cpu",FM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kM=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],OM=dt("Database",kM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zM=[["path",{d:"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5",key:"1w6njk"}],["circle",{cx:"13",cy:"12",r:"2",key:"1j92g6"}],["path",{d:"M18 19c-2.8 0-5-2.2-5-5v8",key:"pkpw2h"}],["circle",{cx:"20",cy:"19",r:"2",key:"1obnsp"}]],bm=dt("FolderGit2",zM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BM=[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]],Am=dt("Github",BM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HM=[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]],VM=dt("GraduationCap",HM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jM=[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]],GM=dt("KeyRound",jM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WM=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],XM=dt("LayoutDashboard",WM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qM=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],YM=dt("Lock",qM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $M=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],KM=dt("LogOut",$M);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZM=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],Rl=dt("Mail",ZM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QM=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],hg=dt("MapPin",QM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JM=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],eE=dt("Menu",JM);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tE=[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]],nE=dt("MessageSquare",tE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iE=[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",key:"1ykcvy"}]],rE=dt("PenLine",iE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sE=[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]],oE=dt("Phone",sE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aE=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],lE=dt("Plus",aE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cE=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],uE=dt("RefreshCw",cE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dE=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],Cm=dt("Save",dE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fE=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],hE=dt("Send",fE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pE=[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]],mE=dt("Server",pE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gE=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],xE=dt("ShieldCheck",gE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vE=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],Yd=dt("Shield",vE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _E=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],$d=dt("Sparkles",_E);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yE=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],SE=dt("Star",yE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ME=[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]],pg=dt("Terminal",ME);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EE=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],Rm=dt("Trash2",EE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TE=[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]],wE=dt("TrendingUp",TE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bE=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]],AE=dt("UserCheck",bE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CE=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],RE=dt("User",CE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PE=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]],LE=dt("Users",PE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NE=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],IE=dt("Volume2",NE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DE=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]],UE=dt("VolumeX",DE);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FE=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Ul=dt("X",FE);function kE(){const[s,e]=at.useState(!1),n=at.useRef(null),r=at.useRef(null),a=at.useRef([]),c=()=>{if(s)if(r.current&&n.current){const u=n.current;r.current.gain.linearRampToValueAtTime(.001,u.currentTime+1.2),setTimeout(()=>{a.current.forEach(d=>d.stop()),a.current=[],e(!1)},1200)}else e(!1);else try{const u=window.AudioContext||window.webkitAudioContext,d=n.current||new u;n.current=d,d.state==="suspended"&&d.resume();const h=d.createGain();h.gain.setValueAtTime(.001,d.currentTime),h.gain.exponentialRampToValueAtTime(.04,d.currentTime+3),h.connect(d.destination),r.current=h;const _=[87.31,130.81,164.81,220].map(S=>{const v=d.createOscillator(),E=d.createBiquadFilter();return E.type="lowpass",E.frequency.setValueAtTime(320,d.currentTime),v.type="sine",v.frequency.setValueAtTime(S,d.currentTime),v.connect(E),E.connect(h),v.start(),v});a.current=_,e(!0)}catch(u){console.warn("Audio playback error:",u)}};return at.useEffect(()=>()=>{n.current&&n.current.close().catch(()=>{})},[]),p.jsx("div",{style:{position:"fixed",bottom:"24px",left:"24px",zIndex:100},children:p.jsx("button",{onClick:c,title:s?"Mute ambient soundscape":"Enable cinematic ambient soundscape",className:"glass-panel",style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 14px",borderRadius:"9999px",border:"1px solid rgba(212, 175, 55, 0.25)",background:"rgba(10, 16, 28, 0.75)",color:s?"#d4af37":"#94a3b8",cursor:"pointer",fontSize:"0.78rem",fontFamily:"var(--font-mono)",transition:"all 0.3s ease",boxShadow:s?"0 0 15px rgba(212, 175, 55, 0.25)":"none"},children:s?p.jsxs(p.Fragment,{children:[p.jsx(IE,{size:15,color:"#d4af37"}),p.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"3px"},children:[p.jsx("span",{style:{display:"inline-block",width:"3px",height:"10px",background:"#d4af37",borderRadius:"1px",animation:"pulseGold 1s infinite alternate"}}),p.jsx("span",{style:{display:"inline-block",width:"3px",height:"14px",background:"#d4af37",borderRadius:"1px",animation:"pulseGold 0.8s infinite alternate"}}),p.jsx("span",{style:{display:"inline-block",width:"3px",height:"8px",background:"#d4af37",borderRadius:"1px",animation:"pulseGold 1.2s infinite alternate"}})]}),p.jsx("span",{children:"CINEMATIC AUDIO ON"})]}):p.jsxs(p.Fragment,{children:[p.jsx(UE,{size:15}),p.jsx("span",{children:"SOUND AMBIENCE"})]})})})}function OE({onOpenAdmin:s,profile:e}){const[n,r]=at.useState(!1),[a,c]=at.useState(!1);at.useEffect(()=>{const d=()=>{r(window.scrollY>40)};return window.addEventListener("scroll",d),()=>window.removeEventListener("scroll",d)},[]);const u=[{name:"Identity",href:"#hero"},{name:"Biography",href:"#about"},{name:"Selected Works",href:"#projects"},{name:"Capabilities",href:"#skills"},{name:"Trajectory",href:"#experience"},{name:"Inquiries",href:"#contact"}];return p.jsxs("header",{style:{position:"fixed",top:0,left:0,right:0,zIndex:90,transition:"all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",padding:n?"12px 0":"22px 0",background:n?"rgba(6, 8, 13, 0.88)":"transparent",backdropFilter:n?"blur(20px)":"none",borderBottom:n?"1px solid rgba(212, 175, 55, 0.15)":"1px solid transparent"},children:[p.jsxs("div",{className:"container-luxury",style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[p.jsxs("a",{href:"#hero",style:{display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",color:"inherit"},children:[p.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"10px",border:"1px solid rgba(212, 175, 55, 0.5)",background:"linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(15, 23, 42, 0.8))",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--font-editorial)",fontWeight:700,fontSize:"1.05rem",color:"#f8fafc",boxShadow:"0 0 15px rgba(212, 175, 55, 0.2)"},children:"UV"}),p.jsxs("div",{children:[p.jsx("div",{className:"font-editorial",style:{fontSize:"1.05rem",letterSpacing:"0.12em",fontWeight:700,color:"#f8fafc",lineHeight:1.2},children:"VANOJAN"}),p.jsx("div",{className:"font-mono",style:{fontSize:"0.65rem",letterSpacing:"0.16em",color:"#d4af37",textTransform:"uppercase"},children:"Software Architect"})]})]}),p.jsx("nav",{style:{display:"none",alignItems:"center",gap:"28px"},className:"desktop-nav",children:u.map((d,h)=>p.jsxs("a",{href:d.href,style:{fontSize:"0.85rem",letterSpacing:"0.04em",color:"#cbd5e1",textDecoration:"none",transition:"color 0.25s ease",display:"flex",alignItems:"center",gap:"6px"},onMouseEnter:g=>g.currentTarget.style.color="#f3d078",onMouseLeave:g=>g.currentTarget.style.color="#cbd5e1",children:[p.jsxs("span",{style:{fontSize:"0.65rem",color:"#d4af37",fontFamily:"var(--font-mono)"},children:["0",h+1]}),p.jsx("span",{children:d.name})]},d.name))}),p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"14px"},children:[p.jsxs("button",{onClick:s,title:"Admin Dashboard Portal",style:{background:"rgba(14, 22, 38, 0.6)",border:"1px solid rgba(212, 175, 55, 0.25)",borderRadius:"8px",padding:"8px 10px",cursor:"pointer",color:"#d4af37",display:"flex",alignItems:"center",gap:"6px",fontSize:"0.75rem",fontFamily:"var(--font-mono)",transition:"all 0.25s ease"},onMouseEnter:d=>{d.currentTarget.style.borderColor="#d4af37",d.currentTarget.style.boxShadow="0 0 12px rgba(212, 175, 55, 0.3)"},onMouseLeave:d=>{d.currentTarget.style.borderColor="rgba(212, 175, 55, 0.25)",d.currentTarget.style.boxShadow="none"},children:[p.jsx(Yd,{size:14}),p.jsx("span",{className:"hidden-mobile",children:"ADMIN"})]}),p.jsxs("a",{href:"#contact",className:"btn-gold hidden-mobile",style:{padding:"0.6rem 1.3rem",fontSize:"0.82rem"},children:[p.jsx("span",{children:"Consultation"}),p.jsx(Dl,{size:14})]}),p.jsx("button",{onClick:()=>c(!a),style:{background:"transparent",border:"none",color:"#f8fafc",cursor:"pointer",display:"flex",padding:"6px"},className:"mobile-menu-btn","aria-label":"Toggle Navigation",children:a?p.jsx(Ul,{size:24}):p.jsx(eE,{size:24})})]})]}),a&&p.jsxs("div",{className:"glass-panel",style:{margin:"12px 16px 0",padding:"24px",borderRadius:"16px",border:"1px solid var(--border-gold)",display:"flex",flexDirection:"column",gap:"16px"},children:[u.map((d,h)=>p.jsxs("a",{href:d.href,onClick:()=>c(!1),style:{color:"#f8fafc",textDecoration:"none",fontSize:"1rem",display:"flex",alignItems:"center",gap:"10px"},children:[p.jsxs("span",{style:{color:"#d4af37",fontFamily:"var(--font-mono)",fontSize:"0.8rem"},children:["0",h+1," //"]}),p.jsx("span",{children:d.name})]},d.name)),p.jsxs("div",{style:{paddingTop:"12px",borderTop:"1px solid rgba(255, 255, 255, 0.1)",display:"flex",gap:"10px"},children:[p.jsx("a",{href:"#contact",onClick:()=>c(!1),className:"btn-gold",style:{flex:1,padding:"0.7rem"},children:"Initiate Contact"}),p.jsx("button",{onClick:()=>{c(!1),s()},className:"btn-ghost-luxury",style:{padding:"0.7rem 1.2rem"},children:"Admin"})]})]}),p.jsx("style",{children:`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .hidden-mobile {
            display: none !important;
          }
        }
      `})]})}function zE({profile:s}){const{name:e="Uthayagunasingam Vanojan",shortName:n="Vanojan",title:r="Full-Stack Software Engineer & Solutions Architect",tagline:a="Bridging architectural rigour and cinematic aesthetic depth to engineer unforgettable software experiences.",heroImage:c="/hero/image2.jpeg",statusText:u="Open for high-impact engineering & architecture engagements",metrics:d=[]}=s||{};return p.jsxs("section",{id:"hero",style:{position:"relative",minHeight:"100vh",paddingTop:"130px",paddingBottom:"80px",display:"flex",alignItems:"center",overflow:"hidden"},children:[p.jsx("div",{className:"ambient-glow-gold",style:{top:"15%",left:"35%",opacity:.7}}),p.jsx("div",{className:"ambient-glow-navy",style:{top:"25%",right:"-5%",opacity:.8}}),p.jsxs("div",{className:"container-luxury",style:{position:"relative",zIndex:10,width:"100%"},children:[p.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:"48px",alignItems:"center"},className:"hero-grid",children:[p.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[p.jsx("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:p.jsxs("span",{className:"badge-gold",style:{display:"inline-flex",alignItems:"center",gap:"8px",boxShadow:"0 0 15px rgba(212, 175, 55, 0.2)"},children:[p.jsx("span",{style:{width:"7px",height:"7px",borderRadius:"50%",backgroundColor:"#10b981",boxShadow:"0 0 8px #10b981",display:"inline-block"}}),u]})}),p.jsxs("div",{children:[p.jsx("div",{className:"font-mono",style:{fontSize:"0.85rem",letterSpacing:"0.22em",color:"#d4af37",textTransform:"uppercase",marginBottom:"10px",fontWeight:600},children:"Full-Stack Systems Architect & Engineer"}),p.jsxs("h1",{className:"font-editorial",style:{fontSize:"clamp(2.5rem, 5.2vw, 4.4rem)",lineHeight:1.1,fontWeight:800,letterSpacing:"-0.02em",color:"#ffffff",marginBottom:"16px"},children:["Architectural ",p.jsx("br",{}),p.jsx("span",{className:"gold-gradient-text",children:"Precision."})," ",p.jsx("br",{}),"Cinematic ",p.jsx("span",{className:"silver-gradient-text",children:"Depth."})]}),p.jsx("p",{style:{fontSize:"1.08rem",color:"#cbd5e1",maxWidth:"560px",lineHeight:1.75,fontWeight:300},children:a})]}),p.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"16px",alignItems:"center",paddingTop:"8px"},children:[p.jsxs("a",{href:"#projects",className:"btn-gold",children:[p.jsx("span",{children:"Explore Selected Works"}),p.jsx(Dl,{size:16})]}),p.jsxs("a",{href:"#about",className:"btn-ghost-luxury",children:[p.jsx(pg,{size:16,color:"#d4af37"}),p.jsx("span",{children:"Biography & Stack"})]})]}),p.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(110px, 1fr))",gap:"16px",marginTop:"16px",paddingTop:"24px",borderTop:"1px solid rgba(255, 255, 255, 0.08)"},children:d.map(h=>p.jsxs("div",{className:"glass-panel",style:{padding:"14px 16px",borderRadius:"12px",border:"1px solid rgba(212, 175, 55, 0.15)",background:"rgba(11, 18, 33, 0.5)"},children:[p.jsx("div",{className:"font-editorial gold-gradient-text",style:{fontSize:"1.65rem",fontWeight:700,lineHeight:1.1},children:h.value}),p.jsx("div",{className:"font-mono",style:{fontSize:"0.68rem",color:"#94a3b8",letterSpacing:"0.04em",textTransform:"uppercase",marginTop:"4px"},children:h.label})]},h.label))})]}),p.jsxs("div",{style:{display:"flex",justifyContent:"center",position:"relative"},children:[p.jsx("div",{style:{position:"absolute",top:"10%",left:"-10%",width:"320px",height:"320px",background:"radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)",filter:"blur(50px)",zIndex:0,pointerEvents:"none"}}),p.jsx("div",{style:{position:"absolute",bottom:"10%",right:"-10%",width:"350px",height:"350px",background:"radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 70%)",filter:"blur(50px)",zIndex:0,pointerEvents:"none"}}),p.jsxs("div",{className:"hero-portrait-frame",style:{position:"relative",zIndex:1,width:"100%",maxWidth:"430px",background:"linear-gradient(145deg, rgba(20, 30, 50, 0.6) 0%, rgba(6, 8, 13, 0.95) 100%)",backdropFilter:"blur(10px)"},children:[p.jsx("div",{style:{position:"absolute",top:"12px",left:"12px",width:"16px",height:"16px",borderTop:"2px solid #d4af37",borderLeft:"2px solid #d4af37",zIndex:10,pointerEvents:"none"}}),p.jsx("div",{style:{position:"absolute",top:"12px",right:"12px",width:"16px",height:"16px",borderTop:"2px solid #d4af37",borderRight:"2px solid #d4af37",zIndex:10,pointerEvents:"none"}}),p.jsx("div",{style:{position:"absolute",bottom:"12px",left:"12px",width:"16px",height:"16px",borderBottom:"2px solid #d4af37",borderLeft:"2px solid #d4af37",zIndex:10,pointerEvents:"none"}}),p.jsx("div",{style:{position:"absolute",bottom:"12px",right:"12px",width:"16px",height:"16px",borderBottom:"2px solid #d4af37",borderRight:"2px solid #d4af37",zIndex:10,pointerEvents:"none"}}),p.jsxs("div",{style:{position:"relative",width:"100%",overflow:"hidden"},children:[p.jsx("img",{src:c,alt:"Uthayagunasingam Vanojan — Full-Stack Software Engineer",style:{display:"block",width:"100%",height:"auto",aspectRatio:"9 / 16",objectFit:"cover",filter:"contrast(1.02) saturate(1.03)",transition:"transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"},loading:"eager",fetchPriority:"high"}),p.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(6, 8, 13, 0.85) 0%, rgba(6, 8, 13, 0.15) 30%, transparent 60%)",pointerEvents:"none"}})]}),p.jsx("div",{style:{position:"absolute",bottom:"20px",left:"20px",right:"20px",padding:"14px 18px",borderRadius:"12px",background:"rgba(8, 13, 24, 0.88)",backdropFilter:"blur(16px)",border:"1px solid rgba(212, 175, 55, 0.3)",boxShadow:"0 10px 25px rgba(0, 0, 0, 0.7)",zIndex:15},children:p.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[p.jsxs("div",{children:[p.jsx("div",{className:"font-editorial",style:{fontSize:"0.98rem",fontWeight:700,color:"#ffffff",letterSpacing:"0.06em"},children:e}),p.jsx("div",{className:"font-mono",style:{fontSize:"0.68rem",color:"#d4af37",letterSpacing:"0.1em",marginTop:"2px"},children:"SYSTEMS ARCHITECT & ENGINEER"})]}),p.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"50%",background:"rgba(212, 175, 55, 0.15)",border:"1px solid rgba(212, 175, 55, 0.4)",display:"flex",alignItems:"center",justifyContent:"center",color:"#d4af37"},children:p.jsx($d,{size:16})})]})})]})]})]}),p.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:"50px"},children:p.jsxs("a",{href:"#about",style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",textDecoration:"none",color:"#8b9bb4",fontSize:"0.75rem",fontFamily:"var(--font-mono)",letterSpacing:"0.15em",transition:"color 0.25s ease"},onMouseEnter:h=>h.currentTarget.style.color="#d4af37",onMouseLeave:h=>h.currentTarget.style.color="#8b9bb4",children:[p.jsx("span",{children:"SCROLL TO DISCOVER"}),p.jsx(_M,{size:14,className:"animate-float",color:"#d4af37"})]})})]}),p.jsx("style",{children:`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `})]})}function BE({profile:s}){const{name:e="Uthayagunasingam Vanojan",aboutImage:n="/hero/image1.jpeg",bio:r="",philosophy:a="Great engineering is not merely functional—it possesses clarity, performance, and an undeniable artistic presence.",location:c="Jaffna, Sri Lanka",email:u="uthayanvanojan5@gmail.com",phone:d="+94 75 029 2685"}=s||{},h=[{title:"Architectural Integrity",desc:"Constructing modular, scalable distributed systems with clean separation of concerns and rigorous database normalization."},{title:"Cinematic Visuals & 3D",desc:"Bridging the gap between engineering logic and artistic aesthetics through WebGL, micro-interactions, and harmonic palettes."},{title:"Zero-Compromise Performance",desc:"Optimizing execution speed, low memory footprints, and sub-millisecond query responses across web, mobile, and desktop."}];return p.jsxs("section",{id:"about",style:{position:"relative",padding:"120px 0",overflow:"hidden"},children:[p.jsxs("div",{className:"container-luxury",style:{position:"relative",zIndex:10},children:[p.jsxs("div",{style:{marginBottom:"64px"},children:[p.jsx("div",{className:"badge-gold",style:{marginBottom:"14px"},children:"02 // BIOGRAPHY & ETHOS"}),p.jsxs("h2",{className:"font-editorial",style:{fontSize:"clamp(2rem, 3.8vw, 3.2rem)",fontWeight:700,color:"#ffffff",lineHeight:1.2},children:["The Intersection of ",p.jsx("span",{className:"gold-gradient-text",children:"Engineering"})," & ",p.jsx("span",{className:"silver-gradient-text",children:"Artistry."})]})]}),p.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:"50px",alignItems:"center"},className:"about-grid",children:[p.jsx("div",{style:{position:"relative"},children:p.jsxs("div",{className:"glass-panel",style:{position:"relative",borderRadius:"20px",overflow:"hidden",border:"1px solid rgba(212, 175, 55, 0.25)",boxShadow:"0 25px 60px rgba(0, 0, 0, 0.7)"},children:[p.jsx("img",{src:n,alt:"Uthayagunasingam Vanojan Portrait",style:{width:"100%",height:"auto",aspectRatio:"9 / 16",objectFit:"cover",display:"block",filter:"contrast(1.02) saturate(1.02)"},loading:"lazy"}),p.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(6, 8, 13, 0.9) 0%, transparent 50%)",pointerEvents:"none"}}),p.jsxs("div",{style:{position:"absolute",bottom:"24px",left:"24px",right:"24px",padding:"16px 20px",borderRadius:"14px",background:"rgba(10, 16, 28, 0.85)",backdropFilter:"blur(16px)",border:"1px solid rgba(212, 175, 55, 0.3)"},children:[p.jsxs("div",{className:"font-editorial",style:{fontSize:"0.92rem",fontStyle:"italic",color:"#f8fafc",lineHeight:1.5},children:['"',a,'"']}),p.jsx("div",{className:"font-mono",style:{fontSize:"0.68rem",color:"#d4af37",marginTop:"8px",letterSpacing:"0.08em"},children:"— U. VANOJAN, PRINCIPAL ENGINEER"})]})]})}),p.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"28px"},children:[p.jsxs("div",{children:[p.jsx("h3",{className:"font-editorial",style:{fontSize:"1.65rem",fontWeight:600,color:"#f8fafc",marginBottom:"16px"},children:"Crafting Software that Leaves a Lasting Impression"}),p.jsx("p",{style:{color:"#cbd5e1",fontSize:"1.02rem",lineHeight:1.8,marginBottom:"16px"},children:r}),p.jsx("p",{style:{color:"#94a3b8",fontSize:"0.96rem",lineHeight:1.75},children:"Having engineered systems ranging from offline-first mobile applications in Java and SQLite to scalable cloud platforms in React, Node, and MongoDB, I approach software engineering as an architectural craft. Every line of code, every API schema, and every pixel is intentional."})]}),p.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"14px"},children:h.map((g,_)=>p.jsxs("div",{className:"glass-panel",style:{padding:"16px 20px",borderRadius:"12px",border:"1px solid rgba(255, 255, 255, 0.07)",background:"rgba(14, 22, 38, 0.45)",transition:"border-color 0.3s ease"},onMouseEnter:S=>S.currentTarget.style.borderColor="rgba(212, 175, 55, 0.4)",onMouseLeave:S=>S.currentTarget.style.borderColor="rgba(255, 255, 255, 0.07)",children:[p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"},children:[p.jsx(NM,{size:16,color:"#d4af37"}),p.jsx("span",{className:"font-editorial",style:{fontSize:"1.05rem",fontWeight:600,color:"#ffffff"},children:g.title})]}),p.jsx("p",{style:{fontSize:"0.88rem",color:"#94a3b8",paddingLeft:"26px",lineHeight:1.6},children:g.desc})]},g.title))}),p.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:"14px",paddingTop:"16px",borderTop:"1px solid rgba(255, 255, 255, 0.08)"},children:[p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[p.jsx(hg,{size:16,color:"#d4af37"}),p.jsx("span",{style:{fontSize:"0.85rem",color:"#cbd5e1"},children:c})]}),p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[p.jsx(Rl,{size:16,color:"#d4af37"}),p.jsx("a",{href:`mailto:${u}`,style:{fontSize:"0.85rem",color:"#cbd5e1",textDecoration:"none"},children:u})]})]})]})]})]}),p.jsx("style",{children:`
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 0.85fr 1.15fr !important;
          }
        }
      `})]})}function HE({projects:s=[]}){var d;const[e,n]=at.useState("All"),[r,a]=at.useState(null),c=["All","Featured","Full-Stack Web","Mobile & Hospitality","Enterprise Software","Systems & Analytics"],u=s.filter(h=>e==="All"?!0:e==="Featured"?h.featured:h.category===e);return p.jsxs("section",{id:"projects",style:{position:"relative",padding:"120px 0",overflow:"hidden"},children:[p.jsxs("div",{className:"container-luxury",style:{position:"relative",zIndex:10},children:[p.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"48px"},children:[p.jsx("div",{className:"badge-gold",children:"03 // PORTFOLIO SHOWCASE"}),p.jsxs("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"flex-end",gap:"20px"},children:[p.jsxs("div",{children:[p.jsxs("h2",{className:"font-editorial",style:{fontSize:"clamp(2rem, 3.8vw, 3.2rem)",fontWeight:700,color:"#ffffff",lineHeight:1.2},children:["Selected ",p.jsx("span",{className:"gold-gradient-text",children:"Architectural"})," Works."]}),p.jsx("p",{style:{color:"#94a3b8",fontSize:"1rem",marginTop:"8px",maxWidth:"600px"},children:"End-to-end engineered applications built with rigorous stability, modular clean architecture, and modern UX."})]}),p.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:c.map(h=>p.jsx("button",{onClick:()=>n(h),style:{padding:"8px 16px",borderRadius:"9999px",fontSize:"0.78rem",fontFamily:"var(--font-mono)",cursor:"pointer",transition:"all 0.3s ease",border:e===h?"1px solid #d4af37":"1px solid rgba(255, 255, 255, 0.08)",background:e===h?"rgba(212, 175, 55, 0.18)":"rgba(14, 22, 38, 0.5)",color:e===h?"#f3d078":"#94a3b8",boxShadow:e===h?"0 0 15px rgba(212, 175, 55, 0.2)":"none"},children:h},h))})]})]}),p.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(360px, 1fr))",gap:"30px"},children:u.map(h=>p.jsxs("div",{className:"glass-panel",style:{borderRadius:"20px",padding:"28px",border:"1px solid rgba(212, 175, 55, 0.18)",background:"linear-gradient(145deg, rgba(14, 23, 42, 0.65) 0%, rgba(8, 12, 22, 0.85) 100%)",display:"flex",flexDirection:"column",justifyContent:"space-between",transition:"all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",cursor:"pointer",position:"relative",overflow:"hidden"},onClick:()=>a(h),onMouseEnter:g=>{g.currentTarget.style.transform="translateY(-6px)",g.currentTarget.style.borderColor="rgba(212, 175, 55, 0.45)",g.currentTarget.style.boxShadow="0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.15)"},onMouseLeave:g=>{g.currentTarget.style.transform="translateY(0)",g.currentTarget.style.borderColor="rgba(212, 175, 55, 0.18)",g.currentTarget.style.boxShadow="0 20px 40px -15px rgba(0, 0, 0, 0.5)"},children:[p.jsxs("div",{children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},children:[p.jsx("span",{className:"badge-navy",children:h.category}),h.featured&&p.jsxs("span",{className:"badge-gold",children:[p.jsx($d,{size:12}),"Featured"]})]}),p.jsx("h3",{className:"font-editorial",style:{fontSize:"1.45rem",fontWeight:700,color:"#ffffff",marginBottom:"8px",lineHeight:1.3},children:h.title}),p.jsx("p",{className:"font-mono",style:{fontSize:"0.75rem",color:"#d4af37",letterSpacing:"0.04em",marginBottom:"14px"},children:h.subtitle}),p.jsx("p",{style:{fontSize:"0.92rem",color:"#94a3b8",lineHeight:1.65,marginBottom:"20px"},children:h.description}),h.highlights&&p.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"20px"},children:h.highlights.slice(0,2).map((g,_)=>p.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"8px"},children:[p.jsx("span",{style:{color:"#d4af37",fontSize:"0.8rem",marginTop:"2px"},children:"✦"}),p.jsx("span",{style:{fontSize:"0.82rem",color:"#cbd5e1"},children:g})]},_))})]}),p.jsxs("div",{style:{paddingTop:"16px",borderTop:"1px solid rgba(255, 255, 255, 0.08)"},children:[p.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"16px"},children:h.techStack.map(g=>p.jsx("span",{style:{padding:"4px 10px",borderRadius:"6px",background:"rgba(255, 255, 255, 0.04)",border:"1px solid rgba(255, 255, 255, 0.08)",fontSize:"0.72rem",fontFamily:"var(--font-mono)",color:"#cbd5e1"},children:g},g))}),p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[p.jsxs("span",{style:{fontSize:"0.78rem",fontFamily:"var(--font-mono)",color:"#d4af37",display:"flex",alignItems:"center",gap:"4px"},children:["View Architecture Specs ",p.jsx(Dl,{size:14})]}),p.jsx("div",{style:{display:"flex",gap:"10px"},children:h.githubUrl&&p.jsx("span",{title:"Repository",style:{color:"#94a3b8",transition:"color 0.2s ease"},children:p.jsx(Am,{size:16})})})]})]})]},h.id))})]}),r&&p.jsx("div",{style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(4, 6, 10, 0.85)",backdropFilter:"blur(16px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"},onClick:()=>a(null),children:p.jsxs("div",{className:"glass-panel",style:{width:"100%",maxWidth:"680px",maxHeight:"90vh",overflowY:"auto",borderRadius:"24px",padding:"36px",border:"1px solid rgba(212, 175, 55, 0.35)",background:"#0d1526",boxShadow:"0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(212, 175, 55, 0.15)"},onClick:h=>h.stopPropagation(),children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px"},children:[p.jsxs("div",{children:[p.jsx("span",{className:"badge-gold",style:{marginBottom:"8px"},children:r.category}),p.jsx("h3",{className:"font-editorial",style:{fontSize:"1.85rem",fontWeight:700,color:"#ffffff",marginTop:"6px"},children:r.title}),p.jsx("div",{className:"font-mono",style:{fontSize:"0.8rem",color:"#d4af37"},children:r.subtitle})]}),p.jsx("button",{onClick:()=>a(null),style:{background:"rgba(255, 255, 255, 0.06)",border:"1px solid rgba(255, 255, 255, 0.15)",borderRadius:"50%",width:"36px",height:"36px",display:"flex",alignItems:"center",justifyContent:"center",color:"#ffffff",cursor:"pointer"},children:p.jsx(Ul,{size:18})})]}),p.jsx("p",{style:{color:"#cbd5e1",fontSize:"0.98rem",lineHeight:1.75,marginBottom:"24px"},children:r.description}),p.jsxs("div",{style:{marginBottom:"24px"},children:[p.jsx("h4",{className:"font-mono",style:{fontSize:"0.82rem",letterSpacing:"0.1em",color:"#d4af37",textTransform:"uppercase",marginBottom:"12px"},children:"Key Architecture & Engineering Highlights"}),p.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:(d=r.highlights)==null?void 0:d.map((h,g)=>p.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"10px"},children:[p.jsx(dg,{size:16,color:"#d4af37",style:{marginTop:"3px",flexShrink:0}}),p.jsx("span",{style:{color:"#e2e8f0",fontSize:"0.9rem",lineHeight:1.5},children:h})]},g))})]}),p.jsxs("div",{style:{marginBottom:"28px"},children:[p.jsx("h4",{className:"font-mono",style:{fontSize:"0.82rem",letterSpacing:"0.1em",color:"#94a3b8",textTransform:"uppercase",marginBottom:"10px"},children:"Technology Stack"}),p.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:r.techStack.map(h=>p.jsx("span",{className:"badge-gold",style:{fontSize:"0.75rem",padding:"6px 12px"},children:h},h))})]}),p.jsxs("div",{style:{display:"flex",gap:"12px",paddingTop:"16px",borderTop:"1px solid rgba(255, 255, 255, 0.1)"},children:[p.jsxs("a",{href:r.githubUrl||"#",target:"_blank",rel:"noreferrer",className:"btn-gold",style:{flex:1},children:[p.jsx(Am,{size:16}),p.jsx("span",{children:"Inspect Repository"})]}),p.jsx("button",{onClick:()=>a(null),className:"btn-ghost-luxury",style:{padding:"0.85rem 1.6rem"},children:"Close"})]})]})})]})}function VE({skills:s=[]}){var c;const[e,n]=at.useState(0),r=u=>{switch(u){case"Code":return p.jsx(DM,{size:20,color:"#d4af37"});case"Server":return p.jsx(mE,{size:20,color:"#d4af37"});case"Database":return p.jsx(OM,{size:20,color:"#d4af37"});case"Terminal":return p.jsx(pg,{size:20,color:"#d4af37"});default:return p.jsx(fg,{size:20,color:"#d4af37"})}},a=s[e]||s[0]||{items:[]};return p.jsxs("section",{id:"skills",style:{position:"relative",padding:"120px 0",overflow:"hidden"},children:[p.jsxs("div",{className:"container-luxury",style:{position:"relative",zIndex:10},children:[p.jsxs("div",{style:{marginBottom:"56px"},children:[p.jsx("div",{className:"badge-gold",style:{marginBottom:"14px"},children:"04 // TECHNICAL MASTERY"}),p.jsxs("h2",{className:"font-editorial",style:{fontSize:"clamp(2rem, 3.8vw, 3.2rem)",fontWeight:700,color:"#ffffff",lineHeight:1.2},children:["Engineering ",p.jsx("span",{className:"gold-gradient-text",children:"Competencies"})," & Systems."]}),p.jsx("p",{style:{color:"#94a3b8",fontSize:"1rem",marginTop:"8px",maxWidth:"620px"},children:"A comprehensive matrix of languages, runtime frameworks, low-level architectures, and database paradigms cultivated across production environments."})]}),p.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"32px"},className:"skills-grid",children:[p.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"14px"},children:s.map((u,d)=>{var h;return p.jsxs("button",{onClick:()=>n(d),className:"glass-panel",style:{padding:"20px 24px",borderRadius:"16px",border:e===d?"1px solid #d4af37":"1px solid rgba(255, 255, 255, 0.07)",background:e===d?"rgba(212, 175, 55, 0.12)":"rgba(11, 18, 33, 0.5)",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all 0.3s ease",boxShadow:e===d?"0 10px 30px rgba(212, 175, 55, 0.15)":"none"},children:[p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[p.jsx("div",{style:{width:"42px",height:"42px",borderRadius:"10px",background:"rgba(212, 175, 55, 0.12)",display:"flex",alignItems:"center",justifyContent:"center"},children:r(u.icon)}),p.jsxs("div",{children:[p.jsx("div",{className:"font-editorial",style:{fontSize:"1.05rem",fontWeight:600,color:e===d?"#ffffff":"#cbd5e1"},children:u.category}),p.jsxs("div",{className:"font-mono",style:{fontSize:"0.72rem",color:"#94a3b8",marginTop:"2px"},children:[((h=u.items)==null?void 0:h.length)||0," Specializations"]})]})]}),p.jsx("span",{style:{color:e===d?"#d4af37":"rgba(255, 255, 255, 0.3)",fontSize:"1.2rem",transition:"transform 0.3s ease",transform:e===d?"translateX(4px)":"none"},children:"→"})]},u.category)})}),p.jsxs("div",{className:"glass-panel",style:{padding:"36px",borderRadius:"20px",border:"1px solid rgba(212, 175, 55, 0.25)",background:"linear-gradient(145deg, rgba(14, 22, 38, 0.75) 0%, rgba(8, 12, 22, 0.9) 100%)",display:"flex",flexDirection:"column",justifyContent:"center",gap:"24px"},children:[p.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:"16px",borderBottom:"1px solid rgba(255, 255, 255, 0.08)"},children:[p.jsxs("div",{children:[p.jsx("h3",{className:"font-editorial",style:{fontSize:"1.35rem",color:"#ffffff",fontWeight:700},children:a.category}),p.jsx("span",{className:"font-mono",style:{fontSize:"0.75rem",color:"#d4af37"},children:"PROFICIENCY & ARCHITECTURAL MASTERY"})]}),p.jsx(xE,{size:24,color:"#d4af37"})]}),p.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:(c=a.items)==null?void 0:c.map(u=>p.jsxs("div",{children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[p.jsx("span",{style:{fontSize:"0.92rem",color:"#f1f5f9",fontWeight:500},children:u.name}),p.jsxs("span",{className:"font-mono",style:{fontSize:"0.8rem",color:"#f3d078"},children:[u.level,"%"]})]}),p.jsx("div",{style:{height:"6px",borderRadius:"9999px",background:"rgba(255, 255, 255, 0.08)",overflow:"hidden",position:"relative"},children:p.jsx("div",{style:{height:"100%",width:`${u.level}%`,borderRadius:"9999px",background:"linear-gradient(90deg, #d4af37 0%, #f59e0b 50%, #fcd34d 100%)",boxShadow:"0 0 10px rgba(212, 175, 55, 0.5)",transition:"width 1s cubic-bezier(0.16, 1, 0.3, 1)"}})})]},u.name))}),p.jsxs("div",{style:{marginTop:"12px",padding:"12px 16px",borderRadius:"10px",background:"rgba(212, 175, 55, 0.06)",border:"1px solid rgba(212, 175, 55, 0.18)",display:"flex",alignItems:"center",gap:"10px"},children:[p.jsx("span",{style:{color:"#d4af37"},children:"✦"}),p.jsx("span",{style:{fontSize:"0.82rem",color:"#cbd5e1"},children:"Continually benchmarking and adopting modern distributed engineering patterns and low-latency rendering pipelines."})]})]})]})]}),p.jsx("style",{children:`
        @media (min-width: 900px) {
          .skills-grid {
            grid-template-columns: 0.95fr 1.05fr !important;
          }
        }
      `})]})}function jE({education:s=[]}){return p.jsx("section",{id:"experience",style:{position:"relative",padding:"120px 0",overflow:"hidden"},children:p.jsxs("div",{className:"container-luxury",style:{position:"relative",zIndex:10},children:[p.jsxs("div",{style:{marginBottom:"64px"},children:[p.jsx("div",{className:"badge-gold",style:{marginBottom:"14px"},children:"05 // ACADEMIC & PROFESSIONAL TRAJECTORY"}),p.jsxs("h2",{className:"font-editorial",style:{fontSize:"clamp(2rem, 3.8vw, 3.2rem)",fontWeight:700,color:"#ffffff",lineHeight:1.2},children:["Education & ",p.jsx("span",{className:"gold-gradient-text",children:"Milestones."})]}),p.jsx("p",{style:{color:"#94a3b8",fontSize:"1rem",marginTop:"8px",maxWidth:"620px"},children:"A rigorous technical and scientific pedigree underpinning every system architecture and code solution."})]}),p.jsxs("div",{style:{position:"relative",maxWidth:"860px",margin:"0 auto"},children:[p.jsx("div",{style:{position:"absolute",top:"20px",bottom:"20px",left:"20px",width:"2px",background:"linear-gradient(to bottom, #d4af37 0%, rgba(212, 175, 55, 0.2) 80%, transparent 100%)"}}),p.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"36px"},children:s.map((e,n)=>p.jsxs("div",{style:{position:"relative",paddingLeft:"56px"},children:[p.jsx("div",{style:{position:"absolute",top:"12px",left:"11px",width:"20px",height:"20px",borderRadius:"50%",background:"#0d1526",border:"2px solid #d4af37",boxShadow:"0 0 15px rgba(212, 175, 55, 0.6)",display:"flex",alignItems:"center",justifyContent:"center"},children:p.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:"#f3d078"}})}),p.jsxs("div",{className:"glass-panel",style:{padding:"28px 32px",borderRadius:"16px",border:"1px solid rgba(212, 175, 55, 0.18)",background:"linear-gradient(145deg, rgba(14, 22, 38, 0.6) 0%, rgba(8, 12, 22, 0.8) 100%)",transition:"all 0.3s ease"},onMouseEnter:r=>{r.currentTarget.style.borderColor="rgba(212, 175, 55, 0.4)",r.currentTarget.style.transform="translateX(4px)"},onMouseLeave:r=>{r.currentTarget.style.borderColor="rgba(212, 175, 55, 0.18)",r.currentTarget.style.transform="none"},children:[p.jsxs("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"flex-start",gap:"10px",marginBottom:"10px"},children:[p.jsxs("span",{className:"badge-gold",children:[p.jsx(VM,{size:13}),e.badge]}),p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",color:"#cbd5e1",fontSize:"0.8rem",fontFamily:"var(--font-mono)"},children:[p.jsx(bM,{size:13,color:"#d4af37"}),p.jsx("span",{children:e.period})]})]}),p.jsx("h3",{className:"font-editorial",style:{fontSize:"1.35rem",fontWeight:700,color:"#ffffff",marginBottom:"6px"},children:e.degree}),p.jsx("div",{style:{fontSize:"0.9rem",color:"#d4af37",fontFamily:"var(--font-mono)",marginBottom:"12px"},children:e.institution}),p.jsx("p",{style:{color:"#94a3b8",fontSize:"0.92rem",lineHeight:1.7},children:e.description})]})]},e.degree))})]})]})})}var Kd={};(function s(e,n,r,a){var c=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),u=typeof Path2D=="function"&&typeof DOMMatrix=="function",d=(function(){if(!e.OffscreenCanvas)return!1;try{var N=new OffscreenCanvas(1,1),x=N.getContext("2d");x.fillRect(0,0,1,1);var B=N.transferToImageBitmap();x.createPattern(B,"no-repeat")}catch{return!1}return!0})();function h(){}function g(N){var x=n.exports.Promise,B=x!==void 0?x:e.Promise;return typeof B=="function"?new B(N):(N(h,h),null)}var _=(function(N,x){return{transform:function(B){if(N)return B;if(x.has(B))return x.get(B);var oe=new OffscreenCanvas(B.width,B.height),V=oe.getContext("2d");return V.drawImage(B,0,0),x.set(B,oe),oe},clear:function(){x.clear()}}})(d,new Map),S=(function(){var N=Math.floor(16.666666666666668),x,B,oe={},V=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(x=function(J){var ce=Math.random();return oe[ce]=requestAnimationFrame(function ie(xe){V===xe||V+N-1<xe?(V=xe,delete oe[ce],J()):oe[ce]=requestAnimationFrame(ie)}),ce},B=function(J){oe[J]&&cancelAnimationFrame(oe[J])}):(x=function(J){return setTimeout(J,N)},B=function(J){return clearTimeout(J)}),{frame:x,cancel:B}})(),v=(function(){var N,x,B={};function oe(V){function J(ce,ie){V.postMessage({options:ce||{},callback:ie})}V.init=function(ie){var xe=ie.transferControlToOffscreen();V.postMessage({canvas:xe},[xe])},V.fire=function(ie,xe,Ae){if(x)return J(ie,null),x;var Ce=Math.random().toString(36).slice(2);return x=g(function(Qe){function nt($e){$e.data.callback===Ce&&(delete B[Ce],V.removeEventListener("message",nt),x=null,_.clear(),Ae(),Qe())}V.addEventListener("message",nt),J(ie,Ce),B[Ce]=nt.bind(null,{data:{callback:Ce}})}),x},V.reset=function(){V.postMessage({reset:!0});for(var ie in B)B[ie](),delete B[ie]}}return function(){if(N)return N;if(!r&&c){var V=["var CONFETTI, SIZE = {}, module = {};","("+s.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{N=new Worker(URL.createObjectURL(new Blob([V])))}catch(J){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",J),null}oe(N)}return N}})(),E={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function w(N,x){return x?x(N):N}function C(N){return N!=null}function M(N,x,B){return w(N&&C(N[x])?N[x]:E[x],B)}function y(N){return N<0?0:Math.floor(N)}function O(N,x){return Math.floor(Math.random()*(x-N))+N}function U(N){return parseInt(N,16)}function L(N){return N.map(Y)}function Y(N){var x=String(N).replace(/[^0-9a-f]/gi,"");return x.length<6&&(x=x[0]+x[0]+x[1]+x[1]+x[2]+x[2]),{r:U(x.substring(0,2)),g:U(x.substring(2,4)),b:U(x.substring(4,6))}}function z(N){var x=M(N,"origin",Object);return x.x=M(x,"x",Number),x.y=M(x,"y",Number),x}function k(N){N.width=document.documentElement.clientWidth,N.height=document.documentElement.clientHeight}function X(N){var x=N.getBoundingClientRect();N.width=x.width,N.height=x.height}function P(N){var x=document.createElement("canvas");return x.style.position="fixed",x.style.top="0px",x.style.left="0px",x.style.pointerEvents="none",x.style.zIndex=N,x}function R(N,x,B,oe,V,J,ce,ie,xe){N.save(),N.translate(x,B),N.rotate(J),N.scale(oe,V),N.arc(0,0,1,ce,ie,xe),N.restore()}function j(N){var x=N.angle*(Math.PI/180),B=N.spread*(Math.PI/180);return{x:N.x,y:N.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:N.startVelocity*.5+Math.random()*N.startVelocity,angle2D:-x+(.5*B-Math.random()*B),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:N.color,shape:N.shape,tick:0,totalTicks:N.ticks,decay:N.decay,drift:N.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:N.gravity*3,ovalScalar:.6,scalar:N.scalar,flat:N.flat}}function he(N,x){x.x+=Math.cos(x.angle2D)*x.velocity+x.drift,x.y+=Math.sin(x.angle2D)*x.velocity+x.gravity,x.velocity*=x.decay,x.flat?(x.wobble=0,x.wobbleX=x.x+10*x.scalar,x.wobbleY=x.y+10*x.scalar,x.tiltSin=0,x.tiltCos=0,x.random=1):(x.wobble+=x.wobbleSpeed,x.wobbleX=x.x+10*x.scalar*Math.cos(x.wobble),x.wobbleY=x.y+10*x.scalar*Math.sin(x.wobble),x.tiltAngle+=.1,x.tiltSin=Math.sin(x.tiltAngle),x.tiltCos=Math.cos(x.tiltAngle),x.random=Math.random()+2);var B=x.tick++/x.totalTicks,oe=x.x+x.random*x.tiltCos,V=x.y+x.random*x.tiltSin,J=x.wobbleX+x.random*x.tiltCos,ce=x.wobbleY+x.random*x.tiltSin;if(N.fillStyle="rgba("+x.color.r+", "+x.color.g+", "+x.color.b+", "+(1-B)+")",N.beginPath(),u&&x.shape.type==="path"&&typeof x.shape.path=="string"&&Array.isArray(x.shape.matrix))N.fill(ae(x.shape.path,x.shape.matrix,x.x,x.y,Math.abs(J-oe)*.1,Math.abs(ce-V)*.1,Math.PI/10*x.wobble));else if(x.shape.type==="bitmap"){var ie=Math.PI/10*x.wobble,xe=Math.abs(J-oe)*.1,Ae=Math.abs(ce-V)*.1,Ce=x.shape.bitmap.width*x.scalar,Qe=x.shape.bitmap.height*x.scalar,nt=new DOMMatrix([Math.cos(ie)*xe,Math.sin(ie)*xe,-Math.sin(ie)*Ae,Math.cos(ie)*Ae,x.x,x.y]);nt.multiplySelf(new DOMMatrix(x.shape.matrix));var $e=N.createPattern(_.transform(x.shape.bitmap),"no-repeat");$e.setTransform(nt),N.globalAlpha=1-B,N.fillStyle=$e,N.fillRect(x.x-Ce/2,x.y-Qe/2,Ce,Qe),N.globalAlpha=1}else if(x.shape==="circle")N.ellipse?N.ellipse(x.x,x.y,Math.abs(J-oe)*x.ovalScalar,Math.abs(ce-V)*x.ovalScalar,Math.PI/10*x.wobble,0,2*Math.PI):R(N,x.x,x.y,Math.abs(J-oe)*x.ovalScalar,Math.abs(ce-V)*x.ovalScalar,Math.PI/10*x.wobble,0,2*Math.PI);else if(x.shape==="star")for(var F=Math.PI/2*3,Rt=4*x.scalar,it=8*x.scalar,tt=x.x,Be=x.y,vt=5,Ue=Math.PI/vt;vt--;)tt=x.x+Math.cos(F)*it,Be=x.y+Math.sin(F)*it,N.lineTo(tt,Be),F+=Ue,tt=x.x+Math.cos(F)*Rt,Be=x.y+Math.sin(F)*Rt,N.lineTo(tt,Be),F+=Ue;else N.moveTo(Math.floor(x.x),Math.floor(x.y)),N.lineTo(Math.floor(x.wobbleX),Math.floor(V)),N.lineTo(Math.floor(J),Math.floor(ce)),N.lineTo(Math.floor(oe),Math.floor(x.wobbleY));return N.closePath(),N.fill(),x.tick<x.totalTicks}function ne(N,x,B,oe,V){var J=x.slice(),ce=N.getContext("2d"),ie,xe,Ae=g(function(Ce){function Qe(){ie=xe=null,ce.clearRect(0,0,oe.width,oe.height),_.clear(),V(),Ce()}function nt(){r&&!(oe.width===a.width&&oe.height===a.height)&&(oe.width=N.width=a.width,oe.height=N.height=a.height),!oe.width&&!oe.height&&(B(N),oe.width=N.width,oe.height=N.height),ce.clearRect(0,0,oe.width,oe.height),J=J.filter(function($e){return he(ce,$e)}),J.length?ie=S.frame(nt):Qe()}ie=S.frame(nt),xe=Qe});return{addFettis:function(Ce){return J=J.concat(Ce),Ae},canvas:N,promise:Ae,reset:function(){ie&&S.cancel(ie),xe&&xe()}}}function pe(N,x){var B=!N,oe=!!M(x||{},"resize"),V=!1,J=M(x,"disableForReducedMotion",Boolean),ce=c&&!!M(x||{},"useWorker"),ie=ce?v():null,xe=B?k:X,Ae=N&&ie?!!N.__confetti_initialized:!1,Ce=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,Qe;function nt(F,Rt,it){for(var tt=M(F,"particleCount",y),Be=M(F,"angle",Number),vt=M(F,"spread",Number),Ue=M(F,"startVelocity",Number),I=M(F,"decay",Number),b=M(F,"gravity",Number),te=M(F,"drift",Number),_e=M(F,"colors",L),ye=M(F,"ticks",Number),ge=M(F,"shapes"),Xe=M(F,"scalar"),Re=!!M(F,"flat"),Fe=z(F),ft=tt,Ee=[],ze=N.width*Fe.x,Ze=N.height*Fe.y;ft--;)Ee.push(j({x:ze,y:Ze,angle:Be,spread:vt,startVelocity:Ue,color:_e[ft%_e.length],shape:ge[O(0,ge.length)],ticks:ye,decay:I,gravity:b,drift:te,scalar:Xe,flat:Re}));return Qe?Qe.addFettis(Ee):(Qe=ne(N,Ee,xe,Rt,it),Qe.promise)}function $e(F){var Rt=J||M(F,"disableForReducedMotion",Boolean),it=M(F,"zIndex",Number);if(Rt&&Ce)return g(function(Ue){Ue()});B&&Qe?N=Qe.canvas:B&&!N&&(N=P(it),document.body.appendChild(N)),oe&&!Ae&&xe(N);var tt={width:N.width,height:N.height};ie&&!Ae&&ie.init(N),Ae=!0,ie&&(N.__confetti_initialized=!0);function Be(){if(ie){var Ue={getBoundingClientRect:function(){if(!B)return N.getBoundingClientRect()}};xe(Ue),ie.postMessage({resize:{width:Ue.width,height:Ue.height}});return}tt.width=tt.height=null}function vt(){Qe=null,oe&&(V=!1,e.removeEventListener("resize",Be)),B&&N&&(document.body.contains(N)&&document.body.removeChild(N),N=null,Ae=!1)}return oe&&!V&&(V=!0,e.addEventListener("resize",Be,!1)),ie?ie.fire(F,tt,vt):nt(F,tt,vt)}return $e.reset=function(){ie&&ie.reset(),Qe&&Qe.reset()},$e}var me;function de(){return me||(me=pe(null,{useWorker:!0,resize:!0})),me}function ae(N,x,B,oe,V,J,ce){var ie=new Path2D(N),xe=new Path2D;xe.addPath(ie,new DOMMatrix(x));var Ae=new Path2D;return Ae.addPath(xe,new DOMMatrix([Math.cos(ce)*V,Math.sin(ce)*V,-Math.sin(ce)*J,Math.cos(ce)*J,B,oe])),Ae}function G(N){if(!u)throw new Error("path confetti are not supported in this browser");var x,B;typeof N=="string"?x=N:(x=N.path,B=N.matrix);var oe=new Path2D(x),V=document.createElement("canvas"),J=V.getContext("2d");if(!B){for(var ce=1e3,ie=ce,xe=ce,Ae=0,Ce=0,Qe,nt,$e=0;$e<ce;$e+=2)for(var F=0;F<ce;F+=2)J.isPointInPath(oe,$e,F,"nonzero")&&(ie=Math.min(ie,$e),xe=Math.min(xe,F),Ae=Math.max(Ae,$e),Ce=Math.max(Ce,F));Qe=Ae-ie,nt=Ce-xe;var Rt=10,it=Math.min(Rt/Qe,Rt/nt);B=[it,0,0,it,-Math.round(Qe/2+ie)*it,-Math.round(nt/2+xe)*it]}return{type:"path",path:x,matrix:B}}function fe(N){var x,B=1,oe="#000000",V='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof N=="string"?x=N:(x=N.text,B="scalar"in N?N.scalar:B,V="fontFamily"in N?N.fontFamily:V,oe="color"in N?N.color:oe);var J=10*B,ce=""+J+"px "+V,ie=new OffscreenCanvas(J,J),xe=ie.getContext("2d");xe.font=ce;var Ae=xe.measureText(x),Ce=Math.ceil(Ae.actualBoundingBoxRight+Ae.actualBoundingBoxLeft),Qe=Math.ceil(Ae.actualBoundingBoxAscent+Ae.actualBoundingBoxDescent),nt=2,$e=Ae.actualBoundingBoxLeft+nt,F=Ae.actualBoundingBoxAscent+nt;Ce+=nt+nt,Qe+=nt+nt,ie=new OffscreenCanvas(Ce,Qe),xe=ie.getContext("2d"),xe.font=ce,xe.fillStyle=oe,xe.fillText(x,$e,F);var Rt=1/B;return{type:"bitmap",bitmap:ie.transferToImageBitmap(),matrix:[Rt,0,0,Rt,-Ce*Rt/2,-Qe*Rt/2]}}n.exports=function(){return de().apply(this,arguments)},n.exports.reset=function(){de().reset()},n.exports.create=pe,n.exports.shapeFromPath=G,n.exports.shapeFromText=fe})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),Kd,!1);const GE=Kd.exports;Kd.exports.create;function WE({profile:s}){const{email:e="uthayanvanojan5@gmail.com",phone:n="+94 75 029 2685",location:r="Jaffna, Sri Lanka"}=s||{},[a,c]=at.useState({name:"",email:"",subject:"",message:""}),[u,d]=at.useState({loading:!1,success:!1,error:null}),[h,g]=at.useState(null),_=(v,E)=>{navigator.clipboard.writeText(v),g(E),setTimeout(()=>g(null),2500)},S=async v=>{v.preventDefault(),d({loading:!0,error:null,success:!1});try{const E=await fetch("/api/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),w=await E.json();if(!E.ok)throw new Error(w.error||"Failed to submit message");d({loading:!1,success:!0,error:null}),c({name:"",email:"",subject:"",message:""}),GE({particleCount:70,spread:60,origin:{y:.7},colors:["#d4af37","#f59e0b","#fcd34d","#38bdf8"]}),setTimeout(()=>{d(C=>({...C,success:!1}))},6e3)}catch(E){d({loading:!1,success:!1,error:E.message})}};return p.jsxs("section",{id:"contact",style:{position:"relative",padding:"120px 0",overflow:"hidden"},children:[p.jsx("div",{className:"ambient-glow-gold",style:{bottom:"10%",right:"15%",opacity:.6}}),p.jsxs("div",{className:"container-luxury",style:{position:"relative",zIndex:10},children:[p.jsxs("div",{style:{marginBottom:"60px"},children:[p.jsx("div",{className:"badge-gold",style:{marginBottom:"14px"},children:"06 // INITIATE DIALOGUE"}),p.jsxs("h2",{className:"font-editorial",style:{fontSize:"clamp(2rem, 3.8vw, 3.2rem)",fontWeight:700,color:"#ffffff",lineHeight:1.2},children:["Let's Engineer ",p.jsx("span",{className:"gold-gradient-text",children:"Exceptional"})," Systems."]}),p.jsx("p",{style:{color:"#94a3b8",fontSize:"1rem",marginTop:"8px",maxWidth:"600px"},children:"Whether commissioning architectural consultations, high-scale application builds, or full-time strategic engineering, send an inquiry below."})]}),p.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:"48px"},className:"contact-grid",children:[p.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[p.jsxs("div",{className:"glass-panel",style:{padding:"24px",borderRadius:"16px",border:"1px solid rgba(212, 175, 55, 0.2)",background:"rgba(14, 22, 38, 0.55)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[p.jsx("div",{style:{width:"44px",height:"44px",borderRadius:"12px",background:"rgba(212, 175, 55, 0.12)",display:"flex",alignItems:"center",justifyContent:"center"},children:p.jsx(Rl,{size:20,color:"#d4af37"})}),p.jsxs("div",{children:[p.jsx("div",{className:"font-mono",style:{fontSize:"0.72rem",color:"#94a3b8",textTransform:"uppercase"},children:"Direct Email"}),p.jsx("div",{style:{fontSize:"0.98rem",fontWeight:600,color:"#f8fafc",marginTop:"2px"},children:e})]})]}),p.jsxs("button",{onClick:()=>_(e,"email"),title:"Copy email to clipboard",style:{background:"rgba(255, 255, 255, 0.06)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"8px",padding:"8px 12px",color:h==="email"?"#10b981":"#d4af37",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",fontSize:"0.75rem",fontFamily:"var(--font-mono)"},children:[h==="email"?p.jsx(Yu,{size:14}):p.jsx(wm,{size:14}),p.jsx("span",{children:h==="email"?"Copied":"Copy"})]})]}),p.jsxs("div",{className:"glass-panel",style:{padding:"24px",borderRadius:"16px",border:"1px solid rgba(212, 175, 55, 0.2)",background:"rgba(14, 22, 38, 0.55)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[p.jsx("div",{style:{width:"44px",height:"44px",borderRadius:"12px",background:"rgba(212, 175, 55, 0.12)",display:"flex",alignItems:"center",justifyContent:"center"},children:p.jsx(oE,{size:20,color:"#d4af37"})}),p.jsxs("div",{children:[p.jsx("div",{className:"font-mono",style:{fontSize:"0.72rem",color:"#94a3b8",textTransform:"uppercase"},children:"Phone / WhatsApp"}),p.jsx("div",{style:{fontSize:"0.98rem",fontWeight:600,color:"#f8fafc",marginTop:"2px"},children:n})]})]}),p.jsxs("button",{onClick:()=>_(n,"phone"),title:"Copy phone to clipboard",style:{background:"rgba(255, 255, 255, 0.06)",border:"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"8px",padding:"8px 12px",color:h==="phone"?"#10b981":"#d4af37",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",fontSize:"0.75rem",fontFamily:"var(--font-mono)"},children:[h==="phone"?p.jsx(Yu,{size:14}):p.jsx(wm,{size:14}),p.jsx("span",{children:h==="phone"?"Copied":"Copy"})]})]}),p.jsxs("div",{className:"glass-panel",style:{padding:"24px",borderRadius:"16px",border:"1px solid rgba(212, 175, 55, 0.2)",background:"rgba(14, 22, 38, 0.55)",display:"flex",alignItems:"center",gap:"16px"},children:[p.jsx("div",{style:{width:"44px",height:"44px",borderRadius:"12px",background:"rgba(212, 175, 55, 0.12)",display:"flex",alignItems:"center",justifyContent:"center"},children:p.jsx(hg,{size:20,color:"#d4af37"})}),p.jsxs("div",{children:[p.jsx("div",{className:"font-mono",style:{fontSize:"0.72rem",color:"#94a3b8",textTransform:"uppercase"},children:"Base of Operations"}),p.jsx("div",{style:{fontSize:"0.98rem",fontWeight:600,color:"#f8fafc",marginTop:"2px"},children:r})]})]}),p.jsxs("div",{style:{padding:"20px",borderRadius:"14px",background:"rgba(212, 175, 55, 0.06)",border:"1px solid rgba(212, 175, 55, 0.25)",display:"flex",alignItems:"center",gap:"12px"},children:[p.jsx($d,{size:18,color:"#d4af37",style:{flexShrink:0}}),p.jsx("div",{style:{fontSize:"0.85rem",color:"#cbd5e1"},children:"Inquiries are routed directly to the real-time encrypted dashboard inbox. Expected response turnaround is typically within 12 hours."})]})]}),p.jsx("div",{className:"glass-panel",style:{padding:"36px",borderRadius:"20px",border:"1px solid rgba(212, 175, 55, 0.25)",background:"linear-gradient(145deg, rgba(14, 22, 38, 0.7) 0%, rgba(8, 12, 22, 0.9) 100%)"},children:p.jsxs("form",{onSubmit:S,style:{display:"flex",flexDirection:"column",gap:"20px"},children:[p.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"16px"},children:[p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.75rem",color:"#cbd5e1",marginBottom:"8px",textTransform:"uppercase"},children:"Your Full Name *"}),p.jsx("input",{type:"text",required:!0,placeholder:"e.g. Elena Vance",value:a.name,onChange:v=>c({...a,name:v.target.value}),style:{width:"100%",padding:"12px 16px",borderRadius:"10px",background:"rgba(6, 8, 13, 0.7)",border:"1px solid rgba(255, 255, 255, 0.1)",color:"#ffffff",fontSize:"0.92rem",outline:"none",transition:"border-color 0.25s ease"},onFocus:v=>v.target.style.borderColor="#d4af37",onBlur:v=>v.target.style.borderColor="rgba(255, 255, 255, 0.1)"})]}),p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.75rem",color:"#cbd5e1",marginBottom:"8px",textTransform:"uppercase"},children:"Your Email Address *"}),p.jsx("input",{type:"email",required:!0,placeholder:"e.g. elena@domain.com",value:a.email,onChange:v=>c({...a,email:v.target.value}),style:{width:"100%",padding:"12px 16px",borderRadius:"10px",background:"rgba(6, 8, 13, 0.7)",border:"1px solid rgba(255, 255, 255, 0.1)",color:"#ffffff",fontSize:"0.92rem",outline:"none",transition:"border-color 0.25s ease"},onFocus:v=>v.target.style.borderColor="#d4af37",onBlur:v=>v.target.style.borderColor="rgba(255, 255, 255, 0.1)"})]})]}),p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.75rem",color:"#cbd5e1",marginBottom:"8px",textTransform:"uppercase"},children:"Inquiry Topic / Scope"}),p.jsx("input",{type:"text",placeholder:"e.g. Full-Stack Web Platform Architecture / Contract Engagement",value:a.subject,onChange:v=>c({...a,subject:v.target.value}),style:{width:"100%",padding:"12px 16px",borderRadius:"10px",background:"rgba(6, 8, 13, 0.7)",border:"1px solid rgba(255, 255, 255, 0.1)",color:"#ffffff",fontSize:"0.92rem",outline:"none",transition:"border-color 0.25s ease"},onFocus:v=>v.target.style.borderColor="#d4af37",onBlur:v=>v.target.style.borderColor="rgba(255, 255, 255, 0.1)"})]}),p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.75rem",color:"#cbd5e1",marginBottom:"8px",textTransform:"uppercase"},children:"Project Details & Specifications *"}),p.jsx("textarea",{rows:5,required:!0,placeholder:"Share details regarding your technical requirements, architecture, timeline, and goals...",value:a.message,onChange:v=>c({...a,message:v.target.value}),style:{width:"100%",padding:"14px 16px",borderRadius:"10px",background:"rgba(6, 8, 13, 0.7)",border:"1px solid rgba(255, 255, 255, 0.1)",color:"#ffffff",fontSize:"0.92rem",outline:"none",resize:"vertical",fontFamily:"inherit",lineHeight:1.6,transition:"border-color 0.25s ease"},onFocus:v=>v.target.style.borderColor="#d4af37",onBlur:v=>v.target.style.borderColor="rgba(255, 255, 255, 0.1)"})]}),u.error&&p.jsx("div",{style:{color:"#ef4444",fontSize:"0.85rem",padding:"10px",borderRadius:"8px",background:"rgba(239, 68, 68, 0.1)"},children:u.error}),u.success&&p.jsxs("div",{style:{color:"#10b981",fontSize:"0.85rem",padding:"12px",borderRadius:"8px",background:"rgba(16, 185, 129, 0.1)",border:"1px solid rgba(16, 185, 129, 0.25)",display:"flex",alignItems:"center",gap:"8px"},children:[p.jsx(Yu,{size:16}),p.jsx("span",{children:"Your message was delivered successfully and logged to the admin dashboard."})]}),p.jsx("button",{type:"submit",disabled:u.loading,className:"btn-gold",style:{width:"100%",padding:"1rem",marginTop:"6px"},children:u.loading?p.jsx("span",{children:"Transmitting Encrypted Dispatch..."}):p.jsxs(p.Fragment,{children:[p.jsx("span",{children:"Transmit Project Inquiry"}),p.jsx(hE,{size:16})]})})]})})]})]})]})}function XE({onOpenAdmin:s,profile:e}){const n=()=>{window.scrollTo({top:0,behavior:"smooth"})};return p.jsx("footer",{style:{position:"relative",padding:"80px 0 40px",borderTop:"1px solid rgba(212, 175, 55, 0.15)",background:"rgba(5, 7, 11, 0.95)",zIndex:10},children:p.jsxs("div",{className:"container-luxury",children:[p.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:"40px",marginBottom:"60px"},children:[p.jsxs("div",{children:[p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[p.jsx("div",{style:{width:"36px",height:"36px",borderRadius:"8px",border:"1px solid rgba(212, 175, 55, 0.5)",background:"linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(15, 23, 42, 0.8))",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--font-editorial)",fontWeight:700,fontSize:"0.95rem",color:"#f8fafc"},children:"UV"}),p.jsx("span",{className:"font-editorial",style:{fontSize:"1.1rem",fontWeight:700,letterSpacing:"0.08em",color:"#ffffff"},children:"UTHAYAGUNASINGAM VANOJAN"})]}),p.jsx("p",{style:{color:"#8b9bb4",fontSize:"0.88rem",lineHeight:1.7,maxWidth:"340px"},children:"Full-Stack Software Engineer & Solutions Architect. Art-directed and engineered around authentic personal portrait photography with dark cinematic luxury aesthetics."})]}),p.jsxs("div",{children:[p.jsx("div",{className:"font-mono",style:{fontSize:"0.78rem",color:"#d4af37",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"16px"},children:"Navigation Architecture"}),p.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:[p.jsx("a",{href:"#hero",style:{color:"#cbd5e1",fontSize:"0.88rem",textDecoration:"none",transition:"color 0.2s"},children:"Identity & Vision"}),p.jsx("a",{href:"#about",style:{color:"#cbd5e1",fontSize:"0.88rem",textDecoration:"none",transition:"color 0.2s"},children:"Biography & Ethos"}),p.jsx("a",{href:"#projects",style:{color:"#cbd5e1",fontSize:"0.88rem",textDecoration:"none",transition:"color 0.2s"},children:"Selected Systems"}),p.jsx("a",{href:"#skills",style:{color:"#cbd5e1",fontSize:"0.88rem",textDecoration:"none",transition:"color 0.2s"},children:"Technical Mastery"}),p.jsx("a",{href:"#experience",style:{color:"#cbd5e1",fontSize:"0.88rem",textDecoration:"none",transition:"color 0.2s"},children:"Education Trajectory"}),p.jsx("a",{href:"#contact",style:{color:"#cbd5e1",fontSize:"0.88rem",textDecoration:"none",transition:"color 0.2s"},children:"Initiate Dialogue"})]})]}),p.jsxs("div",{children:[p.jsx("div",{className:"font-mono",style:{fontSize:"0.78rem",color:"#d4af37",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"16px"},children:"Management Portal"}),p.jsx("p",{style:{color:"#8b9bb4",fontSize:"0.85rem",lineHeight:1.6,marginBottom:"14px"},children:"Secure administrative access for real-time portfolio data mutation, message review, analytics, and project editing."}),p.jsxs("button",{onClick:s,className:"btn-ghost-luxury",style:{padding:"0.65rem 1.2rem",fontSize:"0.78rem",fontFamily:"var(--font-mono)"},children:[p.jsx(Yd,{size:14,color:"#d4af37"}),p.jsx("span",{children:"ACCESS ADMIN DASHBOARD"})]}),p.jsxs("div",{style:{color:"#64748b",fontSize:"0.72rem",fontFamily:"var(--font-mono)",marginTop:"8px"},children:["Shortcut: press ",p.jsx("kbd",{style:{background:"#1e293b",padding:"2px 6px",borderRadius:"4px",color:"#94a3b8"},children:"Ctrl+Shift+A"})]})]})]}),p.jsxs("div",{style:{paddingTop:"32px",borderTop:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",gap:"16px"},children:[p.jsxs("div",{style:{color:"#64748b",fontSize:"0.8rem",fontFamily:"var(--font-mono)"},children:["© ",new Date().getFullYear()," Uthayagunasingam Vanojan. All rights reserved. Built with React & Three.js."]}),p.jsx("button",{onClick:n,title:"Back to Top",style:{background:"rgba(212, 175, 55, 0.1)",border:"1px solid rgba(212, 175, 55, 0.3)",borderRadius:"50%",width:"40px",height:"40px",display:"flex",alignItems:"center",justifyContent:"center",color:"#d4af37",cursor:"pointer",transition:"all 0.3s ease"},onMouseEnter:r=>{r.currentTarget.style.background="#d4af37",r.currentTarget.style.color="#06080d"},onMouseLeave:r=>{r.currentTarget.style.background="rgba(212, 175, 55, 0.1)",r.currentTarget.style.color="#d4af37"},children:p.jsx(TM,{size:16})})]})]})})}function qE({onLoginSuccess:s,onClose:e}){const[n,r]=at.useState("admin"),[a,c]=at.useState("vanojan2026"),[u,d]=at.useState(null),[h,g]=at.useState(!1),_=async S=>{S.preventDefault(),g(!0),d(null);try{const v=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:n,password:a})}),E=await v.json();if(!v.ok)throw new Error(E.error||"Authentication failed");localStorage.setItem("vanojan_admin_token",E.token),s(E.token)}catch(v){d(v.message)}finally{g(!1)}};return p.jsx("div",{style:{position:"fixed",inset:0,zIndex:1e3,background:"rgba(3, 5, 8, 0.92)",backdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"},children:p.jsxs("div",{className:"glass-panel",style:{width:"100%",maxWidth:"440px",padding:"40px 36px",borderRadius:"24px",border:"1px solid rgba(212, 175, 55, 0.35)",background:"linear-gradient(145deg, #0d1526 0%, #06080d 100%)",boxShadow:"0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.2)",position:"relative"},children:[p.jsx("button",{onClick:e,style:{position:"absolute",top:"20px",right:"20px",background:"transparent",border:"none",color:"#94a3b8",cursor:"pointer",padding:"4px"},children:p.jsx(Ul,{size:20})}),p.jsxs("div",{style:{textAlign:"center",marginBottom:"28px"},children:[p.jsx("div",{style:{width:"56px",height:"56px",borderRadius:"16px",background:"linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(15, 23, 42, 0.9))",border:"1px solid #d4af37",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",boxShadow:"0 0 25px rgba(212, 175, 55, 0.3)"},children:p.jsx(Yd,{size:28,color:"#d4af37"})}),p.jsx("h2",{className:"font-editorial",style:{fontSize:"1.6rem",color:"#ffffff",fontWeight:700},children:"Executive Console"}),p.jsx("div",{className:"font-mono",style:{fontSize:"0.75rem",color:"#d4af37",marginTop:"4px"},children:"AUTHENTICATED PORTFOLIO MANAGEMENT"})]}),p.jsxs("form",{onSubmit:_,style:{display:"flex",flexDirection:"column",gap:"20px"},children:[p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px",textTransform:"uppercase"},children:"Admin Identifier"}),p.jsxs("div",{style:{position:"relative"},children:[p.jsx("input",{type:"text",required:!0,value:n,onChange:S=>r(S.target.value),style:{width:"100%",padding:"12px 16px 12px 42px",borderRadius:"10px",background:"rgba(6, 8, 13, 0.8)",border:"1px solid rgba(255, 255, 255, 0.1)",color:"#ffffff",fontSize:"0.92rem",outline:"none"}}),p.jsx(RE,{size:16,color:"#94a3b8",style:{position:"absolute",left:"14px",top:"50%",transform:"translateY(-50%)"}})]})]}),p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px",textTransform:"uppercase"},children:"Access Passphrase"}),p.jsxs("div",{style:{position:"relative"},children:[p.jsx("input",{type:"password",required:!0,value:a,onChange:S=>c(S.target.value),style:{width:"100%",padding:"12px 16px 12px 42px",borderRadius:"10px",background:"rgba(6, 8, 13, 0.8)",border:"1px solid rgba(255, 255, 255, 0.1)",color:"#ffffff",fontSize:"0.92rem",outline:"none"}}),p.jsx(YM,{size:16,color:"#94a3b8",style:{position:"absolute",left:"14px",top:"50%",transform:"translateY(-50%)"}})]})]}),p.jsxs("div",{style:{padding:"10px 14px",borderRadius:"8px",background:"rgba(212, 175, 55, 0.08)",border:"1px solid rgba(212, 175, 55, 0.2)",fontSize:"0.76rem",color:"#cbd5e1",display:"flex",alignItems:"center",gap:"8px"},children:[p.jsx(GM,{size:14,color:"#d4af37",style:{flexShrink:0}}),p.jsxs("span",{children:["Default access prefilled: ",p.jsx("strong",{style:{color:"#d4af37"},children:"admin"})," / ",p.jsx("strong",{style:{color:"#d4af37"},children:"vanojan2026"})]})]}),u&&p.jsxs("div",{style:{padding:"10px 14px",borderRadius:"8px",background:"rgba(239, 68, 68, 0.1)",border:"1px solid rgba(239, 68, 68, 0.3)",fontSize:"0.82rem",color:"#ef4444",display:"flex",alignItems:"center",gap:"8px"},children:[p.jsx(RM,{size:16}),p.jsx("span",{children:u})]}),p.jsxs("button",{type:"submit",disabled:h,className:"btn-gold",style:{width:"100%",padding:"0.95rem",marginTop:"6px"},children:[h?"Authenticating...":"Unlock Management Console",p.jsx(SM,{size:16})]})]})]})})}function YE({token:s,onLogout:e,onClose:n,onDataRefresh:r}){var fe,N;const[a,c]=at.useState("overview"),[u,d]=at.useState(null),[h,g]=at.useState([]),[_,S]=at.useState([]),[v,E]=at.useState([]),[w,C]=at.useState({}),[M,y]=at.useState(!0),[O,U]=at.useState(null),[L,Y]=at.useState(null),[z,k]=at.useState({title:"",category:"Full-Stack Web",subtitle:"",description:"",techStack:"",highlights:"",featured:!1,githubUrl:"",liveUrl:""}),X=(x,B="success")=>{U({msg:x,type:B}),setTimeout(()=>U(null),3500)},P=async()=>{y(!0);try{const x={Authorization:`Bearer ${s}`},[B,oe,V]=await Promise.all([fetch("/api/admin/overview",{headers:x}),fetch("/api/admin/messages",{headers:x}),fetch("/api/portfolio")]);if(B.status===401){e();return}const J=await B.json(),ce=await oe.json(),ie=await V.json();d(J),S(ce),g(ie.projects||[]),E(ie.skills||[]),C(ie.profile||{})}catch{X("Error loading dashboard data","error")}finally{y(!1)}};at.useEffect(()=>{P()},[s]);const R=async(x,B,oe)=>{try{(await fetch(`/api/admin/messages/${x}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({[B]:!oe})})).ok&&(S(J=>J.map(ce=>ce.id===x?{...ce,[B]:!oe}:ce)),X(`Message marked as ${oe?"unread":B==="read"?"read":"starred"}`))}catch{X("Action failed","error")}},j=async x=>{if(window.confirm("Delete this message permanently?"))try{(await fetch(`/api/admin/messages/${x}`,{method:"DELETE",headers:{Authorization:`Bearer ${s}`}})).ok&&(S(oe=>oe.filter(V=>V.id!==x)),X("Message deleted"))}catch{X("Delete failed","error")}},he=()=>{Y("new"),k({title:"",category:"Full-Stack Web",subtitle:"",description:"",techStack:"",highlights:"",featured:!0,githubUrl:"https://github.com",liveUrl:"https://github.com"})},ne=x=>{Y(x.id),k({title:x.title,category:x.category,subtitle:x.subtitle||"",description:x.description,techStack:(x.techStack||[]).join(", "),highlights:(x.highlights||[]).join(`
`),featured:!!x.featured,githubUrl:x.githubUrl||"",liveUrl:x.liveUrl||""})},pe=async x=>{x.preventDefault();const B={title:z.title,category:z.category,subtitle:z.subtitle,description:z.description,techStack:z.techStack.split(",").map(oe=>oe.trim()).filter(Boolean),highlights:z.highlights.split(`
`).map(oe=>oe.trim()).filter(Boolean),featured:z.featured,githubUrl:z.githubUrl,liveUrl:z.liveUrl};try{let oe;L==="new"?oe=await fetch("/api/admin/projects",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(B)}):oe=await fetch(`/api/admin/projects/${L}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(B)}),oe.ok?(X("Project saved successfully"),Y(null),P(),r==null||r()):X("Failed to save project","error")}catch{X("Error saving project","error")}},me=async x=>{if(window.confirm("Are you sure you want to delete this project?"))try{(await fetch(`/api/admin/projects/${x}`,{method:"DELETE",headers:{Authorization:`Bearer ${s}`}})).ok&&(g(oe=>oe.filter(V=>V.id!==x)),X("Project deleted"),r==null||r())}catch{X("Delete failed","error")}},de=async x=>{x.preventDefault();try{(await fetch("/api/admin/profile",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(w)})).ok?(X("Profile configuration updated"),r==null||r()):X("Update failed","error")}catch{X("Update error","error")}},ae=async()=>{try{(await fetch("/api/admin/skills",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({skills:v})})).ok&&(X("Technical skills matrix updated"),r==null||r())}catch{X("Save skills failed","error")}},G=(x,B,oe)=>{const V=[...v];V[x].items[B].level=parseInt(oe,10),E(V)};return p.jsxs("div",{style:{position:"fixed",inset:0,zIndex:999,background:"#06080d",color:"#f8fafc",display:"flex",flexDirection:"column",overflow:"hidden"},children:[p.jsxs("header",{style:{height:"68px",borderBottom:"1px solid rgba(212, 175, 55, 0.25)",background:"rgba(10, 16, 28, 0.95)",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0},children:[p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[p.jsx("div",{style:{width:"36px",height:"36px",borderRadius:"8px",background:"linear-gradient(135deg, #d4af37, #152238)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:"0.9rem",color:"#06080d"},children:"UV"}),p.jsxs("div",{children:[p.jsx("div",{className:"font-editorial",style:{fontSize:"1.05rem",fontWeight:700,letterSpacing:"0.08em"},children:"EXECUTIVE CONSOLE"}),p.jsxs("div",{className:"font-mono",style:{fontSize:"0.65rem",color:"#10b981",display:"flex",alignItems:"center",gap:"6px"},children:[p.jsx("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:"#10b981"}}),"AUTHENTICATED • PERSISTENT DATABASE ACTIVE"]})]})]}),p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[p.jsxs("button",{onClick:P,title:"Refresh Data",style:{background:"rgba(255, 255, 255, 0.05)",border:"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"8px",padding:"8px 12px",color:"#cbd5e1",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",fontSize:"0.78rem"},children:[p.jsx(uE,{size:14}),p.jsx("span",{className:"hidden-mobile",children:"Sync"})]}),p.jsxs("button",{onClick:n,className:"btn-gold",style:{padding:"0.55rem 1.2rem",fontSize:"0.78rem"},children:[p.jsx("span",{children:"Return to Portfolio"}),p.jsx(Dl,{size:14})]}),p.jsxs("button",{onClick:e,title:"Sign Out",style:{background:"rgba(239, 68, 68, 0.15)",border:"1px solid rgba(239, 68, 68, 0.3)",borderRadius:"8px",padding:"8px 12px",color:"#f87171",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",fontSize:"0.78rem"},children:[p.jsx(KM,{size:14}),p.jsx("span",{className:"hidden-mobile",children:"Logout"})]})]})]}),p.jsxs("div",{style:{display:"flex",flex:1,overflow:"hidden"},children:[p.jsx("aside",{style:{width:"240px",borderRight:"1px solid rgba(255, 255, 255, 0.08)",background:"rgba(7, 11, 20, 0.95)",padding:"24px 14px",display:"flex",flexDirection:"column",gap:"8px",flexShrink:0},className:"admin-sidebar",children:[{id:"overview",label:"Analytics Overview",icon:XM},{id:"projects",label:"Projects Manager",icon:bm,badge:h.length},{id:"messages",label:"Inbox & Inquiries",icon:Rl,badge:_.filter(x=>!x.read).length},{id:"skills",label:"Skills Matrix",icon:fg},{id:"profile",label:"Identity & Bio",icon:AE}].map(x=>{const B=x.icon,oe=a===x.id;return p.jsxs("button",{onClick:()=>c(x.id),style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderRadius:"10px",border:oe?"1px solid #d4af37":"1px solid transparent",background:oe?"rgba(212, 175, 55, 0.15)":"transparent",color:oe?"#f3d078":"#94a3b8",cursor:"pointer",fontSize:"0.86rem",fontFamily:"var(--font-sans)",fontWeight:oe?600:400,transition:"all 0.2s ease",textAlign:"left"},children:[p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[p.jsx(B,{size:18,color:oe?"#d4af37":"#94a3b8"}),p.jsx("span",{children:x.label})]}),x.badge!==void 0&&x.badge>0&&p.jsx("span",{style:{background:x.id==="messages"?"#ef4444":"rgba(212, 175, 55, 0.25)",color:"#ffffff",fontSize:"0.7rem",fontFamily:"var(--font-mono)",padding:"2px 7px",borderRadius:"9999px"},children:x.badge})]},x.id)})}),p.jsxs("main",{style:{flex:1,overflowY:"auto",padding:"32px",background:"#080c15"},children:[O&&p.jsx("div",{style:{position:"fixed",top:"80px",right:"30px",zIndex:2e3,padding:"12px 20px",borderRadius:"10px",background:O.type==="error"?"rgba(239, 68, 68, 0.9)":"rgba(16, 185, 129, 0.9)",color:"#ffffff",boxShadow:"0 10px 25px rgba(0, 0, 0, 0.5)",fontFamily:"var(--font-sans)",fontSize:"0.88rem",fontWeight:600},children:O.msg}),a==="overview"&&p.jsxs("div",{children:[p.jsxs("div",{style:{marginBottom:"28px"},children:[p.jsx("h2",{className:"font-editorial",style:{fontSize:"1.8rem",color:"#ffffff"},children:"Telemetry & Analytics Command"}),p.jsx("p",{style:{color:"#94a3b8",fontSize:"0.9rem"},children:"Live audience telemetry, engagement ratios, and immediate contact dispatches."})]}),p.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"20px",marginBottom:"36px"},children:[p.jsxs("div",{className:"glass-panel",style:{padding:"24px",borderRadius:"16px",border:"1px solid rgba(212, 175, 55, 0.2)"},children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[p.jsx("span",{className:"font-mono",style:{fontSize:"0.75rem",color:"#94a3b8",textTransform:"uppercase"},children:"Total Visitors"}),p.jsx(LE,{size:18,color:"#d4af37"})]}),p.jsx("div",{className:"font-editorial",style:{fontSize:"2rem",fontWeight:700,color:"#f8fafc"},children:((fe=u==null?void 0:u.analytics)==null?void 0:fe.totalVisits)||1845}),p.jsx("div",{style:{fontSize:"0.78rem",color:"#10b981",marginTop:"4px"},children:"↑ +14.2% engagement this week"})]}),p.jsxs("div",{className:"glass-panel",style:{padding:"24px",borderRadius:"16px",border:"1px solid rgba(212, 175, 55, 0.2)"},children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[p.jsx("span",{className:"font-mono",style:{fontSize:"0.75rem",color:"#94a3b8",textTransform:"uppercase"},children:"Page Impressions"}),p.jsx(wE,{size:18,color:"#38bdf8"})]}),p.jsx("div",{className:"font-editorial",style:{fontSize:"2rem",fontWeight:700,color:"#f8fafc"},children:((N=u==null?void 0:u.analytics)==null?void 0:N.pageViews)||4580}),p.jsx("div",{style:{fontSize:"0.78rem",color:"#94a3b8",marginTop:"4px"},children:"Average 2m 45s dwell time"})]}),p.jsxs("div",{className:"glass-panel",style:{padding:"24px",borderRadius:"16px",border:"1px solid rgba(212, 175, 55, 0.2)"},children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[p.jsx("span",{className:"font-mono",style:{fontSize:"0.75rem",color:"#94a3b8",textTransform:"uppercase"},children:"Inquiries Received"}),p.jsx(nE,{size:18,color:"#f59e0b"})]}),p.jsx("div",{className:"font-editorial",style:{fontSize:"2rem",fontWeight:700,color:"#f8fafc"},children:(u==null?void 0:u.totalMessages)||_.length}),p.jsxs("div",{style:{fontSize:"0.78rem",color:"#f59e0b",marginTop:"4px"},children:[(u==null?void 0:u.unreadMessages)||0," unread requiring review"]})]}),p.jsxs("div",{className:"glass-panel",style:{padding:"24px",borderRadius:"16px",border:"1px solid rgba(212, 175, 55, 0.2)"},children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[p.jsx("span",{className:"font-mono",style:{fontSize:"0.75rem",color:"#94a3b8",textTransform:"uppercase"},children:"Live Projects"}),p.jsx(bm,{size:18,color:"#a855f7"})]}),p.jsx("div",{className:"font-editorial",style:{fontSize:"2rem",fontWeight:700,color:"#f8fafc"},children:h.length}),p.jsxs("div",{style:{fontSize:"0.78rem",color:"#94a3b8",marginTop:"4px"},children:[h.filter(x=>x.featured).length," designated Featured"]})]})]}),p.jsxs("div",{className:"glass-panel",style:{padding:"28px",borderRadius:"18px",border:"1px solid rgba(255, 255, 255, 0.08)"},children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[p.jsx("h3",{className:"font-editorial",style:{fontSize:"1.25rem",color:"#ffffff"},children:"Recent Inquiries"}),p.jsx("button",{onClick:()=>c("messages"),style:{background:"transparent",border:"none",color:"#d4af37",fontSize:"0.8rem",fontFamily:"var(--font-mono)",cursor:"pointer"},children:"View All Inquiries →"})]}),_.slice(0,3).map(x=>p.jsxs("div",{style:{padding:"16px",borderRadius:"12px",background:x.read?"rgba(255, 255, 255, 0.02)":"rgba(212, 175, 55, 0.08)",border:"1px solid rgba(255, 255, 255, 0.06)",marginBottom:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[p.jsxs("div",{children:[p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[p.jsx("span",{style:{fontWeight:600,color:"#f8fafc"},children:x.name}),p.jsxs("span",{style:{fontSize:"0.75rem",color:"#94a3b8"},children:["• ",x.email]}),!x.read&&p.jsx("span",{className:"badge-gold",style:{fontSize:"0.65rem",padding:"2px 6px"},children:"NEW"})]}),p.jsxs("div",{style:{fontSize:"0.85rem",color:"#cbd5e1",marginTop:"4px"},children:[x.subject,": ",p.jsxs("span",{style:{color:"#94a3b8"},children:[x.message.slice(0,80),"..."]})]})]}),p.jsx("button",{onClick:()=>c("messages"),className:"btn-ghost-luxury",style:{padding:"6px 14px",fontSize:"0.75rem"},children:"Read"})]},x.id))]})]}),a==="projects"&&p.jsxs("div",{children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"28px"},children:[p.jsxs("div",{children:[p.jsx("h2",{className:"font-editorial",style:{fontSize:"1.8rem",color:"#ffffff"},children:"Project Showcase Management"}),p.jsx("p",{style:{color:"#94a3b8",fontSize:"0.9rem"},children:"Add, edit, reorder, and configure architectural project case studies."})]}),p.jsxs("button",{onClick:he,className:"btn-gold",children:[p.jsx(lE,{size:16}),p.jsx("span",{children:"Add Project"})]})]}),p.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:"20px"},children:h.map(x=>p.jsxs("div",{className:"glass-panel",style:{padding:"24px",borderRadius:"16px",border:"1px solid rgba(212, 175, 55, 0.2)",background:"rgba(14, 22, 38, 0.65)",display:"flex",flexDirection:"column",justifyContent:"space-between"},children:[p.jsxs("div",{children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"10px"},children:[p.jsx("span",{className:"badge-navy",children:x.category}),x.featured&&p.jsx("span",{className:"badge-gold",children:"Featured"})]}),p.jsx("h4",{className:"font-editorial",style:{fontSize:"1.25rem",color:"#ffffff",marginBottom:"6px"},children:x.title}),p.jsx("div",{className:"font-mono",style:{fontSize:"0.75rem",color:"#d4af37",marginBottom:"10px"},children:x.subtitle}),p.jsxs("p",{style:{fontSize:"0.85rem",color:"#94a3b8",lineHeight:1.6,marginBottom:"16px"},children:[x.description.slice(0,110),"..."]})]}),p.jsxs("div",{style:{paddingTop:"16px",borderTop:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[p.jsxs("div",{style:{display:"flex",gap:"6px"},children:[p.jsxs("button",{onClick:()=>ne(x),style:{background:"rgba(212, 175, 55, 0.15)",border:"1px solid rgba(212, 175, 55, 0.3)",borderRadius:"8px",padding:"6px 12px",color:"#f3d078",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",fontSize:"0.75rem"},children:[p.jsx(rE,{size:13}),p.jsx("span",{children:"Edit"})]}),p.jsx("button",{onClick:()=>me(x.id),style:{background:"rgba(239, 68, 68, 0.15)",border:"1px solid rgba(239, 68, 68, 0.3)",borderRadius:"8px",padding:"6px 10px",color:"#f87171",cursor:"pointer"},children:p.jsx(Rm,{size:13})})]}),p.jsxs("span",{className:"font-mono",style:{fontSize:"0.72rem",color:"#64748b"},children:["ID: ",x.id]})]})]},x.id))})]}),a==="messages"&&p.jsxs("div",{children:[p.jsxs("div",{style:{marginBottom:"28px"},children:[p.jsxs("h2",{className:"font-editorial",style:{fontSize:"1.8rem",color:"#ffffff"},children:["Inbound Dispatches & Inquiries (",_.length,")"]}),p.jsx("p",{style:{color:"#94a3b8",fontSize:"0.9rem"},children:"Live inquiries captured directly from the portfolio contact form."})]}),_.length===0?p.jsxs("div",{className:"glass-panel",style:{padding:"60px",textAlign:"center",borderRadius:"16px"},children:[p.jsx(Rl,{size:40,color:"#64748b",style:{margin:"0 auto 16px"}}),p.jsx("div",{style:{color:"#cbd5e1",fontSize:"1rem"},children:"No messages in the inbox yet."})]}):p.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:_.map(x=>p.jsxs("div",{className:"glass-panel",style:{padding:"24px",borderRadius:"16px",border:x.read?"1px solid rgba(255, 255, 255, 0.08)":"1px solid rgba(212, 175, 55, 0.4)",background:x.read?"rgba(11, 18, 33, 0.6)":"rgba(21, 32, 54, 0.85)"},children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"14px"},children:[p.jsxs("div",{children:[p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[p.jsx("span",{style:{fontSize:"1.1rem",fontWeight:700,color:"#f8fafc"},children:x.name}),p.jsx("span",{className:"badge-navy",style:{fontSize:"0.7rem"},children:x.email}),!x.read&&p.jsx("span",{className:"badge-gold",children:"UNREAD"})]}),p.jsx("div",{className:"font-editorial",style:{fontSize:"1.05rem",color:"#d4af37",marginTop:"6px"},children:x.subject}),p.jsx("div",{className:"font-mono",style:{fontSize:"0.72rem",color:"#64748b",marginTop:"2px"},children:new Date(x.date).toLocaleString()})]}),p.jsxs("div",{style:{display:"flex",gap:"8px"},children:[p.jsx("button",{onClick:()=>R(x.id,"starred",x.starred),title:x.starred?"Unstar":"Star",style:{background:"transparent",border:"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"8px",padding:"8px",color:x.starred?"#f59e0b":"#94a3b8",cursor:"pointer"},children:p.jsx(SE,{size:16,fill:x.starred?"#f59e0b":"none"})}),p.jsx("button",{onClick:()=>R(x.id,"read",x.read),title:x.read?"Mark as Unread":"Mark as Read",style:{background:"transparent",border:"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"8px",padding:"8px",color:x.read?"#94a3b8":"#10b981",cursor:"pointer"},children:p.jsx(dg,{size:16})}),p.jsx("a",{href:`mailto:${x.email}?subject=Re: ${encodeURIComponent(x.subject)}`,className:"btn-gold",style:{padding:"6px 12px",fontSize:"0.75rem"},children:"Reply"}),p.jsx("button",{onClick:()=>j(x.id),style:{background:"rgba(239, 68, 68, 0.1)",border:"1px solid rgba(239, 68, 68, 0.3)",borderRadius:"8px",padding:"8px",color:"#ef4444",cursor:"pointer"},children:p.jsx(Rm,{size:16})})]})]}),p.jsx("p",{style:{color:"#cbd5e1",fontSize:"0.94rem",lineHeight:1.7,background:"rgba(6, 8, 13, 0.6)",padding:"16px",borderRadius:"10px"},children:x.message})]},x.id))})]}),a==="skills"&&p.jsxs("div",{children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"28px"},children:[p.jsxs("div",{children:[p.jsx("h2",{className:"font-editorial",style:{fontSize:"1.8rem",color:"#ffffff"},children:"Technical Competencies Manager"}),p.jsx("p",{style:{color:"#94a3b8",fontSize:"0.9rem"},children:"Adjust proficiency scores, skill items, and category taxonomies."})]}),p.jsxs("button",{onClick:ae,className:"btn-gold",children:[p.jsx(Cm,{size:16}),p.jsx("span",{children:"Save Skills Matrix"})]})]}),p.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(360px, 1fr))",gap:"24px"},children:v.map((x,B)=>{var oe;return p.jsxs("div",{className:"glass-panel",style:{padding:"24px",borderRadius:"16px",border:"1px solid rgba(212, 175, 55, 0.2)"},children:[p.jsx("h3",{className:"font-editorial",style:{fontSize:"1.2rem",color:"#f3d078",marginBottom:"16px"},children:x.category}),p.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"14px"},children:(oe=x.items)==null?void 0:oe.map((V,J)=>p.jsxs("div",{children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"6px"},children:[p.jsx("span",{style:{fontSize:"0.88rem",color:"#ffffff"},children:V.name}),p.jsxs("span",{className:"font-mono",style:{fontSize:"0.8rem",color:"#d4af37"},children:[V.level,"%"]})]}),p.jsx("input",{type:"range",min:"50",max:"100",value:V.level,onChange:ce=>G(B,J,ce.target.value),style:{width:"100%",accentColor:"#d4af37",cursor:"pointer"}})]},V.name))})]},x.category)})})]}),a==="profile"&&p.jsxs("div",{children:[p.jsxs("div",{style:{marginBottom:"28px"},children:[p.jsx("h2",{className:"font-editorial",style:{fontSize:"1.8rem",color:"#ffffff"},children:"Identity & Profile Configuration"}),p.jsx("p",{style:{color:"#94a3b8",fontSize:"0.9rem"},children:"Update your public executive bio, contact details, status indicator, and social profiles."})]}),p.jsxs("form",{onSubmit:de,className:"glass-panel",style:{padding:"32px",borderRadius:"20px",maxWidth:"800px",border:"1px solid rgba(212, 175, 55, 0.25)"},children:[p.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:"20px",marginBottom:"20px"},children:[p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px",textTransform:"uppercase"},children:"Full Legal Name"}),p.jsx("input",{type:"text",value:w.name||"",onChange:x=>C({...w,name:x.target.value}),style:{width:"100%",padding:"10px 14px",borderRadius:"8px",background:"#06080d",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}})]}),p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px",textTransform:"uppercase"},children:"Primary Professional Title"}),p.jsx("input",{type:"text",value:w.title||"",onChange:x=>C({...w,title:x.target.value}),style:{width:"100%",padding:"10px 14px",borderRadius:"8px",background:"#06080d",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}})]})]}),p.jsxs("div",{style:{marginBottom:"20px"},children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px",textTransform:"uppercase"},children:"Hero Tagline"}),p.jsx("input",{type:"text",value:w.tagline||"",onChange:x=>C({...w,tagline:x.target.value}),style:{width:"100%",padding:"10px 14px",borderRadius:"8px",background:"#06080d",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}})]}),p.jsxs("div",{style:{marginBottom:"20px"},children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px",textTransform:"uppercase"},children:"Biography & Background Narrative"}),p.jsx("textarea",{rows:4,value:w.bio||"",onChange:x=>C({...w,bio:x.target.value}),style:{width:"100%",padding:"12px 14px",borderRadius:"8px",background:"#06080d",border:"1px solid rgba(255,255,255,0.1)",color:"#fff",lineHeight:1.6}})]}),p.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"20px",marginBottom:"24px"},children:[p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px",textTransform:"uppercase"},children:"Contact Email"}),p.jsx("input",{type:"email",value:w.email||"",onChange:x=>C({...w,email:x.target.value}),style:{width:"100%",padding:"10px 14px",borderRadius:"8px",background:"#06080d",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}})]}),p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px",textTransform:"uppercase"},children:"Telephone / WhatsApp"}),p.jsx("input",{type:"text",value:w.phone||"",onChange:x=>C({...w,phone:x.target.value}),style:{width:"100%",padding:"10px 14px",borderRadius:"8px",background:"#06080d",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}})]}),p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px",textTransform:"uppercase"},children:"Location"}),p.jsx("input",{type:"text",value:w.location||"",onChange:x=>C({...w,location:x.target.value}),style:{width:"100%",padding:"10px 14px",borderRadius:"8px",background:"#06080d",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}})]})]}),p.jsxs("div",{style:{marginBottom:"24px"},children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px",textTransform:"uppercase"},children:"Status Pill Text (Header/Hero)"}),p.jsx("input",{type:"text",value:w.statusText||"",onChange:x=>C({...w,statusText:x.target.value}),style:{width:"100%",padding:"10px 14px",borderRadius:"8px",background:"#06080d",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}})]}),p.jsxs("button",{type:"submit",className:"btn-gold",style:{padding:"0.9rem 2rem"},children:[p.jsx(Cm,{size:16}),p.jsx("span",{children:"Update Profile Configuration"})]})]})]})]})]}),L&&p.jsx("div",{style:{position:"fixed",inset:0,zIndex:1100,background:"rgba(2, 4, 8, 0.85)",backdropFilter:"blur(16px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"},onClick:()=>Y(null),children:p.jsxs("div",{className:"glass-panel",style:{width:"100%",maxWidth:"650px",maxHeight:"90vh",overflowY:"auto",borderRadius:"24px",padding:"36px",border:"1px solid rgba(212, 175, 55, 0.4)",background:"#0d1526"},onClick:x=>x.stopPropagation(),children:[p.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px"},children:[p.jsx("h3",{className:"font-editorial",style:{fontSize:"1.6rem",color:"#ffffff"},children:L==="new"?"Create New Showcase Project":"Edit Project Details"}),p.jsx("button",{onClick:()=>Y(null),style:{background:"transparent",border:"none",color:"#94a3b8",cursor:"pointer"},children:p.jsx(Ul,{size:20})})]}),p.jsxs("form",{onSubmit:pe,style:{display:"flex",flexDirection:"column",gap:"16px"},children:[p.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:"16px"},children:[p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px"},children:"Project Title *"}),p.jsx("input",{type:"text",required:!0,value:z.title,onChange:x=>k({...z,title:x.target.value}),style:{width:"100%",padding:"10px 14px",borderRadius:"8px",background:"#06080d",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}})]}),p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px"},children:"Category *"}),p.jsxs("select",{value:z.category,onChange:x=>k({...z,category:x.target.value}),style:{width:"100%",padding:"10px 14px",borderRadius:"8px",background:"#06080d",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"},children:[p.jsx("option",{value:"Full-Stack Web",children:"Full-Stack Web"}),p.jsx("option",{value:"Mobile & Hospitality",children:"Mobile & Hospitality"}),p.jsx("option",{value:"Enterprise Software",children:"Enterprise Software"}),p.jsx("option",{value:"Systems & Analytics",children:"Systems & Analytics"})]})]})]}),p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px"},children:"Subtitle"}),p.jsx("input",{type:"text",value:z.subtitle,onChange:x=>k({...z,subtitle:x.target.value}),style:{width:"100%",padding:"10px 14px",borderRadius:"8px",background:"#06080d",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}})]}),p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px"},children:"Description *"}),p.jsx("textarea",{rows:3,required:!0,value:z.description,onChange:x=>k({...z,description:x.target.value}),style:{width:"100%",padding:"10px 14px",borderRadius:"8px",background:"#06080d",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}})]}),p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px"},children:"Technologies (comma separated)"}),p.jsx("input",{type:"text",placeholder:"React.js, Node.js, SQLite, Three.js",value:z.techStack,onChange:x=>k({...z,techStack:x.target.value}),style:{width:"100%",padding:"10px 14px",borderRadius:"8px",background:"#06080d",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}})]}),p.jsxs("div",{children:[p.jsx("label",{className:"font-mono",style:{display:"block",fontSize:"0.72rem",color:"#cbd5e1",marginBottom:"6px"},children:"Architecture Highlights (one per line)"}),p.jsx("textarea",{rows:3,placeholder:`Real-time SQLite local storage sync
Sub-millisecond query optimization`,value:z.highlights,onChange:x=>k({...z,highlights:x.target.value}),style:{width:"100%",padding:"10px 14px",borderRadius:"8px",background:"#06080d",border:"1px solid rgba(255,255,255,0.1)",color:"#fff"}})]}),p.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[p.jsx("input",{type:"checkbox",id:"featuredToggle",checked:z.featured,onChange:x=>k({...z,featured:x.target.checked}),style:{accentColor:"#d4af37",width:"18px",height:"18px"}}),p.jsx("label",{htmlFor:"featuredToggle",style:{fontSize:"0.9rem",color:"#f8fafc",cursor:"pointer"},children:"Mark as Featured System (Highlighted on Homepage)"})]}),p.jsxs("div",{style:{display:"flex",gap:"12px",marginTop:"12px"},children:[p.jsx("button",{type:"submit",className:"btn-gold",style:{flex:1},children:"Save Project"}),p.jsx("button",{type:"button",onClick:()=>Y(null),className:"btn-ghost-luxury",children:"Cancel"})]})]})]})}),p.jsx("style",{children:`
        @media (max-width: 768px) {
          .admin-sidebar {
            width: 70px !important;
            padding: 16px 8px !important;
          }
          .admin-sidebar span {
            display: none !important;
          }
        }
      `})]})}function $E(){const[s,e]=at.useState({profile:null,projects:[],skills:[],education:[]}),[n,r]=at.useState(!0),[a,c]=at.useState(!1),[u,d]=at.useState(()=>localStorage.getItem("vanojan_admin_token")),h=at.useCallback(async()=>{try{const S=await fetch("/api/portfolio");if(S.ok){const v=await S.json();e(v)}}catch(S){console.warn("Could not fetch portfolio from API, fallback to default state",S)}finally{r(!1)}},[]);at.useEffect(()=>{h(),fetch("/api/analytics/ping",{method:"POST"}).catch(()=>{});const S=v=>{v.ctrlKey&&v.shiftKey&&(v.key==="A"||v.key==="a")&&(v.preventDefault(),c(E=>!E))};return window.addEventListener("keydown",S),()=>window.removeEventListener("keydown",S)},[h]);const g=S=>{d(S)},_=()=>{localStorage.removeItem("vanojan_admin_token"),d(null)};return n&&!s.profile?p.jsxs("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#06080d",color:"#d4af37"},children:[p.jsx("div",{style:{width:"48px",height:"48px",borderRadius:"50%",border:"2px solid rgba(212, 175, 55, 0.2)",borderTopColor:"#d4af37",animation:"spin 1s linear infinite",marginBottom:"16px"}}),p.jsx("div",{className:"font-editorial",style:{letterSpacing:"0.15em",fontSize:"1rem",color:"#f8fafc"},children:"UTHAYAGUNASINGAM VANOJAN"}),p.jsx("div",{className:"font-mono",style:{fontSize:"0.72rem",color:"#94a3b8",marginTop:"4px"},children:"INITIALIZING ARCHITECTURAL ENVIRONMENT..."}),p.jsx("style",{children:`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `})]}):p.jsxs("div",{style:{position:"relative",minHeight:"100vh",overflowX:"hidden"},children:[p.jsx(pM,{}),p.jsx(hM,{}),p.jsx(kE,{}),p.jsx(OE,{onOpenAdmin:()=>c(!0),profile:s.profile}),p.jsxs("main",{style:{position:"relative",zIndex:1},children:[p.jsx(zE,{profile:s.profile}),p.jsx(BE,{profile:s.profile}),p.jsx(HE,{projects:s.projects}),p.jsx(VE,{skills:s.skills}),p.jsx(jE,{education:s.education}),p.jsx(WE,{profile:s.profile})]}),p.jsx(XE,{onOpenAdmin:()=>c(!0),profile:s.profile}),a&&(u?p.jsx(YE,{token:u,onLogout:_,onClose:()=>c(!1),onDataRefresh:h}):p.jsx(qE,{onLoginSuccess:g,onClose:()=>c(!1)}))]})}ix.createRoot(document.getElementById("root")).render(p.jsx(K0.StrictMode,{children:p.jsx($E,{})}));
