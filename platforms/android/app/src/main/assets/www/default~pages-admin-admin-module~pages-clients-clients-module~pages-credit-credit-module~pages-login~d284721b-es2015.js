(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~pages-admin-admin-module~pages-clients-clients-module~pages-credit-credit-module~pages-login~d284721b"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/common/modals/my-modal/my-modal.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/common/modals/my-modal/my-modal.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>{{ type }}</ion-title>\n    <ion-row *ngIf=\"type === 'Usuario'\">\n      <ion-col>\n        <ion-input [disabled]=\"this.PermisosUsuario[gv.region] !== 0\" type=\"number\" placeholder=\"Region\" [(ngModel)]=\"Usuario.Region\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input [disabled]=\"this.PermisosUsuario[gv.dominio] !== 0\" type=\"number\" placeholder=\"Zona\" [(ngModel)]=\"Usuario.Dominio\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input [disabled]=\"this.PermisosUsuario[gv.sucursal] !== 0\" type=\"number\" placeholder=\"Sucursal\" [(ngModel)]=\"Usuario.Sucursal\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input [disabled]=\"this.PermisosUsuario[gv.dm] !== 0\" type=\"number\" placeholder=\"Encargado\" [(ngModel)]=\"Usuario.DM\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input [disabled]=\"this.PermisosUsuario[gv.agente] !== 0\" type=\"number\" placeholder=\"Agente\" [(ngModel)]=\"Usuario.AG\">\n        </ion-input>\n      </ion-col>\n    </ion-row>\n\n    <ion-row *ngIf=\"type === 'Cliente'\">\n      <ion-col>\n        <ion-select placeholder=\"Encargado\" interface=\"action-sheet\" [(ngModel)]=\"Cliente.ID_Ubicacion\">\n          <ion-select-option value=\"{{ Colaborador[gv.ID_Ubicacion] }}\" *ngFor=\"let Colaborador of gv.colaboradores\">\n            {{ Colaborador[gv.nombre] }} Roll: {{ Colaborador[gv.roll] }}\n          </ion-select-option>\n        </ion-select>\n      </ion-col>\n    </ion-row>\n\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-grid *ngIf=\"type === 'Cliente'\">\n    <ion-row>\n      <ion-col>\n        <ion-input placeholder=\"Nombre(s)\" [(ngModel)]=\"Cliente.Nombre\" (ngModelChange)='GetCurp()'>\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Apellido paterno\" [(ngModel)]=\"Cliente.ApellidoP\" (ngModelChange)='GetCurp()'>\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Apellido materno\" [(ngModel)]=\"Cliente.ApellidoM\" (ngModelChange)='GetCurp()'>\n        </ion-input>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-label>Sexo</ion-label>\n          <ion-select [(ngModel)]=\"Cliente.Sexo\" (ngModelChange)='GetCurp()'>\n            <ion-select-option value=\"{{ gv.Hombre }}\">Masculino</ion-select-option>\n            <ion-select-option value=\"{{ gv.Mujer }}\">Femenino</ion-select-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Identificador\" [(ngModel)]=\"Cliente.Identificador\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-select placeholder=\"Edo nacimiento\" interface=\"action-sheet\" [(ngModel)]=\"Cliente.Edo_Nacimiento\"\n          (ngModelChange)='GetCurp()'>\n          <ion-select-option value=\"{{ edo.value }}\" *ngFor=\"let edo of Estados | keyvalue\">{{ edo.key }}\n          </ion-select-option>\n        </ion-select>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-input placeholder=\"CURP\" [(ngModel)]=\"Cliente.CURP\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Telefono\" [(ngModel)]=\"Cliente.Telefono\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-datetime displayFormat=\"DD/MM/YYYY\" placeholder=\"Fecha Nacimiento\" max=\"2050\"\n            [(ngModel)]=\"Cliente.Cumpleanos\" (ngModelChange)='GetCurp()'>\n          </ion-datetime>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <h3>Direccion</h3>\n\n    <ion-row>\n      <ion-col>\n        <ion-input placeholder=\"Calle\" [(ngModel)]=\"Cliente.Calle\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Exterior\" [(ngModel)]=\"Cliente.NumeroExt\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Interior\" [(ngModel)]=\"Cliente.NumeroInt\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"CP\" [(ngModel)]=\"Cliente.CP\">\n        </ion-input>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-input placeholder=\"Colonia\" [(ngModel)]=\"Cliente.Colonia\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Municipio\" [(ngModel)]=\"Cliente.Municipio\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Estado\" [(ngModel)]=\"Cliente.Estado\">\n        </ion-input>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-input placeholder=\"Sector\" [(ngModel)]=\"Cliente.Sector\">\n        </ion-input>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-button [disabled]=\"btn_disabled\" (click)=\"AgregarClientes()\">Registrar cliente</ion-button>\n      </ion-col>\n\n      <ion-col *ngIf='Incomplete'>\n        <ion-text>{{ AlertText }}</ion-text>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n  <ion-grid *ngIf=\"type === 'Aval'\">\n    <ion-row>\n      <ion-col>\n        <ion-input placeholder=\"Nombre(s)\" [(ngModel)]=\"Aval.Nombre\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Apellido paterno\" [(ngModel)]=\"Aval.ApellidoP\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Apellido materno\" [(ngModel)]=\"Aval.ApellidoM\">\n        </ion-input>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-label>Sexo</ion-label>\n          <ion-select [(ngModel)]=\"Aval.Sexo\">\n            <ion-select-option value=\"{{ gv.Hombre }}\">Masculino</ion-select-option>\n            <ion-select-option value=\"{{ gv.Mujer }}\">Femenino</ion-select-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Entidad de nacimiento\" [(ngModel)]=\"Aval.Edo_Nacimiento\">\n        </ion-input>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-input placeholder=\"CURP\" [(ngModel)]=\"Aval.CURP\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Telefono\" [(ngModel)]=\"Aval.Telefono\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-datetime displayFormat=\"DD/MM/YYYY\" placeholder=\"Fecha Nacimiento\" max=\"2050\"\n            [(ngModel)]=\"Aval.Cumpleanos\">\n          </ion-datetime>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <h3>Direccion</h3>\n\n    <ion-row>\n      <ion-col>\n        <ion-input placeholder=\"Calle\" [(ngModel)]=\"Aval.Calle\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Exterior\" [(ngModel)]=\"Aval.NumeroExt\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Interior\" [(ngModel)]=\"Aval.NumeroInt\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"CP\" [(ngModel)]=\"Aval.CP\">\n        </ion-input>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-input placeholder=\"Colonia\" [(ngModel)]=\"Aval.Colonia\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Municipio\" [(ngModel)]=\"Aval.Municipio\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input placeholder=\"Estado\" [(ngModel)]=\"Aval.Estado\">\n        </ion-input>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-input placeholder=\"Sector\" [(ngModel)]=\"Aval.Sector\">\n        </ion-input>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-button [disabled]=\"btn_disabled\" (click)=\"AgregarAval()\">Registrar aval</ion-button>\n      </ion-col>\n\n      <ion-col *ngIf='Incomplete'>\n        <ion-text>{{ AlertText }}</ion-text>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n  <ion-grid *ngIf=\"type === 'Usuario'\">\n\n    <ion-row>\n      <ion-col>\n        <ion-input placeholder=\"Nombre\" [(ngModel)]=\"Usuario.Nombre\">\n        </ion-input>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-input placeholder=\"Mail\" [(ngModel)]=\"Usuario.Mail\">\n        </ion-input>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-item>\n        <ion-label>Seleccionar</ion-label>\n        <ion-select [(ngModel)]=\"Usuario.Roll\" placeholder=\"Roll\">\n          <ion-select-option value=\"{{ gv.Administrador }}\">Administrador</ion-select-option>\n          <ion-select-option value=\"{{ gv.Cobrador }}\">Cobrador</ion-select-option>\n          <ion-select-option value=\"{{ gv.Oficina }}\">Oficina</ion-select-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-col>\n        <ion-input disabled readonly placeholder=\"Organizacion\" [(ngModel)]=\"Usuario.Organizacion\">\n        </ion-input>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-input type=\"password\" placeholder=\"Contraseña\" [(ngModel)]=\"Usuario.Contrasena\">\n        </ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input type=\"password\" placeholder=\"Confirmar contraseña\" [(ngModel)]=\"Usuario.Confirmar\">\n        </ion-input>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-button [disabled]=\"btn_disabled\" (click)=\"AgregarUsuario()\">Agregar</ion-button>\n      </ion-col>\n      <ion-col *ngIf='Incomplete'>\n        <ion-text>{{ AlertText }}</ion-text>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n  <ion-grid *ngIf=\"type === 'Pago'\">\n\n    <ion-item>\n      <ion-label>Seleccionar</ion-label>\n      <ion-select interface=\"action-sheet\" [(ngModel)]=\"Selection\" placeholder=\"Pagado\" (ngModelChange)='Cambio()'>\n        <ion-select-option value=\"Posponer\">Posponer</ion-select-option>\n        <ion-select-option value=\"Liquidar\">Liquidar</ion-select-option>\n        <ion-select-option value=\"Re estructurar\">Re estructurar</ion-select-option>\n        <ion-select-option value=\"Agregar pagos\">Pagos de penalizacion</ion-select-option>\n        <ion-select-option value=\"Eliminar credito\">Eliminar credito</ion-select-option>\n      </ion-select>\n    </ion-item>\n\n    <div *ngIf=\"Selection === 'Posponer'\">\n      <ion-text>\n        Ingresa la fecha a la que se pospondra el pago y la razon de posponerlo.\n      </ion-text>\n\n      <ion-row>\n        <ion-col>\n          <ion-item>\n            <ion-label>FECHA</ion-label>\n            <ion-datetime displayFormat=\"DD/MM/YYYY\" placeholder=\"Select Date\" max=\"2050\"\n              [(ngModel)]=\"In.Posponer.Date\"></ion-datetime>\n          </ion-item>\n        </ion-col>\n\n        <ion-col>\n          <ion-item>\n            <ion-label>Hora de pago</ion-label>\n            <ion-datetime displayFormat=\"H:mm A\" minuteValues=\"0,30\" [(ngModel)]=\"In.Posponer.Date\"></ion-datetime>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col>\n          <ion-input placeholder=\"Razon\" [(ngModel)]=\"In.Posponer.Razon\"></ion-input>\n        </ion-col>\n      </ion-row>\n    </div>\n\n    <div *ngIf=\"Selection === 'Liquidar'\">\n      <ion-text>\n        ¿Seguro que quieres liquidar el credito completo?\n        Faltan {{ Info_Credito[gv.pagos_faltantes] }} pagos con un total de $\n        {{ Info_Credito[gv.cantidad_por_pagar] }}\n      </ion-text>\n      <ion-row>\n        <ion-col>\n          <ion-input type=\"number\" placeholder=\"Cantidad a reducir\" [(ngModel)]=\"In.Liquidar.Cantidad\"></ion-input>\n        </ion-col>\n      </ion-row>\n    </div>\n\n    <div *ngIf=\"Selection === 'Re estructurar'\">\n      <ion-text>\n        Ingresa la nueva cantidad a pagar.\n        Fecha de inicio de los pagos.\n        Y el periodo de los pagos\n      </ion-text>\n\n      <ion-row>\n        <ion-col>\n          <ion-input type=\"number\" placeholder=\"Pago\" [(ngModel)]=\"In.Re_Estructurar.Pago\"></ion-input>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col>\n          <ion-item>\n            <ion-label>FECHA</ion-label>\n            <ion-datetime displayFormat=\"DD/MM/YYYY\" placeholder=\"Select Date\" max=\"2050\"\n              [(ngModel)]=\"In.Re_Estructurar.Date\"></ion-datetime>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n      <ion-item>\n        <ion-select placeholder=\"Tipo\" [(ngModel)]=\"In.Re_Estructurar.Period\">\n          <ion-select-option value=\"{{ gv.diario }}\">Diario</ion-select-option>\n          <ion-select-option value=\"{{ gv.semanal }}\">Semanal</ion-select-option>\n          <ion-select-option value=\"{{ gv.quincenal }}\">Quincenal</ion-select-option>\n          <ion-select-option value=\"{{ gv.mensual }}\">Mensual</ion-select-option>\n        </ion-select>\n      </ion-item>\n    </div>\n\n    <div *ngIf=\"Selection === 'Agregar pagos'\">\n      <ion-text>\n        Ingresa la cantidad de pagos que se le agregaran al credito\n      </ion-text>\n\n      <ion-row>\n        <ion-col>\n          <ion-input type=\"number\" placeholder=\"Numero de pagos\" [(ngModel)]=\"In.Agregar_pagos.Pagos\"></ion-input>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-input type=\"number\" placeholder=\"Pago\" [(ngModel)]=\"In.Agregar_pagos.Pago\"></ion-input>\n        </ion-col>\n      </ion-row>\n    </div>\n\n    <ion-row>\n      <ion-col>\n        <ion-button [disabled]=\"btn_disabled\" (click)=\"PayCredit()\">{{ Btn_Txt }}</ion-button>\n      </ion-col>\n      <ion-col *ngIf=\"Incomplete\">\n        <ion-text>{{ AlertText }}</ion-text>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid *ngIf=\"type === 'Producto'\">\n\n    <ion-text>\n      Ingresa la fecha a la que se pospondra el pago y la razon de posponerlo.\n    </ion-text>\n\n    <ion-row>\n      <ion-col>\n        <ion-input type=\"number\" placeholder=\"Credito\" [(ngModel)]=\"Producto.Credito\"></ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input type=\"number\" placeholder=\"Pago\" [(ngModel)]=\"Producto.Pago\"\n          (ngModelChange)='CambioPagoNum(Producto.Pago, Producto.Total_Pagos)'></ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-textarea disabled readonly placeholder=\"Total a pagar\" [(ngModel)]=\"Producto.Total_Credito\">\n        </ion-textarea>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-input type=\"number\" placeholder=\"Numero de pagos\" [(ngModel)]=\"Producto.Total_Pagos\"\n          (ngModelChange)='CambioPagoNum(Producto.Pago, Producto.Total_Pagos)'></ion-input>\n      </ion-col>\n      <ion-col>\n        <ion-input type=\"number\" placeholder=\"Efectivo\" [(ngModel)]=\"Producto.Efectivo\"></ion-input>\n      </ion-col>\n      <ion-item>\n        <ion-label>Periodo</ion-label>\n        <ion-select [(ngModel)]=\"Producto.Periodo\">\n          <ion-select-option value=\"{{ gv.diario }}\">Diario</ion-select-option>\n          <ion-select-option value=\"{{ gv.semanal }}\">Semanal</ion-select-option>\n          <ion-select-option value=\"{{ gv.quincenal }}\">Quincenal</ion-select-option>\n          <ion-select-option value=\"{{ gv.mensual }}\">Mensual</ion-select-option>\n        </ion-select>\n      </ion-item>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-button (click)=\"AgregarProducto()\">Agregar producto</ion-button>\n      </ion-col>\n      <ion-col *ngIf=\"Incomplete\">\n        <ion-text>{{ AlertText }}</ion-text>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>"

/***/ }),

