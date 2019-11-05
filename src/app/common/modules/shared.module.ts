import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgPipesModule } from "ngx-pipes";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

const ENTRY_COMPONENTS: any[] = [];

const COMPONENTS: any[] = [];

const MODULES: any[] = [
  CommonModule,
  NgPipesModule,
  IonicModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [...ENTRY_COMPONENTS, ...COMPONENTS],
  imports: [...MODULES],
  entryComponents: [...ENTRY_COMPONENTS],
  exports: [...COMPONENTS, ...MODULES]
})
export class SharedModule {}
