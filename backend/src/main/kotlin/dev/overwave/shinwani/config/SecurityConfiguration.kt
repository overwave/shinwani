package dev.overwave.shinwani.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import kotlin.time.Duration.Companion.days

@Configuration
@EnableWebSecurity
class SecurityConfiguration {
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
                    .requestMatchers("/api/users/me", "/api/wanikani/**", "/api/bunpro/**")
                    .authenticated()
                it.anyRequest().permitAll()
            }.exceptionHandling {
                it.authenticationEntryPoint(Http403ForbiddenEntryPoint())
            }.formLogin {
                it.loginPage("/login")
                it.loginProcessingUrl("/api/users/login")
                it.successHandler { _, response, _ -> response.status = HttpStatus.NO_CONTENT.value() }
                it.failureHandler { _, response, _ -> response.status = HttpStatus.UNAUTHORIZED.value() }
                it.permitAll()
            }.cors {
            }.logout {
                it.logoutUrl("/api/users/logout")
                it.deleteCookies("JSESSIONID")
                it.logoutSuccessHandler { _, response, _ -> response.status = HttpStatus.NO_CONTENT.value() }
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
