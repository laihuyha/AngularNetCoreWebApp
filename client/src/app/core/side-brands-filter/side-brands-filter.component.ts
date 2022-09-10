import { Component, Input, OnInit } from '@angular/core';
import { Brand } from 'src/app/share/models/brands';

@Component({
  selector: 'app-side-brands-filter',
  templateUrl: './side-brands-filter.component.html',
  styleUrls: ['./side-brands-filter.component.scss']
})
export class SideBrandsFilterComponent implements OnInit {
  
  @Input() brand: Brand;
  constructor() { }

  ngOnInit(): void {
  }

}
