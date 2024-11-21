import { Component, Input, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
 
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent implements OnInit {

    @Input() pageTitle?: string;
    @Input() additionalData?: string;

    
  ngOnInit(): void {}

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) {}

  navigateTo(endPoint: string) {
    //this.service.logout();
    this.router.navigate([endPoint]);
  }
}
