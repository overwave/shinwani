package dev.overwave.shinwani.core.user.model

import dev.overwave.shinwani.core.util.LongGenAud
import dev.overwave.shinwani.secure.AesGcmStringConverter
import jakarta.persistence.Convert
import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "user_")
data class User(
    val login: String,
    var hash: String,
    var wanikaniToken: String? = null,
    @Convert(converter = AesGcmStringConverter::class)
    var bunproPassword: String? = null,
    @Convert(converter = AesGcmStringConverter::class)
    var bunproEmail: String? = null,
) : LongGenAud()