package dev.overwave.shinwani.api.user.dto

data class UserSettingsDto(
    val wanikaniApiToken: String? = null,
    val bunproEmail: String? = null,
    val bunproPassword: String? = null
)
