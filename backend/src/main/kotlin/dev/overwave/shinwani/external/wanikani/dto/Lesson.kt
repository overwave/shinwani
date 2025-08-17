package dev.overwave.shinwani.external.wanikani.dto

import java.time.Instant

data class Lesson(
    val availableAt: Instant,
    val subjectIds: List<Int>,
)
