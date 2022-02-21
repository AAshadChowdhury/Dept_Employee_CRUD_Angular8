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
  selector: 'app-img-upload-component',
  templateUrl: './img-upload-component.component.html',
  styleUrls: ['./img-upload-component.component.css']
})
@Injectable({
  providedIn: 'root',
})

export class ImgUploadComponentComponent implements OnInit {



  ngOnInit() {
  }
  public files: any[];
  constructor(private http: HttpClient) { this.files = []; }
  onFileChanged(event: any) {
    this.files = event.target.files;
  }
  onUpload() {
    const formData = new FormData();
    formData.append('files', this.files[0]);
    this.http.post('/api/UploadApics/', formData).subscribe(data => {
      alert(data);
      alert("Uploaded...");
    });
  }

}
