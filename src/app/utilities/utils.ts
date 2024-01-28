import { RefObject, useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";

export function getDaysUntilEndDate(endDate: string) {
  const now = new Date();
  const end = new Date(endDate);
  const differenceInTime = end.getTime() - now.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return DateTime.now().plus({ days: differenceInDays }).toRelative();
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

export const useHover = (): [boolean, RefObject<HTMLDivElement>] => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const enter = () => setHovered(true);
  const leave = () => setHovered(false);

  useEffect(() => {
    const refCopy = ref;

    if (!refCopy.current) return;

    (refCopy.current as HTMLElement).addEventListener("mouseenter", enter);
    (refCopy.current as HTMLElement).addEventListener("mouseleave", leave);
    return () => {
      if (!refCopy.current) return;

      (refCopy.current as HTMLElement).removeEventListener("mouseenter", enter);
      (refCopy.current as HTMLElement).removeEventListener("mouseleave", leave);
    };
  }, [ref]);

  return [hovered, ref];
};

export function formatDateToYYYYMMDD(date: Date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1), // Months are zero indexed
    day = "" + d.getDate(),
    year = d.getFullYear();

  // Add leading zero to the month and day if needed
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function generateRandomId() {
  return Math.random().toString(36).substring(7);
}
