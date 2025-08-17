package dev.overwave.shinwani.core.course.service

import dev.overwave.shinwani.api.course.dto.CountsDto
import dev.overwave.shinwani.api.course.dto.CourseCountsDto
import org.springframework.stereotype.Service

@Service
class CountsService {
    fun getCounts(): CountsDto =
        CountsDto(
            wanikani = CourseCountsDto(
                lessons = listOf(0, 10, 100).random(),
                reviews = listOf(0, 20, 50).random(),
                heap = listOf(0, 5).random(),
            ),
            bunpro = CourseCountsDto(
                lessons = listOf(0, 10, 100).random(),
                reviews = listOf(0, 20, 50).random(),
                heap = listOf(0, 5).random(),
            )
        )
}
