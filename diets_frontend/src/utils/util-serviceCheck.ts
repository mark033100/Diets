export const useDietTypeCheck = (value: string) => {
  const dietTypeMap: { [key: string]: string } = {
    'O': 'Oral',
    'T': 'Therapeutic',
    'R': 'Routine',
    'E': 'Enteral',
    'P': 'Parenteral',
    'SPS': 'Specialized Nutrition Supplement',
    'SERVI': 'SERVICE',
    'ADPAY': 'PAY WARD'
  };

  return dietTypeMap[value] || null;
};