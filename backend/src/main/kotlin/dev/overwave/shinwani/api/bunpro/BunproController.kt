package dev.overwave.shinwani.api.bunpro

import dev.overwave.shinwani.api.wanikani.dto.SummaryDto
import dev.overwave.shinwani.core.courses.CoursesService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
@RequestMapping("/api/bunpro")
class BunproController(
    private val coursesService: CoursesService,
) {
    @GetMapping("/summary")
    fun getSummary(principal: Principal): SummaryDto = coursesService.getBunproSummary(principal.name)
}