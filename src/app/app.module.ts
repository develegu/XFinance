import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { SharedModule } from './common/modules/shared.module';
import { CommonService } from './common/services/common.service';
import { AuthManagerService } from './common/services/auth-manager.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    CommonService,
    StatusBar,
    AuthManagerService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
