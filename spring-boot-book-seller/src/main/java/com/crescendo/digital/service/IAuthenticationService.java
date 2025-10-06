package com.crescendo.digital.service;

import com.crescendo.digital.model.User;

public interface IAuthenticationService
{
    User signInAndReturnJWT(User signInRequest);
}
