import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TodoServiceProvider } from '../../providers/todo-service/todo-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public todoServiceProvider: TodoServiceProvider,
    public toastCtrl: ToastController) {
  }

  mostrarMensaje(mensaje) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
      showCloseButton: false,
      dismissOnPageChange: true
    });
    toast.present();
  }

  ionViewWillEnter() {
    console.log('Eliminado usuario autorizado');
    window.localStorage.removeItem('usuarioAutorizadoEmail');
    window.localStorage.removeItem('usuarioAutorizado');
  }

  login(event) {
    if (this.email && this.password) {
      this.todoServiceProvider.getUsuario(this.email, this.password)
        .subscribe(
          (usuariosArray: any) => {
            if (!usuariosArray || usuariosArray.length < 1) {
              var mensaje = 'No se ha encontrado ningún usuario con las credenciales proporcionadas';
              console.error('service getUsuario error -> ' + mensaje);
              this.mostrarMensaje(mensaje);
            }
            else if (usuariosArray.length > 1) {
              var mensaje = 'Se ha encontrado más de un usuario con las credenciales proporcionadas';
              console.error('service getUsuario error -> ' + mensaje);
              this.mostrarMensaje(mensaje);
            }
            else if (usuariosArray.length === 1) {
              console.log('Usuario autorizado [' + usuariosArray[0]._id.$oid + ']');
              window.localStorage.setItem('usuarioAutorizadoEmail', this.email);
              window.localStorage.setItem('usuarioAutorizado', usuariosArray[0]._id.$oid);
              this.navCtrl.setRoot(HomePage);
            }
            else {
              var mensaje = 'Error inesperado';
              console.error('service getUsuario error -> ' + mensaje);
              this.mostrarMensaje(mensaje);
            }
          },
          (error) => {
            console.error('service getUsuario error ->');
            console.error(error);
          }
        );
    }
    else {
      var mensaje = 'Debe introducir un usuario y una contraseña';
      this.mostrarMensaje(mensaje);
    }
  }
}
