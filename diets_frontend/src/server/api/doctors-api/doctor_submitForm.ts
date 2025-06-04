export default defineEventHandler(async (event) => {

  const body = await readBody(event);
  const config = useRuntimeConfig();

  const result = await $fetch(`${config.BACKEND_API}/api/save-doctors-order`, {
    method: 'POST',
    body: {
      hpercode: body.hpercode,
      enccode: body.enccode,
      entryBy: body.docId,
      licno: body.docId,

      patAge: body.age,
      patGender: body.gender,

      dietCategory: body.dietCategory,
      dietCode1: body.dietType1,
      dietCode2: body.dietType2,
      remarks: body.remarks,

      calories: body.dietCalories,
      protein: body.nutrientsProtein,
      fiber: body.nutrientsFiber,
      carbohydrates: body.nutrientsCarbohydrates,
      fats: body.nutrientsFat,

      dilution: body.dietDilution,
      volume: body.dietVolume,

      allergyType: body.allergyType,
      allergySubtype: body.allergySubtype,
      precaution: body.precautions,

      onsType: body.snsType,
      onsType2: body.snsType2,
      onsFrequency: body.snsFrequency,
      onsDescription: body.snsDescription,

      feedingMode: body.feedingMode,
      feedingDuration: body.feedingDuration,
      feedingFrequency: body.feedingFrequency,


      reproductiveStat: body.reproductiveStatus,

      previousDiet: body.dietname,

    }

  });

  return result;

})

