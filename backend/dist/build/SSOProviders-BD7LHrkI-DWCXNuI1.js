import{d as r,F as d,u as h,j as e,ag as n,bs as c,bt as m,T as u}from"./strapi-DyxV3B0J.js";const g=({providers:t,displayAllProviders:a})=>{const{formatMessage:o}=h();return a?e.jsx(n.Root,{gap:4,children:t.map(s=>e.jsx(n.Item,{col:4,direction:"column",alignItems:"stretch",children:e.jsx(i,{provider:s})},s.uid))}):t.length>2&&!a?e.jsxs(n.Root,{gap:4,children:[t.slice(0,2).map(s=>e.jsx(n.Item,{col:4,direction:"column",alignItems:"stretch",children:e.jsx(i,{provider:s})},s.uid)),e.jsx(n.Item,{col:4,direction:"column",alignItems:"stretch",children:e.jsx(c,{label:o({id:"global.see-more"}),children:e.jsx(l,{as:m,to:"/auth/providers",children:e.jsx("span",{"aria-hidden":!0,children:"•••"})})})})]}):e.jsx(x,{justifyContent:"center",children:t.map(s=>e.jsx(i,{provider:s},s.uid))})},x=r(d)`
  & a:not(:first-child):not(:last-child) {
    margin: 0 ${({theme:t})=>t.spaces[2]};
  }
  & a:first-child {
    margin-right: ${({theme:t})=>t.spaces[2]};
  }
  & a:last-child {
    margin-left: ${({theme:t})=>t.spaces[2]};
  }
`,i=({provider:t})=>e.jsx(c,{label:t.displayName,children:e.jsx(l,{href:`${window.strapi.backendURL}/admin/connect/${t.uid}`,children:t.icon?e.jsx("img",{src:t.icon,"aria-hidden":!0,alt:"",height:"32px"}):e.jsx(u,{children:t.displayName})})}),l=r.a`
  width: 13.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.8rem;
  border: 1px solid ${({theme:t})=>t.colors.neutral150};
  border-radius: ${({theme:t})=>t.borderRadius};
  text-decoration: inherit;
  &:link {
    text-decoration: none;
  }
  color: ${({theme:t})=>t.colors.neutral600};
`;export{g as S};
