import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateprojectComponent } from './createproject/createproject.component';
import { ChangeroleComponent } from './changerole/changerole.component';
import { LogoutComponent } from './logout/logout.component';
import { CreategoalComponent } from './creategoal/creategoal.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomepageComponent,
    ScrumboardComponent,
    CreateprojectComponent,
    ChangeroleComponent,
    LogoutComponent,
    CreategoalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()

  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
