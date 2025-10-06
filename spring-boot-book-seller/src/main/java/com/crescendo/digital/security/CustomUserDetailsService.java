package com.crescendo.digital.security;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.crescendo.digital.model.User;
import com.crescendo.digital.service.IUserService;
import com.crescendo.digital.util.SecurityUtils;


@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	private IUserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userService.findUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));

        Set<GrantedAuthority> authorities = Set.of(SecurityUtils.convertToAuthority("ROLE_" + user.getRole().name()));

        return UserPrincipal.builder()
                .user(user)
                .id(user.getId())
                .username(user.getUsername()) // use user.getUsername() aqui, não o parâmetro
                .password(user.getPassword()) // senha já criptografada
                .authorities(authorities)
                .build();
    }


//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//	    User user = userService.findUserName(username)
//	            .orElseThrow(() -> new UsernameNotFoundException(username));
//
//	    Set<GrantedAuthority> authorities = Set.of(SecurityUtils.convertToAuthority(user.getRole().name()));
//
//	    UserPrincipal userPrincipal = new UserPrincipal();
//	    userPrincipal.setUser(user);
//	    userPrincipal.setId(user.getId());
//	    userPrincipal.setUsername(username);
//	    userPrincipal.setPassword(user.getPassword());
//	    userPrincipal.setAuthorities(authorities);
//
//	    return userPrincipal;
//	}
}
