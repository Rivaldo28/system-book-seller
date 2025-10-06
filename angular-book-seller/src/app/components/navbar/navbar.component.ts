import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutComponent } from 'src/app/modal/logout/logout.component';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User | null = null;

  @ViewChild(LogoutComponent, { static: true }) logoutComponent: LogoutComponent | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  ngOnInit(): void {}

  isAdmin() {
    return this.currentUser?.role === 'ADMIN';
  }

  createLogoutBook() {
    this.logoutComponent?.showModalLogout();
  }
}
