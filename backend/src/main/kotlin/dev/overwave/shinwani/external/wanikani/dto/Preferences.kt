package dev.overwave.shinwani.external.wanikani.dto

data class Preferences(
    val defaultVoiceActorId: Int,
    val extraStudyAutoplayAudio: Boolean,
    val lessonsAutoplayAudio: Boolean,
    val lessonsBatchSize: Int,
    val reviewsAutoplayAudio: Boolean,
    val reviewsDisplaySrsIndicator: Boolean,
    val reviewsPresentationOrder: ReviewsPresentationOrder,
)
