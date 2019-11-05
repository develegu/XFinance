import { NgModule } from "@angular/core";
import { CutRoutingModule } from "./cut.routing.module";
import { CutComponent } from "./cut.component";
import { SharedModule } from "src/app/common/modules/shared.module";

@NgModule({
  imports: [SharedModule, CutRoutingModule],
  declarations: [CutComponent]
})
export class CutModule {}
