import { Component, IterableDiffers } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyModal } from "src/app/common/modals/my-modal/my-modal.component";
import { CommonService } from 'src/app/common/services/common.service';
import { gv } from 'src/app/common/constants';

@Component({
  selector: "app-clients",
  templateUrl: "clients.component.html",
  styleUrls: ["clients.component.scss"]
})

export class ClientsComponent {
  IDCliente = '';
  Cliente = [];
  pagos_cliente = [];
  Pago = '';
  Multa = '';
  Pago_Total;
  Btn_Desactivado = false;
  Pagos_Inicial = [];
  ArrCreditos = [];
  ArrInfo = [];
  Selected;

  Pagos_Proximos = [];
  Incomplete;
  AlertText;

  public gv = gv;

  constructor(private modalController: ModalController,
    public db: AngularFirestore,
    public _iterableDiffers: IterableDiffers,
    public gf: CommonService) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);

  }

  ngOnInit() {
    this.gf.CheckLogin();
  }

  iterableDiffer;
  ngDoCheck() {
    let changes = this.iterableDiffer.diff(gv.pagos_Arr);

    if (changes) {
      console.log("Cambio")
      this.BuscarCliente();
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

        PagosDeCredito.push(this.Pagos_Inicial[x]);
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
        console.log(this.ArrCreditos)

        if (x === 0 && this.Selected === undefined) {
          this.Selected = this.Pagos_Inicial[x][gv.key];
        }

        this.ArrCreditos[this.Pagos_Inicial[x][gv.key]] = PagosDeCredito;
      }
    } else {
      this.Selected = undefined;
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
    }

    this.gf.PagoCredito(this.ArrCreditos[this.Selected + gv.info][1][0], this.ArrCreditos[this.Selected + gv.info][0][0],
      this.ArrCreditos[this.Selected + gv.info][0], parseInt(this.Multa), parseInt(this.Pago), gv.usuario[gv.nombre])
      .then(res => {
        if (res) {
          this.Multa = '';
          this.Pago = '';

        } else {

        }

        this.Btn_Desactivado = false;
      });

  }

  async OpcionesDeCreditoModal() {
    const modal = await this.modalController.create({
      component: MyModal,
      componentProps: {
        type: "Pago",
        Key_Primer_Pago: this.Selected
      }
    });

    modal.present();
  }

}
