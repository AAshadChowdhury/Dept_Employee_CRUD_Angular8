import { Component, OnInit } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';

@Component({
  selector: 'app-dept-component',
  templateUrl: './dept-component.component.html',
  styleUrls: ['./dept-component.component.css']
})
export class DeptComponentComponent implements OnInit {

  ngOnInit() {
  }
  public files: any[];
  items: any;
  constructor(public http: HttpClient) {
    this.files = [];
    this.http.get('https://localhost:44346/deptitems/GetAllDepts')
      .subscribe(data => {
        this.items = data;
        // alert(data);
      });
  }

}
