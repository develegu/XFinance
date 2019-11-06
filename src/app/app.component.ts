import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  public appPages = [
    {
      title: "Login",
      url: "/login",
      icon: "home"
    },
    {
      title: "Clientes",
      url: "/clients",
      icon: "list"
    },
    {
      title: "Agregar credito",
      url: "/credit",
      icon: "list"
    },
    {
      title: "Corte",
      url: "/cut",
      icon: "list"
    },
    {
      title: "Pendientes",
      url: "/pending",
      icon: "list"
    },
    {
      title: "Administrador",
      url: "/admin",
      icon: "list"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
