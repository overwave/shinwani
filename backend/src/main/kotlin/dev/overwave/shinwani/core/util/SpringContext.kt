package dev.overwave.shinwani.core.util

import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware
import org.springframework.stereotype.Component
import kotlin.reflect.KClass

@Component
object SpringContext : ApplicationContextAware {
    private lateinit var context: ApplicationContext

    override fun setApplicationContext(ctx: ApplicationContext) {
        context = ctx
    }

    fun <T : Any> getBeanTyped(clazz: KClass<T>): T = context.getBean(clazz.java)

    inline fun <reified T : Any> getBean(): T = getBeanTyped(T::class)
}