import { NgModule } from "@angular/core";
import { adminRoutingModule } from "./newfinance.routing.module";
import { newfinance } from "./newfinance.component";
import { SharedModule } from "src/app/common/modules/shared.module";
import { MyModalModule } from "src/app/common/modals/my-modal/my-modal.module";
import { AngularFireStorage } from '@angular/fire/storage';

@NgModule({
  imports: [SharedModule, MyModalModule, adminRoutingModule],
  declarations: [newfinance]
})

export class newfinanceModule {
  
  constructor(private storage: AngularFireStorage) { }

}
