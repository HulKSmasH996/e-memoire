import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

AuthService;
@Component({
  selector: 'app-taskdashboard',
  templateUrl: './taskdashboard.component.html',
  styleUrls: ['./taskdashboard.component.css'],
})
export class TaskdashboardComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {
    auth.calendarItems = [];
  }

  ngOnInit(): void {}

  onClickUser() {
    this.router.navigate(['/user']);
  }
}
