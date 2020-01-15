function _defineProperties(n,l){for(var e=0;e<l.length;e++){var u=l[e];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(n,u.key,u)}}function _createClass(n,l,e){return l&&_defineProperties(n.prototype,l),e&&_defineProperties(n,e),n}function _classCallCheck(n,l){if(!(n instanceof l))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"/yGZ":function(n,l,e){"use strict";e.r(l);var u=e("8Y7J"),o=function n(){_classCallCheck(this,n)},t=e("pMnS"),a=e("oGqa"),i=e("oBZk"),r=e("ZZ/e"),s=e("s7LF"),b=e("mrSG"),c=e("E3Cs"),g=e("XY7g"),d=e("toH5"),h=function(){function n(l,e,u,o){_classCallCheck(this,n),this.modalController=l,this.db=e,this.localStorage=u,this.gf=o,this.login={email:"",password:""},this.errors={email:"",password:""}}return _createClass(n,[{key:"openModal",value:function(){return b.__awaiter(this,void 0,void 0,regeneratorRuntime.mark((function n(){var l;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.modalController.create({component:c.a,componentProps:{myParam:"test"}});case 2:return(l=n.sent).onDidDismiss().then((function(n){null!==n&&console.log("The result:",n.data)})),n.next=6,l.present();case 6:case"end":return n.stop()}}),n,this)})))}},{key:"ngOnInit",value:function(){this.gf.DisableSideMenu(),this.gf.CheckLogin()}},{key:"Login",value:function(){var n=this;this.gf.loginUser(this.login).then((function(l){l.user&&(console.log("User returned"),console.log(l.user),n.db.collection(g.b.FB_Usuarios).doc(l.user.uid).get().subscribe((function(e){console.log("Search"),g.b.usuario=e.data(),g.b.usuario[g.b.key]=l.user.uid,console.log(g.b.usuario[g.b.key]),n.localStorage.set("user",g.b.usuario),n.login={email:"",password:""},n.gf.ListenersClientesPagos(),n.gf.ListenersColaboradores(),n.gf.EnableSideMenu(),void 0===g.b.usuario[g.b.organizacion]||n.gf.IrAClientes()})))})).catch((function(l){"auth/wrong-password"===l.code&&(n.errors.password="La contrase\xf1a es incorrecta"),"auth/user-not-found"===l.code&&(n.errors.email="No existe usuario con ese mail"),"auth/invalid-email"===l.code&&(n.errors.email="El formato de mail es incorrecto"),console.log("login error"),console.log(l)}))}}]),n}(),p=e("Xr7G"),f=e("xgBC"),C=u.zb({encapsulation:0,styles:[[".welcome-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:35vh;overflow:hidden}"]],data:{}});function m(n){return u.Vb(0,[(n()(),u.Bb(0,0,null,null,10,"ion-header",[],null,null,null,i.H,i.h)),u.Ab(1,49152,null,0,r.B,[u.j,u.p,u.F],null,null),(n()(),u.Bb(2,0,null,0,8,"ion-toolbar",[],null,null,null,i.Z,i.z)),u.Ab(3,49152,null,0,r.Cb,[u.j,u.p,u.F],null,null),(n()(),u.Bb(4,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,i.C,i.c)),u.Ab(5,49152,null,0,r.l,[u.j,u.p,u.F],null,null),(n()(),u.Bb(6,0,null,0,1,"ion-menu-button",[],null,null,null,i.O,i.p)),u.Ab(7,49152,null,0,r.R,[u.j,u.p,u.F],null,null),(n()(),u.Bb(8,0,null,0,2,"ion-title",[],null,null,null,i.Y,i.y)),u.Ab(9,49152,null,0,r.Ab,[u.j,u.p,u.F],null,null),(n()(),u.Tb(-1,0,[" Login "])),(n()(),u.Bb(11,0,null,null,22,"ion-content",[],null,null,null,i.E,i.e)),u.Ab(12,49152,null,0,r.u,[u.j,u.p,u.F],null,null),(n()(),u.Bb(13,0,null,0,8,"ion-col",[],null,null,null,i.D,i.d)),u.Ab(14,49152,null,0,r.t,[u.j,u.p,u.F],null,null),(n()(),u.Bb(15,0,null,0,6,"ion-input",[["placeholder","Mail"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,e){var o=!0,t=n.component;return"ionBlur"===l&&(o=!1!==u.Nb(n,17)._handleBlurEvent(e.target)&&o),"ionChange"===l&&(o=!1!==u.Nb(n,17)._handleInputEvent(e.target)&&o),"ngModelChange"===l&&(o=!1!==(t.login.email=e)&&o),o}),i.K,i.k)),u.Ab(16,49152,null,0,r.G,[u.j,u.p,u.F],{placeholder:[0,"placeholder"]},null),u.Ab(17,16384,null,0,r.Pb,[u.p],null,null),u.Qb(1024,null,s.c,(function(n){return[n]}),[r.Pb]),u.Ab(19,671744,null,0,s.f,[[8,null],[8,null],[8,null],[6,s.c]],{model:[0,"model"]},{update:"ngModelChange"}),u.Qb(2048,null,s.d,null,[s.f]),u.Ab(21,16384,null,0,s.e,[[4,s.d]],null,null),(n()(),u.Bb(22,0,null,0,8,"ion-col",[],null,null,null,i.D,i.d)),u.Ab(23,49152,null,0,r.t,[u.j,u.p,u.F],null,null),(n()(),u.Bb(24,0,null,0,6,"ion-input",[["placeholder","Contrase\xf1a"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(n,l,e){var o=!0,t=n.component;return"ionBlur"===l&&(o=!1!==u.Nb(n,26)._handleBlurEvent(e.target)&&o),"ionChange"===l&&(o=!1!==u.Nb(n,26)._handleInputEvent(e.target)&&o),"ngModelChange"===l&&(o=!1!==(t.login.password=e)&&o),o}),i.K,i.k)),u.Ab(25,49152,null,0,r.G,[u.j,u.p,u.F],{placeholder:[0,"placeholder"]},null),u.Ab(26,16384,null,0,r.Pb,[u.p],null,null),u.Qb(1024,null,s.c,(function(n){return[n]}),[r.Pb]),u.Ab(28,671744,null,0,s.f,[[8,null],[8,null],[8,null],[6,s.c]],{model:[0,"model"]},{update:"ngModelChange"}),u.Qb(2048,null,s.d,null,[s.f]),u.Ab(30,16384,null,0,s.e,[[4,s.d]],null,null),(n()(),u.Bb(31,0,null,0,2,"ion-button",[],null,[[null,"click"]],(function(n,l,e){var u=!0;return"click"===l&&(u=!1!==n.component.Login()&&u),u}),i.B,i.b)),u.Ab(32,49152,null,0,r.k,[u.j,u.p,u.F],null,null),(n()(),u.Tb(-1,0,["Login "]))],(function(n,l){var e=l.component;n(l,16,0,"Mail"),n(l,19,0,e.login.email),n(l,25,0,"Contrase\xf1a"),n(l,28,0,e.login.password)}),(function(n,l){n(l,15,0,u.Nb(l,21).ngClassUntouched,u.Nb(l,21).ngClassTouched,u.Nb(l,21).ngClassPristine,u.Nb(l,21).ngClassDirty,u.Nb(l,21).ngClassValid,u.Nb(l,21).ngClassInvalid,u.Nb(l,21).ngClassPending),n(l,24,0,u.Nb(l,30).ngClassUntouched,u.Nb(l,30).ngClassTouched,u.Nb(l,30).ngClassPristine,u.Nb(l,30).ngClassDirty,u.Nb(l,30).ngClassValid,u.Nb(l,30).ngClassInvalid,u.Nb(l,30).ngClassPending)}))}var L=u.xb("app-login",h,(function(n){return u.Vb(0,[(n()(),u.Bb(0,0,null,null,1,"app-login",[],null,null,null,m,C)),u.Ab(1,114688,null,0,h,[r.Hb,p.a,f.b,d.a],null,null)],(function(n,l){n(l,1,0)}),null)}),{},{},[]),v=e("SVse"),w=e("VQoA"),B=e("iInd"),k=e("iQDS"),A=e("mXY3"),N=function n(){_classCallCheck(this,n)};e.d(l,"LoginModuleNgFactory",(function(){return y}));var y=u.yb(o,[],(function(n){return u.Kb([u.Lb(512,u.m,u.jb,[[8,[t.a,a.a,L]],[3,u.m],u.D]),u.Lb(4608,v.l,v.k,[u.z,[2,v.s]]),u.Lb(4608,r.c,r.c,[u.F,u.g]),u.Lb(4608,r.Hb,r.Hb,[r.c,u.m,u.w]),u.Lb(4608,r.Lb,r.Lb,[r.c,u.m,u.w]),u.Lb(4608,s.a,s.a,[]),u.Lb(4608,s.i,s.i,[]),u.Lb(1073742336,v.b,v.b,[]),u.Lb(1073742336,w.a,w.a,[]),u.Lb(1073742336,w.g,w.g,[]),u.Lb(1073742336,w.d,w.d,[]),u.Lb(1073742336,w.b,w.b,[]),u.Lb(1073742336,w.e,w.e,[]),u.Lb(1073742336,w.c,w.c,[]),u.Lb(1073742336,w.f,w.f,[]),u.Lb(1073742336,r.Eb,r.Eb,[]),u.Lb(1073742336,B.o,B.o,[[2,B.t],[2,B.m]]),u.Lb(1073742336,s.h,s.h,[]),u.Lb(1073742336,s.g,s.g,[]),u.Lb(1073742336,s.b,s.b,[]),u.Lb(1073742336,k.a,k.a,[]),u.Lb(1073742336,A.a,A.a,[]),u.Lb(1073742336,N,N,[]),u.Lb(1073742336,o,o,[]),u.Lb(1024,B.k,(function(){return[[{path:"",component:h}]]}),[])])}))}}]);