import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ApiService } from '../utils/apiService';

@Component({
  selector: 'samurai-full-data',
  templateUrl: './samurai-data.html',
  styleUrls: ['./samurai-data.css'],
})
export class SamuraiFullData implements OnInit {
  dashboardTitle: string = '';
  someData: string = '0';
  selectedSamurai: any;
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboardTitle = 'SAMURAI-INFO';
  }
}
