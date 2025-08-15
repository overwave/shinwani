package dev.overwave.shinwani.core.user.service

import dev.overwave.shinwani.api.user.dto.CheckUserDto
import dev.overwave.shinwani.api.user.dto.UserDetailsDto
import dev.overwave.shinwani.api.user.dto.UserDto
import dev.overwave.shinwani.api.user.dto.UserSettingsDto
import dev.overwave.shinwani.core.user.model.User
import dev.overwave.shinwani.core.user.model.UserExistsException
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
) : UserDetailsService {

    override fun loadUserByUsername(login: String): UserDetails {
        val user = userRepository.getByLogin(login)
        return UserDetailsDto(user.login, user.hash, authorities = listOf())
    }

    fun checkUserExists(login: String): CheckUserDto = CheckUserDto(exists = userRepository.existsByLogin(login))

    fun registerUser(login: String, password: String) {
        if (userRepository.existsByLogin(login)) throw UserExistsException(login)
        userRepository.save(
            User(
                login = login,
                hash = passwordEncoder.encode(password),
            ),
        )
    }

    fun selfInfo(login: String): UserDto = UserDto(
        login = userRepository.getByLogin(login).login,
        avatar = "https://i.pravatar.cc/150?img=3",
    )

    fun getUserSettings(login: String): UserSettingsDto {
        val user = userRepository.getByLogin(login)
        return UserSettingsDto(wanikaniApiToken = user.wanikaniKey, bunproEmail = user.bunproEmail)
    }

    fun updateWanikaniSettings(login: String, apiToken: String) {
        val user = userRepository.getByLogin(login)
        user.wanikaniKey = apiToken
        userRepository.save(user)
    }

    fun updateBunproSettings(login: String, email: String, password: String) {
        val user = userRepository.getByLogin(login)
        user.bunproEmail = email
        user.bunproPassword = password
        userRepository.save(user)
    }

    fun deleteWanikaniSettings(login: String) {
        val user = userRepository.getByLogin(login)
        user.wanikaniKey = null
        userRepository.save(user)
    }

    fun deleteBunproSettings(login: String) {
        val user = userRepository.getByLogin(login)
        user.bunproEmail = null
        user.bunproPassword = null
        userRepository.save(user)
    }
}
