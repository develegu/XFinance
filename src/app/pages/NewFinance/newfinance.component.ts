import { Component, IterableDiffers } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyModal } from "src/app/common/modals/my-modal/my-modal.component";
import { CommonService } from 'src/app/common/services/common.service';
import { gv } from 'src/app/common/constants';
import { AngularFireStorage } from '@angular/fire/storage';

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
    private storage: AngularFireStorage
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
    AlertText: '',
    Comercial: '',
    RFC: ''
  }

  ngOnInit() {
    this.gf.DisableSideMenu();
  }

  AgregarFinanciera() {
    this.Usuario.Incomplete = false;
    this.Usuario.AlertText = '';

    this.db.collection(gv.FB_Organizaciones).doc(this.Usuario.Organizacion).collection(gv.FB_Info).get().subscribe(serverItems => {

      if (serverItems.empty) {

        this.gf.CrearCollaborador(this.Usuario.Nombre, this.Usuario.Contrasena, this.Usuario.Mail, this.Usuario.Organizacion,
          100000000, '')
          .then(res => {

            this.db.collection(gv.FB_Organizaciones).doc(this.Usuario.Organizacion).collection(gv.FB_Info).doc(gv.dueno).set({
              [gv.dueno]: res,
              [gv.RFC]: this.Usuario.RFC,
              [gv.Nombre_Comercial]: this.Usuario.Comercial,

            }).then((reponse) => {
              this.gf.Toast('Usuario creado, inicia sesion', 2000);
              this.gf.IrALogin();
            }).catch((error) => {
              this.gf.Toast('Error al crear el usuario', 2000);
            });

            let credito = 1000;
            let total_pagos = 12;
            let periodo = gv.semanal;
            let pago = 100;
            let total_credito = pago * total_pagos;
            let efectivo = 800;
            

            this.db.collection(gv.FB_Organizaciones).doc(this.Usuario.Organizacion).collection(gv.FB_Info).doc(gv.FB_Productos).set({
              [gv.FB_Productos]: {
                [credito + total_pagos + total_credito + periodo]:{
                [gv.credito]: Number(credito),
                [gv.total_pagos]: Number(total_pagos),
                [gv.periodo]: periodo,
                [gv.pago]: Number(pago),
                [gv.total_credito]: Number(total_credito),
                [gv.efectivo]: Number(efectivo)
                }
            }
            }).then((reponse) => {
              this.gf.Toast('Usuario creado, inicia sesion', 2000);
              this.gf.IrALogin();
            }).catch((error) => {
              this.gf.Toast('Error al crear el usuario', 2000);
            });

          });

      } else {
        this.Usuario.Incomplete = true;
        this.Usuario.AlertText = "Este nombre de financiera ya existe";

        this.gf.Toast("Este nombre de financiera ya esta seleccionado", 2000);
      }

    });
  }

  img;
  uploadFile(event) {

    const file = event.target.files[0];
    const filePath = 'name-your/file-path-here';
    const ref = this.storage.ref(filePath);

    this.img = file;
    console.log(this.img)

    //const task = ref.put(file);
  }

}