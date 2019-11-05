import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreditComponent } from './credit.component';

const routes: Routes = [
  {
    path: "",
    component: CreditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditRoutingModule {}
