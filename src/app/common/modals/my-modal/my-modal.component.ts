import { Component, Input } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";
import { AngularFirestore } from '@angular/fire/firestore';
import { CommonService } from 'src/app/common/services/common.service';
import { gv } from '../../constants';

@Component({
  selector: "app-my-modal",
  templateUrl: "my-modal.component.html",
  styleUrls: ["./my-modal.component.scss"]
})

export class MyModal {

  public gv = gv;

  @Input() myParam: string;

  dismiss() {
 
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  constructor(
    public modalCtrl: ModalController,
    public db: AngularFirestore,
    public gf: CommonService,
  ) {
  }
  
  Selection = 'Pagado';
  Btn_Txt = 'Pagar';
  TextCredit = 'Se registrara tu siguiente pago';
  Incomplete = false;
  AlertText = '';
  btn_disabled = false;

  NextPayment;
  FirstPayment;
  LastPayment;
  NextPayments = [];
  Sorted_Payments = [];
  week_num;
  client_num;
  Credit_Info = [];
  type;

  Usuario = {
    Nombre: '',
    Mail: '',
    Contrasena: '',
    Confirmar: '',
    Roll: ''
  }

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
    Identificador:'',
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
  }
  Txt_Btn_Cliente = 'Siguiente';

  In = {
    Pagado: {
      Cantidad: '',
      Tipo: '',
      Razon: '',
      Date: ''
    },
    Posponer: {
      Date: '',
      Razon: ''
    },
    Multa: {
      Multa: ''
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
      Pagos: ''
    },
  }

  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {

  }

  AgregarUsuario() {
    if (this.Usuario.Mail === '') {
      this.Incomplete = true;
      this.AlertText = 'Falta el mail'
      return;
    }

    this.gf.NewCollaborator(this.Usuario.Nombre, this.Usuario.Roll, this.Usuario.Contrasena, this.Usuario.Mail)
      .then(res => {
        this.closeModal();

      })
      .catch(err => {
        this.closeModal();

      });
  }

  AgregarClientes() {
    if (this.Cliente.Paso === 1) {
      this.Cliente.Paso = 2;
      this.Txt_Btn_Cliente = 'Registrar cliente';
    } else {
      console.log(this.Cliente.Nombre + ' ' + this.Cliente.ApellidoP + ' ' + this.Cliente.ApellidoM);//
      console.log(this.Cliente.Calle + ' ' + this.Cliente.NumeroExt + ' ' + this.Cliente.NumeroInt);//
      console.log(this.Cliente.Colonia + ' ' + this.Cliente.Municipio + ' ' + this.Cliente.Estado + ' ' + this.Cliente.CP);//
      console.log(this.Cliente.Telefono)//
      console.log(this.Cliente.CURP)//
      console.log(this.Cliente.Cumpleanos)//
      console.log(this.Cliente.Sexo)
      console.log(this.Cliente.Identificador)

      console.log('Aval')
      console.log(this.Cliente.Aval.Nombre + ' ' + this.Cliente.Aval.ApellidoP + ' ' + this.Cliente.Aval.ApellidoM)
      console.log(this.Cliente.Aval.Calle + ' ' + this.Cliente.Aval.Numero + ' ' + this.Cliente.Aval.Colonia)
      console.log(this.Cliente.Aval.CURP)
      console.log(this.Cliente.Aval.Telefono)

      this.gf.NuevoCliente(this.Cliente.Nombre + ' ' + this.Cliente.ApellidoP + ' ' + this.Cliente.ApellidoM,
        this.Cliente.Calle + ' ' + this.Cliente.NumeroExt + ' ' + this.Cliente.NumeroInt + ' ' + this.Cliente.Colonia + ' ' +
        this.Cliente.Municipio + ' ' + this.Cliente.Estado + ' ' + this.Cliente.CP,
        this.Cliente.Telefono, this.Cliente.CURP, this.Cliente.Cumpleanos, this.Cliente.Sexo,
        this.Cliente.Aval.Nombre + ' ' + this.Cliente.Aval.ApellidoP + ' ' + this.Cliente.Aval.ApellidoM,
        this.Cliente.Aval.Calle + ' ' + this.Cliente.Aval.Numero + ' ' + this.Cliente.Aval.Colonia,
        this.Cliente.Aval.Telefono, this.Cliente.Aval.CURP, this.Cliente.Identificador)
        .then(res =>{
          if(res){
            this.closeModal();
          } else {
            
          }
        })
    }

  }
}

