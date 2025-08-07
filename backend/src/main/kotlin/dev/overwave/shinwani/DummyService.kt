package dev.overwave.shinwani

import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.annotation.PostConstruct
import org.springframework.ai.chat.model.ChatModel
import org.springframework.ai.chat.prompt.Prompt
import org.springframework.ai.converter.BeanOutputConverter
import org.springframework.ai.openai.OpenAiChatOptions
import org.springframework.ai.openai.api.OpenAiApi
import org.springframework.ai.openai.api.ResponseFormat
import org.springframework.stereotype.Service


private data class Schema(
    val names: List<String>,
)
data class MathReasoning(
    val steps: Steps,
    @get:JsonProperty(value = "final_answer") val finalAnswer: String) {

    data class Steps(val items: Array<Items>) {

        data class Items(
            val explanation: String,
            val output: String)
    }
}

@Service
class DummyService(
    private val chatModel: ChatModel,
) {
    @PostConstruct
    fun test() {

        val outputConverter = BeanOutputConverter(MathReasoning::class.java)
        val response = chatModel.call(
            Prompt(
                "Generate the names of 5 famous pirates, split by comma.",
                OpenAiChatOptions.builder()
                    .model(OpenAiApi.ChatModel.GPT_4_1_NANO )
                    .responseFormat(
                        ResponseFormat.builder()
                            .type(ResponseFormat.Type.JSON_SCHEMA)
//                            .jsonSchema(outputConverter.jsonSchema)
                            .jsonSchema(
                                """
                                    {
                                        "type":"object",
                                        "properties": {
                                            "names": {
                                                "type" : "array",
                                                "items" : {
                                                    "type": "string"
                                                }
                                            }
                                        },
                                        "required": ["names"],
                                        "additionalProperties":false
                                    }
                                """.trimIndent()
                            )
                            .build()
                    )
                    .maxTokens(25)
                    .build()
            )
        )
        response.result.output.text
    }
}