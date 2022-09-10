import { Component, Input, OnInit } from '@angular/core';
import { Type } from 'src/app/share/models/types';

@Component({
  selector: 'app-side-types-filter',
  templateUrl: './side-types-filter.component.html',
  styleUrls: ['./side-types-filter.component.scss']
})
export class SideTypesFilterComponent implements OnInit {

  @Input() type: Type;

  constructor() { }

  ngOnInit(): void {
  }

}
