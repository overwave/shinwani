package dev.overwave.shinwani.external.wanikani.dto

import java.time.Instant

data class Review(
    val availableAt: Instant,
    val subjectIds: List<Int>,
)
