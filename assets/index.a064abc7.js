var e=Object.defineProperty,a=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,r=(a,t,l)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[t]=l,n=(e,n)=>{for(var c in n||(n={}))t.call(n,c)&&r(e,c,n[c]);if(a)for(var c of a(n))l.call(n,c)&&r(e,c,n[c]);return e},c=(e,r)=>{var n={};for(var c in e)t.call(e,c)&&r.indexOf(c)<0&&(n[c]=e[c]);if(null!=e&&a)for(var c of a(e))r.indexOf(c)<0&&l.call(e,c)&&(n[c]=e[c]);return n};import{R as m,S as s,a as o,b as i,c as _,H as v,d as E}from"./vendor.9b9cf814.js";const u=()=>m.createElement("div",null,m.createElement("h1",null,"home")),f=()=>m.createElement("div",null,m.createElement("h1",null,"home")),N=()=>m.createElement(s,null,m.createElement(o,{exact:!0,path:"/market",component:f}),m.createElement(o,{exact:!0,path:"/faqs",component:u}),m.createElement(i,{to:"/market"})),d=new URL("/Mystery-Box-Interface/assets/logo.7271d3b4.png",window.location).href;var h={button:"_button_1rkve_1",small:"_small_1rkve_5",middle:"_middle_1rkve_9",large:"_large_1rkve_13"};const p=e=>{var a=e,{className:t,size:l}=a,r=c(a,["className","size"]);return m.createElement("button",n({className:_(h.button,l?h[l]:null,t)},r))};var b="_neonButton_jzzo7_1";const k=e=>{var a=e,{className:t}=a,l=c(a,["className"]);return m.createElement(p,n({className:_(b,t)},l))};var g={pageHeader:"_pageHeader_1vaw7_1",nav:"_nav_1vaw7_9",navItem:"_navItem_1vaw7_15",operations:"_operations_1vaw7_20"};const w=e=>{var a=e,{className:t}=a,l=c(a,["className"]);return m.createElement("div",n({className:_(g.pageHeader,t)},l),m.createElement("div",{className:g.brand},m.createElement("a",{className:g.logo,href:"/",title:"NFTBOX"},m.createElement("img",{src:d,height:"36",width:"36",alt:"NFTBOX"}))),m.createElement("nav",{className:g.nav},m.createElement("a",{className:g.navItem,href:"/#Market"},"Market"),m.createElement("a",{className:g.navItem,href:"/#faqs"},"FAQS")),m.createElement("div",{className:g.operations},m.createElement(k,null,"Connect Wallet")))};var y={footer:"_footer_1uuvc_1",links:"_links_1uuvc_12",link:"_link_1uuvc_12"};const O=e=>{var a=e,{className:t}=a,l=c(a,["className"]);return m.createElement("footer",n({className:_(y.footer,t)},l),m.createElement("ul",{className:y.links},m.createElement("li",{className:y.link},m.createElement("a",{href:"#"},"Twitter")),m.createElement("li",{className:y.link},m.createElement("a",{href:"#"},"Medium")),m.createElement("li",{className:y.link},m.createElement("a",{href:"#"},"Telegram")),m.createElement("li",{className:y.link},m.createElement("a",{href:"#"},"FAQS")),m.createElement("li",{className:y.link},m.createElement("a",{href:"#"},"GitHub"))),m.createElement("div",{className:y.copyright},"Copyright © 2018-2021 NFTBOX"))};var I="_container_4trre_9",j="_main_4trre_14",B="_header_4trre_17",x="_footer_4trre_18";const F=({children:e})=>m.createElement("div",{className:I},m.createElement(w,{className:B}),m.createElement("main",{className:j},e),m.createElement(O,{className:x}));function H(){return m.createElement(v,null,m.createElement(F,null,m.createElement(N,null)))}E.render(m.createElement(m.StrictMode,null,m.createElement(H,null)),document.getElementById("root"));
