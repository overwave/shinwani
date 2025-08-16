package dev.overwave.shinwani.external.wanikani.dto

import com.fasterxml.jackson.annotation.JsonProperty

abstract class ResponseObject(
    val expectedType: String,
    @field:JsonProperty("object")
    val type: String = "",
) {
    fun checkType(): Unit = require(type == expectedType)
}