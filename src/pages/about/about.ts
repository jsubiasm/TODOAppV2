import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as CryptoJS from 'crypto-js';

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

  cadenaEncriptada: string;

  usuarioAutorizado: string;
  usuarioAutorizadoEmail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewCanEnter() {

    var hash = CryptoJS.HmacSHA256('Mensaje a encriptar', 'clave secreta');
    var hashInB64 = CryptoJS.enc.Base64.stringify(hash);
    var hashInHex = CryptoJS.enc.Hex.stringify(hash);
    this.cadenaEncriptada = '[' + hashInB64 + '][' + hashInHex + ']';
    console.log('Cadena encriptada [' + this.cadenaEncriptada + ']');

    this.usuarioAutorizado = window.localStorage.getItem('usuarioAutorizado');
    console.log('Usuario autorizado [' + this.usuarioAutorizado + ']');
    this.usuarioAutorizadoEmail = window.localStorage.getItem('usuarioAutorizadoEmail');
    console.log('Usuario autorizado email [' + this.usuarioAutorizadoEmail + ']');
    return (this.usuarioAutorizado != null && this.usuarioAutorizado != "undefined");
  }

}
