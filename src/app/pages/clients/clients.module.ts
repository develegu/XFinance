import { NgModule } from "@angular/core";
import { ClientsRoutingModule } from "./clients.routing.module";
import { ClientsComponent } from "./clients.component";
import { SharedModule } from "src/app/common/modules/shared.module";
import { MyModalModule } from "src/app/common/modals/my-modal/my-modal.module";

@NgModule({
  imports: [SharedModule, MyModalModule, ClientsRoutingModule],
  declarations: [ClientsComponent]
})

export class ClientsModule {

}
