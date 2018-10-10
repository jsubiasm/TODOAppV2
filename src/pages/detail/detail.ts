import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { TodoServiceProvider } from '../../providers/todo-service/todo-service';


/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  selectedNota: any;
  usuarioAutorizado: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public todoServiceProvider: TodoServiceProvider,
    public toastCtrl: ToastController) {    // If we navigated to this page, we will have an item available as a nav param
    this.selectedNota = navParams.get('nota');
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

  ionViewCanEnter() {
    this.usuarioAutorizado = window.localStorage.getItem('usuarioAutorizado');
    console.log('Usuario autorizado [' + this.usuarioAutorizado + ']');
    return (this.usuarioAutorizado != null && this.usuarioAutorizado != "undefined");
  }

  save(event, notaPantalla) {
    if (notaPantalla.notaTexto && notaPantalla.notaTexto.trim().length > 0) {
      if (parseInt(notaPantalla.notaId) >= 0) {
        console.log('service updateNotaTexto [' + notaPantalla.notaId + '] [' + notaPantalla.notaTexto + '] [' + this.usuarioAutorizado + ']');
        this.todoServiceProvider.updateNotaTexto(notaPantalla.notaId, notaPantalla.notaTexto, this.usuarioAutorizado)
          .subscribe(
            (serviceReturn: any) => {
              this.navCtrl.pop();
            },
            (error) => {
              console.error('service updateNotaTexto error ->');
              console.error(error);
            }
          );
      }
      else {
        console.log('service getUltimaNota [' + this.usuarioAutorizado + ']');
        this.todoServiceProvider.getUltimaNota(this.usuarioAutorizado)
          .subscribe(
            (notasArray: any) => {
              var notaNumeroOrden = 0;
              if (notasArray[0]) {
                notaNumeroOrden = parseInt(notasArray[0].numeroOrden.$numberLong);
                notaNumeroOrden++;
              }
              console.log('service insertNota [' + notaNumeroOrden + '] [' + notaPantalla.notaTexto + '] [' + this.usuarioAutorizado + ']');
              this.todoServiceProvider.insertNota(notaNumeroOrden, notaPantalla.notaTexto, this.usuarioAutorizado)
                .subscribe(
                  (serviceReturn: any) => {
                    this.navCtrl.pop();
                  },
                  (error) => {
                    console.error('service insertNota error ->');
                    console.error(error);
                  }
                );
            },
            (error) => {
              console.error('service getUltimaNota error ->');
              console.error(error);
            }
          );
      }
    }
    else {
      var mensaje = 'Debe introducir un texto para la nota';
      this.mostrarMensaje(mensaje);
    }
  }
}
