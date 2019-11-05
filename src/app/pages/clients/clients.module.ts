import { NgModule } from "@angular/core";
import { ClientsRoutingModule } from "./clients.routing.module";
import { ClientsComponent } from "./clients.component";
import { SharedModule } from "src/app/common/modules/shared.module";
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { MyModal } from '../../common/modals/my-modal/my-modal.component'

@NgModule({
  imports: [SharedModule, ClientsRoutingModule],
  declarations: [ClientsComponent]
})

export class ClientsModule {

  constructor(public db: AngularFirestore,
    public modalController: ModalController) { }

  async presentUsuarioModal() {
    console.log("PRESENTING MODAL");
    const modal = await this.modalController.create({
      component: MyModal,
      componentProps: {
        type: "Usuario"
      }
    });

    modal.present();
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
}
