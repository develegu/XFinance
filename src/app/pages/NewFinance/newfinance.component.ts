import { Component, IterableDiffers } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyModal } from "src/app/common/modals/my-modal/my-modal.component";
import { CommonService } from 'src/app/common/services/common.service';
import { gv } from 'src/app/common/constants';

@Component({
  selector: "app-newfinance",
  templateUrl: "newfinance.component.html",
  styleUrls: ["newfinance.component.scss"]
})

export class newfinance {

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
    this.Usuario.Incomplete = false;
    this.Usuario.AlertText = '';

    this.db.collection(gv.FB_Organizaciones).doc(this.Usuario.Organizacion).collection(gv.info).get().subscribe(serverItems => {

      if (serverItems.empty) {

        this.gf.CrearCollaborador(this.Usuario.Nombre, this.Usuario.Contrasena, this.Usuario.Mail, this.Usuario.Organizacion,
          100000000, '')
          .then(res => {

            this.db.collection(gv.FB_Organizaciones).doc(this.Usuario.Organizacion).collection(gv.info).add({
              [gv.dueno]: res
            }).then((reponse) => {
              this.gf.Toast('Cliente agregado', 2000);
            }).catch((error) => {
              this.gf.Toast('Error al agregar cliente', 2000);
            });

          });

      } else {
        this.Usuario.Incomplete = true;
        this.Usuario.AlertText = "Este nombre de financiera ya existe";

        console.log("this is not empty")
      }

    });
  }

}