import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CarModel } from 'src/app/models/car.model';
import { CarGroupService } from 'src/app/services/car-group.service';
import { CarService } from 'src/app/services/car.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-cars',
  templateUrl: './car.form.page.html',
  styleUrls: ['./car.form.page.scss'],
})
export class CarFormPage implements OnInit {

  car: CarModel;
  carForm: FormGroup;
  avalaibleCarGroups: Array<any>;
  currentImage: any;

  constructor(public formBuilder: FormBuilder, private router: Router,
              private activeRoute: ActivatedRoute, private carGroupService: CarGroupService,
              private carService: CarService, private camera: Camera, public toastController: ToastController) {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.car = this.router.getCurrentNavigation().extras.state.car;
      }
      this.currentImage = null;
    });
  }

  ngOnInit() {
    this.carGroupService.getCarGroups().get().then(carGroupsSnapShot => {
      this.avalaibleCarGroups = [];
      carGroupsSnapShot.forEach(snap => {
        this.avalaibleCarGroups.push({
          id: snap.id,
          name: snap.data().name,
          description: snap.data().description,
        });
        return false;
      });
    });
    this.carForm = this.formBuilder.group({
      brand: new FormControl( '', Validators.required),
      model: new FormControl('', Validators.required),
      ref: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
      fuelConsumption: new FormControl(0, Validators.required),
    });
  }


  ionViewWillLeave() {
    this.currentImage = null;
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = imageData;
    }, async (err) => {
      const toast = await this.toastController.create({
        message: err,
        duration: 5000
      });
      toast.present();
    });
  }

  logForm() {
    this.car = {
      brand: this.carForm.value.brand,
      model: this.carForm.value.model,
      ref: this.carForm.value.ref,
      group: this.carForm.value.group,
      fuelConsumption: this.carForm.value.fuelConsumption,
      image: this.currentImage
    };
    this.carService.addCar(this.car).then(() => {
      this.router.navigate(['/cars']);
    });
  }
}
