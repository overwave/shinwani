package dev.overwave.shinwani.config

import com.fasterxml.jackson.databind.ObjectMapper
import dev.overwave.shinwani.api.user.dto.LoginDto
import dev.overwave.shinwani.api.user.dto.LoginStatus
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import kotlin.time.Duration.Companion.days

@Configuration
@EnableWebSecurity
class SecurityConfiguration(
    private val objectMapper: ObjectMapper,
) {
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins =
            listOf("http://localhost:3000", "http://localhost:8082", "https://shinwani.overwave.dev")
        configuration.allowedMethods = listOf("*")
        configuration.allowedHeaders = listOf("*")
        configuration.allowCredentials = true
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain =
        http
            .authorizeHttpRequests {
                it
                    .requestMatchers("/api/users/me")
                    .authenticated()
                it.anyRequest().permitAll()
            }.formLogin {
                it.loginPage("/login")
                it.loginProcessingUrl("/api/users/login")
                it.successHandler { _, response, _ ->
                    response.writer.write(objectMapper.writeValueAsString(LoginDto(LoginStatus.SUCCESS)))
                }
                it.failureHandler { _, response, _ ->
                    response.writer.write(objectMapper.writeValueAsString(LoginDto(LoginStatus.FAILED)))
                    response.status = 403
                }
                it.permitAll()
            }.cors {
            }.logout {
                it.logoutUrl("/api/users/logout")
                it.deleteCookies("JSESSIONID")
                it.permitAll()
            }.csrf {
                it.disable() // TODO enable
            }.rememberMe {
                it.rememberMeCookieName("logged_id")
                it.tokenValiditySeconds(30.days.inWholeSeconds.toInt())
                it.useSecureCookie(true)
                it.key("secret")
            }.build()

    @Bean
    @Profile("!test")
    fun passwordEncoder() = BCryptPasswordEncoder()
}
