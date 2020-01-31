import { Component } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { CommonService } from 'src/app/common/services/common.service';
import { gv } from 'src/app/common/constants';
import * as XLSX from 'xlsx';
import { MyModal } from "src/app/common/modals/my-modal/my-modal.component";
import { ModalController } from '@ionic/angular';

@Component({
  selector: "app-credit",
  templateUrl: "credit.component.html",
  styleUrls: ["credit.component.scss"]
})

export class CreditComponent {

  public gv = gv;

  constructor(private modalController: ModalController,
    public db: AngularFirestore,
    public gf: CommonService) {
  }

  cliente = [];
  Alerta = false;
  AlertMsj = '';
  Btn_Desactivado = false;
  ArrGarantias = [];

  ArrProductos = [];

  Cliente = {
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

  in = {
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
  }

  ngOnInit() {
    this.ArrProductos = gv.ArrProductos;
    
    console.log(this.ArrProductos)
    this.gf.CheckLogin();

    if (gv.ClienteToCreditoInfo.length !== 0) {

      this.cliente = gv.ClienteToCreditoInfo[0];
      this.in.IDCliente = gv.ClienteToCreditoInfo[0][gv.identificador];
      gv.ClienteToCreditoInfo = [];
    }
  }

  GetClient() {
    if (this.gf.SearchClientsByNameNum(this.in.IDCliente)[0] === undefined) {
      this.cliente = [];
    } else {
      this.cliente = this.gf.SearchClientsByNameNum(this.in.IDCliente)[0];
    }
  }

  async presentAvalModal() {
    const modal = await this.modalController.create({
      component: MyModal,
      componentProps: {
        type: "Aval"
      }
    });

    modal.present();
  }

  AgregarGarantia() {
    this.ArrGarantias.push({
      [gv.identificador]: '',
      [gv.marca]: '',
      [gv.articulo]: ''
    })
  }
  EliminarGarantia(index) {
    this.ArrGarantias.splice(index, 1);
  }

  AgregarCredito() {
    this.Alerta = false;
    this.Btn_Desactivado = true;

    for (let x = 0; x < this.ArrGarantias.length; x++) {
      if (this.ArrGarantias[x][gv.articulo] === '' || this.ArrGarantias[x][gv.marca] === '' || this.ArrGarantias[x][gv.identificador] === '') {
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
    if (!gv.DT_Pagos) {
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
    if (this.cliente[gv.nombre] === undefined) {
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
      this.in.Horario = '0000'
    } else {
      let hora = new Date(this.in.Horario)
      this.in.Horario = this.gf.AgregarCero(hora.getHours()) + this.gf.AgregarCero(hora.getMinutes());
    }

    this.gf.RegistratCredito(parseInt(this.in.Num_Pagos), this.cliente[gv.nombre], this.cliente[gv.key], parseInt(this.in.Credito),
      this.in.Fecha, this.in.Periodo, parseInt(this.in.Pago), this.in.IDCliente, parseInt(this.in.Efectivo),
      this.in.Total_Credito, this.in.Deposito, this.in.Horario, this.ArrGarantias, this.in.Folio, gv.AvalArr, this.in.Razon, 
      this.in.Cargo_Pago, this.cliente[gv.ID_Ubicacion])
      .then(res => {
        if (res) {
          this.gf.Toast('Credito registrado', 2000)

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
          gv.AvalArr = [];
          this.ArrProductos = [];
          this.ArrGarantias = [];

        } else {
          this.gf.Toast('Error al registrar el credito', 2000)
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

  CambioCargoPorServicio(){
    if (this.in.Efectivo === '') {
      this.in.Efectivo = '0';
    }

    this.in.Cargo_Servicio = this.in.Total_Credito - parseInt(this.in.Efectivo);
    this.in.Cargo_Pago = this.in.Cargo_Servicio/parseInt(this.in.Num_Pagos);
  }

  ProductoSeleccionado() {
    if(this.ArrProductos[this.in.Producto] !== undefined){
      this.in.Num_Pagos = this.ArrProductos[this.in.Producto][gv.total_pagos];
      this.in.Credito = this.ArrProductos[this.in.Producto][gv.credito];
      this.in.Pago = this.ArrProductos[this.in.Producto][gv.pago];
      this.in.Total_Credito = this.ArrProductos[this.in.Producto][gv.total_credito];
      this.in.Periodo = this.ArrProductos[this.in.Producto][gv.periodo];
      this.in.Efectivo = this.ArrProductos[this.in.Producto][gv.efectivo];
    }
  }

}

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
