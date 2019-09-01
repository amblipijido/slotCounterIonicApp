import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CarModel } from 'src/app/models/car.model';

@Component({
  selector: 'app-cars',
  templateUrl: './car.form.page.html',
  styleUrls: ['./car.form.page.scss'],
})
export class CarFormPage implements OnInit {

  car: CarModel;
  carForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private router: Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.car = this.router.getCurrentNavigation().extras.state.car;
      }
    });
  }

  ngOnInit() {
    this.carForm = this.formBuilder.group({
      brand: new FormControl( '', Validators.required),
      model: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
      fuelConsumption: new FormControl(0, Validators.required),
    });
  }

  logForm(form) {
    console.log(form.value);
  }

  goToCarList(): void {

  }

}
