export function formatAge(age: number) {

  const result = Number(age);

  return result;

}

export function formatDate(value: number) {

  const date = new Date(value);
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const day = String(date.getDate()).padStart(2, '0');
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthName = months[monthIndex];
  return `${monthName} ${day}, ${year}`;
}



export function formatHpercode(value: string) {
  return value.replace(/^0+/, '');
}



export function getPatientAge(age: any, ageInMonths: any) {

  return age > 0 ? Number(age) + 'yrs old' : Number(ageInMonths) + 'mos old';

}

export function formatNullDiets(value: any) {

  return value.map((item: any) => {
    if (item.dietname === null || item.dietname === '') {
      return { ...item, dietname: 'No Diet' };
    }
    return { ...item };
  });

}
