import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { ListusersComponent } from './listusers/listusers.component';




const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: HomeComponent, data: {
      title: 'Home'
    },
    children: [
      {
        path: 'create', component: CreateuserComponent, data: {
          title: 'Create User'
        }
      },
      {
        path: 'all', component: ListusersComponent, data: {
          title: 'Available Users'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
