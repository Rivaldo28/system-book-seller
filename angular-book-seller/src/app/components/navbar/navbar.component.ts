import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutComponent } from 'src/app/modal/logout/logout.component';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Role } from 'src/app/enum/role.enum';

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

  // FUNÇÃO COM DIAGNÓSTICO
  isAdmin() {
    // Este console.log vai nos mostrar a permissão exata do usuário logado.
    console.log('[DIAGNÓSTICO DE PERMISSÃO] Role do usuário atual:', this.currentUser?.role);

    // A lógica de verificação continua a mesma, agora que o modelo foi corrigido.
    return this.currentUser?.role === Role.ADMIN;
  }

  createLogoutBook() {
    this.logoutComponent?.showModalLogout();
  }
}
