package com.crescendo.digital.security;

import java.util.Collection;
import java.util.Set;

import com.crescendo.digital.model.Role;
import com.crescendo.digital.util.SecurityUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.crescendo.digital.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPrincipal implements UserDetails
{
	private Long id;
	private String username;
	transient private String password; //dont´t show on an searialized places -/não mostra em lugares serializados
	transient private User user; // user for only login operation, don´t use in JWT -usuário apenas para operação de login, não use em JWT -
	private Set<GrantedAuthority> authorities;

	public static UserPrincipal createSuperUser()
	{
		Set<GrantedAuthority> authorities = Set.of(SecurityUtils.convertToAuthority(Role.SYSTEM_MANAGER.name()));

		return UserPrincipal.builder()
				.id(-1L)
				.username("system-administrator")
				.authorities(authorities)
				.build();
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
