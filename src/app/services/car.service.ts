import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { CarModel } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  public carListRef: firebase.firestore.CollectionReference;

  constructor() {
    const user = firebase.auth().currentUser;
    this.carListRef = firebase
    .firestore()
    .collection(`/userProfile/${user.uid}/cars`);
  }

  addCar(car: CarModel) {
    return this.carListRef.add(car);
  }

  getCars(): firebase.firestore.CollectionReference {
    return this.carListRef;
  }
}
