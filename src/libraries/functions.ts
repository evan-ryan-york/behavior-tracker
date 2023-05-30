import { Timestamp } from "firebase/firestore";
import { BEHAVIOR_PLAN_STAGES } from "./objects";
import {
  Behavior,
  BehaviorPlan,
  BehaviorRecord,
  DropResult,
  PermissionRecord,
  StaffRecord,
  StudentRecord,
} from "../types/types";
import ReactQuill from "react-quill";

type validateStageProps = {
  planForm: BehaviorPlan;
  setBehaviorPlanStage: (pV: number) => void;
};

type DBRecord = {
  id: string;
};

type FilterPermissionsProps = {
  permissions: PermissionRecord[];
  loggedInStaff: StaffRecord;
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

export const timestampToDisplay = (timestamp: Timestamp | null) => {
  if (!timestamp) return "";
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

  return `${days > 0 ? `${days} day${days === 1 ? "" : "s"}` : ""}${
    hours > 0 ? `${days > 0 ? "," : ""} ${hours} hour${hours === 1 ? "" : "s"}` : ""
  }${minutes > 0 ? `${hours > 0 ? "," : ""} ${minutes} minute${minutes === 1 ? "" : "s"}` : ""}${
    seconds > 0 ? `${minutes > 0 ? "," : ""} ${seconds} second${seconds === 1 ? "" : "s"} ` : ""
  }`;
};

// export const dateRangeForDisplay = (startTime: number, endTime: number) => {
//   const startDateForDisplay = new Date(startTime).toLocaleDateString();
//   const startTimeForDisplay = new Date(startTime).toLocaleTimeString();
//   const startMessage = `${startDateForDisplay} ${startTimeForDisplay}`;
//   let endMessage = " - Current Active Session";
//   if (endTime !== 0) {
//     const endDateForDisplay = new Date(endTime).toLocaleDateString();
//     const endTimeForDisplay = new Date(endTime).toLocaleTimeString();
//     const sameDay = endDateForDisplay === startDateForDisplay;
//     endMessage = sameDay
//       ? ` - ${endTimeForDisplay}`
//       : ` - ${endDateForDisplay}, ${endTimeForDisplay} `;
//   }
//   return `${startMessage} ${endMessage}`;
// };

export const dateRangeForDisplay = (startTime: number, endTime: number) => {
  const startDateTime = new Date(startTime);
  const endDateTime = endTime !== 0 ? new Date(endTime) : null;

  const startMessage = `${startDateTime.toLocaleDateString()} ${startDateTime.toLocaleTimeString()}`;
  const endMessage = endDateTime
    ? ` - ${endDateTime.toLocaleDateString()}, ${endDateTime.toLocaleTimeString()}`
    : " - Current Active Session";

  return `${startMessage} ${endMessage}`;
};

export const validateCurrentStage = ({ planForm, setBehaviorPlanStage }: validateStageProps) => {
  switch (true) {
    case planForm.targetBehavior.length < 1:
      setBehaviorPlanStage(BEHAVIOR_PLAN_STAGES.SELECT_BEHAVIOR);
      console.log("Target Behavior Blank");
      break;
    case planForm.behaviorDefinition.length < 1:
      setBehaviorPlanStage(BEHAVIOR_PLAN_STAGES.DEFINE_BEHAVIOR);
      console.log("Define Target Behavior Blank");
      break;
    case planForm.replacementBehaviors.length < 1:
      setBehaviorPlanStage(BEHAVIOR_PLAN_STAGES.SELECT_REPLACEMENT_BEHAVIOR);
      console.log("Replacement Behavior Blank");
      break;
    case planForm.preventionStrategies.length < 1:
      setBehaviorPlanStage(BEHAVIOR_PLAN_STAGES.SELECT_PREVENTATIVE_STRATEGIES);
      console.log("Replacement Behavior Blank");
      break;
    case planForm.reinforcementStrategies.length < 1:
      setBehaviorPlanStage(BEHAVIOR_PLAN_STAGES.SELECT_REINFORCEMENT_STRATEGIES);
      console.log("Reinforcement Behavior Blank");
      break;
    case planForm.extinguishStrategies.length < 1:
      setBehaviorPlanStage(BEHAVIOR_PLAN_STAGES.SELECT_EXTINGUISH_STRATEGIES);
      console.log("Extinguish Behavior Blank");
      break;
    default:
      setBehaviorPlanStage(BEHAVIOR_PLAN_STAGES.SUCCESS);
  }
};

export const filterPermissions = ({ permissions, loggedInStaff }: FilterPermissionsProps) => {
  const tempArray: PermissionRecord[] = [];
  const userPermission = permissions.find(
    (permission) => permission.id === loggedInStaff.permissionId
  );
  if (!userPermission) return [];
  if (userPermission.role === "user") {
    return [userPermission];
  }
  permissions.forEach((permission) => {
    if (userPermission.access === "developer") {
      tempArray.push(permission);
    } else if (userPermission.access === "organization" && permission.access !== "developer") {
      tempArray.push(permission);
    } else if (
      userPermission.access === "site" &&
      permission.access !== "developer" &&
      permission.access !== "organization"
    ) {
      tempArray.push(permission);
    } else if (userPermission.access === "group" && permission.access === "group") {
      tempArray.push(permission);
    }
  });
  return tempArray;
};

export const validatePassword = (password: string) => {
  // Check if the password is at least 8 characters long.
  if (password.length < 8) {
    return false;
  }

  // Check if the password contains at least one uppercase letter.
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one lowercase letter.
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one number.
  if (!/[0-9]/.test(password)) {
    return false;
  }

  // Check if the password does not contain any common words or easily guessed patterns.
  for (const word of mostCommonPasswords) {
    if (password === word) {
      return false;
    }
  }

  // The password is valid.
  return true;
};

const mostCommonPasswords = [
  "123456",
  "password",
  "12345678",
  "qwerty",
  "123456789",
  "111111",
  "12345",
  "iloveyou",
  "1234567",
  "dragon",
  "baseball",
  "football",
  "letmein",
  "admin",
  "shadow",
  "master",
  "123123",
  "1234",
  "superman",
  "welcome",
  "michael",
  "assword",
  "qwertyuiop",
  "123qwerty",
  "123abc",
  "1234567890",
  "letmein1",
  "monkey",
  "batman",
  "654321",
  "password1",
  "dragon1",
  "12345678901",
  "qwertyuiop1",
  "1qaz2wsx",
  "123456789012",
  "1234567890123",
  "12345678901234",
  "123456789012345",
  "1234567890123456",
  "12345678901234567",
  "123456789012345678",
  "1234567890123456789",
  "12345678901234567890",
  "123456789012345678901",
  "1234567890123456789012",
  "12345678901234567890123",
  "123456789012345678901234",
  "1234567890123456789012345",
  "12345678901234567890123456",
  "123456789012345678901234567",
  "1234567890123456789012345678",
  "12345678901234567890123456789",
];

export const replaceKeywords = ({
  selectedStudent,
  planForm,
  text,
  behaviorsObj,
}: {
  selectedStudent: StudentRecord;
  planForm: BehaviorPlan;
  text: ReactQuill.Value;
  behaviorsObj: { [key: string]: BehaviorRecord } | null;
}) => {
  if (!behaviorsObj) return text.toString();
  let stringVersion = text.toString();
  stringVersion = stringVersion.replaceAll("{{child}}", selectedStudent.firstName);
  stringVersion = stringVersion.replaceAll(
    "{{target_behavior}}",
    behaviorsObj[planForm.targetBehavior].label
  );
  return stringVersion;
};

export const makeUnique = (array: string[]) => {
  return Array.from(new Set(array));
};

export const createFrequencyMessage = ({
  instances,
  milliseconds,
}: {
  instances: number;
  milliseconds: number;
}) => {
  const hours = milliseconds / (1000 * 60 * 60);
  if (instances / hours > 1) {
    return `an average of ${Math.round(instances / hours)} times every hour.`;
  } else {
    return `an average of ${Math.round(
      instances * (1 / (instances / hours))
    )} times every ${Math.round(instances / hours)} hours.`;
  }
};
