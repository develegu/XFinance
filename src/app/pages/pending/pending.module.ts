import { NgModule } from "@angular/core";
import { PendingRoutingModule } from "./pending.routing.module";
import { PendingComponent } from "./pending.component";
import { SharedModule } from "src/app/common/modules/shared.module";

@NgModule({
  imports: [SharedModule, PendingRoutingModule],
  declarations: [PendingComponent]
})
export class PendingModule {}
