import"./index.4eef95d7.js";import{C as e}from"./index.08b2ca30.js";import{A as a}from"./index.5ab3a62c.js";import{B as o}from"./button.a9cfd2ab.js";import{S as n}from"./index.4ca18da4.js";import{R as t}from"./vendor.bcba5a07.js";import"./CheckCircleFilled.b3889b37.js";function r(){const r=t.useRef(0);return r.current+=1,t.createElement(e,null,t.createElement(a,{message:"可通过调用全局方法控制标签页的刷新，返回和关闭",type:"success",showIcon:!0,banner:!0}),t.createElement(a,{message:"请打开控制台查看相关操作反馈",type:"warning",showIcon:!0,banner:!0,style:{marginBottom:48}}),t.createElement(n,null,t.createElement(o,{type:"primary",onClick:()=>{window.reloadTab()}},"reload tab"),t.createElement(o,{onClick:()=>{window.goBackTab()}},"go back tab"),t.createElement(o,{onClick:()=>{window.closeTab()}},"close tab"),t.createElement(o,{onClick:()=>{window.closeAndGoBackTab()}},"close and go back tab"),t.createElement(o,{onClick:()=>{window.closeAndGoBackTab("/profile/basic",(()=>window.reloadTab("/profile/basic")))}},"close, go to '/profile/basic' and refresh")),t.createElement("div",null,"renderCount: ",r.current))}export default r;
