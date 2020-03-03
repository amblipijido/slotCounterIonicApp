import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CarModel } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.page.html',
  styleUrls: ['./car-list.page.scss'],
})
export class CarListPage implements OnInit {

  selectedCar;
  cars: CarModel[];
  predefinedImage: string;
  constructor(private router: Router, private carService: CarService) { }

  ngOnInit() {
    this.predefinedImage = '../../../../assets/defaultSlotCar.png';
  }

  ionViewWillEnter() {
    this.carService
    .getCars()
    .get()
    .then(eventListSnapshot => {
      this.cars = [];
      eventListSnapshot.forEach(snap => {
        const carImage = snap.data().image;
        this.cars.push({
          id: snap.id,
          brand: snap.data().brand,
          model: snap.data().model,
          group: snap.data().group,
          fuelConsumption: snap.data().fuelConsumption,
          ref: snap.data().ref,
          image: this.obtainCarImage(snap.data().image)
        });
        return false;
      });
    });
  }

  obtainCarImage(image) {
    return image == null ? this.predefinedImage : image;
  }

  goToCarForm(): void {
    const navigationExtras: NavigationExtras = this.selectedCar;
    this.router.navigate(['/cars/form'], navigationExtras);
  }

  deleteCar(car) {

  }
}
