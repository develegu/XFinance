(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{ecMe:function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),o=function(){return function(){}}(),i=u("pMnS"),e=u("oGqa"),r=u("oBZk"),b=u("ZZ/e"),c=u("Ip0R"),a=u("mrSG"),s=u("E3Cs"),p=u("toH5"),h=u("XY7g"),f=function(){function l(l,n,u,t){this.modalController=l,this.db=n,this._iterableDiffers=u,this.gf=t,this.IDCliente="",this.Cliente=[],this.pagos_cliente=[],this.Pago="",this.Multa="",this.Btn_Desactivado=!1,this.Pagos_Proximos=[],this.gv=h.a}return l.prototype.ngOnInit=function(){this.gf.CheckLogin()},l.prototype.UsuarioModal=function(){return a.__awaiter(this,void 0,void 0,(function(){return a.__generator(this,(function(l){switch(l.label){case 0:return[4,this.modalController.create({component:s.a,componentProps:{type:"Usuario"}})];case 1:return l.sent().present(),[2]}}))}))},l.prototype.ModificarUsuarioModal=function(l){return a.__awaiter(this,void 0,void 0,(function(){return a.__generator(this,(function(n){switch(n.label){case 0:return[4,this.modalController.create({component:s.a,componentProps:{type:"Usuario",Tipo:h.a.Actualizar,Mod_Usuario:l}})];case 1:return n.sent().present(),[2]}}))}))},l}(),d=u("fvl4"),m=t.rb({encapsulation:0,styles:[[".item[_ngcontent-%COMP%]{width:143%;box-shadow:0 10px 13px 0 rgba(218,204,204,.75);margin:15px 5px;border-radius:15px;padding-bottom:8px;background:#efefef}"]],data:{}});function D(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,11,"ion-row",[],null,null,null,r.Q,r.r)),t.sb(1,49152,null,0,b.hb,[t.h,t.k,t.z],null,null),(l()(),t.tb(2,0,null,0,2,"ion-col",[],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.ModificarUsuarioModal(l.context.$implicit)&&t),t}),r.C,r.d)),t.sb(3,49152,null,0,b.r,[t.h,t.k,t.z],null,null),(l()(),t.Lb(4,0,[" "," "])),(l()(),t.tb(5,0,null,0,2,"ion-col",[],null,null,null,r.C,r.d)),t.sb(6,49152,null,0,b.r,[t.h,t.k,t.z],null,null),(l()(),t.Lb(7,0,[" "," "])),(l()(),t.tb(8,0,null,0,3,"ion-col",[],null,null,null,r.C,r.d)),t.sb(9,49152,null,0,b.r,[t.h,t.k,t.z],null,null),(l()(),t.tb(10,0,null,0,1,"ion-icon",[["color","medium"],["name","close-circle-outline"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.gf.EliminateCollaboratorAlert(l.context.$implicit,l.context.$implicit.key)&&t),t}),r.H,r.i)),t.sb(11,49152,null,0,b.A,[t.h,t.k,t.z],{color:[0,"color"],name:[1,"name"]},null)],(function(l,n){l(n,11,0,"medium","close-circle-outline")}),(function(l,n){var u=n.component;l(n,4,0,n.context.$implicit[u.gv.nombre]),l(n,7,0,n.context.$implicit[u.gv.roll])}))}function g(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,10,"ion-header",[],null,null,null,r.G,r.h)),t.sb(1,49152,null,0,b.z,[t.h,t.k,t.z],null,null),(l()(),t.tb(2,0,null,0,8,"ion-toolbar",[],null,null,null,r.X,r.y)),t.sb(3,49152,null,0,b.Ab,[t.h,t.k,t.z],null,null),(l()(),t.tb(4,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,r.B,r.c)),t.sb(5,49152,null,0,b.j,[t.h,t.k,t.z],null,null),(l()(),t.tb(6,0,null,0,1,"ion-menu-button",[],null,null,null,r.M,r.o)),t.sb(7,49152,null,0,b.P,[t.h,t.k,t.z],null,null),(l()(),t.tb(8,0,null,0,2,"ion-title",[],null,null,null,r.W,r.x)),t.sb(9,49152,null,0,b.yb,[t.h,t.k,t.z],null,null),(l()(),t.Lb(-1,0,[" Clients "])),(l()(),t.tb(11,0,null,null,8,"ion-content",[],null,null,null,r.D,r.e)),t.sb(12,49152,null,0,b.s,[t.h,t.k,t.z],null,null),(l()(),t.tb(13,0,null,0,4,"ion-col",[],null,null,null,r.C,r.d)),t.sb(14,49152,null,0,b.r,[t.h,t.k,t.z],null,null),(l()(),t.tb(15,0,null,0,2,"ion-button",[],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.UsuarioModal()&&t),t}),r.A,r.b)),t.sb(16,49152,null,0,b.i,[t.h,t.k,t.z],null,null),(l()(),t.Lb(-1,0,["Nuevo usuario"])),(l()(),t.ib(16777216,null,0,1,null,D)),t.sb(19,278528,null,0,c.i,[t.O,t.L,t.s],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){l(n,19,0,n.component.gv.colaboradores)}),null)}function k(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"app-admin",[],null,null,null,g,m)),t.sb(1,114688,null,0,f,[b.Fb,d.a,t.s,p.a],null,null)],(function(l,n){l(n,1,0)}),null)}var C=t.pb("app-admin",f,k,{},{},[]),v=u("gIcY"),z=u("XX9I"),x=u("ZYCi"),_=u("iQDS"),w=u("mXY3"),M=function(){return function(){}}();u.d(n,"adminModuleNgFactory",(function(){return y}));var y=t.qb(o,[],(function(l){return t.Cb([t.Db(512,t.j,t.bb,[[8,[i.a,e.a,C]],[3,t.j],t.x]),t.Db(4608,c.l,c.k,[t.u,[2,c.s]]),t.Db(4608,b.b,b.b,[t.z,t.g]),t.Db(4608,b.Fb,b.Fb,[b.b,t.j,t.q]),t.Db(4608,b.Jb,b.Jb,[b.b,t.j,t.q]),t.Db(4608,v.a,v.a,[]),t.Db(4608,v.i,v.i,[]),t.Db(1073742336,c.b,c.b,[]),t.Db(1073742336,z.a,z.a,[]),t.Db(1073742336,z.g,z.g,[]),t.Db(1073742336,z.d,z.d,[]),t.Db(1073742336,z.b,z.b,[]),t.Db(1073742336,z.e,z.e,[]),t.Db(1073742336,z.c,z.c,[]),t.Db(1073742336,z.f,z.f,[]),t.Db(1073742336,b.Cb,b.Cb,[]),t.Db(1073742336,x.o,x.o,[[2,x.t],[2,x.m]]),t.Db(1073742336,v.h,v.h,[]),t.Db(1073742336,v.g,v.g,[]),t.Db(1073742336,v.b,v.b,[]),t.Db(1073742336,_.a,_.a,[]),t.Db(1073742336,w.a,w.a,[]),t.Db(1073742336,M,M,[]),t.Db(1073742336,o,o,[]),t.Db(1024,x.k,(function(){return[[{path:"",component:f}]]}),[])])}))}}]);