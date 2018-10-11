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

  usuarioAutorizado: string;
  usuarioAutorizadoEmail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewCanEnter() {
    this.usuarioAutorizado = window.localStorage.getItem('usuarioAutorizado');
    console.log('Usuario autorizado [' + this.usuarioAutorizado + ']');
    this.usuarioAutorizadoEmail = window.localStorage.getItem('usuarioAutorizadoEmail');
    console.log('Usuario autorizado email [' + this.usuarioAutorizadoEmail + ']');

    // pruebas criptografía

    var hmacSha256 = CryptoJS.HmacSHA256(this.usuarioAutorizadoEmail, 'clave secreta');
    var hmacSha256B64 = CryptoJS.enc.Base64.stringify(hmacSha256);
    var hmacSha256Hex = CryptoJS.enc.Hex.stringify(hmacSha256);
    var hashSha256 = CryptoJS.SHA256(this.usuarioAutorizadoEmail);
    var hashSha256B64 = CryptoJS.enc.Base64.stringify(hashSha256);
    var hashSha256Hex = CryptoJS.enc.Hex.stringify(hashSha256);

    console.log('hmacSha256B64 [' + this.usuarioAutorizadoEmail + '] -> ');
    console.log(hmacSha256B64);
    console.log('hmacSha256Hex [' + this.usuarioAutorizadoEmail + '] -> ');
    console.log(hmacSha256Hex);
    console.log('hashSha256B64 [' + this.usuarioAutorizadoEmail + '] -> ');
    console.log(hashSha256B64);
    console.log('hashSha256Hex [' + this.usuarioAutorizadoEmail + '] -> ');
    console.log(hashSha256Hex);

    return (this.usuarioAutorizado != null && this.usuarioAutorizado != "undefined");
  }

}
