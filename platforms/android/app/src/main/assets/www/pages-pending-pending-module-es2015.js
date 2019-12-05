(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-pending-pending-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/pending/pending.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/pending/pending.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>\n      Pending\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-item *ngFor=\"let item of items\">\n      <ion-icon [name]=\"item.icon\" slot=\"start\"></ion-icon>\n      {{item.title}}\n      <div class=\"item-note\" slot=\"end\">\n        {{item.note}}\n      </div>\n    </ion-item>\n  </ion-list>\n  <!--\n    <div *ngIf=\"selectedItem\" padding>\n      You navigated here from <b>{{selectedItem.title }}</b>\n    </div>\n  -->\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/pending/pending.component.scss":
/*!******************************************************!*\
  !*** ./src/app/pages/pending/pending.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3BlbmRpbmcvcGVuZGluZy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/pending/pending.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/pending/pending.component.ts ***!
  \****************************************************/
/*! exports provided: PendingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PendingComponent", function() { return PendingComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let PendingComponent = class PendingComponent {
    constructor() {
        this.icons = [
            "flask",
            "wifi",
            "beer",
            "football",
            "basketball",
            "paper-plane",
            "american-football",
            "boat",
            "bluetooth",
            "build"
        ];
        this.items = [];
        for (let i = 1; i < 11; i++) {
            this.items.push({
                title: "Item " + i,
                note: "This is item #" + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ngOnInit() { }
};
PendingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-pending",
        template: __webpack_require__(/*! raw-loader!./pending.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/pending/pending.component.html"),
        styles: [__webpack_require__(/*! ./pending.component.scss */ "./src/app/pages/pending/pending.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], PendingComponent);



/***/ }),

/***/ "./src/app/pages/pending/pending.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/pending/pending.module.ts ***!
  \*************************************************/
/*! exports provided: PendingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PendingModule", function() { return PendingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _pending_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pending.routing.module */ "./src/app/pages/pending/pending.routing.module.ts");
/* harmony import */ var _pending_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pending.component */ "./src/app/pages/pending/pending.component.ts");
/* harmony import */ var src_app_common_modules_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/modules/shared.module */ "./src/app/common/modules/shared.module.ts");





let PendingModule = class PendingModule {
};
PendingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [src_app_common_modules_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], _pending_routing_module__WEBPACK_IMPORTED_MODULE_2__["PendingRoutingModule"]],
        declarations: [_pending_component__WEBPACK_IMPORTED_MODULE_3__["PendingComponent"]]
    })
], PendingModule);



/***/ }),

/***/ "./src/app/pages/pending/pending.routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/pending/pending.routing.module.ts ***!
  \*********************************************************/
/*! exports provided: PendingRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PendingRoutingModule", function() { return PendingRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _pending_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pending.component */ "./src/app/pages/pending/pending.component.ts");




const routes = [
    {
        path: "",
        component: _pending_component__WEBPACK_IMPORTED_MODULE_3__["PendingComponent"]
    }
];
let PendingRoutingModule = class PendingRoutingModule {
};
PendingRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], PendingRoutingModule);



/***/ })

}]);
//# sourceMappingURL=pages-pending-pending-module-es2015.js.map