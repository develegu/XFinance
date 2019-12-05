(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-admin-admin-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/admin/admin.component.html":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/admin/admin.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>\n      Administrador\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-col>\n    <ion-button (click)=\"UsuarioModal()\">Nuevo usuario</ion-button>\n  </ion-col>\n\n  <ion-row *ngFor=\"let user of gv.colaboradores\">\n    <ion-col (click)=\"ModificarUsuarioModal(user)\">\n      {{ user[gv.nombre] }}\n    </ion-col>\n    <ion-col>\n      {{ user[gv.roll] }}\n    </ion-col>\n\n    <ion-col>\n      <ion-icon color=\"medium\" name=\"close-circle-outline\">\n      </ion-icon>\n    </ion-col>\n  </ion-row>\n\n  <ion-col>\n    <ion-button (click)=\"AgregarProducto()\">Nuevo producto</ion-button>\n  </ion-col>\n\n  <ion-row *ngFor=\"let user of gv.colaboradores\">\n    <ion-col (click)=\"ModificarUsuarioModal(user)\">\n      {{ user[gv.nombre] }}\n    </ion-col>\n    <ion-col>\n      {{ user[gv.roll] }}\n    </ion-col>\n\n    <ion-col>\n      <ion-icon color=\"medium\" name=\"close-circle-outline\">\n      </ion-icon>\n    </ion-col>\n  </ion-row>\n\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/admin/admin.component.scss":
/*!**************************************************!*\
  !*** ./src/app/pages/admin/admin.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".item {\n  width: 143%;\n  box-shadow: 0px 10px 13px 0px rgba(218, 204, 204, 0.75);\n  margin: 15px 5px;\n  border-radius: 15px;\n  padding-bottom: 8px;\n  background: #efefef;\n  /* width: 600px;\n\n\n    box-shadow: 0px 10px 13px 0px rgba(218, 204, 204, 0.75); \n   margin: 15px 5px;*/\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvYWRtaW4vQzpcXFVzZXJzXFxqb3JnZVxcRGVza3RvcFxcWEZpbmFuY2Uvc3JjXFxhcHBcXHBhZ2VzXFxhZG1pblxcYWRtaW4uY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2FkbWluL2FkbWluLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtFQUdGLHVEQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDRDs7OztxQkFBQTtBQ0tEIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvYWRtaW4vYWRtaW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaXRlbSB7XHJcbiAgICB3aWR0aDogMTQzJTtcclxuICAtd2Via2l0LWJveC1zaGFkb3c6IDBweCAxN3B4IDEzcHggLTEwcHggcmdiYSgwLCAwLCAwLCAwLjc1KTtcclxuICAtbW96LWJveC1zaGFkb3c6IDBweCAxN3B4IDEzcHggLTEwcHggcmdiYSgwLCAwLCAwLCAwLjc1KTtcclxuICBib3gtc2hhZG93OiAwcHggMTBweCAxM3B4IDBweCByZ2JhKDIxOCwgMjA0LCAyMDQsIDAuNzUpO1xyXG4gIG1hcmdpbjogMTVweCA1cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcclxuICBwYWRkaW5nLWJvdHRvbTogOHB4O1xyXG4gIGJhY2tncm91bmQ6ICNlZmVmZWY7XHJcbiAvKiB3aWR0aDogNjAwcHg7XHJcbiAgXHJcbiAgXHJcbiAgIGJveC1zaGFkb3c6IDBweCAxMHB4IDEzcHggMHB4IHJnYmEoMjE4LCAyMDQsIDIwNCwgMC43NSk7IFxyXG4gIG1hcmdpbjogMTVweCA1cHg7Ki9cclxufSIsIi5pdGVtIHtcbiAgd2lkdGg6IDE0MyU7XG4gIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDE3cHggMTNweCAtMTBweCByZ2JhKDAsIDAsIDAsIDAuNzUpO1xuICAtbW96LWJveC1zaGFkb3c6IDBweCAxN3B4IDEzcHggLTEwcHggcmdiYSgwLCAwLCAwLCAwLjc1KTtcbiAgYm94LXNoYWRvdzogMHB4IDEwcHggMTNweCAwcHggcmdiYSgyMTgsIDIwNCwgMjA0LCAwLjc1KTtcbiAgbWFyZ2luOiAxNXB4IDVweDtcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgcGFkZGluZy1ib3R0b206IDhweDtcbiAgYmFja2dyb3VuZDogI2VmZWZlZjtcbiAgLyogd2lkdGg6IDYwMHB4O1xuXG5cbiAgICBib3gtc2hhZG93OiAwcHggMTBweCAxM3B4IDBweCByZ2JhKDIxOCwgMjA0LCAyMDQsIDAuNzUpOyBcbiAgIG1hcmdpbjogMTVweCA1cHg7Ki9cbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/admin/admin.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/admin/admin.component.ts ***!
  \************************************************/
/*! exports provided: adminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adminComponent", function() { return adminComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/index.js");
/* harmony import */ var src_app_common_modals_my_modal_my_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/modals/my-modal/my-modal.component */ "./src/app/common/modals/my-modal/my-modal.component.ts");
/* harmony import */ var src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/services/common.service */ "./src/app/common/services/common.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");







