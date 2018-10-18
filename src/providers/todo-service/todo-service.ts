import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoServiceProvider {

  apiKeySecret: string = 'Api-Key-Secret-Value';

  constructor(public http: HttpClient) {
  }

  getApiKey(usuarioId) {
    var actualDate = new Date();
    var apiKeyContent = ''
      + usuarioId
      + actualDate.getUTCFullYear()
      + (actualDate.getUTCMonth() + 1)
      + actualDate.getUTCDate()
      + actualDate.getUTCHours();
    console.log(apiKeyContent);
    var hmacSha256 = CryptoJS.HmacSHA256(apiKeyContent, this.apiKeySecret);
    var hmacSha256Hex = CryptoJS.enc.Hex.stringify(hmacSha256);
    return hmacSha256Hex;
  }

  getNotas(usuarioId) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoappv2-zxque/service/TODOService/incoming_webhook/getNotas';
    url = url + '?apiKey=' + this.getApiKey(usuarioId);
    url = url + '&usuarioId=' + usuarioId.trim();
    console.log(url);
    return this.http.get(url);
  }

  getUltimaNota(usuarioId) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoappv2-zxque/service/TODOService/incoming_webhook/getUltimaNota';
    url = url + '?usuarioId=' + usuarioId.trim();
    return this.http.get(url);
  }

  insertNota(notaNumeroOrden, notaTexto, usuarioId) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoappv2-zxque/service/TODOService/incoming_webhook/insertNota';
    return this.http.post(url, {
      'notaNumeroOrden': notaNumeroOrden,
      'notaTexto': notaTexto.trim(),
      'usuarioId': usuarioId.trim()
    });
  }

  updateNotaNumeroOrden(notaId, notaNumeroOrden, usuarioId) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoappv2-zxque/service/TODOService/incoming_webhook/updateNotaNumeroOrden';
    return this.http.post(url, {
      'notaId': notaId,
      'notaNumeroOrden': notaNumeroOrden,
      'usuarioId': usuarioId.trim()
    });
  }

  updateNotaTexto(notaId, notaTexto, usuarioId) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoappv2-zxque/service/TODOService/incoming_webhook/updateNotaTexto';
    return this.http.post(url, {
      'notaId': notaId,
      'notaTexto': notaTexto.trim(),
      'usuarioId': usuarioId.trim()
    });
  }

  deleteNota(notaId, usuarioId) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoappv2-zxque/service/TODOService/incoming_webhook/deleteNota';
    url = url + '?notaId=' + notaId;
    url = url + '&usuarioId=' + usuarioId.trim();
    return this.http.get(url);
  }

  getUsuario(usuarioEmail, usuarioPassword) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoappv2-zxque/service/TODOService/incoming_webhook/getUsuario';
    url = url + '?usuarioEmail=' + usuarioEmail.trim();
    url = url + '&usuarioPassword=' + usuarioPassword.trim();
    return this.http.get(url);
  }

}
