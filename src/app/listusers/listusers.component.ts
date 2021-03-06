import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListusersComponent implements OnInit {
  //arrglos que contiene la lista de empleados como observable

  employees: Observable<Array<any>> = new Observable()

  //decoradores de comunciacion entre componentes
  @Input('data') data: any
  @Output("getId") getId: EventEmitter<any> = new EventEmitter()
  @Input("refresh") refresh: boolean;

  constructor(private services: HttpService, private changes: ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.changes.markForCheck();
    setInterval(() => {
      this.changes.detectChanges();
      if (this.refresh) {
        this.getAllEmployees();
        console.log("refrescando lista");
      }
    }, 500)
    this.getAllEmployees()
  }
  //funcion de obtener todo los empleados
  getAllEmployees() {
    this.services.allGetEmployees().subscribe((data: any) => {
      this.employees = of(data)
      this.refresh = false;
    }, (e) => {
      console.log(e.errors)
    })
  }

  //funcion de borrar
  deleteEmployee(id: any) {
    this.services.deleteEmployee(id).subscribe(data => {
      this.employees.subscribe(resp => {
        resp = resp.filter(ids => ids.id != id)
        this.employees = of(resp)
      })
    }, (e) => {
      console.log(e, "no exitoso")
    })

  }
  //funcion mostrar un empleado por su id

  showEmployes(id: any) {
    this.services.showEmployee(id).subscribe((data: any) => {
      this.getId.emit(data)
    }, (e) => {
      console.log(e, "no existe o hubo un problema")
    })
  }

}
