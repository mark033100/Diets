import { ref } from 'vue';

export const useFormatFunctions = () => {

  const formattedDate = ref();


  const formatAge = (value: any) => {

    const age = Number(value);

    return age;
  }


  const formatDate = (value: any) => {
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


  const formatDateTime = (value: any) => {
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


  const formatHpercode = (value: string) => {
    const splitCode = value.split('+')
    return splitCode[1];
  }

  const formatEnccode = (value: string) => {
    const splitCode = value.split('+')
    return splitCode[0];
  }

  const formatEmployeeID = (value: string) => {
    const splitCode = value.split('+')
    return splitCode[2];
  }


  const formatNullDiets = (value: any) => {
    return value.map((item: any) => {
      if (item.dietcode === null || item.dietcode === '') {
        return { ...item, dietname: 'No Diet', admdate: formatStringtoDate(item.admdate) };
      }
      return { ...item, admdate: formatStringtoDate(item.admdate) };
    });
  }

  const formatStringtoDate = (value: string) => {
    const isoString = value?.replace(' ', 'T');
    const date = new Date(isoString);

    return date;
  }

  const formatDateString = (value: any) => {
    return value.toLocaleDateString('en-US');
  }

  const formatDateGetTime = (value: any) => {
    const date = new Date(value);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // convert 0 to 12 for 12 AM/PM
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${hours}:${formattedMinutes} ${ampm}`;
  }

  return { formatAge, formatDate, formatHpercode, formatNullDiets, formatDateString, formatEnccode, formatEmployeeID, formatDateGetTime, formatDateTime }

}
