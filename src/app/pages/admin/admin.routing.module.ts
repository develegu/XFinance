import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { adminComponent } from './admin.component';

const routes: Routes = [
  {
    path: "",
    component: adminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class adminRoutingModule {


  
}
