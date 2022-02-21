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
  selector: 'app-dept-employees-component',
  templateUrl: './dept-employees-component.component.html',
  styleUrls: ['./dept-employees-component.component.css']
})
export class DeptEmployeesComponentComponent implements OnInit {
  ngOnInit() {
  }
  public files: any[];
  employees: any;
  ActiveSections: any;
  sl: number = 0;
  employeeid2: string = '';
  employeeNo2: string = '';
  name2: string = '';
  deptid2: string = '';
  permanentsectionid2: string = '';
  activesection2: string = '';
  address2: string = '';
  fatherName2: string = '';
  nationalId2: number = 0;
  joindate2: string = '';
  picture2: string = '';
  isActive2: boolean = true;
  deptname2: string = '';
  location2: string = '';
  angForm: FormGroup;
  constructor(public http: HttpClient, private route: ActivatedRoute, private fb : FormBuilder) {
    this.files = [];
    this.http.get('/deptEmployees/GetAllEmployees').subscribe(data => {
      this.employees = data;
      console.log(this.employees);
    });
    this.http.get('/deptEmployees/GetAllSections').subscribe(data => {
      this.ActiveSections = data;
      console.log('Active sections:'+this.ActiveSections);
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

    this.employeeChange()
  }
  createForm() {
    this.angForm = this.fb.group({
      deptid: ['', Validators.required],
      deptname: ['', Validators.required],
      location: ['', Validators.required],
      employeeid: ['', Validators.required],
      employeeNo: ['', Validators.required],
      name: ['', Validators.required],
      permanentsectionid: ['', Validators.required],
      activesection: ['', Validators.required],
      address: ['', Validators.required],
      fatherName: ['', Validators.required],
      nationalId: ['', Validators.required],
      joindate: ['', Validators.required],
      picture: ['', Validators.required],
      isActive: ['', Validators.required],
    });
  }

  deptchange() {
    this.employees = [];
    this.deptname2 = '';
    this.location2 = '';
    this.http.get('https://localhost:44346/deptEmployees/GetDept/' + this.deptid2).subscribe(data => {
      if (data != '') {
        this.deptname2 = data[0].deptname;
        this.location2 = data[0].location;
        this.showEmployees();
        
      }
    });
  }

  employeeChange() {
    this.employeeNo2 = '';
    this.name2 = '';
    
    this.permanentsectionid2 = '';
    this.activesection2 = '';
    this.address2 = '';
    this.fatherName2 = '';
    this.nationalId2 = 0;
    this.joindate2 = '';
    this.picture2 = '';
    this.isActive2 = true;
    this.http.get('https://localhost:44346/deptEmployees/GetEmployee/' + this.employeeid2).subscribe(data => {
      if (data != '') {
        this.employeeNo2 = data[0].employeeNo;
        this.name2 = data[0].name;
        this.permanentsectionid2 = data[0].permanentsectionid;
        this.activesection2 = data[0].activesection;
        this.address2 = data[0].address;
        this.fatherName2 = data[0].fatherName;
        this.nationalId2 = data[0].nationalId;
        this.joindate2 = this.convertDate(new Date(data[0].joindate));
        this.picture2 = this.files[0].picture;
        this.isActive2 = data[0].isActive;
      }
    });
  }

  showEmployees() {
    this.http.get('/deptEmployees/GetEmployeesbydepid/' + this.deptid2).subscribe(data => {
      this.employees = data;
      console.log(this.employees);
    });
    this.sl = 0;
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
    const formData = new FormData();
    formData.append('files', this.files[0]);
    this.http.post('/deptEmployees/Post', formData).subscribe(data => {
      this.picture2 = this.files[0].name
    });
  }

  addItems(employeeid: string, employeeNo: string, name: string,permanentsectionid: string, activesection: string, address: string, fatherName: string, nationalId: number, joindate: Date, picture: string, isActive:boolean): void {
    //alert(employeeid);
    //alert(name);
    //alert(permanentsectionid);
    //alert(activesection);
    //alert(address);
    //alert(fatherName);
    //alert(nationalId);

    this.employees.push({
      employeeid: employeeid,
      employeeNo: employeeNo,
      name:name,
      permanentsectionid: permanentsectionid,
     activesection: activesection,
      address: address,
      fatherName: fatherName,
      nationalId: nationalId,
      joindate: joindate,
      picture: this.files[0].name,
      isActive: isActive
    });
    this.employeeid2 = '';
    this.employeeNo2 = '';
    this.name2 = '';
    this.permanentsectionid2 = '';
    this.activesection2 = '';
    this.address2 = '';
    this.fatherName2 = '';
    this.nationalId2 = 0;
    this.joindate2 = '';
    //this.deptid2 = '';
    //this.deptname2 = '';
    // this.location2 = '';
  }
  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
  }

  show(id: number, employeeid1: string, employeeNo1: string, name1: string, permanentsectionid1: string, activesection1: string, address1: string, fatherName1: string, nationalId1: number, joindate1: Date, picture1: string, isActive1: boolean): void {
    this.sl = id;
    this.employeeid2 = employeeid1;
    this.employeeNo2 = employeeNo1;
    this.name2 = name1;
    this.permanentsectionid2 = permanentsectionid1;
    this.activesection2 = activesection1;
    this.address2 = address1;
    this.fatherName2= fatherName1;
    this.nationalId2 = nationalId1;
    //this.deptid2 = deptid1;
    //this.http.get('https://localhost:44346/deptitems/GetDept/' + this.deptid2)
    //  .subscribe(data => {
    //    this.deptname2 = data[0].deptname;
    //    this.location2 = data[0].location;
    //  });
   
    this.joindate2 = this.convertDate(new Date(joindate1));
    this.picture2 = picture1;
    this.isActive2 = isActive1;

  }

  updateItems(employeeid: HTMLInputElement, employeeNo: HTMLInputElement, name: HTMLInputElement, deptid: HTMLInputElement, permanentsectionid: HTMLInputElement, activesection: HTMLInputElement, address: HTMLInputElement, fatherName: HTMLInputElement, nationalId: HTMLInputElement, joindate: HTMLInputElement, picture: string, isActive: HTMLInputElement): void {
    this.employees[this.sl].employeeid = employeeid.value;
    this.employees[this.sl].employeeNo = employeeNo.value;
    //this.items[this.sl].deptid = deptid.value;
    this.employees[this.sl].name = name.value;
    this.employees[this.sl].permanentsectionid = permanentsectionid.value;
    this.employees[this.sl].activesection = activesection.value;
    this.employees[this.sl].address = address.value;
    this.employees[this.sl].fatherName = fatherName.value;
    this.employees[this.sl].nationalId = nationalId.value;
    this.employees[this.sl].joindate = joindate.value;
    this.employees[this.sl].picture = this.files[0].name,
    this.employees[this.sl].isActive = isActive.value;


    this.employeeid2 = '';
    this.employeeNo2 = '';
    this.name2 = '';
    this.permanentsectionid2 = '';
    this.activesection2 = '';
    this.address2 = '';
    this.fatherName2 = '';
    this.nationalId2 = 0;
    this.joindate2 = '';
    //this.deptname2 = "";
    //this.location2 = "";
  }
  deleteItems(): void {
    this.employees.splice(this.sl, 1);
    this.employeeid2 = '';
    this.employeeNo2 = '';
    this.name2 = '';
    this.permanentsectionid2 = '';
    this.activesection2 = '';
    this.address2 = '';
    this.fatherName2 = '';
    this.nationalId2 = 0;
    this.joindate2 = '';
    //this.deptname2 = "";
    //this.location2 = "";
  }
  deleteAll(): void {
    this.http.get('https://localhost:44346/deptEmployees/DeleteAll/' + this.deptid2).subscribe(data => {
      window.location.href = 'https://localhost:44346/departmentemployees';
    });
  }

  saveAll(): void {
    var i = 0;
    this.http.get('https://localhost:44346/deptEmployees/DeleteAll/' + this.deptid2)
      .subscribe(data => {
        var url = `deptid=${this.deptid2}&deptname=${this.deptname2}&location=${this.location2}`;
        this.http.get('https://localhost:44346/deptEmployees/InsertDept?' + url)
          .subscribe(data => {

            //this.items.forEach((key: any, val: any) => {

            //});
            for (let value of this.employees) {
              var url1 = `employeeid=${value.employeeid}&employeeNo=${value.employeeNo}&name=${value.name}&deptid=${this.deptid2}&permanentsectionid=${value.permanentsectionid}&activesection=${value.activesection}&address=${value.address}&fatherName=${value.fatherName}&nationalId=${value.nationalId}&joindate=${value.joindate}&picture=${value.picture}&isActive=${value.isActive}`;
              this.http.get('https://localhost:44346/deptEmployees/InsertEmployees?' + url1)
                .subscribe(data => {
                  i++;
                  if (i == this.employees.length) {
                    window.location.reload();
                   // window.location.href = 'https://localhost:44346/';
                  }
                });
            }
            if (i == this.employees.length) {
              window.location.reload();
              // window.location.href = 'https://localhost:44346/';
            }
          });
      });
  }
}
