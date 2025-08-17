package dev.overwave.shinwani.core.courses

import dev.overwave.shinwani.api.wanikani.dto.SummaryDto
import dev.overwave.shinwani.api.exception.IllegalArgumentException
import dev.overwave.shinwani.core.user.service.UserService
import dev.overwave.shinwani.external.wanikani.WanikaniService
import org.springframework.stereotype.Service

@Service
class CoursesService(
    private val userService: UserService,
    private val wanikaniService: WanikaniService,
) {
    fun getWanikaniSummary(login: String): SummaryDto {
        val user = userService[login]
        val token = user.wanikaniToken ?: throw IllegalArgumentException("Token not set")
        val summary = wanikaniService.getSummary(token)
        val heap = if (summary.reviews > 99) 50 else 0
        return SummaryDto(lessons = summary.lessons, reviews = summary.reviews, heap = heap)
    }

    fun getBunproSummary(login: String): SummaryDto {
        Thread.sleep(1000)
        return SummaryDto(
            lessons = listOf(0, 10, 100).random(),
            reviews = listOf(0, 20, 50).random(),
            heap = listOf(0, 5).random(),
        )
    }
}