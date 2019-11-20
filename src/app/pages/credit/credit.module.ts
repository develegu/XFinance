import { NgModule } from "@angular/core";
import { CreditRoutingModule } from "./credit.routing.module";
import { CreditComponent } from "./credit.component";
import { SharedModule } from "src/app/common/modules/shared.module";
import { MyModalModule } from "src/app/common/modals/my-modal/my-modal.module";

@NgModule({
  imports: [SharedModule, CreditRoutingModule, MyModalModule],
  declarations: [CreditComponent]
})
export class CreditModule {}
