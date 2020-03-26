import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
// import { Utility } from '../utility.service';

export interface TokenRes {
  data?: any
}

@Injectable()
export class HeadersProvider {

  public headers: Headers;
  constructor() {
    // super();
    this.headers = new Headers();
    this.addBasicHeaders();
  }

  /**
   * Adds a header to the request headers
   * @method
   * @name BaseProvider#addHeader
   * @param {string} key - The key of the header
   * @param {string} value - The value of the header
   */
  protected addHeader(key: string, value: string): void {
    this.headers.append(key, value);
  }


  /**
   * Removes the header of the given key
   * @param key = the key of the header
   */
  protected removeHeader(key: string): void {
    this.headers.delete(key);
  }

  /**
   * Replaces the header with the given key, with value
   * @param key - the key of the header
   * @param value - the value of the header
   */
  protected replaceHeader(key: string, value: string): void {
    this.removeHeader(key);
    this.addHeader(key, value);
  }

  /**
   * Gets the authorization token
   * @method
   * @name BaseProvider#getToken
   * @returns {string} the authorization token
   */
  protected getToken(): any {
    if (localStorage.getItem('token')) {
      let token = JSON.parse(localStorage.getItem('token'));
      return token;
    }
  }

  /**
   * Adds the headers that are going to be sent in every request
   * @method
   * @name BaseProvider#addBasicHeaders
   * @returns {string} the authorization token
   */
  protected addBasicHeaders(): void {
    let authToken = this.getToken();
    this.addHeader('X-Requested-With', 'XMLHttpRequest');
    this.addHeader('Accept', 'application/json');
    this.addHeader('Content-Type', 'application/json');
    if (authToken) {
      this.addHeader('Authorization', ('token ' + authToken.token));
    }
  }

  protected clearHeaders(): void {
    this.headers = new Headers();
  }
}
