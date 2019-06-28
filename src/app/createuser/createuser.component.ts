import { Component, OnInit, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter } from '@angular/core';
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
  name: any;
  lastName: any;
  birth: any;
  amount: any;

  //decoradores de comunciacion entre componentes
  @Input("user") user: any;
  @Input("updateUser") updateUser: boolean = false;
  @Input("title") title: string;
  @Output('update') update: EventEmitter<any> = new EventEmitter();

  constructor(private services: HttpService, private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    //logica de dectcion de eventos y cambios  en el formulario
    this.changeDetection.markForCheck();
    this.changeDetection.markForCheck();
    setInterval(() => {
      this.changeDetection.detectChanges();
    }, 100)
  }

  //funcio de update y create dependiendo del rol
  handle() {
    if (!this.updateUser) {
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
      this.services.updateEmployee(
        {
          id: this.user.id,
          name: this.name,
          lastName: this.lastName,
          birthdate: this.birth,
          pay: this.amount
        }
      ).subscribe(data => {
        this.update.emit(this.user.id);
        console.log(data, "empleado actualizado")
      }, (e) => {
        console.log(e, "empleado no actualizado")
      })

    }
  }





}
