package dev.overwave.shinwani.core.user.model

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

class UserExistsException(
    login: String,
) : ResponseStatusException(HttpStatus.CONFLICT, "Login $login already used")
