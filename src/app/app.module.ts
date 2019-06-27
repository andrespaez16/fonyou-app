import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/**
 * FontAwesome 5.x WebFont
 */
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { AppRoutingModule } from './app-routing.module';
//componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { ListusersComponent } from './listusers/listusers.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
//importacion de hhtp client
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import{HttpService} from './services/http.service'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateuserComponent,
    ListusersComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule, 
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas, far, fab);
  }
}
