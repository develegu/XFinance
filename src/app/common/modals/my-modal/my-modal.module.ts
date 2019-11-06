import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/common/modules/shared.module";
import { MyModal } from "./my-modal.component";
import { gv } from '../../constants';

@NgModule({
  imports: [SharedModule],
  entryComponents: [MyModal],
  declarations: [MyModal]
})
export class MyModalModule {
  
}
