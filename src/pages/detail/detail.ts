import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public todoServiceProvider: TodoServiceProvider) {    // If we navigated to this page, we will have an item available as a nav param
    this.selectedNota = navParams.get('nota');
  }

  ionViewCanEnter() {
    let usuarioAutorizado = window.localStorage.getItem('usuarioAutorizado');
    console.log('Usuario autorizado [' + usuarioAutorizado + ']');
    return (usuarioAutorizado != null && usuarioAutorizado != "undefined");
  }

  save(event, notaPantalla) {
    if (parseInt(notaPantalla.notaId) >= 0) {
      console.log('service updateNotaTexto [' + notaPantalla.notaId + '] [' + notaPantalla.notaTexto + ']');
      this.todoServiceProvider.updateNotaTexto(notaPantalla.notaId, notaPantalla.notaTexto)
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
      console.log('service getUltimaNota');
      this.todoServiceProvider.getUltimaNota()
        .subscribe(
          (notasArray: any) => {
            var notaNumeroOrden = 0;
            if (notasArray[0]) {
              notaNumeroOrden = parseInt(notasArray[0].numeroOrden.$numberLong);
              notaNumeroOrden++;
            }
            console.log('service insertNota [' + notaNumeroOrden + '] [' + notaPantalla.notaTexto + ']');
            this.todoServiceProvider.insertNota(notaNumeroOrden, notaPantalla.notaTexto)
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
}
