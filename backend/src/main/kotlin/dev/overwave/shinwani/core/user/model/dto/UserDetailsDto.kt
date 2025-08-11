package dev.overwave.shinwani.core.user.model.dto

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

data class UserDetailsDto(
    val login: String,
    private val hash: String,
    private val authorities: List<GrantedAuthority>,
) : UserDetails {
    override fun getUsername() = login
    override fun getPassword() = hash
    override fun getAuthorities() = authorities
    override fun isAccountNonExpired() = true
    override fun isAccountNonLocked() = true
    override fun isCredentialsNonExpired() = true
    override fun isEnabled() = true
}
