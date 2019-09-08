import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CarModel } from 'src/app/models/car.model';
import { CarGroupService } from 'src/app/services/car-group.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './car.form.page.html',
  styleUrls: ['./car.form.page.scss'],
})
export class CarFormPage implements OnInit {

  car: CarModel;
  carForm: FormGroup;
  avalaibleCarGroups: Array<any>;

  constructor(public formBuilder: FormBuilder, private router: Router,
              private activeRoute: ActivatedRoute, private carGroupService: CarGroupService,
              private carService: CarService) {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.car = this.router.getCurrentNavigation().extras.state.car;
      }
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

  logForm() {
    this.car = this.carForm.value;
    this.carService.addCar(this.car).then(doc => {
      this.router.navigate(['/cars']);
    });
  }
}
