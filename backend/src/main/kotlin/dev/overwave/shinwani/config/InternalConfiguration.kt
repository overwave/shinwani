package dev.overwave.shinwani.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.time.Clock

@Configuration
class InternalConfiguration {
    @Bean
    fun clock(): Clock = Clock.systemUTC()
}