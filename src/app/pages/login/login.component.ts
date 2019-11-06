import { Component } from "@angular/core";
import { MyModal } from "src/app/common/modals/my-modal/my-modal.component";
import { ModalController } from "@ionic/angular";
import { OverlayEventDetail } from "@ionic/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { gv } from 'src/app/common/constants';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.scss"]
})

export class LoginComponent {

  constructor(private modalController: ModalController,
    public db: AngularFirestore,
    public localStorage: Storage,
    public gf: CommonService) { }

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

  login = {
    mail: '',
    contrasena: ''
  }

  Login() {
    console.log(this.login.mail)
    console.log(this.login.contrasena)

    let subs = this.db.collection(gv.FB_Usuarios,
      ref => ref.where(gv.mail, '==', this.login.mail)).stateChanges().subscribe(serverItems => {
        subs.unsubscribe();

        if (serverItems.length == 0) {
          console.log("No routes");

        } else {
          serverItems.forEach((a, index, array) => {
            console.log(a.payload.doc.data()); //a.payload.doc.id

            let item: any = a.payload.doc.data();
          
            if (a.payload.doc.data()[gv.password] === this.login.contrasena) {
              console.log("login")
              gv.usuario = a.payload.doc.data();
              console.log(gv.usuario)

              this.localStorage.set('user', gv.usuario)
            }

            if (index === (array.length - 1)) {
              console.log("Ya termino");

            }
          });
        }
      })
  }
}
