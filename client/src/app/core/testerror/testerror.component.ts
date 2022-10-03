import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testerror',
  templateUrl: './testerror.component.html',
  styleUrls: ['./testerror.component.scss']
})
export class TesterrorComponent implements OnInit {

  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(this.baseURL + 'Products/product/42').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get500Error() {
    this.http.get(this.baseURL + 'buggy/ServerError').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get400Error() {
    this.http.get(this.baseURL + 'buggy/BadRequest').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get400ValidatorError() {
    this.http.get(this.baseURL + 'buggy/NullRef/bonhai').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
