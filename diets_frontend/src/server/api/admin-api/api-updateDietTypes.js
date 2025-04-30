const filePath = './src/public/json/dietTypes.json'
import { promises as fs } from "fs";

export default defineEventHandler(async (event) => {

  const dietTypes = await $fetch('/api/generalData-api/api-dietTypes')
  const dietTypesJson = JSON.stringify(dietTypes);
  await fs.writeFile(filePath, dietTypesJson)
  return dietTypesJson;



})
