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
      title: "Clients",
      url: "/clients",
      icon: "list"
    },
    {
      title: "Credit",
      url: "/credit",
      icon: "list"
    },
    {
      title: "Cut",
      url: "/cut",
      icon: "list"
    },
    {
      title: "Pending",
      url: "/pending",
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
