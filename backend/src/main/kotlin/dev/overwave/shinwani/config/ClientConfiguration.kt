package dev.overwave.shinwani.config

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.PropertyNamingStrategies
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter
import org.springframework.web.client.RestTemplate

@Configuration
class ClientConfiguration {
    @Bean("snakeCaseRestTemplate")
    fun restTemplate(): RestTemplate {
        val objectMapper = ObjectMapper().apply { propertyNamingStrategy = PropertyNamingStrategies.SNAKE_CASE }
        val converter = MappingJackson2HttpMessageConverter().apply { this.objectMapper = objectMapper }
        return RestTemplate().apply { messageConverters.add(converter) }
    }
}