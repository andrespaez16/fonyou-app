import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpService } from '../services/http.service';
import { UserData } from '../models/createUser'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name: any;
  lastname: any;
  birth: any;
  amount: any;
  editable: boolean = true;
  user1: number = 0;
  user: number = 0;
  handleView: boolean = false;


  constructor(private route: ActivatedRoute, private title: Title, private router: Router, private services: HttpService) { }

  ngOnInit() {
    this.title.setTitle(this.route.snapshot.data['title']);
  }
  //servicio put del usuario

  updateuser() {
    let data: UserData = {
      name: this.name,
      lastName: this.lastname,
      birthdate: this.birth,
      pay: this.amount
    }
    this.services.updateEmployee(data).subscribe((data: any) => {
    }, (e: any) => {
      console.log(e.error)
    })
  }

  setId(param: any) {
    this.handleView = false;
    this.handleView = true;
    this.user = param;
    this.editable = false;
    console.log(this.user, this.editable)
  }


}
