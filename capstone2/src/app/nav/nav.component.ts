import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';

// import {MatToolbarModule} from '@angular/material/toolbar'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @ViewChild('drawer', {static: false})
  drawer: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

}
