import { Component, Input } from "@angular/core";
import { NavParams, ModalController } from "@ionic/angular";

@Component({
  selector: "app-my-modal",
  templateUrl: "my-modal.component.html",
  styleUrls: ["./my-modal.component.scss"]
})
export class MyModal {
  @Input() myParam: string;

  constructor(private modalCtrl:ModalController) {}

  dismiss() {
 
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
