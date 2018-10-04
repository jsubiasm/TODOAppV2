import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoServiceProvider {

  constructor(public http: HttpClient) {
  }

  getNotas() {
    return this.http.get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoapp-rufkc/service/TODOService/incoming_webhook/getNotas');
  }

  getUltimaNota() {
    return this.http.get('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoapp-rufkc/service/TODOService/incoming_webhook/getUltimaNota');
  }

  insertNota(notaNumeroOrden, notaTexto) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoapp-rufkc/service/TODOService/incoming_webhook/insertNota';
    url = url + '?notaNumeroOrden=' + notaNumeroOrden + '&notaTexto=' + notaTexto;
    return this.http.get(url);
  }

  updateNotaNumeroOrden(notaId, notaNumeroOrden) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoapp-rufkc/service/TODOService/incoming_webhook/updateNotaNumeroOrden';
    url = url + '?notaId=' + notaId + '&notaNumeroOrden=' + notaNumeroOrden;
    return this.http.get(url);
  }

  updateNotaTexto(notaId, notaTexto) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoapp-rufkc/service/TODOService/incoming_webhook/updateNotaTexto';
    url = url + '?notaId=' + notaId + '&notaTexto=' + notaTexto;
    return this.http.get(url);
  }

  deleteNota(notaId) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoapp-rufkc/service/TODOService/incoming_webhook/deleteNota';
    url = url + '?notaId=' + notaId;
    return this.http.get(url);
  }

}
