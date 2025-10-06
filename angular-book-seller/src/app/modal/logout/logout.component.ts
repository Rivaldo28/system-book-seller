import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

declare var $: any;

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }

  showModalLogout() {
    $('#showModalLogout').modal('show');
  }

}
