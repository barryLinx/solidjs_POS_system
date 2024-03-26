import{g as C,d as y,t as m,c as E,u as j,a as k,i as r,b as $,e as L,F}from"./index-fE6Zcn-u.js";import{c as v}from"./customFetch-KfsyJ-vQ.js";import{n as N,e as A}from"./notifyToast-20f7UYHK.js";var R=m('<div class="d-flex flex-column w-50"><button class="btn btn-outline-danger mt-2">admin</button><button class="btn btn-outline-success mt-2">employee</button><button class="btn btn-outline-secondary mt-2">engineer');function T({userData:s,roleBasehandle:o}){return(()=>{var d=R(),l=d.firstChild,a=l.nextSibling,g=a.nextSibling;return l.$$click=()=>o(s.username,"admin"),a.$$click=()=>o(s.username,"employee"),g.$$click=()=>o(s.username,"engineer"),y(e=>{var t=s.role==="admin",i=s.role==="employee",n=s.role==="engineer";return t!==e.e&&l.classList.toggle("active",e.e=t),i!==e.t&&a.classList.toggle("active",e.t=i),n!==e.a&&g.classList.toggle("active",e.a=n),e},{e:void 0,t:void 0,a:void 0}),d})()}C(["click"]);var U=m('<div class="col-md-11 position-relative"style=background-color:#EEEDF3;><h2 class=mt-4>管理權限</h2><div class=scorllbar style=height:800px;><table class="table table-light align-middle sticky-top top-0 px-5"><thead class="position-sticky top-0"><tr class="fw-bold fs-3 "><th class="text-primary "scope=col>工號</th><th class="text-primary "scope=col>E-mail</th><th class="text-primary "scope=col>權限</th><th class="text-primary "scope=col></th></tr></thead><tbody>'),O=m('<tr><th class="fw-bold fs-3"scope=row></th><td class="fw-bold fs-4"></td><td class="fw-bold fs-4 "> <span></span></td><td>');function P(){const[s,o]=E([]),d=j();async function l(){const e=await v("api/usersRole",{method:"get",headers:{"Content-Type":"application/json"}}),t=await e.json();console.log(" setting response",e),console.log("setting jsonData",t),o(t),(e==null?void 0:e.status)==403&&(N(),d("/home",{replace:!0}))}k(()=>{l()});async function a(e,t){console.log("userData_username",e);const n=await(await v("api/setUserRole",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,role:t})})).json();console.log("roleBasedAccess",n),l(),A()}const g={engineer:"text-bg-secondary",employee:"text-bg-success",admin:"text-bg-danger"};return(()=>{var e=U(),t=e.firstChild,i=t.nextSibling,n=i.firstChild,x=n.firstChild,_=x.nextSibling;return r(_,$(F,{get each(){return s()},children:(c,z)=>(()=>{var p=O(),b=p.firstChild,h=b.nextSibling,u=h.nextSibling,S=u.firstChild,f=S.nextSibling,w=u.nextSibling;return r(b,()=>c.username),r(h,()=>c.email),r(f,()=>c.role),r(w,$(T,{userData:c,roleBasehandle:a})),y(()=>L(f,`rounded-3 text-white p-2 ${g[c.role]}`)),p})()})),e})()}export{P as default};