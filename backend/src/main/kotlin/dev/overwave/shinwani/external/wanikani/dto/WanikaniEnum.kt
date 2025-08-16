package dev.overwave.shinwani.external.wanikani.dto

import com.fasterxml.jackson.annotation.JsonValue

interface WanikaniEnum<T : Enum<T>> {
    @get:JsonValue
    val value: String get() = toString().lowercase()
}
