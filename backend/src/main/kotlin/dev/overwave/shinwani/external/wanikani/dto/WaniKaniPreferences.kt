package dev.overwave.shinwani.external.wanikani.dto

data class WaniKaniPreferences(
    val defaultVoiceActorId: Int,
    val extraStudyAutoplayAudio: Boolean,
    val lessonsAutoplayAudio: Boolean,
    val lessonsBatchSize: Int,
    val lessonsPresentationOrder: String,
    val reviewsAutoplayAudio: Boolean,
    val reviewsDisplaySrsIndicator: Boolean,
    val reviewsPresentationOrder: String
)
