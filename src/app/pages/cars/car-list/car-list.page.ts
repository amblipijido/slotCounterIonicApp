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
  constructor(private router: Router, private carService: CarService) { }

  ngOnInit() {
  }

  goToCarForm(): void {
    const navigationExtras: NavigationExtras = this.selectedCar;
    this.router.navigate(['/cars/form'], navigationExtras);
  }
}
