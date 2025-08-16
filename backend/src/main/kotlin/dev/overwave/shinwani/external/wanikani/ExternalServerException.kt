package dev.overwave.shinwani.external.wanikani

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.BAD_GATEWAY)
class ExternalServerException(message: String? = null) : RuntimeException(message)