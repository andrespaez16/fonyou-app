import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpService } from '../services/http.service';
import { UserData } from '../models/createUser'


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {
  //variables instacia
  name: any = "Nombre del empleado"
  lastName: any = "Apellido del empleado"
  birth: any = "cumpleaños"
  amount: any = "sueldo";

  //decoradores de comunciacion entre componentes
  @Input("user") user: any;
  @Input("editable") editable: boolean = false;
  @Input("title") title: string;

  constructor(private services: HttpService, private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    //logica de dectcion de eventos y cambios  en el formulario
    this.changeDetection.markForCheck();
    setInterval(() => {
      this.changeDetection.detectChanges();
      this.name = this.user.name
      this.lastName = this.user.lastName
      this.birth = this.user.birthdate
      this.amount = this.user.pay
    }, 500)
  }

  //funcio de update y create dependiendo del rol
  handle() {
    if (!this.editable) {
      let data: UserData = {
        name: this.name,
        lastName: this.lastName,
        birthdate: this.birth,
        pay: this.amount
      }
      this.services.createEmployee(data).subscribe((data: any) => {
      }, (e: any) => {
        console.log(e.error)
      })
    }
    else {
      this.services.updateEmployee(this.user.id).subscribe(data => {
        console.log(data, "empleado actualizado")
      }, (e) => {
        console.log(e, "empleado no actualizado")
      })

    }
  }





}
