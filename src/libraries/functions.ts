import { Timestamp } from "firebase/firestore";

import { DropResult } from "../types/types";
type DBRecord = {
  id: string;
};

export const updateDragArray = <T extends DBRecord>({
  dropResult,
  arr,
}: {
  dropResult: DropResult;
  arr: T[];
}) => {
  if (dropResult.removedIndex === null && dropResult.addedIndex === null) {
    return;
  }
  if (dropResult.removedIndex === null && dropResult.addedIndex === null) {
    return;
  }
  const result = [...arr];
  let itemToAdd = dropResult.payload;

  if (dropResult.removedIndex !== null) {
    itemToAdd = result.splice(dropResult.removedIndex, 1)[0];
  }

  if (dropResult.addedIndex !== null) {
    result.splice(dropResult.addedIndex, 0, itemToAdd);
  }
  return result;
};

export const getLuma = (hex: string) => {
  const color = hex.substring(1); // strip #
  const rgb = parseInt(color, 16); // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff; // extract red
  const g = (rgb >> 8) & 0xff; // extract green
  const b = (rgb >> 0) & 0xff; // extract blue

  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  return luma;
};

export const getAge = (birthday: string) => {
  const birthdayDate = new Date(birthday);
  const birthdayDateMillis = birthdayDate.getTime();
  const now = Date.now();
  const ageMillis = now - birthdayDateMillis;
  const age = ageMillis / 1000 / 60 / 60 / 24 / 365;
  return Math.floor(age);
};

type ObjectWithId = {
  id: string;
  [key: string]: string;
};

export const getFirstItemId = (array: ObjectWithId[]) => {
  if (array.length === 0) return "";
  return array[0].id;
};

export const timestampToDisplay = (timestamp: Timestamp) => {
  const createdDate = timestamp.toDate();
  return createdDate.toLocaleDateString() + " at " + createdDate.toLocaleTimeString();
};

export const formatTime = (timer: number) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${Number(minutes) % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

export const getDifferenceForDisplay = (difference: number) => {
  const day = 86400000;
  const hour = 3600000;
  const minute = 60000;
  const second = 1000;
  const days = Math.floor(difference / day);
  const postDaysRemainder = difference - days * day;
  const hours = Math.floor(postDaysRemainder / hour);
  const postHoursRemainder = postDaysRemainder - hours * hour;
  const minutes = Math.floor(postHoursRemainder / minute);
  const postMinutesRemainder = postHoursRemainder - minutes * minute;
  const seconds = Math.floor(postMinutesRemainder / second);

  return `${days > 0 ? `${days} days, ` : ""} ${hours > 0 ? `${hours} hours, ` : ""} ${
    minutes > 0 ? `${minutes} minutes, ` : ""
  } ${seconds > 0 ? `${seconds} seconds ` : ""}`;
};

export const dateRangeForDisplay = (startTime: number, endTime: number) => {
  const startDateForDisplay = new Date(startTime).toLocaleDateString();
  const startTimeForDisplay = new Date(startTime).toLocaleTimeString();
  const startMessage = `${startDateForDisplay} ${startTimeForDisplay}`;
  let endMessage = " - Current Active Session";
  if (endTime !== 0) {
    const endDateForDisplay = new Date(endTime).toLocaleDateString();
    const endTimeForDisplay = new Date(endTime).toLocaleTimeString();
    const sameDay = endDateForDisplay === startDateForDisplay;
    endMessage = sameDay
      ? ` - ${endTimeForDisplay}`
      : ` - ${endDateForDisplay}, ${endTimeForDisplay} `;
  }
  return `${startMessage} ${endMessage}`;
};
