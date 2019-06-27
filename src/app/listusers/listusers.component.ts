import { Component, OnInit, Output, EventEmitter ,Input, ChangeDetectionStrategy} from '@angular/core';
import{HttpService} from '../services/http.service';
import {UserData} from '../models/createUser'
import{Observable,of} from 'rxjs';


@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.scss']
})
export class ListusersComponent implements OnInit {
  //arrglos que contiene la lista de empleados
  
  employees:Observable<Array<any>> = new Observable()
  @Input ('data')data:any
  @Output("getId")getId:EventEmitter<any>= new EventEmitter()
  constructor(private services:HttpService) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
   this.getAllEmployees()
  }
//funcion de obtener todo los empleados
  getAllEmployees(){
    this.services.allGetEmployees().subscribe((data:any)=>{
      this.employees=of(data)
    },(e)=>{
      console.log(e.errors)
    })
  }

//fucnion de borrar
  deleteEmployee(id:any){
    this.services.deleteEmployee(id).subscribe(data=>{
      this.employees.subscribe(resp=>{
        resp=resp.filter(ids=>ids.id!=id)
        this.employees=of(resp)
      })
    },(e)=>{
      console.log(e,"no exitoso")
    })

  }

  showEmployes(id:any){
    this.services.showEmployee(id).subscribe((data:any)=>{
      this.getId.emit(data)
    },(e)=>{
      console.log(e,"no existe o hubo un problema")
    })
  }

}
