// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.css']
// })
// export class UserProfileComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  constructor(public auth: AuthService, private router: Router) {}

  onClickBack() {
    this.router.navigate(['/tasks']);
  }
}
