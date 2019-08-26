import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  doLoggin() {
    this.authService.loginUser().then(
      () => {
          this.router.navigateByUrl('home');
          this.menu.enable(true);
      },
      error => {
      }
    );
  }
}
