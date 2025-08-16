package dev.overwave.shinwani.external.wanikani.dto

import java.time.Instant

data class SummaryResponse(
    val url: String,
    val dataUpdatedAt: Instant,
    val data: Summary
) : ResponseObject(expectedType = "report")
