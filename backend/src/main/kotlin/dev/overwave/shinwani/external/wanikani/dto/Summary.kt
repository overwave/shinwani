package dev.overwave.shinwani.external.wanikani.dto

import java.time.Instant

data class Summary(
    val lessons: List<Lesson>,
    val reviews: List<Review>,
    val nextReviewsAt: Instant?,
)
