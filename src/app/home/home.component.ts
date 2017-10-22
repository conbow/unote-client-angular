import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../shared';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.isAuthenticated.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
  }
}
