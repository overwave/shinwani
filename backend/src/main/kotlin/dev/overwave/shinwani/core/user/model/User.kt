package dev.overwave.shinwani.core.user.model

import dev.overwave.shinwani.core.util.LongGenAud
import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "user_")
data class User(
    val login: String,
    var hash: String,
    var wanikaniKey: String? = null,
    var bunproEmail: String? = null,
    var bunproPassword: String? = null,
) : LongGenAud()