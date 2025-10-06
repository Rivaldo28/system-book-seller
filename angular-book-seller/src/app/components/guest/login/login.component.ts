import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import 'animate.css';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string = '';
  returnUrl: string = '';

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';

    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate([this.returnUrl]);
      return;
    }
  }

  login() {
    this.authenticationService.login(this.user).subscribe(data => {
      console.log('Login successful. Data received:', data);
      if (data && data.name) {
        this.toastr.success(`Seja bem-vindo, ${data.name}!`);
        this.router.navigate([this.returnUrl]);
      } else {
        console.error('Login successful, but data is invalid:', data);
        this.toastr.error('Ocorreu um erro inesperado após o login. Resposta inválida do servidor.', 'Erro!');
      }
    }, err => {
      console.error(err);
      this.toastr.error("O usuário não existe, a senha é inválida ou o formato do token é inválido.", 'Erro!');
    });
  }

}