/***/ "./src/app/common/modals/my-modal/my-modal.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/common/modals/my-modal/my-modal.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbW1vbi9tb2RhbHMvbXktbW9kYWwvbXktbW9kYWwuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/common/modals/my-modal/my-modal.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/common/modals/my-modal/my-modal.component.ts ***!
  \**************************************************************/
/*! exports provided: MyModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyModal", function() { return MyModal; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/services/common.service */ "./src/app/common/services/common.service.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants */ "./src/app/common/constants.ts");






let MyModal = class MyModal {
    constructor(modalCtrl, db, gf) {
        this.modalCtrl = modalCtrl;
        this.db = db;
        this.gf = gf;
        this.gv = _constants__WEBPACK_IMPORTED_MODULE_5__["gv"];
        this.Estados = _constants__WEBPACK_IMPORTED_MODULE_5__["Estados"][0];
        this.AlertText = '';
        this.btn_disabled = false;
        this.PermisosUsuario = [];
        this.Usuario = {
            Nombre: '',
            Mail: '',
            Contrasena: '',
            Confirmar: '',
            Roll: '',
            Organizacion: '',
            Region: '',
            Dominio: '',
            Sucursal: '',
            DM: '',
            AG: ''
        };
        //CLIENTES
        this.Cliente = {
            Nombre: '',
            ApellidoP: '',
            ApellidoM: '',
            Calle: '',
            NumeroExt: '',
            NumeroInt: '',
            Colonia: '',
            Municipio: '',
            Estado: '',
            Telefono: '',
            CURP: '',
            Cumpleanos: '',
            Sexo: '',
            Edo_Nacimiento: '',
            Sector: '',
            CP: '',
            Identificador: '',
            ID_Ubicacion: '',
        };
        this.Incomplete = false;
        //PAGOS
        this.ProximosArr = [];
        this.PagosArr = [];
        this.Info_Credito = [];
        this.In = {
            Posponer: {
                Date: '',
                Razon: '',
                Hora: ''
            },
            Liquidar: {
                Cantidad: ''
            },
            Re_Estructurar: {
                Pago: '',
                Period: '',
                Date: ''
            },
            Agregar_pagos: {
                Pagos: '',
                Pago: ''
            },
        };
        this.Selection = 'Posponer';
        this.Btn_Txt = 'Posponer';
        //AVAL
        this.Aval = {
            Nombre: '',
            ApellidoP: '',
            ApellidoM: '',
            Calle: '',
            NumeroExt: '',
            NumeroInt: '',
            Colonia: '',
            Municipio: '',
            Estado: '',
            Telefono: '',
            CURP: '',
            Cumpleanos: '',
            Sexo: '',
            Edo_Nacimiento: '',
            Sector: '',
            CP: '',
        };
        //PRODUCTO
        this.Producto = {
            Credito: '',
            Total_Pagos: '',
            Pago: '',
            Total_Credito: 0,
            Efectivo: '',
            Periodo: '',
        };
    }
    dismiss() {
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }
    ngOnInit() {
        if (this.type === 'Usuario') {
            this.Usuario.Organizacion = _constants__WEBPACK_IMPORTED_MODULE_5__["gv"].usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].organizacion];
            if (this.Tipo === _constants__WEBPACK_IMPORTED_MODULE_5__["gv"].Actualizar) {
                this.Usuario.Mail = this.Mod_Usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].mail];
                this.Usuario.Nombre = this.Mod_Usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].nombre];
                this.Usuario.Roll = this.Mod_Usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].roll];
                this.Usuario.Region = this.Mod_Usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].region];
                this.Usuario.Dominio = this.Mod_Usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].dominio];
                this.Usuario.Sucursal = this.Mod_Usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].sucursal];
                this.Usuario.DM = this.Mod_Usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].dm];
                this.Usuario.AG = this.Mod_Usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].agente];
            }
            else {
                this.PermisosUsuario = this.gf.GetElementosDeID(_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].ID_Ubicacion]);
                this.Usuario.Region = this.Mod_Usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].region];
                this.Usuario.Dominio = this.Mod_Usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].dominio];
                this.Usuario.Sucursal = this.Mod_Usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].sucursal];
                this.Usuario.DM = this.Mod_Usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].dm];
                this.Usuario.AG = this.Mod_Usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].agente];
            }
        }
        if (this.type === 'Cliente' && this.Tipo === _constants__WEBPACK_IMPORTED_MODULE_5__["gv"].Actualizar) {
            console.log(this.Info_Cliente);
            let ArrNombre = this.Info_Cliente[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].nombre].split('_');
            console.log(ArrNombre);
            this.Cliente.Nombre = ArrNombre[0];
            this.Cliente.ApellidoP = ArrNombre[1];
            this.Cliente.ApellidoM = ArrNombre[2];
            let ArrDireccion = this.Info_Cliente[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].direccion].split('_');
            console.log(ArrDireccion);
            this.Cliente.Calle = ArrDireccion[0];
            this.Cliente.NumeroInt = ArrDireccion[1];
            this.Cliente.NumeroExt = ArrDireccion[2];
            this.Cliente.Colonia = ArrDireccion[3];
            this.Cliente.Municipio = ArrDireccion[4];
            this.Cliente.Estado = ArrDireccion[5];
            this.Cliente.CP = ArrDireccion[6];
            this.Cliente.Sexo = this.Info_Cliente[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].sexo];
            this.Cliente.Identificador = this.Info_Cliente[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].identificador];
            this.Cliente.Cumpleanos = this.Info_Cliente[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].fecha];
            this.Cliente.Telefono = this.Info_Cliente[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].telefono];
            this.Cliente.CURP = this.Info_Cliente[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].curp];
        }
        if (this.type === 'Pago') {
            this.PagosArr = _constants__WEBPACK_IMPORTED_MODULE_5__["gv"].pagos_Arr.filter(pago => {
                return pago[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].key_primer_pago] === this.Key_Primer_Pago;
            });
            this.PagosArr.sort((a, b) => { return a[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].num_pago] - b[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].num_pago]; });
            this.ProximosArr = this.PagosArr.filter(pago => {
                return pago[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].status] === _constants__WEBPACK_IMPORTED_MODULE_5__["gv"].status_proximo ||
                    pago[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].status] === _constants__WEBPACK_IMPORTED_MODULE_5__["gv"].status_vencido;
            });
            this.ProximosArr.sort((a, b) => { return a[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].num_pago] - b[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].num_pago]; });
            this.Info_Credito = this.gf.GetInformacionCreditoInd(this.PagosArr);
            console.log(this.Info_Credito);
            console.log(this.PagosArr);
            console.log(this.ProximosArr);
        }
    }
    closeModal() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }
    AgregarUsuario() {
        if (this.Usuario.Mail === '') {
            this.Incomplete = true;
            this.AlertText = 'Falta el mail';
            return;
        }
        if (this.Tipo === _constants__WEBPACK_IMPORTED_MODULE_5__["gv"].Actualizar) {
            this.gf.ActualizarCollaborador(this.Mod_Usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].key], this.Usuario.Nombre, this.Usuario.Roll, this.Usuario.Mail, this.Usuario.Organizacion, parseInt(this.gf.GetID(this.Usuario.Region, this.Usuario.Dominio, this.Usuario.Sucursal, this.Usuario.DM, this.Usuario.AG)))
                .then(res => {
                this.closeModal();
            })
                .catch(err => {
                this.closeModal();
            });
        }
        else {
            this.gf.CrearCollaborador(this.Usuario.Nombre, this.Usuario.Roll, this.Usuario.Contrasena, this.Usuario.Mail, this.Usuario.Organizacion, parseInt(this.gf.GetID(this.Usuario.Region, this.Usuario.Dominio, this.Usuario.Sucursal, this.Usuario.DM, this.Usuario.AG)))
                .then(res => {
                this.closeModal();
            })
                .catch(err => {
                this.closeModal();
            });
        }
    }
    GetCurp() {
        if (this.Cliente.ApellidoP !== '' && this.Cliente.ApellidoM !== '' && this.Cliente.Nombre !== '' &&
            this.Cliente.Sexo !== '' && this.Cliente.Cumpleanos !== '' && this.Cliente.Edo_Nacimiento !== '') {
            let fecha = new Date(this.Cliente.Cumpleanos);
            this.Cliente.CURP = this.gf.GetCURP(this.Cliente.ApellidoP, this.Cliente.ApellidoM, this.Cliente.Nombre, fecha, this.Cliente.Sexo.charAt(0), this.Cliente.Edo_Nacimiento);
        }
    }
    AgregarClientes() {
        this.Incomplete = false;
        this.btn_disabled = true;
        if (this.Cliente.Identificador === '') {
            this.Incomplete = true;
            this.AlertText = "Ingresa un numero de cliente";
            this.btn_disabled = false;
            return;
        }
        let cliente = _constants__WEBPACK_IMPORTED_MODULE_5__["gv"].clientes.filter(cliente => {
            return cliente[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].identificador] === this.Cliente.Identificador;
        });
        if (!_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].DT_Clientes) {
            this.Incomplete = true;
            this.AlertText = "Espera a que carguen los usuarios";
            this.btn_disabled = false;
            return;
        }
        if (this.Tipo === _constants__WEBPACK_IMPORTED_MODULE_5__["gv"].Nuevo && cliente[0] !== undefined) {
            this.Incomplete = true;
            this.AlertText = "Ya hay un usuario con ese identificador";
            this.btn_disabled = false;
            return;
        }
        if (this.Cliente.Nombre === '') {
            this.Incomplete = true;
            this.AlertText = "Ingresa un nombre";
            this.btn_disabled = false;
            return;
        }
        if (this.Cliente.ApellidoP === '') {
            this.Incomplete = true;
            this.AlertText = "Ingresa un apellido paterno";
            this.btn_disabled = false;
            return;
        }
        if (this.Cliente.ApellidoM === '') {
            this.Incomplete = true;
            this.AlertText = "Ingresa un apellido materno";
            this.btn_disabled = false;
            return;
        }
        if (this.Cliente.Calle === '') {
            this.Incomplete = true;
            this.AlertText = "Ingresa la calle";
            this.btn_disabled = false;
            return;
        }
        if (this.Cliente.NumeroExt === '' && this.Cliente.NumeroInt === '') {
            this.Incomplete = true;
            this.AlertText = "Ingresa numero interior o exterior o ambos";
            this.btn_disabled = false;
            return;
        }
        if (this.Cliente.Colonia === '') {
            this.Incomplete = true;
            this.AlertText = "Ingresa un colonia de residencia";
            this.btn_disabled = false;
            return;
        }
        if (this.Cliente.Municipio === '') {
            this.Incomplete = true;
            this.AlertText = "Ingresa un municipio de residencia";
            this.btn_disabled = false;
            return;
        }
        if (this.Cliente.Estado === '') {
            this.Incomplete = true;
            this.AlertText = "Ingresa el estado de residencia";
            this.btn_disabled = false;
            return;
        }
        if (this.Cliente.CP === '') {
            this.Incomplete = true;
            this.AlertText = "Ingresa un codigo postal";
            this.btn_disabled = false;
            return;
        }
        if (this.Cliente.Telefono === '') {
            this.Incomplete = true;
            this.AlertText = "Ingresa un telefono";
            this.btn_disabled = false;
            return;
        }
        if (this.Cliente.CURP === '') {
            this.Incomplete = true;
            this.AlertText = "Ingresa un CURP";
            this.btn_disabled = false;
            return;
        }
        if (this.Cliente.Cumpleanos === '') {
            this.Incomplete = true;
            this.AlertText = "Ingresa la fecha de nacimiento";
            this.btn_disabled = false;
            return;
        }
        if (this.Cliente.Sexo === '') {
            this.Incomplete = true;
            this.AlertText = "Ingresa el sexo de la persona";
            this.btn_disabled = false;
            return;
        }
        if (this.Cliente.NumeroInt === '') {
            this.Cliente.NumeroInt = ' ';
        }
        this.gf.NuevoCliente(this.Cliente.Nombre + '#' + this.Cliente.ApellidoP + '#' + this.Cliente.ApellidoM, this.Cliente.Calle + '#' + this.Cliente.NumeroExt + '#' + this.Cliente.NumeroInt + '#' + this.Cliente.Colonia + '#' +
            this.Cliente.Municipio + '#' + this.Cliente.Estado + '#' + this.Cliente.CP, this.Cliente.Telefono, this.Cliente.CURP, this.Cliente.Cumpleanos, this.Cliente.Sexo, this.Cliente.Identificador, parseInt(this.Cliente.ID_Ubicacion))
            .then(res => {
            if (res) {
                this.closeModal();
            }
            else {
            }
        });
    }
    Cambio() {
        switch (this.Selection) {
            case 'Posponer':
                this.Btn_Txt = 'Posponer pago';
                break;
            case 'Liquidar':
                this.Btn_Txt = 'Liquidar credito';
                break;
            case 'Re estructurar':
                this.Btn_Txt = 'Re estructurar credito';
                break;
            case 'Agregar pagos':
                this.Btn_Txt = 'Agregar pagos';
                break;
            case 'Eliminar credito':
                this.Btn_Txt = 'Eliminar credito';
                break;
        }
    }
    PayCredit() {
        this.Incomplete = false;
        this.btn_disabled = true;
        switch (this.Selection) {
            case 'Posponer':
                if (this.In.Posponer.Date === '' || this.In.Posponer.Razon === '') {
                    this.Incomplete = true;
                    this.AlertText = 'Falta información';
                    this.btn_disabled = false;
                    return;
                }
                let fecha = new Date(this.In.Posponer.Date);
                this.gf.PosponerPago(this.ProximosArr[0], _constants__WEBPACK_IMPORTED_MODULE_5__["gv"].usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].nombre], fecha, this.In.Posponer.Razon)
                    .then(res => {
                    if (res) {
                        this.modalCtrl.dismiss({
                            'dismissed': true
                        });
                    }
                    else {
                    }
                    this.btn_disabled = false;
                });
                break;
            case 'Liquidar':
                if (this.In.Liquidar.Cantidad === '') {
                    this.Incomplete = true;
                    this.AlertText = 'Falta información';
                    this.btn_disabled = false;
                    return;
                }
                this.gf.LiquidarCredito(this.PagosArr, _constants__WEBPACK_IMPORTED_MODULE_5__["gv"].usuario[_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].nombre], parseInt(this.In.Liquidar.Cantidad), this.PagosArr[0], this.ProximosArr[0])
                    .then(res => {
                    if (res) {
                        this.modalCtrl.dismiss({
                            'dismissed': true
                        });
                    }
                    else {
                        this.btn_disabled = false;
                    }
                });
                break;
            case 'Re estructurar':
                if (this.In.Re_Estructurar.Pago === '' || this.In.Re_Estructurar.Period === '' || this.In.Re_Estructurar.Date === '') {
                    this.Incomplete = true;
                    this.AlertText = 'Falta información';
                    this.btn_disabled = false;
                    return;
                }
                if (this.ProximosArr.length === this.PagosArr.length) {
                    this.gf.Toast("No se puede reestructurar el primer pago elimina el credito e ingresa uno nuevo", 2000);
                    this.btn_disabled = false;
                    return;
                }
                let fecha_restructura = new Date(this.In.Re_Estructurar.Date);
                this.gf.ReestructurarCredito(this.ProximosArr[0], parseInt(this.In.Re_Estructurar.Pago), this.In.Re_Estructurar.Period, this.PagosArr, fecha_restructura)
                    .then(res => {
                    if (res) {
                        this.modalCtrl.dismiss({
                            'dismissed': true
                        });
                    }
                    else {
                        this.btn_disabled = false;
                    }
                });
                break;
            case 'Agregar pagos':
                if (this.In.Agregar_pagos.Pagos === '' || this.In.Agregar_pagos.Pago === '') {
                    this.Incomplete = true;
                    this.AlertText = 'Falta información';
                    this.btn_disabled = false;
                    return;
                }
                this.gf.AgregarPagosMulta(this.PagosArr, parseInt(this.In.Agregar_pagos.Pagos), parseInt(this.In.Agregar_pagos.Pago))
                    .then(res => {
                    if (res) {
                        this.modalCtrl.dismiss({
                            'dismissed': true
                        });
                    }
                    else {
                        this.btn_disabled = false;
                    }
                });
                break;
            case 'Eliminar credito':
                this.gf.EliminarCredito(this.PagosArr)
                    .then(res => {
                    if (res) {
                        this.modalCtrl.dismiss({
                            'dismissed': true
                        });
                    }
                    else {
                        this.btn_disabled = false;
                    }
                });
                break;
        }
    }
    AgregarAval() {
        _constants__WEBPACK_IMPORTED_MODULE_5__["gv"].AvalArr.push({
            [_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].direccion]: this.Aval.Calle + '#' + this.Aval.NumeroExt + '#' + this.Aval.NumeroInt + '#' + this.Aval.Colonia + '#' +
                this.Aval.Municipio + '#' + this.Aval.Estado,
            [_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].nombre]: this.Aval.Nombre + '#' + this.Aval.ApellidoP + '#' + this.Aval.ApellidoM,
            [_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].telefono]: this.Aval.Telefono,
            [_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].curp]: this.Aval.CURP,
            [_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].nacimiento]: this.Aval.Cumpleanos,
            [_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].sexo]: this.Aval.Sexo
        });
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }
    AgregarProducto() {
        this.gf.AgregarProducto(parseInt(this.Producto.Credito), parseInt(this.Producto.Total_Pagos), this.Producto.Periodo, parseInt(this.Producto.Pago), this.Producto.Total_Credito, parseInt(this.Producto.Efectivo));
    }
    CambioPagoNum(Pago, Num_Pagos) {
        if (Pago === '') {
            Pago = '0';
        }
        if (Num_Pagos === '') {
            Num_Pagos = '0';
        }
        this.Producto.Total_Credito = parseInt(Pago) * parseInt(Num_Pagos);
    }
};
MyModal.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"] },
    { type: src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], MyModal.prototype, "myParam", void 0);
