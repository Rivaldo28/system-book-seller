package com.crescendo.digital.service;

import com.crescendo.digital.security.UserPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserUtilsService {



    public UserPrincipal getUsuarioLogado() {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        UserPrincipal user = null;

        if (principal instanceof UserPrincipal) {

            user = ((UserPrincipal) principal);

        } else {

            throw new RuntimeException("Usuário não encontrado.");

        }

        return user;

    }



}