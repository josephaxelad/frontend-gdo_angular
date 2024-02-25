import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() title? : string = "";
  @Input() bg? : string = "assets/img/banner/slider-home1.jpg";
  @Input() img? : string = "";
  @Input() cdo : boolean = false;
  @Input() sa : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
