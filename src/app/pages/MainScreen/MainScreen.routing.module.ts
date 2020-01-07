import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainScreen } from './MainScreen.component';

const routes: Routes = [
  {
    path: "",
    component: MainScreen
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class adminRoutingModule {


  
}
