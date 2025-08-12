package dev.overwave.shinwani.core.course.service

import dev.overwave.shinwani.api.course.dto.CourseCountsDto
import dev.overwave.shinwani.api.course.dto.CountsDto
import org.springframework.stereotype.Service

@Service
class CountsService {
    
    fun getCounts(): CountsDto {
        // Hardcoded stub data for now
        return CountsDto(
            wani = CourseCountsDto(
                lessons = 42,
                reviews = 15,
                heap = 8
            ),
            bun = CourseCountsDto(
                lessons = 73,
                reviews = 28,
                heap = 12
            )
        )
    }
}
