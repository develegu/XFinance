import { NgModule } from "@angular/core";
import { CreditRoutingModule } from "./credit.routing.module";
import { CreditComponent } from "./credit.component";
import { SharedModule } from "src/app/common/modules/shared.module";

@NgModule({
  imports: [SharedModule, CreditRoutingModule],
  declarations: [CreditComponent]
})
export class CreditModule {}
