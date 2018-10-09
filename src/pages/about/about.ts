import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  usuarioAutorizado: string;
  usuarioAutorizadoEmail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewCanEnter() {
    this.usuarioAutorizado = window.localStorage.getItem('usuarioAutorizado');
    console.log('Usuario autorizado [' + this.usuarioAutorizado + ']');
    this.usuarioAutorizadoEmail = window.localStorage.getItem('usuarioAutorizadoEmail');
    console.log('Usuario autorizado email [' + this.usuarioAutorizadoEmail + ']');
    return (this.usuarioAutorizado != null && this.usuarioAutorizado != "undefined");
  }

}
