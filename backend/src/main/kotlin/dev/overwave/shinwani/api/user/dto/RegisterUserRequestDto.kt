package dev.overwave.shinwani.api.user.dto

import jakarta.validation.constraints.NotBlank

data class RegisterUserRequestDto(
    @get:NotBlank
    val login: String,
    @get:NotBlank
    val password: String,
)
