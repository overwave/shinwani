package dev.overwave.shinwani.api.user.dto

data class UserSettingsDto(
    val wanikaniApiToken: String,
    val bunproEmail: String,
    val bunproPassword: String? = null
)
