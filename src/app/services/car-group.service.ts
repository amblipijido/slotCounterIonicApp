import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarGroupService {

  public carGroupsListRef: firebase.firestore.CollectionReference;

  constructor() {
    this.carGroupsListRef = firebase
          .firestore()
          .collection(`/groups`);
  }

  getCarGroups(): firebase.firestore.CollectionReference {
    return this.carGroupsListRef;
  }
}
