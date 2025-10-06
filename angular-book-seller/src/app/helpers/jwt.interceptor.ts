import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Pega o usuário atual (que contém o token) do serviço de autenticação
        const currentUser = this.authenticationService.currentUserValue;

        // Verifica se o usuário está logado e se o pedido é para a nossa API
        if (currentUser && currentUser.token && request.url.startsWith('http://localhost:5000/api/')) {
            // Clona o pedido e adiciona o cabeçalho de autorização com o token JWT
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        // Envia o pedido (com ou sem o cabeçalho) para o próximo passo
        return next.handle(request);
    }
}
