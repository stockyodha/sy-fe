import{f as u,g as c}from"./chunk-6S6RWZMQ.js";import{A as i,Z as s,ca as a,k as o,z as n}from"./chunk-MF5MGSS4.js";var m=c`
query Me {
  me {
    id
    createdAt
    updatedAt
    username
    email
    isAdmin
    balance
  }
}
`,b=(()=>{let r=class r{constructor(e){this.apollo=e,this.currentUser=new o(null)}onMe(){return n(this.apollo.query({query:m}).pipe(i(e=>(console.log(e),e))))}onSetCurrentUser(e){this.currentUser.next(e)}onGetCurrentUser(){return this.currentUser.asObservable()}onGetLastUser(){return this.currentUser.getValue()}};r.\u0275fac=function(l){return new(l||r)(a(u))},r.\u0275prov=s({token:r,factory:r.\u0275fac,providedIn:"root"});let t=r;return t})();export{b as a};
