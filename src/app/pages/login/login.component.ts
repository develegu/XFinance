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

  ngOnInit() {
    this.gf.DisableSideMenu();
    this.gf.CheckLogin();
  }

  login = {
    email: '',
    password: ''
  }
  errors = {
    email: '',
    password: ''
  };

  Login() {
    this.gf.loginUser(this.login).then((user_return) => {
      if (user_return.user) {
        console.log('User returned');
        console.log(user_return.user);

        this.db.collection(gv.FB_Usuarios).doc(user_return.user.uid).get().subscribe(serverItems => {
          console.log("Search")
          gv.usuario = serverItems.data();
          gv.usuario[gv.key] = user_return.user.uid;

          console.log(gv.usuario[gv.key])
          this.localStorage.set('user', gv.usuario);

          this.login = {
            email: '',
            password: ''
          };
          
          this.gf.ListenersClientesPagos();
          this.gf.ListenersColaboradores();
          this.gf.EnableSideMenu();
  
          this.gf.IrAClientes();
        });
      }
    }).catch((error) => {
      if (error.code === "auth/wrong-password") {
        this.errors.password = 'La contraseña es incorrecta';
      }
      if (error.code === "auth/user-not-found") {
        this.errors.email = 'No existe usuario con ese mail';
      }
      if (error.code === "auth/invalid-email") {
        this.errors.email = 'El formato de mail es incorrecto';
      }

      console.log("login error")
      console.log(error);
    });
  }
}
