import{c as O,u as R,a as q,i as e,b as z,d as G,e as I,F as J,t as m,f as K}from"./index-pEVPDpaW.js";import{f as c}from"./formatNumber-EN-Sk6Po.js";import{c as P}from"./customFetch-KfsyJ-vQ.js";var Q=m('<div class=" col-md-11 position-relative vh-100"style=background-color:#EEEDF3;><div class="row mt-4 g-3"><div class=col-md-4><div class="d-flex p-3 justify-content-between align-items-center bg-light"><div class="fw-bold text-primary"><h2 class=""></h2><span class=text-secondary>每日顧客</span></div><div class="fs-1 text-primary"><i class="fas fa-users"></i></div></div></div><div class=col-md-4><div class="d-flex p-3 justify-content-between align-items-center bg-light"><div class="fw-bold text-primary"><h2 class=""></h2><span class="text-secondary fw-">銷售數量</span></div><div class="fs-1 text-primary"><i class="fas fa-shopping-cart"></i></div></div></div><div class=col-md-4><div class="d-flex p-3 justify-content-between align-items-center bg-light"><div class="fw-bold text-primary"><h2 class=""></h2><span class="text-secondary ">當日營業額</span></div><div class="fs-1 text-primary"><i class="fas fa-dollar-sign"></i></div></div></div></div><div class="row mt-4"><div class="p-3 d-flex flex-column justify-content-between"><div class="p-3 d-flex justify-content-between bg-light"><h2>當日銷售項目</h2></div><div class=scorllbar style=height:600px;><table class=" table table-hover table-light p-3 sticky-top top-0"><thead class="position-sticky top-0"><tr class=bg-primary><th class="fs-3 text-primary"scope=col>名稱</th><th class="fs-3 text-primary"scope=col>價錢</th><th class="fs-3 text-primary"scope=col>付款方式</th><th class="fs-3 text-primary"scope=col>狀況</th></tr></thead><tbody>'),U=m('<tr><th class=fs-4 scope=row></th><td class="fs-4 fw-bold"></td><td class="fs-4 fw-bold"></td><td><span>');function ss(){const{localAccessToken:v,userName:V,setLocalAccessToken:W}=K,[a,g]=O({});R();const b={1:"現金",2:"信用卡",3:"電子支付"},y={1:"完成",2:"等待中",3:"取消"},u={1:"text-bg-success",2:"text-bg-warning",3:"text-bg-danger"};return q(async()=>{if(!v())return;const l=await P("api/getSalesData",{method:"get",headers:{"Content-Type":"application/json"}});console.log("Home response",l);const i=await l.json();console.log("Home jsonData",i),g(i)}),(()=>{var l=Q(),i=l.firstChild,r=i.firstChild,x=r.firstChild,$=x.firstChild,_=$.firstChild,n=r.nextSibling,C=n.firstChild,w=C.firstChild,S=w.firstChild,j=n.nextSibling,E=j.firstChild,k=E.firstChild,D=k.firstChild,F=i.nextSibling,N=F.firstChild,H=N.firstChild,T=H.nextSibling,A=T.firstChild,B=A.firstChild,L=B.nextSibling;return e(_,()=>{var s,t;return c((t=(s=a())==null?void 0:s.daily)==null?void 0:t.customer)}),e(S,()=>{var s,t;return c((t=(s=a())==null?void 0:s.daily)==null?void 0:t.sales)}),e(D,()=>{var s,t;return c((t=(s=a())==null?void 0:s.daily)==null?void 0:t.volumeOfBusiness)}),e(L,z(J,{get each(){var s;return(s=a())==null?void 0:s.dailySales},children:(s,t)=>(()=>{var o=U(),d=o.firstChild,f=d.nextSibling,h=f.nextSibling,M=h.nextSibling,p=M.firstChild;return e(d,()=>s.name),e(f,()=>s.price),e(h,()=>b[s.payMethed]),e(p,()=>y[s.status]),G(()=>I(p,`fs-5 badge ${u[s.status]}`)),o})()})),l})()}export{ss as default};