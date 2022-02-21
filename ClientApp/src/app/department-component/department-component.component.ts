import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClientModule,
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';

@Component({
  selector: 'app-department-component',
  templateUrl: './department-component.component.html',
  styleUrls: ['./department-component.component.css']
})
export class DepartmentComponentComponent implements OnInit {

 

  ngOnInit() {
  }
  public files: any[];
  employees: any;
  constructor(public http: HttpClient, private route: Router) {
    this.files = [];
    this.http.get('https://localhost:44346/deptEmployees/GetAllDepts')
      .subscribe(data => {
        this.employees = data;
        // alert(data);
      });
  }
  new() {
    this.route.navigate(['/'])
      .then(() => {
        window.location.href = 'https://localhost:44346/departmentemployees';
      });

  }
}
