(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-credit-credit-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/credit/credit.component.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/credit/credit.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>\n      Credito\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-6>\n        <ion-item class=\"input\">\n          <ion-label floating>*Id cliente:</ion-label>\n          <ion-input [(ngModel)]=\"in.IDCliente\" (ngModelChange)='GetClient()'></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col col-6>\n        <ion-item class=\"input\">\n          <ion-label floating>Nombre:</ion-label>\n          {{ this.gf.QuitarBarraAInfo(cliente[gv.nombre]) }}\n        </ion-item>\n      </ion-col>\n      <ion-col col-6>\n        <ion-item class=\"input\">\n          <ion-label floating>*Folio:</ion-label>\n          <ion-input [(ngModel)]=\"in.Folio\"></ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-select placeholder=\"Producto\" [(ngModel)]=\"in.Producto\" (ngModelChange)='ProductoSeleccionado()'>\n            <ion-select-option *ngFor=\"let producto of ArrProductos; let i = index\" [attr.data-index]=\"i\"\n              value=\"{{ i }}\">\n              {{ producto[gv.credito] }} ({{ producto[gv.total_pagos] }} {{ producto[gv.periodo] }})</ion-select-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-select placeholder=\"Uso de credito\" [(ngModel)]=\"in.Razon\">\n            <ion-select-option value=\"{{ gv.inversion }}\">Inversion</ion-select-option>\n            <ion-select-option value=\"{{ gv.consumo }}\">Consumo</ion-select-option>\n            <ion-select-option value=\"{{ gv.deuda }}\">Deuda</ion-select-option>\n            <ion-select-option value=\"{{ gv.ahorro }}\">Ahorro</ion-select-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-6>\n        <ion-item class=\"input\">\n          <ion-label floating>*Efectivo: $</ion-label>\n          <ion-input type=\"number\" [(ngModel)]=\"in.Efectivo\" (ngModelChange)='CambioCargoPorServicio()'></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col col-6>\n        <ion-item class=\"input\">\n          <ion-label floating>*Plazo:</ion-label>\n          <ion-input type=\"number\" [(ngModel)]=\"in.Num_Pagos\" (ngModelChange)='CambioPagoNum(in.Pago, in.Num_Pagos)'>\n          </ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col col-6>\n        <ion-item class=\"input\">\n          <ion-label floating>*Credito: $</ion-label>\n          <ion-input type=\"number\" [(ngModel)]=\"in.Credito\"></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col col-6>\n        <ion-item class=\"input\">\n          <ion-label floating>*Cuota: $</ion-label>\n          <ion-input type=\"number\" [(ngModel)]=\"in.Pago\" (ngModelChange)='CambioPagoNum(in.Pago, in.Num_Pagos)'>\n          </ion-input>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-6>\n        <ion-item class=\"input\">\n          <ion-label floating>Total a pagar: $</ion-label>\n          <ion-textarea disabled readonly [(ngModel)]=\"in.Total_Credito\">\n          </ion-textarea>\n        </ion-item>\n      </ion-col>\n      <ion-col col-6>\n        <ion-item class=\"input\">\n          <ion-label floating>Cargo: $</ion-label>\n          <ion-textarea disabled readonly [(ngModel)]=\"in.Cargo_Servicio\">\n          </ion-textarea>\n        </ion-item>\n      </ion-col>\n      <ion-col col-6>\n        <ion-item>\n          <ion-datetime displayFormat=\"DD/MM/YYYY\" placeholder=\"*Fecha primer pago\" max=\"2050\" [(ngModel)]=\"in.Fecha\">\n          </ion-datetime>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-label>Hora de pago</ion-label>\n          <ion-datetime displayFormat=\"H:mm A\" minuteValues=\"0,30\" [(ngModel)]=\"in.Horario\"></ion-datetime>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-select placeholder=\"*Periodo\" [(ngModel)]=\"in.Periodo\">\n            <ion-select-option value=\"{{ gv.diario }}\">Diario</ion-select-option>\n            <ion-select-option value=\"{{ gv.semanal }}\">Semanal</ion-select-option>\n            <ion-select-option value=\"{{ gv.quincenal }}\">Quincenal</ion-select-option>\n            <ion-select-option value=\"{{ gv.mensual }}\">Mensual</ion-select-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-select placeholder=\"*Deposito\" [(ngModel)]=\"in.Deposito\">\n            <ion-select-option value=\"{{ gv.representante }}\">Representante</ion-select-option>\n            <ion-select-option value=\"{{ gv.oficina }}\">Oficina</ion-select-option>\n            <ion-select-option value=\"{{ gv.banco }}\">Banco</ion-select-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <h3>Aval</h3>\n    </ion-row>\n\n    <ion-row *ngFor=\"let aval of gv.AvalArr; let i = index\" [attr.data-index]=\"i\">\n      <ion-col>\n        {{ this.gf.QuitarBarraAInfo(aval[gv.nombre]) }}\n      </ion-col>\n      <ion-col>\n        {{ this.gf.QuitarBarraAInfo(aval[gv.direccion]) }}\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-button (click)=\"presentAvalModal()\">Agregar aval</ion-button>\n    </ion-row>\n\n    <ion-row>\n      <h3>Garantias</h3>\n    </ion-row>\n\n    <ion-row *ngFor=\"let garantia of ArrGarantias; let i = index\" [attr.data-index]=\"i\">\n      <ion-col col-4>\n        <ion-item class=\" input\">\n          <ion-input placeholder=\"Articulo\" [(ngModel)]=\"ArrGarantias[i][gv.articulo]\">\n          </ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col col-4>\n        <ion-item class=\"input\">\n          <ion-input placeholder=\"Marca\" [(ngModel)]=\"ArrGarantias[i][gv.marca]\">\n          </ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col col-4>\n        <ion-item class=\"input\">\n          <ion-input placeholder=\"Identificador\" [(ngModel)]=\"ArrGarantias[i][gv.identificador]\">\n          </ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col col-4>\n        <ion-icon color=\"medium\" name=\"close-circle-outline\" (click)=\"EliminarGarantia(i)\">\n        </ion-icon>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-button (click)=\"AgregarGarantia()\">Agregar garantia</ion-button>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <ion-button [disabled]=\"Btn_Desactivado\" (click)=\"AgregarCredito()\">Agregar credito</ion-button>\n      </ion-col>\n      <ion-col *ngIf=\"Alerta\">\n        <ion-text>{{ AlertMsj }}</ion-text>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/credit/credit.component.scss":
/*!****************************************************!*\
  !*** ./src/app/pages/credit/credit.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NyZWRpdC9jcmVkaXQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/credit/credit.component.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/credit/credit.component.ts ***!
  \**************************************************/
/*! exports provided: CreditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditComponent", function() { return CreditComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/services/common.service */ "./src/app/common/services/common.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var src_app_common_modals_my_modal_my_modal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/modals/my-modal/my-modal.component */ "./src/app/common/modals/my-modal/my-modal.component.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");







let CreditComponent = class CreditComponent {
    constructor(modalController, db, gf) {
        this.modalController = modalController;
        this.db = db;
        this.gf = gf;
        this.gv = src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"];
        this.cliente = [];
        this.Alerta = false;
        this.AlertMsj = '';
        this.Btn_Desactivado = false;
        this.ArrGarantias = [];
        this.ArrProductos = [];
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
            Aval: {
                Nombre: '',
                ApellidoP: '',
                ApellidoM: '',
                Calle: '',
                Numero: '',
                Colonia: '',
                Telefono: '',
                CURP: '',
            },
            Paso: 1
        };
        this.in = {
            IDCliente: '',
            Efectivo: '',
            Num_Pagos: '',
            Credito: '',
            Pago: '',
            Total_Credito: 0,
            Fecha: '',
            Horario: '',
            Periodo: '',
            Deposito: '',
            Folio: '',
            Producto: '',
            Cargo_Servicio: 0,
            Cargo_Pago: 0,
            Razon: ''
        };
    }
    ngOnInit() {
        this.gf.CheckLogin();
        if (src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].ClienteToCreditoInfo.length !== 0) {
            this.cliente = src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].ClienteToCreditoInfo[0];
            this.in.IDCliente = src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].ClienteToCreditoInfo[0][src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].identificador];
            src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].ClienteToCreditoInfo = [];
        }
        this.db.collection(src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].FB_Organizaciones).doc(src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].usuario[src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].organizacion]).collection(src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].FB_Productos)
            .get().subscribe(serverItems => {
            serverItems.forEach((product) => {
                this.ArrProductos.push(product.data());
                console.log(product.data());
            });
        });
    }
    GetClient() {
        if (this.gf.SearchClientsByNameNum(this.in.IDCliente)[0] === undefined) {
            this.cliente = [];
        }
        else {
            this.cliente = this.gf.SearchClientsByNameNum(this.in.IDCliente)[0];
        }
    }
    presentAvalModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_common_modals_my_modal_my_modal_component__WEBPACK_IMPORTED_MODULE_5__["MyModal"],
                componentProps: {
                    type: "Aval"
                }
            });
            modal.present();
        });
    }
    AgregarGarantia() {
        this.ArrGarantias.push({
            [src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].identificador]: '',
            [src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].marca]: '',
            [src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].articulo]: ''
        });
    }
    EliminarGarantia(index) {
        this.ArrGarantias.splice(index, 1);
    }
    AgregarCredito() {
        this.Alerta = false;
        this.Btn_Desactivado = true;
        for (let x = 0; x < this.ArrGarantias.length; x++) {
            if (this.ArrGarantias[x][src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].articulo] === '' || this.ArrGarantias[x][src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].marca] === '' || this.ArrGarantias[x][src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].identificador] === '') {
                this.Alerta = true;
                this.AlertMsj = 'Falta un campo en garantaias';
                this.Btn_Desactivado = false;
                return;
            }
        }
        if (this.in.IDCliente === '') {
            this.Alerta = true;
            this.AlertMsj = 'Ingresa numero de cliente';
            this.Btn_Desactivado = false;
            return;
        }
        if (this.in.Folio === '') {
            this.Alerta = true;
            this.AlertMsj = 'Ingresa numero de folio';
            this.Btn_Desactivado = false;
            return;
        }
        if (!src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].DT_Pagos) {
            this.Alerta = true;
            this.AlertMsj = 'Espera a que carguen los pagos';
            this.Btn_Desactivado = false;
            return;
        }
        if (this.gf.BuscarCreditoPorFolio(this.in.Folio).length !== 0) {
            this.Alerta = true;
            this.AlertMsj = 'Ya hay un credito con ese folio';
            this.Btn_Desactivado = false;
            return;
        }
        if (this.cliente[src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].nombre] === undefined) {
            this.Alerta = true;
            this.AlertMsj = 'No hay usuario con ese numero';
            this.Btn_Desactivado = false;
            return;
        }
        if (this.in.Efectivo === '') {
            this.Alerta = true;
            this.AlertMsj = 'Ingresa cantidad en efectivo';
            this.Btn_Desactivado = false;
            return;
        }
        if (this.in.Num_Pagos === '') {
            this.Alerta = true;
            this.AlertMsj = 'Íngresa numero de pagos';
            this.Btn_Desactivado = false;
            return;
        }
        if (this.in.Credito === '') {
            this.Alerta = true;
            this.AlertMsj = 'Ingresa el credito';
            this.Btn_Desactivado = false;
            return;
        }
        if (this.in.Pago === '') {
            this.Alerta = true;
            this.AlertMsj = 'Ingresa pago';
            this.Btn_Desactivado = false;
            return;
        }
        if (this.in.Fecha === '') {
            this.Alerta = true;
            this.AlertMsj = 'Ingresa fecha';
            this.Btn_Desactivado = false;
            return;
        }
        if (this.in.Periodo === '') {
            this.Alerta = true;
            this.AlertMsj = 'Ingresa un periodo de pago';
            this.Btn_Desactivado = false;
            return;
        }
        if (this.in.Deposito === '') {
            this.Alerta = true;
            this.AlertMsj = 'Ingresa un tipo de deposito';
            this.Btn_Desactivado = false;
            return;
        }
        if (this.in.Razon === '') {
            this.Alerta = true;
            this.AlertMsj = 'Ingresa el uso del credito';
            this.Btn_Desactivado = false;
            return;
        }
        if (isNaN(parseInt(this.in.Efectivo))) {
            this.Alerta = true;
            this.AlertMsj = 'El efectivo tiene que ser un numero';
            this.Btn_Desactivado = false;
            return;
        }
        if (isNaN(parseInt(this.in.Num_Pagos))) {
            this.Alerta = true;
            this.AlertMsj = 'El numero de pagos tiene que ser un numero';
            this.Btn_Desactivado = false;
            return;
        }
        if (isNaN(parseInt(this.in.Credito))) {
            this.Alerta = true;
            this.AlertMsj = 'El credito tiene que ser un numero';
            this.Btn_Desactivado = false;
            return;
        }
        if (isNaN(parseInt(this.in.Pago))) {
            this.Alerta = true;
            this.AlertMsj = 'El pago tiene que ser un numero';
            this.Btn_Desactivado = false;
            return;
        }
        if (this.in.Horario === '') {
            this.in.Horario = '0000';
        }
        else {
            let hora = new Date(this.in.Horario);
            this.in.Horario = this.gf.AgregarCero(hora.getHours()) + this.gf.AgregarCero(hora.getMinutes());
        }
        this.gf.RegistratCredito(parseInt(this.in.Num_Pagos), this.cliente[src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].nombre], this.cliente[src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].key], parseInt(this.in.Credito), this.in.Fecha, this.in.Periodo, parseInt(this.in.Pago), this.in.IDCliente, parseInt(this.in.Efectivo), this.in.Total_Credito, this.in.Deposito, this.in.Horario, this.ArrGarantias, this.in.Folio, src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].AvalArr, this.in.Razon, this.in.Cargo_Pago, this.cliente[src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].ID_Ubicacion])
            .then(res => {
            if (res) {
                this.gf.Toast('Credito registrado', 2000);
                this.in.Num_Pagos = '';
                this.in.Fecha = '';
                this.cliente = [];
                this.in.Credito = '';
                this.in.Fecha = '';
                this.in.Periodo = '';
                this.in.Pago = '';
                this.in.IDCliente = '';
                this.in.Efectivo = '';
                this.in.Deposito = '';
                this.in.Horario = '';
                this.in.Folio = '';
                this.in.Cargo_Pago = 0;
                this.in.Total_Credito = 0;
                this.in.Cargo_Servicio = 0;
                src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].AvalArr = [];
                this.ArrProductos = [];
            }
            else {
                this.gf.Toast('Error al registrar el credito', 2000);
            }
            this.Btn_Desactivado = false;
        });
    }
    CambioPagoNum(Pago, Num_Pagos) {
        if (Pago === '') {
            Pago = '0';
        }
        if (Num_Pagos === '') {
            Num_Pagos = '0';
        }
        this.in.Total_Credito = parseInt(Pago) * parseInt(Num_Pagos);
        this.CambioCargoPorServicio();
    }
    CambioCargoPorServicio() {
        if (this.in.Efectivo === '') {
            this.in.Efectivo = '0';
        }
        this.in.Cargo_Servicio = this.in.Total_Credito - parseInt(this.in.Efectivo);
        this.in.Cargo_Pago = this.in.Cargo_Servicio / parseInt(this.in.Num_Pagos);
    }
    ProductoSeleccionado() {
        console.log("producto");
        console.log(this.ArrProductos[this.in.Producto]);
        this.in.Num_Pagos = this.ArrProductos[this.in.Producto][src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].total_pagos];
        this.in.Credito = this.ArrProductos[this.in.Producto][src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].credito];
        this.in.Pago = this.ArrProductos[this.in.Producto][src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].pago];
        this.in.Total_Credito = this.ArrProductos[this.in.Producto][src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].total_credito];
        this.in.Periodo = this.ArrProductos[this.in.Producto][src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].periodo];
        this.in.Efectivo = this.ArrProductos[this.in.Producto][src_app_common_constants__WEBPACK_IMPORTED_MODULE_4__["gv"].efectivo];
        console.log(this.in);
    }
};
CreditComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"] },
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] },
    { type: src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] }
];
CreditComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-credit",
        template: __webpack_require__(/*! raw-loader!./credit.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/credit/credit.component.html"),
        styles: [__webpack_require__(/*! ./credit.component.scss */ "./src/app/pages/credit/credit.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"],
        _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"],
        src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"]])
], CreditComponent);

