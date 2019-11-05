import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CutComponent } from './cut.component';

const routes: Routes = [
  {
    path: "",
    component: CutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CutRoutingModule {}
