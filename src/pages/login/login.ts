import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

import { TodoServiceProvider } from '../../providers/todo-service/todo-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public todoServiceProvider: TodoServiceProvider) {
  }

  ionViewWillEnter() {
    console.log('Eliminado usuario autorizado');
    window.localStorage.removeItem('usuarioAutorizado');
  }

  login(event) {
    if (this.email && this.password) {
      this.todoServiceProvider.getUsuario(this.email, this.password)
        .subscribe(
          (usuariosArray: any) => {
            if (!usuariosArray || usuariosArray.length < 1) {
              console.error('service getUsuario error -> No se ha encontrado ningún usuario con las credenciales proporcionadas');
            }
            else if (usuariosArray.length > 1) {
              console.error('service getUsuario error -> Se ha encontrado más de un usuario con las credenciales proporcionadas');
            }
            else if (usuariosArray.length === 1) {
              console.log('Usuario autorizado [' + usuariosArray[0]._id.$oid + ']');
              window.localStorage.setItem('usuarioAutorizado', usuariosArray[0]._id.$oid);
              this.navCtrl.setRoot(HomePage);
            }
            else {
              console.error('service getUsuario error -> Error inesperado');
              console.log(usuariosArray);
            }
          },
          (error) => {
            console.error('service getUsuario error ->');
            console.error(error);
          }
        );
    }
  }
}
