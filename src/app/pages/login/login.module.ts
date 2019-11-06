import { NgModule } from "@angular/core";
import { LoginRoutingModule } from "./login.routing.module";
import { LoginComponent } from "./login.component";
import { SharedModule } from "src/app/common/modules/shared.module";
import { MyModalModule } from "src/app/common/modals/my-modal/my-modal.module";


@NgModule({
  imports: [SharedModule, MyModalModule, LoginRoutingModule],
  declarations: [LoginComponent]
})

export class LoginModule {



}