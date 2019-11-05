import { Component } from "@angular/core";
import { MyModal } from "src/app/common/modals/my-modal/my-modal.component";
import { ModalController } from "@ionic/angular";
import { OverlayEventDetail } from "@ionic/core";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.scss"]
})
export class LoginComponent {
  constructor(private modalController: ModalController) {}

  async openModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: MyModal,
      componentProps: {
        myParam: "test"
      }
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        console.log("The result:", detail.data);
      }
    });

    await modal.present();
  }
}
