package dev.overwave.shinwani.core.user.model

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.CONFLICT)
class UserExistsException(login: String) : RuntimeException("Login $login already used")
