package com.crescendo.digital.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crescendo.digital.model.Role;
import com.crescendo.digital.model.User;
import com.crescendo.digital.repository.IUserRepository;

@Service
public class UserService implements IUserService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(IUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User saveUser(User user)
    {
    	user.setPassword(passwordEncoder.encode(user.getPassword()));
    	user.setRole(Role.USER);
    	user.setCreateTime(LocalDateTime.now());

    	return userRepository.save(user);
    }

    @Override
    public Optional<User> findUserName(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByUsername(String username)
    {
    	return userRepository.findByUsername(username);
    }

    @Override
    @Transactional
    public void makeAdmin(String username) {
    	userRepository.updateUserRole(username, Role.ADMIN);
    }

}
