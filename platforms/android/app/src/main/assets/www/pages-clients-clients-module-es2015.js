(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-clients-clients-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/clients/clients.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/clients/clients.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>\n      Clients\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-col>\n    <ion-button (click)=\"presentClienteModal()\">Nuevo cliente</ion-button>\n    <ion-input placeholder=\"ID Cliente\" [(ngModel)]=\"IDCliente\" (ngModelChange)='BuscarCliente()'></ion-input>\n  </ion-col>\n\n  <ion-row *ngFor=\"let client of Cliente\">\n    <div class=\"item\">\n\n      <ion-row style=\"justify-content: center; background-color: #efefef;\">\n        <ion-col>\n          Cliente: {{ client[gv.identificador] }}\n        </ion-col>\n      </ion-row>\n\n      <ion-row style=\"justify-content: center; background-color: #efefef;\">\n        <ion-col>\n          {{ this.gf.QuitarBarraAInfo(client[gv.nombre]) }}\n        </ion-col>\n      </ion-row>\n\n      <ion-row style=\"justify-content: center; background-color: #efefef;\">\n        <ion-col>\n          {{ this.gf.QuitarBarraAInfo(client[gv.direccion]) }}\n        </ion-col>\n      </ion-row>\n\n      <ion-row style=\"justify-content: center; background-color: #efefef;\">\n        <ion-col>\n          {{ client[gv.telefono] }}\n        </ion-col>\n      </ion-row>\n\n      <h4>Creditos</h4>\n\n      <ion-row *ngFor=\"let info of ArrInfo | keyvalue\">\n        <ion-radio mode=\"md\" *ngIf=\"Selected === info.key\" checked></ion-radio>\n        <ion-radio mode=\"md\" *ngIf=\"Selected !== info.key\" (ionSelect)=\"Selected = info.key\"\n          (ionSelect)=\"CambioPagosSeleccionados(info.key)\"></ion-radio>\n\n        <ion-row>\n          <ion-col>\n            Total pagado: {{ info.value[gv.cantidad_pagado] }}\n          </ion-col>\n          <ion-col>\n            Pagos faltantes: {{ info.value[gv.pagos_faltantes] }}\n          </ion-col>\n          <ion-col>\n            Proximos: {{ info.value[gv.status_proximo] }}\n          </ion-col>\n          <ion-col>\n            Pago faltante: {{ info.value[gv.cantidad_por_pagar] }}\n          </ion-col>\n          <ion-col>\n            Pago vencido: {{ info.value[gv.status_vencido] }}\n          </ion-col>\n        </ion-row>\n\n        <ion-row *ngIf=\"ArrCreditos[this.Selected + gv.info] !== undefined\">\n          <ion-col>\n            <h4>Siguiente pago</h4>\n          </ion-col>\n          <ion-col>\n            Numero de pago: {{ ArrCreditos[this.Selected + gv.info][1][0][gv.num_pago] }}\n          </ion-col>\n          <ion-col>\n            Cantidad: {{ ArrCreditos[this.Selected + gv.info][1][0][gv.pago] }}\n          </ion-col>\n          <ion-col>\n            Fecha: {{ this.gf.GetYYMMDDDateFromRef(ArrCreditos[this.Selected + gv.info][1][0][gv.fecha]) }}\n          </ion-col>\n        </ion-row>\n\n        <ion-row *ngIf=\"Selected === info.key\">\n          <ion-col size=\"1\" style=\"margin-right: 30px;\">\n            <ion-item>\n              <ion-textarea [(ngModel)]=\"Pago\" placeholder=\"Pago\" (ngModelChange)='CambioPagoMulta(Pago, Multa)'>\n              </ion-textarea>\n            </ion-item>\n          </ion-col>\n\n          <ion-col size=\"1\" style=\"margin-left: 30px; margin-right: 30px;\">\n            <ion-item>\n              <ion-textarea [(ngModel)]=\"Multa\" placeholder=\"Multa\" (ngModelChange)='CambioPagoMulta(Pago, Multa)'>\n              </ion-textarea>\n            </ion-item>\n          </ion-col>\n\n          <ion-col size=\"1\" style=\"margin-left: 30px;\">\n            <ion-item>\n              <ion-textarea disabled readonly [(ngModel)]=\"Pago_Total\" placeholder=\"Total\">\n              </ion-textarea>\n            </ion-item>\n          </ion-col>\n\n          <ion-col size=\"1\" style=\"margin-left: 30px;\">\n            <ion-button [disabled]=\"Btn_Desactivado\" (click)=\"Pay()\">Pagar</ion-button>\n          </ion-col>\n\n          <ion-col size=\"1\" style=\"margin-left: 30px;\">\n            <ion-button (click)=\"OpcionesDeCreditoModal()\">Opciones de credito</ion-button>\n          </ion-col>\n          <ion-col *ngIf='Incomplete'>\n            <ion-text>{{ AlertText }}</ion-text>\n          </ion-col>\n\n        </ion-row>\n\n        <ion-col *ngIf=\"Selected === info.key\">\n          <h5 (click)=\"VerPagos = !VerPagos\">Ver pagos</h5>\n        </ion-col>\n      </ion-row>\n\n      <div *ngIf=\"VerPagos\">\n        <ion-row *ngFor=\"let pago of PagosSeleccionados\">\n          <ion-col *ngIf=\"pago[gv.multa] !== undefined\">\n            ${{ pago[gv.pago] - pago[gv.multa] }}.00\n          </ion-col>\n          <ion-col *ngIf=\"pago[gv.multa] === undefined\">\n            ${{ pago[gv.pago] }}.00\n          </ion-col>\n          <ion-col>\n            {{ this.gf.GetYYMMDDDateFromRef(pago[gv.fecha]) }}\n          </ion-col>\n          <ion-col *ngIf=\"pago[gv.dia_cobro] !== undefined\">\n            {{ this.gf.GetYYMMDDDateFromRef(pago[gv.dia_cobro]) }}\n          </ion-col>\n          <ion-col *ngIf=\"pago[gv.dia_cobro] === undefined\">\n            Pendiente\n          </ion-col>\n          <ion-col *ngIf=\"pago[gv.multa] !== undefined\">\n            ${{ pago[gv.multa] }}.00\n          </ion-col>\n          <ion-col *ngIf=\"pago[gv.multa] === undefined\">\n            $ 00.00\n          </ion-col>\n          <ion-col>\n            ${{ pago[gv.pago] }}.00\n          </ion-col>\n          <ion-col>\n            {{ pago[gv.num_pago] }}\n          </ion-col>\n          <ion-col>\n            {{ pago[gv.cobrado_por] }}\n          </ion-col>\n          <ion-col *ngIf=\"pago[gv.status] === gv.status_pagado\">\n            <ion-icon color=\"medium\" name=\"close-circle-outline\" (click)=\"RegresarPago(pago)\">\n            </ion-icon>\n          </ion-col>\n        </ion-row>\n      </div>\n\n      <ion-row *ngIf=\"Pagos_Inicial.length === 0\">\n        <ion-button (click)=\"NuevoCredito()\">Ingresar credito</ion-button>\n      </ion-row>\n\n    </div>\n\n    <ion-col size=\"2\" style=\"margin-left: 800px; position: absolute;\">\n      <ion-icon color=\"medium\" name=\"close-circle-outline\" (click)=\"OpcionesDeCredito()\">\n      </ion-icon>\n    </ion-col>\n\n  </ion-row>\n\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/clients/clients.component.scss":
/*!******************************************************!*\
  !*** ./src/app/pages/clients/clients.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".item {\n  width: 143%;\n  box-shadow: 0px 10px 13px 0px rgba(218, 204, 204, 0.75);\n  margin: 15px 5px;\n  border-radius: 15px;\n  padding-bottom: 8px;\n  background: #efefef;\n  /* width: 600px;\n\n\n    box-shadow: 0px 10px 13px 0px rgba(218, 204, 204, 0.75); \n   margin: 15px 5px;*/\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvY2xpZW50cy9DOlxcVXNlcnNcXGpvcmdlXFxEZXNrdG9wXFxYRmluYW5jZS9zcmNcXGFwcFxccGFnZXNcXGNsaWVudHNcXGNsaWVudHMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2NsaWVudHMvY2xpZW50cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFdBQUE7RUFHRix1REFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Q7Ozs7cUJBQUE7QUNLRCIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NsaWVudHMvY2xpZW50cy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pdGVtIHtcclxuICAgIHdpZHRoOiAxNDMlO1xyXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDE3cHggMTNweCAtMTBweCByZ2JhKDAsIDAsIDAsIDAuNzUpO1xyXG4gIC1tb3otYm94LXNoYWRvdzogMHB4IDE3cHggMTNweCAtMTBweCByZ2JhKDAsIDAsIDAsIDAuNzUpO1xyXG4gIGJveC1zaGFkb3c6IDBweCAxMHB4IDEzcHggMHB4IHJnYmEoMjE4LCAyMDQsIDIwNCwgMC43NSk7XHJcbiAgbWFyZ2luOiAxNXB4IDVweDtcclxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiA4cHg7XHJcbiAgYmFja2dyb3VuZDogI2VmZWZlZjtcclxuIC8qIHdpZHRoOiA2MDBweDtcclxuICBcclxuICBcclxuICAgYm94LXNoYWRvdzogMHB4IDEwcHggMTNweCAwcHggcmdiYSgyMTgsIDIwNCwgMjA0LCAwLjc1KTsgXHJcbiAgbWFyZ2luOiAxNXB4IDVweDsqL1xyXG59IiwiLml0ZW0ge1xuICB3aWR0aDogMTQzJTtcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMTdweCAxM3B4IC0xMHB4IHJnYmEoMCwgMCwgMCwgMC43NSk7XG4gIC1tb3otYm94LXNoYWRvdzogMHB4IDE3cHggMTNweCAtMTBweCByZ2JhKDAsIDAsIDAsIDAuNzUpO1xuICBib3gtc2hhZG93OiAwcHggMTBweCAxM3B4IDBweCByZ2JhKDIxOCwgMjA0LCAyMDQsIDAuNzUpO1xuICBtYXJnaW46IDE1cHggNXB4O1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBwYWRkaW5nLWJvdHRvbTogOHB4O1xuICBiYWNrZ3JvdW5kOiAjZWZlZmVmO1xuICAvKiB3aWR0aDogNjAwcHg7XG5cblxuICAgIGJveC1zaGFkb3c6IDBweCAxMHB4IDEzcHggMHB4IHJnYmEoMjE4LCAyMDQsIDIwNCwgMC43NSk7IFxuICAgbWFyZ2luOiAxNXB4IDVweDsqL1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/clients/clients.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/clients/clients.component.ts ***!
  \****************************************************/
/*! exports provided: ClientsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientsComponent", function() { return ClientsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/firestore */ "./node_modules/@angular/fire/firestore/es2015/index.js");
/* harmony import */ var src_app_common_modals_my_modal_my_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common/modals/my-modal/my-modal.component */ "./src/app/common/modals/my-modal/my-modal.component.ts");
/* harmony import */ var src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/services/common.service */ "./src/app/common/services/common.service.ts");
/* harmony import */ var src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/constants */ "./src/app/common/constants.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");







