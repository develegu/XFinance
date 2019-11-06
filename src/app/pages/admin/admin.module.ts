import { NgModule } from "@angular/core";
import { adminRoutingModule } from "./admin.routing.module";
import { adminComponent } from "./admin.component";
import { SharedModule } from "src/app/common/modules/shared.module";
import { MyModalModule } from "src/app/common/modals/my-modal/my-modal.module";

@NgModule({
  imports: [SharedModule, MyModalModule, adminRoutingModule],
  declarations: [adminComponent]
})

export class adminModule {

}
