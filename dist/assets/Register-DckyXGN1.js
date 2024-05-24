import{aC as K,aB as Q,aJ as S,j as e,s as P,P as X,aK as I,bg as N,bh as $,l as i,r as j,aG as Y,bi as F,bj as ee,aH as se,bk as re,aI as ae,aQ as oe,am as z,ah as te,aj as L,bd as R,be as B,bf as E,B as ne,aq as O,ak as ie}from"./index-BkjFfd7S.js";import{u as le,c as ce,b as y,d as de,a as pe}from"./index.esm-BcbAVVWb.js";import{C as me}from"./Close-_StmtKkt.js";import{a as m,I as u,b as f,F as v}from"./InputLabel-PnYLoR_E.js";import{L as ue,A as he,D as ge}from"./DatePicker-nhU2jAhK.js";import{S as xe}from"./Select-6NCDCthj.js";import"./DialogContent-DuOV6xlE.js";import"./TextField-Cf-4O8qQ.js";import"./Chip-BzMFiD_F.js";function fe(r){return Q("MuiAlert",r)}const T=K("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),ve=S(e.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),je=S(e.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),be=S(e.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),ye=S(e.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),we=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],Ce=re(),Se=r=>{const{variant:o,color:t,severity:s,classes:l}=r,c={root:["root",`color${I(t||s)}`,`${o}${I(t||s)}`,`${o}`],icon:["icon"],message:["message"],action:["action"]};return ae(c,fe,l)},Pe=P(X,{name:"MuiAlert",slot:"Root",overridesResolver:(r,o)=>{const{ownerState:t}=r;return[o.root,o[t.variant],o[`${t.variant}${I(t.color||t.severity)}`]]}})(({theme:r})=>{const o=r.palette.mode==="light"?N:$,t=r.palette.mode==="light"?$:N;return i({},r.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(r.palette).filter(([,s])=>s.main&&s.light).map(([s])=>({props:{colorSeverity:s,variant:"standard"},style:{color:r.vars?r.vars.palette.Alert[`${s}Color`]:o(r.palette[s].light,.6),backgroundColor:r.vars?r.vars.palette.Alert[`${s}StandardBg`]:t(r.palette[s].light,.9),[`& .${T.icon}`]:r.vars?{color:r.vars.palette.Alert[`${s}IconColor`]}:{color:r.palette[s].main}}})),...Object.entries(r.palette).filter(([,s])=>s.main&&s.light).map(([s])=>({props:{colorSeverity:s,variant:"outlined"},style:{color:r.vars?r.vars.palette.Alert[`${s}Color`]:o(r.palette[s].light,.6),border:`1px solid ${(r.vars||r).palette[s].light}`,[`& .${T.icon}`]:r.vars?{color:r.vars.palette.Alert[`${s}IconColor`]}:{color:r.palette[s].main}}})),...Object.entries(r.palette).filter(([,s])=>s.main&&s.dark).map(([s])=>({props:{colorSeverity:s,variant:"filled"},style:i({fontWeight:r.typography.fontWeightMedium},r.vars?{color:r.vars.palette.Alert[`${s}FilledColor`],backgroundColor:r.vars.palette.Alert[`${s}FilledBg`]}:{backgroundColor:r.palette.mode==="dark"?r.palette[s].dark:r.palette[s].main,color:r.palette.getContrastText(r.palette[s].main)})}))]})}),Ae=P("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(r,o)=>o.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),ke=P("div",{name:"MuiAlert",slot:"Message",overridesResolver:(r,o)=>o.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),W=P("div",{name:"MuiAlert",slot:"Action",overridesResolver:(r,o)=>o.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),H={success:e.jsx(ve,{fontSize:"inherit"}),warning:e.jsx(je,{fontSize:"inherit"}),error:e.jsx(be,{fontSize:"inherit"}),info:e.jsx(ye,{fontSize:"inherit"})},Ie=j.forwardRef(function(o,t){const s=Ce({props:o,name:"MuiAlert"}),{action:l,children:c,className:A,closeText:h="Close",color:w,components:g={},componentsProps:k={},icon:a,iconMapping:d=H,onClose:p,role:C="alert",severity:x="success",slotProps:q={},slots:U={},variant:V="standard"}=s,G=Y(s,we),n=i({},s,{color:w,severity:x,variant:V,colorSeverity:w||x}),b=Se(n),M={slots:i({closeButton:g.CloseButton,closeIcon:g.CloseIcon},U),slotProps:i({},k,q)},[_,D]=F("closeButton",{elementType:ee,externalForwardedProps:M,ownerState:n}),[Z,J]=F("closeIcon",{elementType:me,externalForwardedProps:M,ownerState:n});return e.jsxs(Pe,i({role:C,elevation:0,ownerState:n,className:se(b.root,A),ref:t},G,{children:[a!==!1?e.jsx(Ae,{ownerState:n,className:b.icon,children:a||d[x]||H[x]}):null,e.jsx(ke,{ownerState:n,className:b.message,children:c}),l!=null?e.jsx(W,{ownerState:n,className:b.action,children:l}):null,l==null&&p?e.jsx(W,{ownerState:n,className:b.action,children:e.jsx(_,i({size:"small","aria-label":h,title:h,color:"inherit",onClick:p},D,{children:e.jsx(Z,i({fontSize:"small"},J))}))}):null]}))}),Oe=()=>{const r=oe(),[o,t]=j.useState(!0),[s,l]=j.useState(null),[c,A]=j.useState(""),[h,w]=j.useState(!1),[g,k]=j.useState(!1),a=le({initialValues:{user:"",password:"",checkPassword:"",name:"",email:"",phone:"",birthday:"",role:"user",gender:!0},validationSchema:ce().shape({user:y().min(6,"Min is 6 characters").max(12,"Max is 12 characters").required("User cannot be empty"),password:y().required("Password cannot be empty").min(6,"Min is 6 characters").max(12,"Max is 12 characters").matches(z.password,"Password must contain at least 1 digit, 1 special character, 1 alphabetic character"),checkPassword:y().required("Please confirm your password").oneOf([de("password")],"Passwords must match"),name:y().matches(z.nameByVietnamese,"Name has to be valid").required("Name cannot be empty"),email:y().email("This field has to be email").required("Email cannot be empty"),phone:pe().required("Phone cannot be empty")}),onSubmit:async d=>{try{const p=`${s==null?void 0:s.date()}-${((s==null?void 0:s.month())||0)+1}-${s==null?void 0:s.year()}`,C=c==="true"?!0:c==="false"?!1:"";if(p==="undefined-1-undefined"||C==="")t(!1);else{t(!0);const x={...d,birthday:p,role:"USER",gender:C};await te.post("/api/auth/signup",x),L("Thành công, tài khoản đã được tạo!",{icon:"success"}),r("/auth/login")}}catch(p){console.log(p),L("Thất bại, email đã được dùng!",{icon:"error"})}}});return e.jsx("div",{className:"register-form-background",children:e.jsxs("div",{className:"register-form-container",children:[!o&&e.jsx(Ie,{className:"mui-alert",severity:"error",sx:{fontSize:"2rem"},children:"Vui lòng điền đầy đủ thông tin!"}),e.jsx("div",{className:"login-page-title",children:e.jsx("h1",{children:"Register"})}),e.jsxs("form",{className:"login-form",onSubmit:a.handleSubmit,children:[e.jsxs(m,{variant:"standard",className:"mui-form-control",margin:"dense",error:!!a.errors.user,children:[e.jsx(u,{htmlFor:"user",children:"Tài khoản"}),e.jsx(f,{id:"user",...a.getFieldProps("user")}),a.touched.user&&a.errors.user&&e.jsx(v,{children:a.errors.user})]}),e.jsxs(m,{variant:"standard",className:"mui-form-control",margin:"dense",error:!!a.errors.password,children:[e.jsx(u,{htmlFor:"password",children:"Mật khẩu"}),e.jsx(f,{id:"password",type:h?"text":"password",...a.getFieldProps("password"),fullWidth:!0}),e.jsx(R,{icon:h?B:E,className:"password-toggle-icon",onClick:()=>w(!h)}),a.touched.password&&a.errors.password&&e.jsx(v,{children:a.errors.password})]}),e.jsxs(m,{variant:"standard",className:"mui-form-control",margin:"dense",error:!!a.errors.checkPassword,children:[e.jsx(u,{htmlFor:"checkPassword",children:"Nhập lại mật khẩu"}),e.jsx(f,{id:"checkPassword",type:g?"text":"password",...a.getFieldProps("checkPassword"),fullWidth:!0}),e.jsx(R,{icon:g?B:E,className:"password-toggle-icon",onClick:()=>k(!g)}),a.touched.checkPassword&&a.errors.checkPassword&&e.jsx(v,{children:a.errors.checkPassword})]}),e.jsxs(m,{variant:"standard",className:"mui-form-control",margin:"dense",error:!!a.errors.name,children:[e.jsx(u,{htmlFor:"name",children:"Họ tên"}),e.jsx(f,{id:"name",...a.getFieldProps("name")}),a.touched.name&&a.errors.name&&e.jsx(v,{children:a.errors.name})]}),e.jsxs(m,{variant:"standard",className:"mui-form-control",margin:"dense",error:!!a.errors.email,children:[e.jsx(u,{htmlFor:"email",children:"Email"}),e.jsx(f,{id:"email",...a.getFieldProps("email")}),a.touched.email&&a.errors.email&&e.jsx(v,{children:a.errors.email})]}),e.jsxs(m,{variant:"standard",className:"mui-form-control",margin:"dense",error:!!a.errors.phone,children:[e.jsx(u,{htmlFor:"phone",children:"Số điện thoại"}),e.jsx(f,{id:"phone",...a.getFieldProps("phone")}),a.touched.phone&&a.errors.phone&&e.jsx(v,{children:a.errors.phone})]}),e.jsxs(ne,{sx:{display:"flex"},children:[e.jsx(ue,{dateAdapter:he,children:e.jsx(ge,{value:s,onChange:d=>l(d)})}),e.jsxs(m,{sx:{m:1,minWidth:90},children:[e.jsx(u,{id:"gender-label",children:"Gender"}),e.jsxs(xe,{labelId:"gender-label",id:"gender",value:c,onChange:d=>A(d.target.value),label:"Gender",sx:{fontSize:"1.4rem"},children:[e.jsx(O,{value:"true",children:"Male"}),e.jsx(O,{value:"false",children:"Female"})]})]})]}),e.jsx("div",{className:"form-button-group",children:e.jsx(ie,{variant:"outlined",type:"submit",id:"btn-Register",children:"Đăng ký"})})]})]})})};export{Oe as default};
