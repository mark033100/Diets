

export function filterByColumn(dataObject: any, columnName: string, filterString: string) {
  if (!dataObject || (Array.isArray(dataObject) && dataObject.length === 0)) {
    return 'No data to filter';
  }

  // Convert object to an array if necessary
  const dataArray = Array.isArray(dataObject) ? dataObject : Object.values(dataObject);

  return dataArray.filter((item: any) => item[columnName] === filterString);

}


export function testFunction() {
  return 'Working.... ';
}
