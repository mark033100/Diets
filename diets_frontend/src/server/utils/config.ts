import { promises as fs } from 'fs'
import { join } from 'path'

const configPath = join(process.cwd(), 'config.json')

export async function getAppConfig() {
    const data = await fs.readFile(configPath, 'utf-8')
    return JSON.parse(data)
}

export async function updateAppConfig(newData: Record<string, any>) {
    const current = await getAppConfig()
    const updated = { ...current, ...newData }

    await fs.writeFile(configPath, JSON.stringify(updated, null, 2))
    return updated
}
