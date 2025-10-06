package com.crescendo.digital.service;

import com.crescendo.digital.model.User;
import com.crescendo.digital.security.UserPrincipal;
import com.crescendo.digital.security.jwt.IJwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService implements IAuthenticationService{

    private final AuthenticationManager authenticationManager;
    private final IJwtProvider jwtProvider;

    @Autowired
    public AuthenticationService(AuthenticationManager authenticationManager, IJwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }
//    public User signInAndReturnJWT(User signInRequest)
//    {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword())
//        );
//
//        UserPrincipal userPrincipal = (UserPrincipal)  authentication.getPrincipal();
//        String jwt = jwtProvider.generateToken(userPrincipal);
//
//        User signIUser = userPrincipal.getUser();
//        signIUser.setToken(jwt);
//
//        return signIUser;
//    }

    public User signInAndReturnJWT(User signInRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword())
        );

        if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal)) {
            throw new InternalAuthenticationServiceException("Não foi possível obter os detalhes do usuário após a autenticação.");
        }

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User signInUser = userPrincipal.getUser();

        if (signInUser == null) {
            throw new InternalAuthenticationServiceException("O objeto User dentro do UserPrincipal está nulo. Verifique o CustomUserDetailsService.");
        }

        String jwt = jwtProvider.generateToken(userPrincipal);
        signInUser.setToken(jwt);

        return signInUser;
    }

}
