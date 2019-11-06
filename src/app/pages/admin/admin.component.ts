import { Component, IterableDiffers } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyModal } from "src/app/common/modals/my-modal/my-modal.component";
import { CommonService } from 'src/app/common/services/common.service';
import { gv } from 'src/app/common/constants';

@Component({
  selector: "app-admin",
  templateUrl: "admin.component.html",
  styleUrls: ["admin.component.scss"]
})

export class adminComponent {
  IDCliente = '';
  Cliente = [];
  pagos_cliente = [];
  Pago = '';
  Multa = '';
  Pago_Total;
  Btn_Desactivado = false;

  Pagos_Proximos = [];


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
        type: "Cliente"
      }
    });

    modal.present();
  }

  BuscarCliente() {
    this.Cliente = gv.clientes.filter(cliente => {
      return cliente[gv.identificador] === this.IDCliente;
    });

    this.pagos_cliente = gv.pagos_Arr.filter(pago => {
      return this.gf.CleanAccentCaps(pago[gv.identificador]) === this.gf.CleanAccentCaps(this.IDCliente);
    });

    if (this.pagos_cliente[0] !== undefined) {

      this.pagos_cliente.sort((a, b) => { return a[gv.num_pago] - b[gv.num_pago] });

      this.Pagos_Proximos = this.pagos_cliente.filter(pago => {
        return pago[this.gv.status] === this.gv.status_vencido ||
          pago[this.gv.status] === this.gv.status_proximo;
      });
      this.Pagos_Proximos.sort((a, b) => { return a[this.gv.num_pago] - b[this.gv.num_pago] });
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
    this.Btn_Desactivado = true;

    if (this.Multa === '') {
      this.Multa = '0';
    }
    if (this.Pago === '') {
      this.Pago = '0';
    }
    
    this.gf.PagoCredito(this.Pagos_Proximos[0], this.pagos_cliente[0], this.pagos_cliente,
      parseInt(this.Multa), parseInt(this.Pago), gv.usuario[gv.nombre])
      .then(res => {
        if (res) {
          this.Multa = '';
          this.Pago = '';

        } else {

        }

        this.Btn_Desactivado = false;
      })
  }

}