import { Component, IterableDiffers } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { MyModal } from "src/app/common/modals/my-modal/my-modal.component";
import { CommonService } from 'src/app/common/services/common.service';
import { gv } from 'src/app/common/constants';
import { ModalController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: "app-clients",
  templateUrl: "clients.component.html",
  styleUrls: ["clients.component.scss"]
})

export class ClientsComponent {
  ListaClientes = [];

  IDCliente = '';
  Cliente = [];
  Agentes = [];
  Agente;
  pagos_cliente = [];
  Pago = '';
  Multa = '';
  Pago_Total;
  Btn_Desactivado = false;
  Pagos_Inicial = [];
  ArrCreditos = [];
  ArrInfo = [];
  Selected;
  PagosSeleccionados = [];
  VerPagos = false;

  Pagos_Proximos = [];
  Incomplete = false;
  AlertText;
  Anio: any;
  Mes: any;
  Dia: any;

  FechaPago = {
    Fecha: new Date()
  }

  public gv = gv;

  constructor(
    public db: AngularFirestore,
    private modalController: ModalController,
    public _iterableDiffers: IterableDiffers,
    private actionSheetController: ActionSheetController,
    //private camera: Camera,
    public gf: CommonService) {
    this.iterableDiffer_Pagos = this._iterableDiffers.find([]).create(null);
    this.iterableDiffer_Colaboradores = this._iterableDiffers.find([]).create(null);
    this.iterableDiffer_Cliente = this._iterableDiffers.find([]).create(null);

  }

  ngOnInit() {

    this.Agente = 0;

    this.Agentes = gv.colaboradores.filter(col => {
      return this.gf.GetElementosDeID(col[gv.ID_Ubicacion])[gv.ID_Ubicacion] === gv.agente;
    });

    this.Agentes.push({
      [gv.nombre]: 'Todos',
      [gv.ID_Ubicacion]: 0
    })

    this.gf.CheckLogin();
  }

  iterableDiffer_Pagos;
  iterableDiffer_Colaboradores;
  iterableDiffer_Cliente;
  ngDoCheck() {
    let changes_pagos = this.iterableDiffer_Pagos.diff(gv.pagos_Arr);
    let change_col = this.iterableDiffer_Colaboradores.diff(gv.colaboradores);
    let change_client = this.iterableDiffer_Cliente.diff(gv.clientes);

    if (change_client || changes_pagos) {
      console.log("Cambio cliente")
      this.BuscarCliente();
    }

    if (change_col && gv.DT_Colaboradores === true) {
      console.log("Cambio col")

      this.Agentes = gv.colaboradores.filter(agente => {
        return this.gf.GetElementosDeID(agente[gv.ID_Ubicacion])[gv.ID_Ubicacion] === gv.agente;
      });
      this.Agentes.push({
        [gv.nombre]: 'Todos',
        [gv.ID_Ubicacion]: 0
      })
    }
  }

