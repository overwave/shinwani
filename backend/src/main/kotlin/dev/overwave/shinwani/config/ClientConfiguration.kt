package dev.overwave.shinwani.config

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.PropertyNamingStrategies
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter
import org.springframework.web.client.RestTemplate

@Configuration
class ClientConfiguration {
    @Bean("snakeCaseRestTemplate")
    fun restTemplate(): RestTemplate {
        val objectMapper =
            jacksonObjectMapper()
                .registerModule(JavaTimeModule())
                .setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE)
                .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
        val converter = MappingJackson2HttpMessageConverter().apply { this.objectMapper = objectMapper }
        return RestTemplate().apply {
            messageConverters.removeIf { it is MappingJackson2HttpMessageConverter }
            messageConverters.add(converter)
        }
    }
}