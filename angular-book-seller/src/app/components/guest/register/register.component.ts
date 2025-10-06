import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string = '';

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  register() {
    this.authenticationService.register(this.user).subscribe(data => {
      this.toastr.success("Registrado com sucesso", 'Seja bem-vindo!');
      this.router.navigate(['/login']);
    }, err => {
      if (err?.status === 409) {
        this.errorMessage = 'O nome de usuário já existe.';
      } else {
        /* this.errorMessage = 'Ocorreu um erro. Erro é: ' + this.errorMessage; */
        this.toastr.error(err, 'Algo deu errado:( ')
        console.log(err);
      }
    });
  }

}
