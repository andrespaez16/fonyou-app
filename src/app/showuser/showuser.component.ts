import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showuser',
  templateUrl: './showuser.component.html',
  styleUrls: ['./showuser.component.scss']
})
export class ShowuserComponent implements OnInit {

  amount: any;
  birth: any;
  lastname: any;
  name: any;
  id: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      let q = p.get('user');
      let r  = q.split(',');
      this.id = r[0];
      this.name = r[1];
      this.lastname = r[2];
      this.birth = r[3];
      this.amount = r[4];
    });
  }

}
