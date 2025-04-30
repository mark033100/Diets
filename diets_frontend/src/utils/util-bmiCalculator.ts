export function bmiCalculator(weight: number, height: number): { bmi: number, class: string } | undefined {
  if (weight <= 0 || height <= 0) return undefined;

  const bmiValue = weight / Math.pow(height / 100, 2);
  const bmiClasses = ['Under weight', 'Normal Weight', 'Over Weight', 'Obese'];

  return {
    bmi: Math.round(bmiValue * 10) / 10,
    class: bmiClasses[(bmiValue < 18.5 ? 0 : (bmiValue < 25 ? 1 : (bmiValue < 30 ? 2 : 3)))]
  };
}