let ClientsComponent = class ClientsComponent {
    constructor(db, modalController, _iterableDiffers, actionSheetController, 
    //private camera: Camera,
    gf) {
        this.db = db;
        this.modalController = modalController;
        this._iterableDiffers = _iterableDiffers;
        this.actionSheetController = actionSheetController;
        this.gf = gf;
        this.IDCliente = '';
        this.Cliente = [];
        this.pagos_cliente = [];
        this.Pago = '';
        this.Multa = '';
        this.Btn_Desactivado = false;
        this.Pagos_Inicial = [];
        this.ArrCreditos = [];
        this.ArrInfo = [];
        this.PagosSeleccionados = [];
        this.VerPagos = false;
        this.Pagos_Proximos = [];
        this.gv = src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"];
        this.iterableDiffer = this._iterableDiffers.find([]).create(null);
    }
    ngOnInit() {
        this.gf.CheckLogin();
        let fecha = new Date(1994, 10 - 1, 27);
    }
    ngDoCheck() {
        let changes = this.iterableDiffer.diff(src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].pagos_Arr);
        if (changes) {
            console.log("Cambio");
            this.BuscarCliente();
        }
    }
    presentClienteModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_common_modals_my_modal_my_modal_component__WEBPACK_IMPORTED_MODULE_3__["MyModal"],
                componentProps: {
                    type: "Cliente",
                    Tipo: src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].Nuevo
                }
            });
            modal.present();
        });
    }
    ModificarClienteModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_common_modals_my_modal_my_modal_component__WEBPACK_IMPORTED_MODULE_3__["MyModal"],
                componentProps: {
                    type: "Cliente",
                    Tipo: src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].Actualizar,
                    Info_Cliente: this.Cliente[0],
                }
            });
            modal.present();
        });
    }
    OpcionesDeCreditoModal() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: src_app_common_modals_my_modal_my_modal_component__WEBPACK_IMPORTED_MODULE_3__["MyModal"],
                componentProps: {
                    type: "Pago",
                    Key_Primer_Pago: this.ArrCreditos[this.Selected + src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].info][0][0][src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].key_primer_pago]
                }
            });
            modal.present();
        });
    }
    BuscarCliente() {
        this.Cliente = [];
        this.pagos_cliente = [];
        this.Pagos_Inicial = [];
        this.ArrInfo = [];
        this.ArrCreditos = [];
        this.Cliente = src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].clientes.filter(cliente => {
            return this.gf.CleanAccentCaps(cliente[src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].identificador]) === this.gf.CleanAccentCaps(this.IDCliente);
        });
        this.pagos_cliente = src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].pagos_Arr.filter(pago => {
            return this.gf.CleanAccentCaps(pago[src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].identificador]) === this.gf.CleanAccentCaps(this.IDCliente);
        });
        if (this.pagos_cliente[0] !== undefined) {
            this.Pagos_Inicial = this.pagos_cliente.filter(pago => {
                return pago[src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].num_pago] === 1;
            });
            for (let x = 0; x < this.Pagos_Inicial.length; x++) {
                let PagosDeCredito = this.pagos_cliente.filter(pago => {
                    return pago[src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].key_primer_pago] === this.Pagos_Inicial[x][src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].key];
                });
                PagosDeCredito.sort((a, b) => { return a[src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].num_pago] - b[src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].num_pago]; });
                this.ArrInfo[this.Pagos_Inicial[x][src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].key]] = this.gf.GetInformacionCreditoInd(PagosDeCredito);
                //PONER PAGOS TOTALES Y PAGOS PROXIMOS EN ARR
                let ArrPagos = [];
                ArrPagos.push(PagosDeCredito);
                ArrPagos.push(PagosDeCredito.filter(pago => {
                    return pago[src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].status] === src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].status_proximo ||
                        pago[src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].status] === src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].status_vencido;
                }));
                this.ArrCreditos[this.Pagos_Inicial[x][src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].key] + src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].info] = ArrPagos;
                if (x === 0 && this.Selected === undefined) {
                    this.Selected = this.Pagos_Inicial[x][src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].key];
                    this.PagosSeleccionados = this.ArrCreditos[this.Pagos_Inicial[x][src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].key] + src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].info][0];
                }
                this.ArrCreditos[this.Pagos_Inicial[x][src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].key]] = PagosDeCredito;
            }
        }
        else {
            this.Selected = undefined;
        }
    }
    CambioPagosSeleccionados(key) {
        this.PagosSeleccionados = this.ArrCreditos[key + src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].info][0];
    }
    CambioPagoMulta(Pago, Multa) {
        if (Pago === '') {
            Pago = '0';
        }
        if (Multa === '') {
            Multa = '0';
        }
        this.Pago_Total = parseInt(Pago) + parseInt(Multa);
    }
    Pay() {
        this.Incomplete = false;
        this.Btn_Desactivado = true;
        if (this.Multa === '') {
            this.Multa = '0';
        }
        if (this.Pago === '') {
            this.Pago = '0';
        }
        this.Pagos_Proximos = this.ArrCreditos[this.Selected].filter(pago => {
            return pago[src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].status] === src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].status_proximo ||
                pago[src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].status] === src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].status_vencido;
        });
        this.Pagos_Proximos.sort((a, b) => { return a[src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].num_pago] - b[src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].num_pago]; });
        if (parseInt(this.Pago) > this.ArrInfo[this.Selected][src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].cantidad_por_pagar]) {
            this.AlertText = "El pago no puede ser mayor al total";
            this.Incomplete = true;
            this.Btn_Desactivado = false;
            return;
        }
        this.gf.PagoCredito(this.ArrCreditos[this.Selected + src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].info][1][0], this.ArrCreditos[this.Selected + src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].info][0][0], this.ArrCreditos[this.Selected + src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].info][0], parseInt(this.Multa), parseInt(this.Pago), src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].usuario[src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].nombre])
            .then(res => {
            if (res) {
                this.Multa = '';
                this.Pago = '';
                this.Pago_Total = '';
            }
            else {
            }
            this.Btn_Desactivado = false;
        });
    }
    OpcionesDeCredito() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const actionSheet = yield this.actionSheetController.create({
                header: "Opciones de credito",
                buttons: [
                    {
                        text: 'Foto cliente',
                        handler: () => {
                            //this.takePicture(this.camera.PictureSourceType.CAMERA);
                        }
                    },
                    {
                        text: 'Foto fachada',
                        handler: () => {
                            //this.takePicture(this.camera.PictureSourceType.CAMERA);
                        }
                    },
                    {
                        text: 'Foto aval',
                        handler: () => {
                            //this.takePicture(this.camera.PictureSourceType.CAMERA);
                        }
                    },
                    {
                        text: 'Foto IFE',
                        handler: () => {
                            //this.takePicture(this.camera.PictureSourceType.CAMERA);
                        }
                    },
                    {
                        text: 'Editar cliente',
                        handler: () => {
                            this.ModificarClienteModal();
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel'
                    }
                ]
            });
            yield actionSheet.present();
        });
    }
    OpcionesDeCliente() {
    }
    NuevoCredito() {
        src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].ClienteToCreditoInfo = this.Cliente;
        this.gf.IrACreditos();
    }
    RegresarPago(Pago) {
        this.gf.RegresarPagoAlerta(Pago, this.ArrCreditos[this.Selected + src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].info][0][0], this.ArrCreditos[this.Selected + src_app_common_constants__WEBPACK_IMPORTED_MODULE_5__["gv"].info][0]);
    }
};
ClientsComponent.ctorParameters = () => [
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ActionSheetController"] },
    { type: src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] }
];
ClientsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "app-clients",
        template: __webpack_require__(/*! raw-loader!./clients.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/clients/clients.component.html"),
        styles: [__webpack_require__(/*! ./clients.component.scss */ "./src/app/pages/clients/clients.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ModalController"],
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["ActionSheetController"],
        src_app_common_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"]])
], ClientsComponent);



