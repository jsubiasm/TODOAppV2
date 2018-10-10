import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';

import { TodoServiceProvider } from '../../providers/todo-service/todo-service';

import { Nota } from '../../model/nota';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arrayNotas: Nota[];
  usuarioAutorizado: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public todoServiceProvider: TodoServiceProvider) {
  }

  ionViewCanEnter() {
    this.usuarioAutorizado = window.localStorage.getItem('usuarioAutorizado');
    console.log('Usuario autorizado [' + this.usuarioAutorizado + ']');
    return (this.usuarioAutorizado != null && this.usuarioAutorizado != "undefined");
  }

  ionViewWillEnter() {
    this.getNotas();
  }

  /*
  ionViewDidLoad() { console.log('service ionViewDidLoad'); }
  ionViewWillEnter() { console.log('service ionViewWillEnter'); }
  ionViewDidEnter() { console.log('service ionViewDidEnter'); }
  ionViewWillLeave() { console.log('service ionViewWillLeave'); }
  ionViewDidLeave() { console.log('service ionViewDidLeave'); }
  ionViewWillUnload() { console.log('service ionViewWillUnload'); }
  ionViewCanEnter() { console.log('service ionViewCanEnter'); }
  ionViewCanLeave() { console.log('service ionViewCanLeave'); }
  */

  getNotas() {
    this.arrayNotas = [];
    console.log('service getNotas [' + this.usuarioAutorizado + ']');
    this.todoServiceProvider.getNotas(this.usuarioAutorizado)
      .subscribe(
        (notasArray: any) => {
          var i;
          for (i = 0; i < notasArray.length; i++) {
            var nota = notasArray[i];
            this.arrayNotas.push(
              new Nota(
                parseInt(nota.identificador.$numberLong),
                parseInt(nota.numeroOrden.$numberLong),
                nota.texto
              )
            );
          }
        },
        (error) => {
          console.error('service getNotas error ->');
          console.error(error);
        }
      );
  }

  reorderNotas(indexes) {
    let notaElement = this.arrayNotas[indexes.from];
    this.arrayNotas.splice(indexes.from, 1);
    this.arrayNotas.splice(indexes.to, 0, notaElement);
    var i;
    for (i = 0; i < this.arrayNotas.length; i++) {
      let notaItem = this.arrayNotas[i];
      console.log('service updateNotaNumeroOrden [' + notaItem.notaId + '] [' + i + '] [' + this.usuarioAutorizado + ']');
      this.todoServiceProvider.updateNotaNumeroOrden(notaItem.notaId, i, this.usuarioAutorizado)
        .subscribe(
          (serviceReturn: any) => {
            // this.getNotas();
          },
          (error) => {
            console.error('service updateNotaNumeroOrden error ->');
            console.error(error);
          }
        );
    }
  }

  delete(event, nota) {
    console.log('service deleteNota [' + nota.notaId + '] [' + this.usuarioAutorizado + ']');
    this.todoServiceProvider.deleteNota(nota.notaId, this.usuarioAutorizado)
      .subscribe(
        (serviceReturn: any) => {
          this.getNotas();
        },
        (error) => {
          console.error('service deleteNota error ->');
          console.error(error);
        }
      );
  }

  edit(event, nota) {
    this.navCtrl.push(DetailPage, {
      nota: nota
    });
  }

  insert(event) {
    this.navCtrl.push(DetailPage, {
      nota: new Nota(null, null, '')
    });
  }

}