  async presentClienteModal() {
    const modal = await this.modalController.create({
      component: MyModal,
      componentProps: {
        type: "Cliente",
        Tipo: gv.Nuevo
      }
    });

    modal.present();
  }
  async ModificarClienteModal() {
    const modal = await this.modalController.create({
      component: MyModal,
      componentProps: {
        type: "Cliente",
        Tipo: gv.Actualizar,
        Info_Cliente: this.Cliente[0],
      }
    });

    modal.present();
  }
  async OpcionesDeCreditoModal() {
    const modal = await this.modalController.create({
      component: MyModal,
      componentProps: {
        type: "Pago",
        Key_Primer_Pago: this.ArrCreditos[this.Selected + gv.info][0][0][gv.key_primer_pago]
      }
    });

    modal.present();
  }
  BuscarCliente() {
    this.Cliente = [];
    this.pagos_cliente = [];
    this.Pagos_Inicial = [];
    this.ArrInfo = [];
    this.ArrCreditos = [];

    this.Cliente = gv.clientes.filter(cliente => {
      return this.gf.CleanAccentCaps(cliente[gv.identificador]) === this.gf.CleanAccentCaps(this.IDCliente);
    });

    this.pagos_cliente = gv.pagos_Arr.filter(pago => {
      return this.gf.CleanAccentCaps(pago[gv.identificador]) === this.gf.CleanAccentCaps(this.IDCliente);
    });

    if (this.pagos_cliente[0] !== undefined) {

      this.Pagos_Inicial = this.pagos_cliente.filter(pago => {
        return pago[gv.num_pago] === 1;
      });

      for (let x = 0; x < this.Pagos_Inicial.length; x++) {

        let PagosDeCredito = this.pagos_cliente.filter(pago => {
          return pago[gv.key_primer_pago] === this.Pagos_Inicial[x][gv.key];
        });

        PagosDeCredito.sort((a, b) => { return a[gv.num_pago] - b[gv.num_pago] });

        this.ArrInfo[this.Pagos_Inicial[x][gv.key]] = this.gf.GetInformacionCreditoInd(PagosDeCredito);

        //PONER PAGOS TOTALES Y PAGOS PROXIMOS EN ARR
        let ArrPagos = [];
        ArrPagos.push(PagosDeCredito);

        ArrPagos.push(PagosDeCredito.filter(pago => {
          return pago[gv.status] === gv.status_proximo ||
            pago[gv.status] === gv.status_vencido;
        }));

        this.ArrCreditos[this.Pagos_Inicial[x][gv.key] + gv.info] = ArrPagos;

        if (x === 0 && this.Selected === undefined) {
          this.Selected = this.Pagos_Inicial[x][gv.key];
          this.PagosSeleccionados = this.ArrCreditos[this.Pagos_Inicial[x][gv.key] + gv.info][0];
        } else
          if (this.Selected !== undefined) {
            this.PagosSeleccionados = this.ArrCreditos[this.Pagos_Inicial[x][gv.key] + gv.info][0];

          }

        this.ArrCreditos[this.Pagos_Inicial[x][gv.key]] = PagosDeCredito;
        console.log("ArrCreditos")
        console.log(this.ArrCreditos)
      }
    } else {
      this.Selected = undefined;
    }

    if (this.Agente === 0) {
      this.ListaClientes = gv.clientes.filter(cliente => {
        return (this.gf.CleanAccentCaps(cliente[gv.identificador]).includes(this.gf.CleanAccentCaps(this.IDCliente)) ||
          this.gf.CleanAccentCaps(cliente[gv.nombre]).includes(this.gf.CleanAccentCaps(this.IDCliente)));
      });

    } else {
      this.ListaClientes = gv.clientes.filter(cliente => {
        return (this.gf.CleanAccentCaps(cliente[gv.identificador]).includes(this.gf.CleanAccentCaps(this.IDCliente)) ||
          this.gf.CleanAccentCaps(cliente[gv.nombre]).includes(this.gf.CleanAccentCaps(this.IDCliente))) &&
          cliente[gv.ID_Ubicacion] === this.Agente;
      });

    }
  }
  CambioPagosSeleccionados(key) {
    this.PagosSeleccionados = this.ArrCreditos[key + gv.info][0];
  }
  GetSaldo(key) {
    let Saldo = this.PagosSeleccionados[0][gv.total_credito];

    for (let x = 0; x < this.PagosSeleccionados.length; x++) {
      if (this.PagosSeleccionados[x][gv.status] === gv.status_pagado) {
        Saldo -= this.PagosSeleccionados[x][gv.cantidad_pagado];
      }
      if (this.PagosSeleccionados[x][gv.key] === key) {
        return Saldo;
      }
    }
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
      return pago[gv.status] === gv.status_proximo ||
        pago[gv.status] === gv.status_vencido;
    });
    this.Pagos_Proximos.sort((a, b) => { return a[gv.num_pago] - b[gv.num_pago] });

    if (parseInt(this.Pago) > this.ArrInfo[this.Selected][gv.cantidad_por_pagar]) {
      this.AlertText = "El pago no puede ser mayor al total"
      this.Incomplete = true;
      this.Btn_Desactivado = false;
      return;
    } else
      if (parseInt(this.Pago) === 0) {
        this.AlertText = "Ingresa el pago"
        this.Incomplete = true;
        this.Btn_Desactivado = false;
        return;
      }

    if (this.Anio !== undefined && this.Mes !== undefined && this.Dia !== undefined) {
      this.FechaPago.Fecha = new Date(this.Anio, this.Mes - 1, this.Dia);
    } else {
      this.FechaPago.Fecha = new Date()
    }

    this.gf.PagoCredito(this.ArrCreditos[this.Selected + gv.info][1][0], this.ArrCreditos[this.Selected + gv.info][0][0],
      this.ArrCreditos[this.Selected + gv.info][0], parseInt(this.Multa), parseInt(this.Pago), gv.usuario[gv.nombre],
      this.FechaPago.Fecha)
      .then(res => {
        if (res) {
          this.Multa = '';
          this.Pago = '';
          this.Pago_Total = '';

          this.Anio = undefined;
          this.Mes = undefined;
          this.Dia = undefined
        }

        this.Btn_Desactivado = false;
      });

  }

  async OpcionesDeCredito() {
    const actionSheet = await this.actionSheetController.create({
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
    await actionSheet.present();
  }

  OpcionesDeCliente() {

  }

  NuevoCredito() {
    gv.ClienteToCreditoInfo = this.Cliente;

    this.gf.IrACreditos()
  }

  RegresarPago(Pago) {
    this.gf.RegresarPagoAlerta(Pago, this.ArrCreditos[this.Selected + gv.info][0][0], this.ArrCreditos[this.Selected + gv.info][0])
  }

}
