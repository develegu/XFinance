import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { auth } from "firebase/app";
import { first } from "rxjs/operators";

@Injectable()
export class AuthManagerService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  // async getUser(): Promise<User> {
  //   const user = await this.angularFireAuth.authState.pipe(first()).toPromise();

  //   return user;
  // }

  // async signInAnonymously(): Promise<User> {
  //   const credentials: auth.UserCredential = await this.angularFireAuth.auth.signInAnonymously();
  //   return credentials.user;
  // }

  // async signInWithGoogle() {
  //   try {
  //     let credentials: auth.UserCredential;
  //     const provider = new auth.GoogleAuthProvider();
  //     credentials = await this.angularFireAuth.auth.signInWithPopup(provider);
  //     return credentials.user;
  //   } catch (e) {
  //     return Promise.reject();
  //   }
  // }

  // async signOut() {
  //   await this.angularFireAuth.auth.signOut();
  //   return Promise.resolve();
  // }
}
