package dev.overwave.shinwani.api.settings

import dev.overwave.shinwani.api.user.dto.CredentialsUpdateResponse
import dev.overwave.shinwani.api.settings.dto.UpdateBunproSettingsDto
import dev.overwave.shinwani.api.settings.dto.UpdateWanikaniSettingsDto
import dev.overwave.shinwani.api.settings.dto.UserSettingsDto
import dev.overwave.shinwani.core.user.service.UserService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal


@RestController
@RequestMapping(path = ["/api/settings"], produces = [MediaType.APPLICATION_JSON_VALUE])
class SettingsController(
    private val userService: UserService,
) {
    @GetMapping()
    fun getUserSettings(principal: Principal): UserSettingsDto = userService.getUserSettings(principal.name)

    @PutMapping("/wanikani")
    fun updateWanikaniSettings(
        principal: Principal,
        @RequestBody requestDto: UpdateWanikaniSettingsDto
    ): CredentialsUpdateResponse = userService.updateWanikaniSettings(principal.name, requestDto.apiToken)

    @PutMapping("/bunpro")
    fun updateBunproSettings(
        principal: Principal,
        @RequestBody requestDto: UpdateBunproSettingsDto
    ): CredentialsUpdateResponse = userService.updateBunproSettings(principal.name, requestDto.email, requestDto.password)

    @DeleteMapping("/wanikani")
    fun deleteWanikaniSettings(principal: Principal): Unit = userService.deleteWanikaniSettings(principal.name)

    @DeleteMapping("/bunpro")
    fun deleteBunproSettings(principal: Principal): Unit = userService.deleteBunproSettings(principal.name)
}