import { Component, OnInit } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-dept-items-angular-component',
  templateUrl: './dept-items-angular-component.component.html',
  styleUrls: ['./dept-items-angular-component.component.css']
})
export class DeptItemsAngularComponentComponent implements OnInit {
  ngOnInit() {
  }
  public files: any[];
  items: any;
  sl: number = 0;
  name2: string = '';
  //name2 with linked with<input name='name' #name [value]=name2/>
  itemcode2: string = '';
  itemname2: string = '';
  deptid2: string = '';
  cost2:number = 0;
  rate2: number = 0;
  date2: string = '';
  picture2: string = '';
  deptname2: string = '';
  location2: string = '';
  angForm: FormGroup;
  constructor(public http: HttpClient, private route: ActivatedRoute,private fb:FormBuilder) {
    this.files = [];
    this.http.get('https://localhost:44346/deptitems/GetAllItems').subscribe(data => {
      this.items = data;
      console.log(this.items);
    });
    this.sl = 0;
    this.route.queryParams.subscribe(params => {
      if (params['deptid'] != undefined) {
        this.deptid2 = params['deptid'];
        //alert(this.deptid2);
        this.deptchange();
      }
    });
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      deptid: ['', Validators.required],
      deptname: ['', Validators.required],
      location: ['', Validators.required],
      itemcode: ['', Validators.required],
      itemname: ['', Validators.required],
      cost: ['', Validators.required],
      rate: ['', Validators.required],
      date: ['', Validators.required],
      picture: ['', Validators.required],
    });
  }

  deptchange() {
    this.items = [];
    this.deptname2 = '';
    this.location2 = '';
    this.http.get('https://localhost:44346/deptitems/GetDept/' + this.deptid2).subscribe(data => {
      if (data != '') {
        this.deptname2 = data[0].deptname;
        this.location2 = data[0].location;
        this.showItems();
      }
    });
  }
  showItems() {
    this.http.get('https://localhost:44346/deptitems/GetItems/' + this.deptid2).subscribe(data => {
      this.items = data;
      console.log(this.items);
    });
    this.sl = 0;
  }
  onFileChanged(event: any) {
    this.files = event.target.files;
    const formData = new FormData();
    formData.append('files', this.files[0]);
    this.http.post('/deptitems/post/', formData).subscribe(data => { this.picture2 = this.files[0].name });
  }
  addItems(itemcode: string, itemname: string, deptid: string, cost: number, rate: number, date: Date, picture: string): void {
    this.items.push({
      itemcode: itemcode,
      itemname: itemname,
      cost: cost,
      rate: rate,
      date: date,
      picture: this.files[0].name,
    });
    this.itemname2 = '';
    this.itemcode2 = '';
    this.cost2 = 0;
    this.rate2 = 0;
    this.date2 = '';
   //this.deptid2 = '';
    //this.deptname2 = '';
   // this.location2 = '';
  }
  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
  }
  show(id: number, itemcode1: string, itemname1: string, deptid1: string, cost1: number, rate1: number, date1: Date, picture1: string): void {
    this.sl = id;
    this.itemname2 = itemname1;
    this.itemcode2 = itemcode1;
    //this.deptid2 = deptid1;
    //this.http.get('https://localhost:44346/deptitems/GetDept/' + this.deptid2)
    //  .subscribe(data => {
    //    this.deptname2 = data[0].deptname;
    //    this.location2 = data[0].location;
    //  });
    this.cost2 = cost1;
    this.rate2 = rate1;
    this.date2 = this.convertDate(new Date(date1));
    this.picture2 = picture1;

  }

  updateItems(itemcode: HTMLInputElement, itemname: HTMLInputElement, deptid: HTMLInputElement, cost: HTMLInputElement, rate: HTMLInputElement, date: HTMLInputElement): void {
    this.items[this.sl].itemcode = itemcode.value;
    this.items[this.sl].itemname = itemname.value;
    //this.items[this.sl].deptid = deptid.value;
    this.items[this.sl].cost = cost.value;
    this.items[this.sl].rate = rate.value;
    this.items[this.sl].date = date.value;


    this.itemname2 = '';
    this.itemcode2 = '';
    // this.deptid2 = "";
    this.cost2 = 0;
    this.rate2 = 0;
    this.date2 = "";
    //this.deptname2 = "";
    //this.location2 = "";
  }
  deleteItems(): void {
    this.items.splice(this.sl, 1);
    this.itemname2 = '';
    this.itemcode2 = '';
    // this.deptid2 = "";
    this.cost2 = 0;
    this.rate2 = 0;
    this.date2 = "";
    //this.deptname2 = "";
    //this.location2 = "";
  }

  deleteAll():void {
    this.http.get('https://localhost:44346/deptitems/DeleteAll/' + this.deptid2).subscribe(data => {
      window.location.href = 'https://localhost:44346/';
    });
  }
  saveAll(): void {
    var i = 0;
    this.http.get('https://localhost:44346/deptitems/DeleteAll/' + this.deptid2)
      .subscribe(data => {
        var url = `deptid=${this.deptid2}&deptname=${this.deptname2}&location=${this.location2}`;
        this.http.get('https://localhost:44346/deptitems/InsertDept?' + url)
          .subscribe(data => {

            //this.items.forEach((key: any, val: any) => {

            //});
            for (let value of this.items) {
              var url1 = `itemcode=${value.itemcode}&itemname=${value.itemname}&deptid=${this.deptid2}&cost=${value.cost}&rate=${value.rate}&date=${value.date}&picture=${value.picture}`;
              this.http.get('https://localhost:44346/deptitems/InsertItems?' + url1)
                .subscribe(data => {
                  i++;
                  if (i == this.items.length) {
                    window.location.href = 'https://localhost:44346/';
                  }
                });
            }
          });
      });
  }

}
