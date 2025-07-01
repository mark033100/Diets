export function formatAge(age: number) {

  const result = Number(age);

  return result;

}

export function formatDate(value: number) {

  if (!value) return null;

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

export function formatDateTime(value: any) {
  const date = new Date(value);
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const day = String(date.getDate()).padStart(2, '0');
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthName = months[monthIndex];

  return `${monthName} ${day}, ${year} ${formattedHours}:${minutes} ${ampm}`;
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


export function formatEmployeeID(value: string) {
  const splitCode = value.split('+')
  return splitCode[2];
}

export function formatEnccode(value: string) {
  const splitCode = value.split('+')
  return splitCode[0];
}




export function formatStringtoDate(value: string) {
  const isoString = value?.replace(' ', 'T');
  const date = new Date(isoString);

  return date;
}

export function formatDateGetTime(value: any) {
  const date = new Date(value);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // convert 0 to 12 for 12 AM/PM
  const formattedMinutes = String(minutes).padStart(2, '0');
  return `${hours}:${formattedMinutes} ${ampm}`;
}