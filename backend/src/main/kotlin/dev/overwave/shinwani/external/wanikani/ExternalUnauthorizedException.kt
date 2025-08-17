package dev.overwave.shinwani.external.wanikani

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
class ExternalUnauthorizedException(message: String? = null, cause: Throwable? = null) : RuntimeException(message, cause)