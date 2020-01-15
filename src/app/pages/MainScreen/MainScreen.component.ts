import { Component, IterableDiffers } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyModal } from "src/app/common/modals/my-modal/my-modal.component";
import { CommonService } from 'src/app/common/services/common.service';
import { gv } from 'src/app/common/constants';

@Component({
  selector: "app-MainScreen",
  templateUrl: "MainScreen.component.html",
  styleUrls: ["MainScreen.component.scss"]
})

export class MainScreen {

  constructor(
    public modalCtrl: ModalController,
    public db: AngularFirestore,
    public gf: CommonService,
  ) {

  }

  public gv = gv;

  Usuario = {
    Nombre: '',
    Mail: '',
    Contrasena: '',
    Confirmar: '',
    Roll: gv.dueno,
    Organizacion: '',
    Incomplete: false,
    AlertText: ''
  }

  ngOnInit() {
    this.gf.DisableSideMenu();
  }
  
  AgregarFinanciera() {
    this.gf.IrANuevaFinanciera();
  }

  IniciarSesion() {
    this.gf.IrALogin();
  }

}