/***/ }),

/***/ "./src/app/pages/clients/clients.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/clients/clients.module.ts ***!
  \*************************************************/
/*! exports provided: ClientsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientsModule", function() { return ClientsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _clients_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clients.routing.module */ "./src/app/pages/clients/clients.routing.module.ts");
/* harmony import */ var _clients_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clients.component */ "./src/app/pages/clients/clients.component.ts");
/* harmony import */ var src_app_common_modules_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/common/modules/shared.module */ "./src/app/common/modules/shared.module.ts");
/* harmony import */ var src_app_common_modals_my_modal_my_modal_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/common/modals/my-modal/my-modal.module */ "./src/app/common/modals/my-modal/my-modal.module.ts");






let ClientsModule = class ClientsModule {
};
ClientsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [src_app_common_modules_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], src_app_common_modals_my_modal_my_modal_module__WEBPACK_IMPORTED_MODULE_5__["MyModalModule"], _clients_routing_module__WEBPACK_IMPORTED_MODULE_2__["ClientsRoutingModule"]],
        declarations: [_clients_component__WEBPACK_IMPORTED_MODULE_3__["ClientsComponent"]]
    })
], ClientsModule);



/***/ }),

/***/ "./src/app/pages/clients/clients.routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/clients/clients.routing.module.ts ***!
  \*********************************************************/
/*! exports provided: ClientsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientsRoutingModule", function() { return ClientsRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _clients_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clients.component */ "./src/app/pages/clients/clients.component.ts");




const routes = [
    {
        path: "",
        component: _clients_component__WEBPACK_IMPORTED_MODULE_3__["ClientsComponent"]
    }
];
let ClientsRoutingModule = class ClientsRoutingModule {
};
ClientsRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], ClientsRoutingModule);



/***/ })

}]);
//# sourceMappingURL=pages-clients-clients-module-es2015.js.map