import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { CarModel } from '../../models/car.model';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  public carListRef: firebase.firestore.CollectionReference;
  public storage: firebase.storage.Reference;
  user: firebase.User;

  constructor(public file: File) {
    this.user = firebase.auth().currentUser;
    this.carListRef = firebase
    .firestore()
    .collection(`/userProfile/${this.user.uid}/cars`);
  }

  async addCar(car: CarModel) {
    this.storage = firebase.storage().ref(`/userProfile/${this.user.uid}/cars/${car.id}`);
    let carImageValue;
    if (car.image !== null) {
      this.makeFileIntoBlob(car.image).then(value => {
         carImageValue = value;
      });
      await this.storage.put(carImageValue);
      car.image = this.storage.getDownloadURL();
    }
    await this.carListRef.add(car);
  }


  makeFileIntoBlob(imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = '';
      this.file
        .resolveLocalFilesystemUrl(imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));

          fileName = name;

          // we are provided the name, so now read the file into a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: 'image/jpeg'
          });
          // pass back blob and the name of the file for saving
          // into fire base
          resolve(imgBlob);
        })
        .catch(e => reject(e));
    });
  }

  getCars(): firebase.firestore.CollectionReference {
    return this.carListRef;
  }
}
