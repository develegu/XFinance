import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { newfinance } from './newfinance.component';

const routes: Routes = [
  {
    path: "",
    component: newfinance
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class adminRoutingModule {


  
}
