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


export function checkUserPosition(position: string): number {

  const positionsMap = new Map<number, string[]>([
    [0, ['medical specialist', 'medical officer']], // Doctor
    [1, ['programmer', 'computer programmer']], // Programmer
    [59, ['nutritionist', 'dietitian', 'dietician']], // Dietitian
    [60, ['food server', 'server']]
  ]);

  const lowerCasePosition = position?.toLowerCase();

  for (const [code, titles] of positionsMap) {
    if (titles.some(title => lowerCasePosition?.includes(title))) {
      return code;
    }
  }

  return -1;
}