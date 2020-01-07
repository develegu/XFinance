import { NgModule } from "@angular/core";
import { adminRoutingModule } from "./MainScreen.routing.module";
import { MainScreen } from "./MainScreen.component";
import { SharedModule } from "src/app/common/modules/shared.module";
import { MyModalModule } from "src/app/common/modals/my-modal/my-modal.module";

@NgModule({
  imports: [SharedModule, MyModalModule, adminRoutingModule],
  declarations: [MainScreen]
})

export class MainScreenModule {

}
