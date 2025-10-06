package com.crescendo.digital.service;

import java.util.Optional;

import com.crescendo.digital.model.User;

public interface IUserService {

	User saveUser(User user);

	Optional<User> findUserName(String username);

    Optional<User> findByUsername(String username);

    void makeAdmin(String username);

}
