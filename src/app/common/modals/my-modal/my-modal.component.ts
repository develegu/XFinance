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

  AlertText = '';
  btn_disabled = false;

  type;
  Tipo;

  ngOnInit() {
    if (this.type === 'Usuario') {
      this.Usuario.Organizacion = gv.usuario[gv.organizacion];

      if (this.Tipo === gv.Actualizar) {
        this.Usuario.Mail = this.Mod_Usuario[gv.mail]
        this.Usuario.Nombre = this.Mod_Usuario[gv.nombre]
        this.Usuario.Roll = this.Mod_Usuario[gv.roll]
      }

    } else {

    }

    if (this.type === 'Cliente' && this.Tipo === gv.Actualizar) {
      console.log(this.Info_Cliente)
      let ArrNombre = this.Info_Cliente[gv.nombre].split('_');
      console.log(ArrNombre);
      this.Cliente.Nombre = ArrNombre[0];
      this.Cliente.ApellidoP = ArrNombre[1];
      this.Cliente.ApellidoM = ArrNombre[2];

      let ArrDireccion = this.Info_Cliente[gv.direccion].split('_');
      console.log(ArrDireccion);
      this.Cliente.Calle = ArrDireccion[0];
      this.Cliente.NumeroInt = ArrDireccion[1];
      this.Cliente.NumeroExt = ArrDireccion[2];
      this.Cliente.Colonia = ArrDireccion[3];
      this.Cliente.Municipio = ArrDireccion[4];
      this.Cliente.Estado = ArrDireccion[5];
      this.Cliente.CP = ArrDireccion[6];

      this.Cliente.Sexo = this.Info_Cliente[gv.sexo];
      this.Cliente.Identificador = this.Info_Cliente[gv.identificador];
      this.Cliente.Cumpleanos = this.Info_Cliente[gv.fecha];
      this.Cliente.Telefono = this.Info_Cliente[gv.telefono];
      this.Cliente.CURP = this.Info_Cliente[gv.curp];

    }

    if (this.type === 'Pago') {

      this.PagosArr = gv.pagos_Arr.filter(pago => {
        return pago[gv.key_primer_pago] === this.Key_Primer_Pago;
      });
      this.PagosArr.sort((a, b) => { return a[gv.num_pago] - b[gv.num_pago] });

      this.ProximosArr = this.PagosArr.filter(pago => {
        return pago[gv.status] === gv.status_proximo ||
          pago[gv.status] === gv.status_vencido;
      });
      this.ProximosArr.sort((a, b) => { return a[gv.num_pago] - b[gv.num_pago] });

      this.Info_Credito = this.gf.GetInformacionCreditoInd(this.PagosArr);
      console.log(this.Info_Credito)

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

  //USUARIO
  Mod_Usuario;

  Usuario = {
    Nombre: '',
    Mail: '',
    Contrasena: '',
    Confirmar: '',
    Roll: '',
    Organizacion: ''
  }

  AgregarUsuario() {
    if (this.Usuario.Mail === '') {
      this.Incomplete = true;
      this.AlertText = 'Falta el mail'
      return;
    }

    this.gf.CrearCollaborador(this.Usuario.Nombre, this.Usuario.Roll,
      this.Usuario.Contrasena, this.Usuario.Mail, this.Usuario.Organizacion)
      .then(res => {
        this.closeModal();
      })
      .catch(err => {
        this.closeModal();
      });
  }


  //CLIENTES
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
  }
  Txt_Btn_Cliente = 'Siguiente';
  Incomplete = false;
  Info_Cliente;

  AgregarClientes() {
    this.Incomplete = false;
    this.btn_disabled = true;

    if (this.Cliente.Paso === 1) {

      let cliente = gv.clientes.filter(cliente => {
        return cliente[gv.identificador] === this.Cliente.Identificador;
      });

      if (this.Tipo === gv.Nuevo && cliente[0] !== undefined) {
        this.Incomplete = true;
        this.AlertText = "Ya hay un usuario con ese identificador";
        this.btn_disabled = false;

        return;
      } else {

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
        if (this.Cliente.NumeroExt === '') {
          this.Incomplete = true;
          this.AlertText = "Ingresa el numero exterior";
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

        this.Cliente.Paso = 2;
        this.Txt_Btn_Cliente = 'Registrar cliente';
        this.btn_disabled = false;
      }
    } else {

      if (this.Cliente.NumeroInt === '') {
        this.Cliente.NumeroInt = ' ';
      }

      this.gf.NuevoCliente(this.Cliente.Nombre + '_' + this.Cliente.ApellidoP + '_' + this.Cliente.ApellidoM,
        this.Cliente.Calle + '_' + this.Cliente.NumeroExt + '_' + this.Cliente.NumeroInt + '_' + this.Cliente.Colonia + '_' +
        this.Cliente.Municipio + '_' + this.Cliente.Estado + '_' + this.Cliente.CP,
        this.Cliente.Telefono, this.Cliente.CURP, this.Cliente.Cumpleanos, this.Cliente.Sexo,
        this.Cliente.Aval.Nombre + '_' + this.Cliente.Aval.ApellidoP + '_' + this.Cliente.Aval.ApellidoM,
        this.Cliente.Aval.Calle + '_' + this.Cliente.Aval.Numero + '_' + this.Cliente.Aval.Colonia,
        this.Cliente.Aval.Telefono, this.Cliente.Aval.CURP, this.Cliente.Identificador)
        .then(res => {
          if (res) {
            this.closeModal();
          } else {

          }
        })
    }
  }

  //PAGOS
  ProximosArr = [];
  PagosArr = [];
  Info_Credito = [];
  In = {
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
      Pagos: ''
    },
  }
  Key_Primer_Pago;
  Selection = 'Posponer';
  Btn_Txt = 'Posponer';

  Cambio() {
    switch (this.Selection) {
      case 'Posponer':
        this.Btn_Txt = 'Posponer pago'
        break;
      case 'Liquidar':
        this.Btn_Txt = 'Liquidar credito'
        break;
      case 'Re estructurar':
        this.Btn_Txt = 'Re estructurar credito'
        break;
      case 'Agregar pagos':
        this.Btn_Txt = 'Agregar pagos'
        break;
      case 'Eliminar credito':
        this.Btn_Txt = 'Eliminar credito'
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
          this.AlertText = 'Falta información'
          this.btn_disabled = false;
          return;
        }

        let fecha = new Date(this.In.Posponer.Date);

        this.gf.PosponerPago(this.ProximosArr[0], gv.usuario[gv.nombre], fecha, this.In.Posponer.Razon)
          .then(res => {
            if (res) {

              this.modalCtrl.dismiss({
                'dismissed': true
              });

            } else {

            }
            this.btn_disabled = false;
          });

        break;

    case 'Liquidar':
      if (this.In.Liquidar.Cantidad === '') {
        this.Incomplete = true;
        this.AlertText = 'Falta información'
        this.btn_disabled = false;
        return;
      }
      this.gf.LiquidarCredito(this.PagosArr, gv.usuario[gv.nombre], parseInt(this.In.Liquidar.Cantidad),
        this.PagosArr[0], this.ProximosArr[0])
        .then(res => {
          if (res) {
            this.modalCtrl.dismiss({
              'dismissed': true
            });
          } else {
            this.btn_disabled = false;
          }
        });
      break;

    case 'Re estructurar':
      if (this.In.Re_Estructurar.Pago === '' || this.In.Re_Estructurar.Period === '' || this.In.Re_Estructurar.Date === '') {
        this.Incomplete = true;
        this.AlertText = 'Falta información'
        this.btn_disabled = false;
        return;
      }

      if(this.ProximosArr.length === this.PagosArr.length){
        this.gf.Toast("No se puede reestructurar el primer pago elimina el credito e ingresa uno nuevo", 2000);
        this.btn_disabled = false;
        return;
      }

      let fecha_restructura = new Date(this.In.Re_Estructurar.Date);

      this.gf.ReestructurarCredito(this.ProximosArr[0], parseInt(this.In.Re_Estructurar.Pago), this.In.Re_Estructurar.Period,
        this.PagosArr, fecha_restructura)
        .then(res => {
          if (res) {
            this.modalCtrl.dismiss({
              'dismissed': true
            });
          } else {
            this.btn_disabled = false;
          }
        });
      break;

    case 'Agregar pagos':
      if (this.In.Agregar_pagos.Pagos === '') {
        this.Incomplete = true;
        this.AlertText = 'Falta información'
        this.btn_disabled = false;
        return;
      }
      this.gf.AgregarPagosMulta(this.PagosArr, parseInt(this.In.Agregar_pagos.Pagos))
        .then(res => {
          if (res) {
            this.modalCtrl.dismiss({
              'dismissed': true
            });
          } else {
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
            } else {
              this.btn_disabled = false;
            }
          });
        break;

    }
  }

}
