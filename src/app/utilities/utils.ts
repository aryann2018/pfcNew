export function getDaysUntilEndDate(endDate: string) {
  const now = new Date();
  const end = new Date(endDate);
  const differenceInTime = end.getTime() - now.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return Math.ceil(differenceInDays);
}

export const isOdd = (num: number) => num % 2 === 1;

export function mergeUniqueObjects(objectsArray: any[]): any[] {
  if (!objectsArray) return [];
  const unique: any = {};

  // Iterate over the array to populate the unique object
  objectsArray.forEach((item) => {
    if (!unique[item.value]) {
      // If the value hasn't been added to the unique object yet
      unique[item.value] = item; // Add it as a property
    }
  });

  // Return the values of the unique object, which are the unique items
  return Object.values(unique);
}
