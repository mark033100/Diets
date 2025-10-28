import { updateAppConfig } from '~/server/utils/config'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Optional: add authentication/authorization check here
    // e.g., only allow admin users
    // if (!isAdmin(event)) throw createError({ statusCode: 403 })

    const updated = await updateAppConfig(body)
    return { success: true, config: updated }
})
