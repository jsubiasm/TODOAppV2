import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    console.log('Eliminado usuario autorizado');
    window.localStorage.removeItem('usuarioAutorizado');
  }

  login(event) {
    console.log('Usuario autorizado [' + this.email + '] [' + this.password + ']');
    window.localStorage.setItem('usuarioAutorizado', this.email);
    this.navCtrl.setRoot(HomePage);
  }
}
