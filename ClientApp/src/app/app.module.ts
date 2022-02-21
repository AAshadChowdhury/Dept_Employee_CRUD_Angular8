import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ImgUploadComponentComponent } from './img-upload-component/img-upload-component.component';
import { DeptItemsComponentComponent } from './dept-items-component/dept-items-component.component';
import { DeptItemsAngularComponentComponent } from './dept-items-angular-component/dept-items-angular-component.component';
import { DeptComponentComponent } from './dept-component/dept-component.component';
import { MyRedDirective } from './red.directive';
import { ItemsComponentComponent } from './items-component/items-component.component';
import { BooksComponentComponent } from './books-component/books-component.component';
import { DeptEmployeesComponentComponent } from './dept-employees-component/dept-employees-component.component';
import { DepartmentComponentComponent } from './department-component/department-component.component';
import { LoginComponent } from './login/login.component';
import { httpInterceptor } from './Interceptor/httpInterceptor';

//import { ErrorInterceptor } from './Interceptor/ErrorInterceptor';
import { ErrorInterceptor } from './Interceptor/errorInterceptor';

import { AuthorizationCheck } from './Services/authorizationCheck'
import { AuthenticationService } from './Services/authentication.service';
import { DepartmentEmployeesComponent } from './department-employees/department-employees.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ImgUploadComponentComponent,
    DeptItemsComponentComponent,
    DeptItemsAngularComponentComponent,
    DeptComponentComponent,
    MyRedDirective,
    ItemsComponentComponent,
    BooksComponentComponent,
    DeptEmployeesComponentComponent,
    DepartmentComponentComponent,
    LoginComponent,
    DepartmentEmployeesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'deptemployees', component: DeptEmployeesComponentComponent },
      { path: 'login', component: LoginComponent },
      { path: 'departmentemployees', component: DepartmentEmployeesComponent/*, canActivate: [AuthorizationCheck]*/ }

    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, AuthorizationCheck, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
