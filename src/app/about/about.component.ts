import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
Router;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(private router: Router) {}
  onClickBack() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {}
}
