package dev.overwave.shinwani.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.HandlerExceptionResolver
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
class WebMvcConfigurer(
    private val loggingExceptionResolver: LoggingExceptionResolver,
) : WebMvcConfigurer {
    override fun extendHandlerExceptionResolvers(resolvers: MutableList<HandlerExceptionResolver>) {
        resolvers.addFirst(loggingExceptionResolver)
    }
}