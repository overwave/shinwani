package dev.overwave.shinwani.external.wanikani.dto

import java.time.Instant

data class WaniKaniSubscription(
    val active: Boolean,
    val type: String,
    val maxLevelGranted: Int,
    val periodEndsAt: Instant?
)