MyModal = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-my-modal",
        template: __webpack_require__(/*! raw-loader!./my-modal.component.html */ "./node_modules/raw-loader/index.js!./src/app/common/modals/my-modal/my-modal.component.html"),
        styles: [__webpack_require__(/*! ./my-modal.component.scss */ "./src/app/common/modals/my-modal/my-modal.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"],
        _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"],
        src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
], MyModal);



/***/ }),

/***/ "./src/app/common/modals/my-modal/my-modal.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/common/modals/my-modal/my-modal.module.ts ***!
  \***********************************************************/
/*! exports provided: MyModalModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyModalModule", function() { return MyModalModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_common_modules_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/common/modules/shared.module */ "./src/app/common/modules/shared.module.ts");
/* harmony import */ var _my_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./my-modal.component */ "./src/app/common/modals/my-modal/my-modal.component.ts");




let MyModalModule = class MyModalModule {
};
MyModalModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [src_app_common_modules_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"]],
        entryComponents: [_my_modal_component__WEBPACK_IMPORTED_MODULE_3__["MyModal"]],
        declarations: [_my_modal_component__WEBPACK_IMPORTED_MODULE_3__["MyModal"]]
    })
], MyModalModule);



/***/ })

}]);
//# sourceMappingURL=default~pages-admin-admin-module~pages-clients-clients-module~pages-credit-credit-module~pages-login~d284721b-es2015.js.map