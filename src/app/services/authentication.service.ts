import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: any;

  constructor(private router: Router) { }

  loginUser(): Promise<firebase.auth.UserCredential> {
    this.user = firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return this.user;
  }

  logOut() {
    return firebase.auth().signOut();
  }

  getUser() {
    return this.user;
  }
}
