package dev.overwave.shinwani.external.wanikani

import dev.overwave.shinwani.external.wanikani.dto.PendingReviewsCount
import dev.overwave.shinwani.external.wanikani.dto.ResponseObject
import dev.overwave.shinwani.external.wanikani.dto.SummaryResponse
import dev.overwave.shinwani.external.wanikani.dto.User
import dev.overwave.shinwani.external.wanikani.dto.UserResponse
import org.springframework.http.HttpHeaders
import org.springframework.stereotype.Service
import org.springframework.web.client.HttpClientErrorException
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForObject

private const val BASE_URL = "https://api.wanikani.com/v2"
private const val USER_PATH = "user"
private const val SUMMARY_PATH = "summary"

@Service
class WaniKaniService(
    private val restTemplate: RestTemplate,
) {
    fun checkUserByApiToken(apiToken: String): User? =
        try {
            makeWaniKaniRequest<UserResponse>(USER_PATH, apiToken).data
        } catch (_: ExternalUnauthorizedException) {
            null
        }

    fun getPendingReviewsCount(apiKey: String): PendingReviewsCount {
        require(apiKey.isNotBlank()) { "apiKey must not be blank" }
        val response = makeWaniKaniRequest<SummaryResponse>(SUMMARY_PATH, apiKey)
        return PendingReviewsCount(
            lessonsAvailable = response.data.lessons.available,
            reviewsAvailable = response.data.reviews.available,
        )
    }

    private inline fun <reified T : ResponseObject> makeWaniKaniRequest(path: String, apiKey: String): T {
        val headers = createWaniKaniHeaders(apiKey)
        val response = try {
            restTemplate.getForObject<T>("$BASE_URL/$path", headers)
        } catch (_: HttpClientErrorException.Unauthorized) {
            throw ExternalUnauthorizedException()
        } catch (_: Exception) {
            throw ExternalServerException("Error fetching pending reviews count from WaniKani")
        }
        response.checkType()
        return response
    }

    private fun createWaniKaniHeaders(apiKey: String): HttpHeaders =
        HttpHeaders().apply { set("Authorization", "Bearer $apiKey") }
}