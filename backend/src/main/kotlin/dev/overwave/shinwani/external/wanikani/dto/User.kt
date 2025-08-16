package dev.overwave.shinwani.external.wanikani.dto

import java.time.Instant

data class User(
    val id: String,
    val username: String,
    val level: Int,
    val profileUrl: String,
    val startedAt: Instant,
    val currentVacationStartedAt: Instant?,
    val subscription: Subscription,
    val preferences: Preferences,
)
