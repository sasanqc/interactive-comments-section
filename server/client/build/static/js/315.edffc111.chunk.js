"use strict";(self.webpackChunkinteractive_comments_section=self.webpackChunkinteractive_comments_section||[]).push([[315],{315:function(e,a,l){l.r(a);var n=l(8152),t=l(2791),s=l(9434),i=l(2810),r=l(9965),c=l(3885),o=l(184);a.default=function(){var e,a=(0,s.I0)(),l=(0,t.useState)(null),u=(0,n.Z)(l,2),m=u[0],f=u[1],d=(0,t.useRef)(null),p=(0,t.useRef)(),h=(0,s.v9)((function(e){return e.auth.userInfo}));return(0,o.jsx)("main",{className:"profile",children:(0,o.jsxs)("form",{className:"form",children:[(0,o.jsx)("h1",{className:"heading-l",children:"Edit your profile"}),(0,o.jsxs)("label",{className:"text-input",children:[(0,o.jsx)("p",{className:"heading-m",children:"Username"}),(0,o.jsx)("input",{type:"email",name:"email",placeholder:"Username",defaultValue:h.username||"",required:!0,ref:d})]}),(0,o.jsxs)("div",{className:"profile__upload gap-s",children:[(0,o.jsx)("div",{className:"profile__thumbnail",children:(0,o.jsx)("img",{src:"./images/avatars/".concat(null===(e=h.image)||void 0===e?void 0:e.png),className:"portrait",alt:"profile",ref:p,onError:function(e){p.current.src=URL.createObjectURL(m)}})}),(0,o.jsxs)("label",{className:"file-input",htmlFor:"photo",children:["Change profile photo",(0,o.jsx)("input",{type:"file",id:"photo",accept:"image/*",name:"photo",onChange:function(e){if(e.target.files){var a=(0,n.Z)(e.target.files,1)[0];f(a),p.current.src=URL.createObjectURL(a)}}})]})]}),(0,o.jsx)("div",{className:"btn-container",children:(0,o.jsx)("button",{className:"btn btn--fill-blue",onClick:function(e){e.preventDefault(),d.current.value?a((0,r.DO)({username:d.current.value,selectedFile:m})):a(c.A.addNotif({title:"please fill the username field",id:(0,i.Z)()}))},children:"Upload"})})]})})}}}]);
//# sourceMappingURL=315.edffc111.chunk.js.map