/*

  <ion-grid *ngIf="type === 'Usuario'">

    <ion-row>
      <ion-col>
        <ion-input placeholder="Nombre" [(ngModel)]="Usuario.Nombre">
        </ion-input>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col>
        <ion-input placeholder="Mail" [(ngModel)]="Usuario.Mail">
        </ion-input>
      </ion-col>
    </ion-row>

    <ion-item>
      <ion-label>Seleccionar</ion-label>
      <ion-select [(ngModel)]="Usuario.Roll" placeholder="Roll">
        <ion-select-option value="{{ gv.Administrador }}">Administrador</ion-select-option>
        <ion-select-option value="{{ gv.Cobrador }}">Cobrador</ion-select-option>
        <ion-select-option value="{{ gv.Oficina }}">Oficina</ion-select-option>
        <ion-select-option value="{{ gv.Dueno }}">Dueño</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-row>
      <ion-col>
        <ion-input placeholder="Contraseña" [(ngModel)]="Usuario.Contrasena">
        </ion-input>
      </ion-col>
      <ion-col>
        <ion-input placeholder="Confirmar contraseña" [(ngModel)]="Usuario.Confirmar">
        </ion-input>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col>
        <ion-button [disabled]="btn_disabled" (click)="AgregarUsuario()">Agregar</ion-button>
      </ion-col>
    </ion-row>

  </ion-grid>

  <ion-grid *ngIf="type === 'pay'">

    <ion-item>
      <ion-label>Seleccionar</ion-label>
      <ion-select [(ngModel)]="Selection" placeholder="Pagado" (ngModelChange)='Cambio()'>
        <ion-select-option value="Pagado">Pagado</ion-select-option>
        <ion-select-option value="Posponer">Posponer</ion-select-option>
        <ion-select-option value="Multa">Multa</ion-select-option>
        <ion-select-option value="Liquidar">Liquidar</ion-select-option>
        <ion-select-option value="Re estructurar">Re estructurar</ion-select-option>
        <ion-select-option value="Agregar pagos">Pagos de penalizacion</ion-select-option>
      </ion-select>
    </ion-item>

    <div *ngIf="Selection === 'Pagado'">
      <ion-text *ngIf="NextPayment !== undefined">
        El proximo pago #{{ NextPayment[gv.pay_num] }} es por {{ NextPayment[gv.payment] }} del dia
        {{ NextPayment[gv.date] }}.
      </ion-text>
      <ion-row>
        <ion-text>
          Cantidad a pagar.
        </ion-text>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-input placeholder="Cantidad" [(ngModel)]="In.Pagado.Cantidad" (ngModelChange)='CheckPayment()'>
          </ion-input>
        </ion-col>
      </ion-row>

      <div *ngIf="In.Pagado.Tipo === 'Parcial'">
        <ion-text>
          La cantidad ingresada es menor al pago. Ingresa fecha de pago complementario y razon de pago parcial.
        </ion-text>
        <ion-row>
          <ion-col>
            <ion-item>
              <ion-label>FECHA</ion-label>
              <ion-datetime displayFormat="DD/MM/YYYY" placeholder="Select Date" max="2050"
                [(ngModel)]="In.Pagado.Date">
              </ion-datetime>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-input placeholder="Razon" [(ngModel)]="In.Pagado.Razon"></ion-input>
          </ion-col>
        </ion-row>
      </div>
    </div>

    <div *ngIf="Selection === 'Posponer'">
      <ion-text>
        Ingresa la fecha a la que se pospondra el pago y la razon de posponerlo.
      </ion-text>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label>FECHA</ion-label>
            <ion-datetime displayFormat="DD/MM/YYYY" placeholder="Select Date" max="2050"
              [(ngModel)]="In.Posponer.Date"></ion-datetime>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col>
          <ion-input placeholder="Razon" [(ngModel)]="In.Posponer.Razon"></ion-input>
        </ion-col>
      </ion-row>
    </div>

    <div *ngIf="Selection === 'Multa'">
      <ion-text>
        Ingresa la cantidad de multa. Se registrara tu pago completo mas la multa.
      </ion-text>
      <ion-row>
        <ion-col>
          <ion-input placeholder="Multa" [(ngModel)]="In.Multa.Multa"></ion-input>
        </ion-col>
      </ion-row>
    </div>

    <div *ngIf="Selection === 'Liquidar'">
      <ion-text>
        ¿Seguro que quieres liquidar el credito completo?
        Faltan {{ Credit_Info[gv.remaining_pay] }} pagos con un total de $
        {{ Credit_Info[gv.status_vencido] + Credit_Info[gv.status_proximo]}}
      </ion-text>
      <ion-row>
        <ion-col>
          <ion-input placeholder="Cantidad a reducir" [(ngModel)]="In.Liquidar.Cantidad"></ion-input>
        </ion-col>
      </ion-row>
    </div>

    <div *ngIf="Selection === 'Re estructurar'">
      <ion-text>
        Ingresa la nueva cantidad a pagar.
        Fecha de inicio de los pagos.
        Y el periodo de los pagos
      </ion-text>

      <ion-row>
        <ion-col>
          <ion-input placeholder="Pago" [(ngModel)]="In.Re_Estructurar.Pago"></ion-input>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label>FECHA</ion-label>
            <ion-datetime displayFormat="DD/MM/YYYY" placeholder="Select Date" max="2050"
              [(ngModel)]="In.Re_Estructurar.Date"></ion-datetime>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-item>
        <ion-select placeholder="Tipo" [(ngModel)]="In.Re_Estructurar.Period">
          <ion-select-option value="{{ gv.daily }}">Diario</ion-select-option>
          <ion-select-option value="{{ gv.weekly }}">Semanal</ion-select-option>
          <ion-select-option value="{{ gv.biweekly }}">Quincenal</ion-select-option>
          <ion-select-option value="{{ gv.monthly }}">Mensual</ion-select-option>
        </ion-select>
      </ion-item>
    </div>

    <div *ngIf="Selection === 'Agregar pagos'">
      <ion-text>
        Ingresa la cantidad de pagos que se le agregaran al credito
      </ion-text>

      <ion-row>
        <ion-col>
          <ion-input placeholder="Pago" [(ngModel)]="In.Agregar_pagos.Pagos"></ion-input>
        </ion-col>
      </ion-row>
    </div>

    <ion-row>
      <ion-col>
        <ion-button [disabled]="btn_disabled" (click)="PayCredit()">{{ Btn_Txt }}</ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
*/
