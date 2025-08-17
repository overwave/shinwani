package dev.overwave.shinwani.config

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.stereotype.Component
import org.springframework.web.servlet.ModelAndView
import org.springframework.web.servlet.mvc.annotation.ResponseStatusExceptionResolver

@Component
class LoggingExceptionResolver : ResponseStatusExceptionResolver() {
    override fun doResolveException(
        request: HttpServletRequest,
        response: HttpServletResponse,
        handler: Any?,
        ex: Exception,
    ): ModelAndView? {
        logger.error("Exception thrown:", ex)
        return null
    }
}