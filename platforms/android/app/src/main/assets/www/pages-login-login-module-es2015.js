(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-login-login-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/login/login.component.html":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/login/login.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>\n      Login\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-col>\n    <ion-input placeholder=\"Mail\" [(ngModel)]=\"login.email\">\n    </ion-input>\n  </ion-col>\n\n  <ion-col>\n    <ion-input placeholder=\"Contraseña\" [(ngModel)]=\"login.password\">\n    </ion-input>\n  </ion-col>\n\n  <ion-button (click)=\"Login()\">Login\n  </ion-button>\n\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/login/login.component.scss":
/*!**************************************************!*\
  !*** ./src/app/pages/login/login.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".welcome-card img {\n  max-height: 35vh;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbG9naW4vQzpcXFVzZXJzXFxqb3JnZVxcRGVza3RvcFxcWEZpbmFuY2Uvc3JjXFxhcHBcXHBhZ2VzXFxsb2dpblxcbG9naW4uY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIud2VsY29tZS1jYXJkIGltZyB7XG4gIG1heC1oZWlnaHQ6IDM1dmg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG4iLCIud2VsY29tZS1jYXJkIGltZyB7XG4gIG1heC1oZWlnaHQ6IDM1dmg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59Il19 */"

/***/ }),

/***/ "./src/app/pages/login/login.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/login/login.component.ts ***!
  \************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_common_modals_my_modal_my_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common/modals/my-modal/my-modal.component */ "./src/app/common/modals/my-modal/my-modal.component.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm2015/ionic-storage.js");
/* harmony import */ var src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/common/services/common.service */ "./src/app/common/services/common.service.ts");








let LoginComponent = class LoginComponent {
    constructor(modalController, db, localStorage, gf) {
        this.modalController = modalController;
        this.db = db;
        this.localStorage = localStorage;
        this.gf = gf;
        this.login = {
            email: '',
            password: ''
        };
        this.errors = {
            email: '',
            password: ''
        };
    }
    openModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_common_modals_my_modal_my_modal_component__WEBPACK_IMPORTED_MODULE_2__["MyModal"],
                componentProps: {
                    myParam: "test"
                }
            });
            modal.onDidDismiss().then((detail) => {
                if (detail !== null) {
                    console.log("The result:", detail.data);
                }
            });
            yield modal.present();
        });
    }
    ngOnInit() {
        this.gf.DisableSideMenu();
        this.gf.CheckLogin();
    }
    Login() {
        this.gf.loginUser(this.login).then((user_return) => {
            if (user_return.user) {
                console.log('User returned');
                console.log(user_return.user);
                this.db.collection(src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].FB_Usuarios).doc(user_return.user.uid).get().subscribe(serverItems => {
                    console.log("Search");
                    serverItems.data()[src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].key] = user_return.user.uid;
                    console.log(serverItems.data());
                    this.localStorage.set('user', serverItems.data());
                    src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].usuario = serverItems.data();
                    this.login = {
                        email: '',
                        password: ''
                    };
                    this.gf.ListenersClientesPagos();
                    this.gf.ListenersColaboradores();
                    this.gf.EnableSideMenu();
                    this.gf.IrAClientes();
                });
            }
        }).catch((error) => {
            if (error.code === "auth/wrong-password") {
                this.errors.password = 'La contraseña es incorrecta';
            }
            if (error.code === "auth/user-not-found") {
                this.errors.email = 'No existe usuario con ese mail';
            }
            if (error.code === "auth/invalid-email") {
                this.errors.email = 'El formato de mail es incorrecto';
            }
            console.log("login error");
            console.log(error);
        });
    }
};
LoginComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"] },
    { type: src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] }
];
LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-login",
        template: __webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/login/login.component.html"),
        styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/pages/login/login.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
        _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"],
        _ionic_storage__WEBPACK_IMPORTED_MODULE_6__["Storage"],
        src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"]])
], LoginComponent);



/***/ }),

/***/ "./src/app/pages/login/login.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.module.ts ***!
  \*********************************************/
/*! exports provided: LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.routing.module */ "./src/app/pages/login/login.routing.module.ts");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login.component */ "./src/app/pages/login/login.component.ts");
/* harmony import */ var src_app_common_modules_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/modules/shared.module */ "./src/app/common/modules/shared.module.ts");
/* harmony import */ var src_app_common_modals_my_modal_my_modal_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/modals/my-modal/my-modal.module */ "./src/app/common/modals/my-modal/my-modal.module.ts");






let LoginModule = class LoginModule {
};
LoginModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [src_app_common_modules_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], src_app_common_modals_my_modal_my_modal_module__WEBPACK_IMPORTED_MODULE_5__["MyModalModule"], _login_routing_module__WEBPACK_IMPORTED_MODULE_2__["LoginRoutingModule"]],
        declarations: [_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]]
    })
], LoginModule);



/***/ }),

/***/ "./src/app/pages/login/login.routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/login/login.routing.module.ts ***!
  \*****************************************************/
/*! exports provided: LoginRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginRoutingModule", function() { return LoginRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login.component */ "./src/app/pages/login/login.component.ts");




const routes = [
    {
        path: "",
        component: _login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]
    }
];
let LoginRoutingModule = class LoginRoutingModule {
};
LoginRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], LoginRoutingModule);



/***/ })

}]);
//# sourceMappingURL=pages-login-login-module-es2015.js.map