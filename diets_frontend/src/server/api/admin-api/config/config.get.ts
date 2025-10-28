import { getAppConfig } from '~/server/utils/config'

export default defineEventHandler(async () => {
    const config = await getAppConfig()

    // Only expose safe parts
    return {
        maintenanceMode: config.maintenanceMode,
        theme: config.theme
    }
})
