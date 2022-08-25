import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'client';
  productList = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://localhost:7102/api/Products/all').subscribe((result :any) => {
      console.log(result);
      this.productList = result.data;
    }, error => {
      console.log(error)
    });
  }
}