var adminComponent = /** @class */ (function () {
    function adminComponent(modalController, db, _iterableDiffers, gf) {
        this.modalController = modalController;
        this.db = db;
        this._iterableDiffers = _iterableDiffers;
        this.gf = gf;
        this.IDCliente = '';
        this.Cliente = [];
        this.pagos_cliente = [];
        this.Pago = '';
        this.Multa = '';
        this.Btn_Desactivado = false;
        this.Pagos_Proximos = [];
        this.gv = src_app_common_constants__WEBPACK_IMPORTED_MODULE_6__["gv"];
    }
    adminComponent.prototype.ngOnInit = function () {
        this.gf.CheckLogin();
    };
    adminComponent.prototype.UsuarioModal = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: src_app_common_modals_my_modal_my_modal_component__WEBPACK_IMPORTED_MODULE_4__["MyModal"],
                            componentProps: {
                                type: "Usuario"
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    adminComponent.prototype.ModificarUsuarioModal = function (Usuario) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: src_app_common_modals_my_modal_my_modal_component__WEBPACK_IMPORTED_MODULE_4__["MyModal"],
                            componentProps: {
                                type: "Usuario",
                                Tipo: src_app_common_constants__WEBPACK_IMPORTED_MODULE_6__["gv"].Actualizar,
                                Mod_Usuario: Usuario
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    adminComponent.prototype.AgregarProducto = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: src_app_common_modals_my_modal_my_modal_component__WEBPACK_IMPORTED_MODULE_4__["MyModal"],
                            componentProps: {
                                type: "Producto"
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    adminComponent.ctorParameters = function () { return [
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"] },
        { type: src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] }
    ]; };
    adminComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-admin",
            template: __webpack_require__(/*! raw-loader!./admin.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/admin/admin.component.html"),
            styles: [__webpack_require__(/*! ./admin.component.scss */ "./src/app/pages/admin/admin.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"],
            src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"]])
    ], adminComponent);
    return adminComponent;
}());



/***/ }),

/***/ "./src/app/pages/admin/admin.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/admin/admin.module.ts ***!
  \*********************************************/
/*! exports provided: adminModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adminModule", function() { return adminModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _admin_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin.routing.module */ "./src/app/pages/admin/admin.routing.module.ts");
/* harmony import */ var _admin_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./admin.component */ "./src/app/pages/admin/admin.component.ts");
/* harmony import */ var src_app_common_modules_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/modules/shared.module */ "./src/app/common/modules/shared.module.ts");
/* harmony import */ var src_app_common_modals_my_modal_my_modal_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/modals/my-modal/my-modal.module */ "./src/app/common/modals/my-modal/my-modal.module.ts");






var adminModule = /** @class */ (function () {
    function adminModule() {
    }
    adminModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [src_app_common_modules_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], src_app_common_modals_my_modal_my_modal_module__WEBPACK_IMPORTED_MODULE_5__["MyModalModule"], _admin_routing_module__WEBPACK_IMPORTED_MODULE_2__["adminRoutingModule"]],
            declarations: [_admin_component__WEBPACK_IMPORTED_MODULE_3__["adminComponent"]]
        })
    ], adminModule);
    return adminModule;
}());



/***/ }),

/***/ "./src/app/pages/admin/admin.routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/admin/admin.routing.module.ts ***!
  \*****************************************************/
/*! exports provided: adminRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adminRoutingModule", function() { return adminRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _admin_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./admin.component */ "./src/app/pages/admin/admin.component.ts");




var routes = [
    {
        path: "",
        component: _admin_component__WEBPACK_IMPORTED_MODULE_3__["adminComponent"]
    }
];
var adminRoutingModule = /** @class */ (function () {
    function adminRoutingModule() {
    }
    adminRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], adminRoutingModule);
    return adminRoutingModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-admin-admin-module-es5.js.map