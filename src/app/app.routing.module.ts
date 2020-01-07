import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then(m => m.LoginModule)
  },
  {
    path: "newfinance",
    loadChildren: () =>
      import("./pages/NewFinance/newfinance.module").then(m => m.newfinanceModule)
  },
  {
    path: "clients",
    loadChildren: () =>
      import("./pages/clients/clients.module").then(m => m.ClientsModule)
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./pages/admin/admin.module").then(m => m.adminModule)
  },
  {
    path: "credit",
    loadChildren: () =>
      import("./pages/credit/credit.module").then(m => m.CreditModule)
  },
  {
    path: "pending",
    loadChildren: () =>
      import("./pages/pending/pending.module").then(m => m.PendingModule)
  },
  {
    path: "cut",
    loadChildren: () => import("./pages/cut/cut.module").then(m => m.CutModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
