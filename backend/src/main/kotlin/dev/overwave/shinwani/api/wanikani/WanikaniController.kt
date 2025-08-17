package dev.overwave.shinwani.api.wanikani

import dev.overwave.shinwani.api.wanikani.dto.SummaryDto
import dev.overwave.shinwani.core.courses.CoursesService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
@RequestMapping("/api/wanikani")
class WanikaniController(
    private val coursesService: CoursesService,
) {
    @GetMapping("/summary")
    fun getSummary(principal: Principal): SummaryDto = coursesService.getWanikaniSummary(principal.name)
}
