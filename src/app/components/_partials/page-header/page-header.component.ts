import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() title = '';
  @Input() bg = 'assets/img/banner/slider-home1.jpg';
  @Input() img = '';
  @Input() cdo = false;
  @Input() sa = false;

  constructor() { }

  ngOnInit(): void {
  }

}
