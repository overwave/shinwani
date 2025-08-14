package dev.overwave.shinwani.api.user

import dev.overwave.shinwani.api.user.dto.CheckUserDto
import dev.overwave.shinwani.api.user.dto.RegisterUserRequestDto
import dev.overwave.shinwani.api.user.dto.UserDto
import dev.overwave.shinwani.api.user.dto.UserSettingsDto
import dev.overwave.shinwani.core.user.service.UserService
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
@RequestMapping(path = ["/api/users"], produces = [MediaType.APPLICATION_JSON_VALUE])
class UserController(
    private val userService: UserService,
) {
    @GetMapping("/check")
    fun checkUserExists(
        @RequestParam login: String,
    ): CheckUserDto = userService.checkUserExists(login)

    @PostMapping("/register")
    fun registerUser(
        @RequestBody requestDto: RegisterUserRequestDto,
    ): Unit = userService.registerUser(requestDto.login, requestDto.password)

    @GetMapping("/me")
    fun selfInfo(principal: Principal): UserDto = userService.selfInfo(principal.name)

    @GetMapping("/settings")
    fun getUserSettings(): UserSettingsDto {
        // Hardcoded values for now as requested
        return UserSettingsDto(
            wanikaniApiToken = "wk_1234567890abcdef",
            bunproEmail = "user@example.com"
        )
    }
}