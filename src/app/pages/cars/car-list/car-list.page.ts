import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CarModel } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.page.html',
  styleUrls: ['./car-list.page.scss'],
})
export class CarListPage implements OnInit {

  car;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToCarForm(): void {
    const navigationExtras: NavigationExtras = this.car;
    this.router.navigate(['/cars/form'], navigationExtras);
  }
}
