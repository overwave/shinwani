package dev.overwave.shinwani.security

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.security.SecureRandom
import java.util.Base64
import javax.crypto.Cipher
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec
import javax.crypto.spec.SecretKeySpec

private const val ENCRYPTION_ALGORITHM = "AES"
private const val CIPHER_TRANSFORMATION = "AES/GCM/NoPadding"
private const val AUTH_TAG_LENGTH = 128
private const val IV_LENGTH = 12

@Service
class CipherService(
    @Value("\${courses.bunpro.credentials-key}") bunproCredentialsKey: String,
) {
    private val key: SecretKey
    private val random = SecureRandom()

    init {
        val keyBytes = Base64.getDecoder().decode(bunproCredentialsKey)
        require(keyBytes.size == 32) { "AES key must be 256-bit (Base64 of 32 bytes)" }
        key = SecretKeySpec(keyBytes, ENCRYPTION_ALGORITHM)
    }

    fun encrypt(payload: String): String {
        val iv = ByteArray(IV_LENGTH).also { random.nextBytes(it) }
        val cipher = Cipher.getInstance(CIPHER_TRANSFORMATION)
        cipher.init(Cipher.ENCRYPT_MODE, key, GCMParameterSpec(AUTH_TAG_LENGTH, iv))
        val ciphertext = cipher.doFinal(payload.toByteArray())
        return Base64.getEncoder().encodeToString(iv + ciphertext)
    }

    fun decrypt(base64Digest: String): String {
        val decodedDigest = Base64.getDecoder().decode(base64Digest)
        require(decodedDigest.size > IV_LENGTH) { "ciphertext too short" }
        val iv = decodedDigest.copyOfRange(0, IV_LENGTH)
        val ciphertext = decodedDigest.copyOfRange(IV_LENGTH, decodedDigest.size)

        val cipher = Cipher.getInstance(CIPHER_TRANSFORMATION)
        cipher.init(Cipher.DECRYPT_MODE, key, GCMParameterSpec(AUTH_TAG_LENGTH, iv))
        val plain = cipher.doFinal(ciphertext)
        return plain.decodeToString()
    }
}