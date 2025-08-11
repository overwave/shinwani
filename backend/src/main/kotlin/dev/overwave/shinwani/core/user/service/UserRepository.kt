package dev.overwave.shinwani.core.user.service

import dev.overwave.shinwani.core.user.model.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long> {
    fun findByLogin(login: String): User?

    fun getByLogin(login: String): User

    fun existsByLogin(login: String): Boolean
}
