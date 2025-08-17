package dev.overwave.shinwani.core.user.model

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.NOT_FOUND)
class UserNotFoundException(login: String) : RuntimeException("User $login not found")
