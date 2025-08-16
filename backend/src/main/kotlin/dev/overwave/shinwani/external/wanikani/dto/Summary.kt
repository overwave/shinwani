package dev.overwave.shinwani.external.wanikani.dto

import java.time.Instant

data class Summary(
    val lessons: Lessons,
    val reviews: Reviews,
    val nextReviewsAt: Instant?,
    val reviewsAvailableUntil: Instant?
)
