package dev.overwave.shinwani.api.course

import dev.overwave.shinwani.api.course.dto.CountsDto
import dev.overwave.shinwani.core.course.service.CountsService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/api/courses"], produces = [MediaType.APPLICATION_JSON_VALUE])
class CourseController(
    private val countsService: CountsService,
) {
    
    @GetMapping("/counts")
    fun getCounts(): CountsDto = countsService.getCounts()
}