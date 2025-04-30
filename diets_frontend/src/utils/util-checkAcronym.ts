export function checkAcronym(value: string) {


  const Acronym_Dictionary: { [key: string]: string } = {
    'O': 'Oral',
    'P': 'Physical',
    'T': 'Therapeutic',
    'R': 'Routine',
    'E': 'Enteral',
    'SPS': 'Specialized Nutrition Supplement',
    'SERVI': 'SERVICE',
    'ADPAY': 'PAY WARD'
  };

  return Acronym_Dictionary[value] ?? null;


}