package dev.overwave.shinwani.core.user.model

import dev.overwave.shinwani.core.util.LongGenAud
import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "user_")
class User(
    val login: String,
    var name: String,
    var hash: String,
) : LongGenAud()