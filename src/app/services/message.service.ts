import { Injectable } from '@angular/core';
import { pmsAPI } from '../services/swagger-providers/pms-api.provider';
import { HeadersProvider } from '../services/header.provider';
import {AddTemplate} from '../message-overview/message-overview.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends HeadersProvider {

  constructor(private pmsAPI: pmsAPI) {
    super();
  }
  
  postMessage = (messageTemplate : AddTemplate) => {
    const params ={
      data :messageTemplate
    }
    return this.pmsAPI.message_create(params,this.headers);
  }
}
