import { Component } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { CommonService } from 'src/app/common/services/common.service';
import { gv } from 'src/app/common/constants';

@Component({
  selector: "app-credit",
  templateUrl: "credit.component.html",
  styleUrls: ["credit.component.scss"]
})

export class CreditComponent {

  public gv = gv;

  constructor(public db: AngularFirestore,
    public gf: CommonService) {

  }

  cliente = [];
  Alerta = false;
  AlertMsj = '';
  Btn_Desactivado = false;

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
  }

  ngOnInit() {
    this.gf.CheckLogin();
  }

  GetClient() {
    if (this.gf.SearchClientsByNameNum(this.in.IDCliente)[0] === undefined) {
      this.cliente = [];
    } else {
      this.cliente = this.gf.SearchClientsByNameNum(this.in.IDCliente)[0];
    }
  }

  Pay() {
    this.Alerta = false;
    this.Btn_Desactivado = true;

    console.log(this.in)

    if (this.in.IDCliente === '') {
      this.Alerta = true;
      this.AlertMsj = 'Ingresa numero de cliente';
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

    this.gf.RegistratCredito(parseInt(this.in.Num_Pagos), this.cliente[gv.nombre], this.cliente[gv.key], parseInt(this.in.Credito), this.in.Fecha,
      this.in.Periodo, parseInt(this.in.Pago), this.in.IDCliente, parseInt(this.in.Efectivo), this.in.Total_Credito, this.in.Deposito, this.in.Horario)
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
  }

}
