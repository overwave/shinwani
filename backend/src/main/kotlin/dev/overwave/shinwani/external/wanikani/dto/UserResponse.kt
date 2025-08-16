package dev.overwave.shinwani.external.wanikani.dto

import java.time.Instant

data class UserResponse(
    val url: String,
    val dataUpdatedAt: Instant,
    val data: User,
) : ResponseObject(expectedType = "user")
