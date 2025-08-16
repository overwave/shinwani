package dev.overwave.shinwani.external.wanikani

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
class InternalServerException(message: String? = null) : RuntimeException(message)