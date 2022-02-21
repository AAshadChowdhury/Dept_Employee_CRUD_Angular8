import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpClientModule,
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
@Component({
  selector: 'app-dept-items-component',
  templateUrl: './dept-items-component.component.html',
  styleUrls: ['./dept-items-component.component.css']
})
@Injectable({
  providedIn: 'root',
})

export class DeptItemsComponentComponent implements OnInit {
  ngOnInit() {
  }
  public files: any[];
  items: any;
  sl: number = 0;
  itemcode2: string = "";
  itemname2: string = '';
  deptid2: string = "";
  cost2: number = 0;
  rate2: number = 0;
  date2: string = "";
  picture2: string = "";

  constructor(public http: HttpClient) {
    this.files = [];
    this.http.get('https://localhost:44346/deptitems/GetAllItems')
      .subscribe(data => {
        this.items = data;
        console.log(this.items);
      });
    this.sl = 0;
  }
  onFileChanged(event: any) {
    this.files = event.target.files;
    const formData = new FormData();
    formData.append('files', this.files[0]);
    this.http.post('/deptitems/Post/', formData).subscribe(data => {
      this.picture2 = this.files[0].name
    });
  }
  addItems(itemcode: string, itemname: string, deptid: string, cost: number, rate: number, date: Date, picture: string): void {
    this.items.push({
      itemcode: itemcode,
      itemname: itemname,
      deptid: deptid,
      cost: cost,
      rate: rate,
      date: date,
      picture: this.files[0].name,

    });
    this.http.get('/deptitems/InsertItems?itemcode=' + itemcode + '&itemname=' + itemname + '&deptid=' + deptid + '&cost=' + cost +'&rate=' + rate + '&date=' + date + '&picture=' + this.files[0].name)
      .subscribe(data => {
        this.itemname2 = '';
        this.itemcode2 = '';
        this.deptid2 = "";
        this.cost2 = 0;
        this.rate2 = 0;
        this.date2 = "";
      });
  }
  convertDate(inputFormat) {//transfers yyyy-mm-ddThh:mm:ss to yyyy-mm-dd
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
  }
  show(id: number, itemcode1: string, itemname1: string, deptid1: string, cost1: number, rate1: number, date1: Date, picture1: string): void {
    this.sl = id;
    this.itemname2 = itemname1;
    this.itemcode2 = itemcode1;
    this.deptid2 = deptid1;
    this.cost2 = cost1;
    this.rate2 = rate1;
    this.date2 = this.convertDate(new Date(date1));
    this.picture2 = picture1;
  }
  updateItems(itemcode: HTMLInputElement, itemname: HTMLInputElement, deptid: HTMLInputElement, cost: HTMLInputElement, rate: HTMLInputElement, date: HTMLInputElement): void {
    this.items[this.sl].itemcode = itemcode.value;
    this.items[this.sl].itemname = itemname.value;
    this.items[this.sl].deptid = deptid.value;
    this.items[this.sl].cost = cost.value;
    this.items[this.sl].rate = rate.value;
    this.items[this.sl].date = date.value;
    this.http.get('/deptitems/DeleteItemsByItemCode/' + this.itemcode2)
      .subscribe(data => {

        this.http.get('/deptitems/InsertItems?itemcode=' + itemcode.value + '&itemname=' + itemname.value + '&deptid=' + deptid.value + '&cost=' + cost.value + '&rate=' + rate.value + '&date=' + date.value + '&picture=' + this.files[0].name)
          .subscribe(data => {
            this.itemname2 = '';
            this.itemcode2 = '';
            this.deptid2 = "";
            this.cost2 = 0;
            this.rate2 = 0;
            this.date2 = "";
          });
      });
  }
  deleteItems(): void {
    this.items.splice(this.sl, 1);
    this.http.get('/deptitems/DeleteItemsByItemCode/' + this.itemcode2)
      .subscribe(data => {
        this.itemname2 = '';
        this.itemcode2 = '';
        this.deptid2 = "";
        this.cost2 = 0;
        this.rate2 = 0;
        this.date2 = "";
      });
  }
}
