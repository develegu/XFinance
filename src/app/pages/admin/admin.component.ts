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
  colaboradores = [];

  Pagos_Proximos = [];

  public gv = gv;

  constructor(private modalController: ModalController,
    public db: AngularFirestore,
    public _iterableDiffers: IterableDiffers,
    public gf: CommonService) {
  }

  ngOnInit() {
    this.colaboradores = gv.colaboradores;

    gv.colaboradores.sort((a, b) => { return a[gv.ID_Ubicacion] - b[gv.ID_Ubicacion] });

    this.gf.CheckLogin();
  }

  async UsuarioModal() {
    const modal = await this.modalController.create({
      component: MyModal,
      componentProps: {
        type: "Usuario"
      }
    });

    modal.present();
  }

  async ModificarUsuarioModal(Usuario) {
    const modal = await this.modalController.create({
      component: MyModal,
      componentProps: {
        type: "Usuario",
        Tipo: gv.Actualizar,
        Mod_Usuario: Usuario
      }
    });

    modal.present();
  }

  async AgregarProducto() {
    const modal = await this.modalController.create({
      component: MyModal,
      componentProps: {
        type: "Producto"
      }
    });

    modal.present();
  }

}
