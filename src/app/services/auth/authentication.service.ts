import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { DriverModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: any;
  credential: any;

  constructor() { }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return firebase.auth().signOut();
  }

  getUser() {
    return this.user;
  }

  signupUser(driver: DriverModel, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(driver.email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredential.user.uid}`)
          .set(driver);
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }
}
