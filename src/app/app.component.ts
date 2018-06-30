import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { LoginService } from './login/login.service';
import { ProfileService } from './profile/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.loginService.isLoggedIn().subscribe(res => {
      this.loginService.loggedIn = res.loggedIn;
      if (res.loggedIn) {
        this.profileService.getProfile().subscribe(() => {
          this.spinner.hide();
        });
      } else {
        this.spinner.hide();
      }
    }, (err) => {
      alert('app component err ' + err);
    });
  }
}
