package dev.overwave.shinwani.core.user.model.dto

import jakarta.validation.constraints.NotBlank

data class RegisterUserRequestDto(
    @get:NotBlank
    val login: String,
    @get:NotBlank
    val password: String,
)