/*
    <input type='file' (change)="handleFileSelect($event)">

    parseExcel = function (file) {
      var reader = new FileReader();
  
      if (file !== undefined) {
        reader.onload = function (e) {
          var data = e.target.result
  
          var workbook = XLSX.read(data, {
            type: 'binary'
          });
  
          workbook.SheetNames.forEach(function (sheetName) {
            // Here is your object
            var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            console.log(XL_row_object)
  
            for (let x = 0; x < XL_row_object.length; x++) {
  
              let date = new Date('01/01/1900');
              date.setDate(date.getDate() + XL_row_object[x]['Fecha nacimiento'] - 2);
              console.log(date);
            }
          })
        };
        reader.onerror = function (ex) {
          console.log(ex);
        };
  
        reader.readAsBinaryString(file);
      }
    };
  
    handleFileSelect(evt) {
      var files = evt.target.files; // FileList object
      this.parseExcel(files[0]);
    }
    */


/***/ }),

/***/ "./src/app/pages/credit/credit.module.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/credit/credit.module.ts ***!
  \***********************************************/
/*! exports provided: CreditModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditModule", function() { return CreditModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _credit_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./credit.routing.module */ "./src/app/pages/credit/credit.routing.module.ts");
/* harmony import */ var _credit_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./credit.component */ "./src/app/pages/credit/credit.component.ts");
/* harmony import */ var src_app_common_modules_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/modules/shared.module */ "./src/app/common/modules/shared.module.ts");
/* harmony import */ var src_app_common_modals_my_modal_my_modal_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/modals/my-modal/my-modal.module */ "./src/app/common/modals/my-modal/my-modal.module.ts");






let CreditModule = class CreditModule {
};
CreditModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [src_app_common_modules_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], _credit_routing_module__WEBPACK_IMPORTED_MODULE_2__["CreditRoutingModule"], src_app_common_modals_my_modal_my_modal_module__WEBPACK_IMPORTED_MODULE_5__["MyModalModule"]],
        declarations: [_credit_component__WEBPACK_IMPORTED_MODULE_3__["CreditComponent"]]
    })
], CreditModule);



/***/ }),

/***/ "./src/app/pages/credit/credit.routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/credit/credit.routing.module.ts ***!
  \*******************************************************/
/*! exports provided: CreditRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreditRoutingModule", function() { return CreditRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _credit_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./credit.component */ "./src/app/pages/credit/credit.component.ts");




const routes = [
    {
        path: "",
        component: _credit_component__WEBPACK_IMPORTED_MODULE_3__["CreditComponent"]
    }
];
let CreditRoutingModule = class CreditRoutingModule {
};
CreditRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], CreditRoutingModule);



/***/ })

}]);
//# sourceMappingURL=pages-credit-credit-module-es2015.js.map