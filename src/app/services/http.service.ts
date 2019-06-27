import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { config } from '../config/config'
import { sprintf } from 'sprintf-js'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  headers = new HttpHeaders().set('content-type', 'application/json')

  constructor(private http: HttpClient) { }

  //servicio post de crecion empleados
  createEmployee(data: any) {
    const url = sprintf('%s/%s', config.url, config.endpoints[0])
    return this.http.post(url, JSON.stringify(data), {
      headers: this.headers, responseType: 'json',
      observe: 'body'
    })
  }

  //servicio put actualizacion de empleado
  updateEmployee(data: any) {
    const url = sprintf('%s/%s', config.url, config.endpoints[0])
    return this.http.put(url, JSON.stringify(data), {
      headers: this.headers, responseType: 'json',
      observe: 'body'
    })
  }

  //servicio delete borrar empleado
  deleteEmployee(id: any) {
    const url = sprintf('%s/%s/%d', config.url, config.endpoints[0], id)
    return this.http.delete(url, {
      headers: this.headers, responseType: 'json',
      observe: 'body'
    })
  }

  //servicio getshow empleado
  showEmployee(id: any) {
    const url = sprintf('%s/%s/%d', config.url, config.endpoints[0], id)
    return this.http.get(url, {
      headers: this.headers, responseType: 'json',
      observe: 'body'
    })
  }
  //servicio get mostrar todos los empleados
  allGetEmployees() {
    const url = sprintf('%s/%s', config.url, config.endpoints[1])
    return this.http.get(url)
  }


}
