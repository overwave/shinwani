package dev.overwave.shinwani.api.course.dto

data class CountsDto(
    val wanikani: CourseCountsDto? = null,
    val bunpro: CourseCountsDto? = null,
)
