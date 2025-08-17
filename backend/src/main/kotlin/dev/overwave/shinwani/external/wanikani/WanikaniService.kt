package dev.overwave.shinwani.external.wanikani

import dev.overwave.shinwani.external.wanikani.dto.LearningSummary
import dev.overwave.shinwani.external.wanikani.dto.ResponseObject
import dev.overwave.shinwani.external.wanikani.dto.SummaryResponse
import dev.overwave.shinwani.external.wanikani.dto.User
import dev.overwave.shinwani.external.wanikani.dto.UserResponse
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.stereotype.Service
import org.springframework.web.client.HttpClientErrorException
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.exchange

private const val BASE_URL = "https://api.wanikani.com/v2"
private const val USER_PATH = "user"
private const val SUMMARY_PATH = "summary"

@Service
class WanikaniService(
    private val restTemplate: RestTemplate,
) {
    fun checkUserByApiToken(apiToken: String): User? =
        try {
            makeWaniKaniRequest<UserResponse>(USER_PATH, apiToken).data
        } catch (_: ExternalUnauthorizedException) {
            null
        }

    fun getSummary(apiKey: String): LearningSummary {
        require(apiKey.isNotBlank()) { "apiKey must not be blank" }
        val response = makeWaniKaniRequest<SummaryResponse>(SUMMARY_PATH, apiKey)
        return LearningSummary(
            lessonsAvailable = response.data.lessons.available,
            reviewsAvailable = response.data.reviews.available,
        )
    }

    private inline fun <reified T : ResponseObject> makeWaniKaniRequest(path: String, apiKey: String): T {
        val requestEntity = HttpEntity<Unit>(createWaniKaniHeaders(apiKey))
        val response = try {
            restTemplate.exchange<T>("$BASE_URL/$path", HttpMethod.GET, requestEntity)
        } catch (_: HttpClientErrorException.Unauthorized) {
            throw ExternalUnauthorizedException()
        } catch (_: Exception) {
            throw ExternalServerException("Error fetching Wanikani")
        }
        val body = response.body ?: throw InternalServerException("empty response from Wanikani")
        body.checkType()
        return body

    }

    private fun createWaniKaniHeaders(apiKey: String): HttpHeaders =
        HttpHeaders().apply { setBearerAuth(apiKey) }
}