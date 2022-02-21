import { Component, OnInit } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-books-component',
  templateUrl: './books-component.component.html',
  styleUrls: ['./books-component.component.css']
})
export class BooksComponentComponent implements OnInit {
ngOnInit() {
}
  public files: any[];
  books: any;
  sl: number = 0;
  bookcode2: string = '';
  bookname2: string = '';
  cost2: number = 0;
  rate2: number = 0;
  purchasedate2: string = '';
  picture2: string = '';
  instock2: boolean = true;
  catid2: string = '';
  catname2: string = '';
  location2: string = '';
  angForm: FormGroup;
  constructor(public http: HttpClient, private route: ActivatedRoute, private fb: FormBuilder) {
    this.files = [];
    this.http.get('https://localhost:44346/booksCategory/GetAllBooks').subscribe(data => {
      this.books = data;
      console.log(this.books);
    });
    this.sl = 0;
    this.route.queryParams.subscribe(params => {
      if (params['catid'] != undefined) {
        this.catid2 = params['catid'];
        //alert(this.deptid2);
        this.categorychange();
      }
    });
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      catid: ['', Validators.required],
      catname: ['', Validators.required],
      location: ['', Validators.required],
      bookcode: ['', Validators.required],
      bookname: ['', Validators.required],
      cost: ['', Validators.required],
      rate: ['', Validators.required],
      purchasedate: ['', Validators.required],
      picture: ['', Validators.required],
      instock:['',Validators.required]

    });
  }
  categorychange() {
    this.books = [];
    this.catname2 = '';
    this.location2 = '';
    this.http.get('https://localhost:44346/booksCategory/GetCategorybycatid/' + this.catid2).subscribe(data => {
      if (data != '') {
        this.catname2 = data[0].deptname;
        this.location2 = data[0].location;
        this.showBooks();
      }
    });
  }
  showBooks() {
    this.http.get('https://localhost:44346/booksCategory/GetBooksbycatid/' + this.catid2).subscribe(data => {
      this.books = data;
      console.log(this.books);
    });
    this.sl = 0;
  }
  onFileChanged(event: any) {
    this.files = event.target.files;
    const formData = new FormData();
    formData.append('files', this.files[0]);
    this.http.post('/booksCategory/post/', formData).subscribe(data => { this.picture2 = this.files[0].name });
  }
  addItems(bookcode: string, bookname: string, catid: string, cost: number, rate: number, purchasedate: Date, picture: string,instock:boolean): void {
    this.books.push({
      bookcode: bookcode,
      bookname: bookname,
      cost: cost,
      rate: rate,
      purchasedate: purchasedate,
      picture: this.files[0].name,
      instock:instock
    });
    this.bookname2 = '';
    this.bookcode2 = '';
    this.cost2 = 0;
    this.rate2 = 0;
    this.purchasedate2 = '';
    //this.deptid2 = '';
    //this.deptname2 = '';
    // this.location2 = '';
  }
  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
  }
  show(id: number, bookcode1: string, bookname1: string, catid1: string, cost1: number, rate1: number, purchasedate1: Date, picture1: string,instock1:boolean): void {
    this.sl = id;
    this.bookname2 = bookname1;
    this.bookcode2 = bookcode1;
    //this.deptid2 = deptid1;
    //this.http.get('https://localhost:44346/deptitems/GetDept/' + this.deptid2)
    //  .subscribe(data => {
    //    this.deptname2 = data[0].deptname;
    //    this.location2 = data[0].location;
    //  });
    this.cost2 = cost1;
    this.rate2 = rate1;
    this.purchasedate2 = this.convertDate(new Date(purchasedate1));
    this.picture2 = picture1;
    this.instock2 = instock1;

  }
  updateItems(bookcode: HTMLInputElement, bookname: HTMLInputElement, catid: HTMLInputElement, cost: HTMLInputElement, rate: HTMLInputElement, purchasedate: HTMLInputElement, instock: HTMLInputElement): void {
    this.books[this.sl].bookcode = bookcode.value;
    this.books[this.sl].bookcode = bookname.value;
    //this.items[this.sl].deptid = deptid.value;
    this.books[this.sl].cost = cost.value;
    this.books[this.sl].rate = rate.value;
    this.books[this.sl].purchasedate = purchasedate.value;


    this.bookname2 = '';
    this.bookcode2 = '';
    // this.deptid2 = "";
    this.cost2 = 0;
    this.rate2 = 0;
    this.purchasedate2 = "";
    this.instock2 = true;
    //this.deptname2 = "";
    //this.location2 = "";
  }
  deleteItems(): void {
    this.books.splice(this.sl, 1);
    this.bookname2 = '';
    this.bookcode2 = '';
    // this.deptid2 = "";
    this.cost2 = 0;
    this.rate2 = 0;
    this.purchasedate2 = "";
    this.instock2 = true;
    //this.deptname2 = "";
    //this.location2 = "";
  }
  deleteAll(): void {
    this.http.get('https://localhost:44346/booksCategory/DeleteAll/' + this.catid2).subscribe(data => {
      window.location.href = 'https://localhost:44346/';
    });
  }
  saveAll(): void {
    var i = 0;
    this.http.get('https://localhost:44346/booksCategory/DeleteAll/' + this.catid2)
      .subscribe(data => {
        var url = `deptid=${this.catid2}&deptname=${this.catname2}&location=${this.location2}`;
        this.http.get('https://localhost:44346/booksCategory/InsertCategory?' + url)
          .subscribe(data => {

            //this.items.forEach((key: any, val: any) => {

            //});
            for (let value of this.books) {
              var url1 = `bookcode=${value.bookcode}&bookname=${value.bookname}&deptid=${this.catid2}&cost=${value.cost}&rate=${value.rate}&date=${value.date}&picture=${value.picture}&instock=${value.instock}`;
              this.http.get('https://localhost:44346/booksCategory/InsertBooks?' + url1)
                .subscribe(data => {
                  i++;
                  if (i == this.books.length) {
                    window.location.href = 'https://localhost:44346/';
                  }
                });
            }
          });
      });
  }
}
