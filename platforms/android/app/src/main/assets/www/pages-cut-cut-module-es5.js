(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-cut-cut-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/cut/cut.component.html":
/*!************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/cut/cut.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>\n      Cut\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list lines=\"none\">\n    <ion-item>\n      <ion-label>Cut</ion-label>\n    </ion-item>\n  </ion-list>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/cut/cut.component.scss":
/*!**********************************************!*\
  !*** ./src/app/pages/cut/cut.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2N1dC9jdXQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/cut/cut.component.ts":
/*!********************************************!*\
  !*** ./src/app/pages/cut/cut.component.ts ***!
  \********************************************/
/*! exports provided: CutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CutComponent", function() { return CutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CutComponent = /** @class */ (function () {
    function CutComponent() {
    }
    CutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-cut",
            template: __webpack_require__(/*! raw-loader!./cut.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/cut/cut.component.html"),
            styles: [__webpack_require__(/*! ./cut.component.scss */ "./src/app/pages/cut/cut.component.scss")]
        })
    ], CutComponent);
    return CutComponent;
}());



/***/ }),

/***/ "./src/app/pages/cut/cut.module.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/cut/cut.module.ts ***!
  \*****************************************/
/*! exports provided: CutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CutModule", function() { return CutModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _cut_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cut.routing.module */ "./src/app/pages/cut/cut.routing.module.ts");
/* harmony import */ var _cut_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cut.component */ "./src/app/pages/cut/cut.component.ts");
/* harmony import */ var src_app_common_modules_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/modules/shared.module */ "./src/app/common/modules/shared.module.ts");





var CutModule = /** @class */ (function () {
    function CutModule() {
    }
    CutModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [src_app_common_modules_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], _cut_routing_module__WEBPACK_IMPORTED_MODULE_2__["CutRoutingModule"]],
            declarations: [_cut_component__WEBPACK_IMPORTED_MODULE_3__["CutComponent"]]
        })
    ], CutModule);
    return CutModule;
}());



/***/ }),

/***/ "./src/app/pages/cut/cut.routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/cut/cut.routing.module.ts ***!
  \*************************************************/
/*! exports provided: CutRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CutRoutingModule", function() { return CutRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _cut_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cut.component */ "./src/app/pages/cut/cut.component.ts");




var routes = [
    {
        path: "",
        component: _cut_component__WEBPACK_IMPORTED_MODULE_3__["CutComponent"]
    }
];
var CutRoutingModule = /** @class */ (function () {
    function CutRoutingModule() {
    }
    CutRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], CutRoutingModule);
    return CutRoutingModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-cut-cut-module-es5.js.map