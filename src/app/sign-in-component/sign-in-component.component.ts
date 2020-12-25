// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-sign-in-component',
//   templateUrl: './sign-in-component.component.html',
//   styleUrls: ['./sign-in-component.component.css']
// })
// export class SignInComponentComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-component',
  templateUrl: './sign-in-component.component.html',
  styleUrls: ['./sign-in-component.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}
  onClickAbout() {
    this.router.navigate(['/about']);
  }
  ngOnInit() {}
}
