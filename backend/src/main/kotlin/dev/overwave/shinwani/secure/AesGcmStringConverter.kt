package dev.overwave.shinwani.secure

import dev.overwave.shinwani.core.util.SpringContext
import jakarta.persistence.AttributeConverter
import jakarta.persistence.Converter

@Converter(autoApply = false)
class AesGcmStringConverter : AttributeConverter<String?, String?> {
    private val cipherService = SpringContext.getBean<CipherService>()

    override fun convertToDatabaseColumn(attribute: String?): String? =
        attribute?.let { cipherService.encrypt(it) }

    override fun convertToEntityAttribute(dbData: String?): String? =
        dbData?.let { cipherService.decrypt(it) }
}
