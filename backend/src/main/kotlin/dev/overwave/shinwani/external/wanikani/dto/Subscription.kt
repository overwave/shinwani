package dev.overwave.shinwani.external.wanikani.dto

import java.time.Instant

data class Subscription(
    val active: Boolean,
    val type: SubscriptionType,
    val maxLevelGranted: Int,
    val periodEndsAt: Instant?
)
