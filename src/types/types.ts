import { Timestamp } from "firebase/firestore";
import ReactQuill from "react-quill";
import { FUNCTIONS_OF_BEHAVIOR } from "../libraries/objects";
type FIREBASE_ID = string;

export type BaseRecord = {
  id: FIREBASE_ID;
  lastUpdatedAt: Timestamp | null;
  createdAt: Timestamp | null;
};

export type Antecedent = {
  label: string;
  order: number;
  functionOfBehavior: string;
};

export type AntecedentRecord = Antecedent & BaseRecord;

export type Behavior = {
  label: string;
  order: number;
};

export type BehaviorRecord = Behavior & BaseRecord;

export type Consequence = {
  label: string;
  order: number;
  functionOfBehavior: string;
};

export type ConsequenceRecord = Consequence & BaseRecord;

export type Staff = {
  firstName: string;
  lastName: string;
  email: string;
  permissionId: string;
  groupIds: FIREBASE_ID[];
  siteIds: FIREBASE_ID[];
  avatar: string;
  organizationId: FIREBASE_ID | null;
  accountType: "individual" | "organization";
};

export type StaffRecord = Staff & BaseRecord;

export type Lead = {
  firstName: string;
  lastName: string;
  email: string;
};

export type LeadRecord = Lead & BaseRecord;

export type Homeroom = {
  id: string;
  name: string;
  grade: string;
};

export type Student = {
  firstName: string;
  lastName: string;
  enrollStatus: string;
  birthday: string;
  localId: string;
  organizationId: FIREBASE_ID;
  siteIds: FIREBASE_ID[];
  groupIds: FIREBASE_ID[];
  avatar: string;
};

export type StudentRecord = Student & BaseRecord;

export type Column = {
  field: string;
  headerName: string;
  minWidth: number;
  headerClassName: string;
  cellClassName: string;
};

export type DropResult = {
  removedIndex: number | null;
  addedIndex: number | null;
  payload?: any;
  element?: any;
};

export type Note = {
  text: string;
  authorId: FIREBASE_ID;
  createdAt: Timestamp;
  order: number;
};

export type Observation = {
  duration: string;
  intensity: string;
  functionsOfBehavior: FIREBASE_ID[];
  antecedents: FIREBASE_ID[];
  behaviors: FIREBASE_ID[];
  consequences: FIREBASE_ID[];
  notes: Note[];
  authorId: FIREBASE_ID;
  studentId: FIREBASE_ID;
  settingId: FIREBASE_ID;
  observationPeriodId: string;
};

export type ObservationRecord = Observation & BaseRecord;

export type ObservationPeriod = {
  startTime: number;
  endTime: number;
  authorId: FIREBASE_ID;
  organizationId: FIREBASE_ID;
  studentId: FIREBASE_ID;
  label: string;
};

export type ObservationPeriodRecord = ObservationPeriod & BaseRecord;

export type Organization = {
  name: string;
  avatar: string;
  description: string;
  states: string[];
  primaryPhone: string;
  primaryEmail: string;
  primaryDomain: string;
  primaryColor: string;
  secondaryColor: string;
  primaryTextColor: string;
  secondaryTextColor: string;
};

export type OrganizationRecord = Organization & BaseRecord;

export type ImageProps = {
  caption: string;
  dimensions: { width: number | null; height: number | null };
  fileName: string;
};

export type Site = {
  name: string;
  order: number;
  organizationId: FIREBASE_ID;
};

export type SiteRecord = Site & BaseRecord;

export type Group = {
  name: string;
  order: number;
  organizationId: FIREBASE_ID;
  siteId: FIREBASE_ID;
};

export type GroupRecord = Group & BaseRecord;

export type EnrollStatus = {
  name: string;
  order: number;
  organizationId: FIREBASE_ID;
  showByDefault: boolean;
};

export type EnrollStatusRecord = EnrollStatus & BaseRecord;

export type Setting = {
  name: string;
  order: number;
  organizationId: FIREBASE_ID;
  siteId: FIREBASE_ID;
};

export type SettingRecord = Setting & BaseRecord;

export type BehaviorReports = {
  [key: string]: {
    antecedentIds: string[];
    functionsOfBehavior: string[];
    consequenceIds: string[];
    label: string;
  };
};

export type Filters = {
  dateRange: [string | null, string | null];
};

export type BehaviorPlan = {
  targetBehavior: FIREBASE_ID;
  behaviorDefinition: string;
  functionsOfBehavior: { label: string; count: number }[];
  replacementBehaviors: ReactQuill.Value[];
  antecedents: { label: string; count: number }[];
  antecedentNotes: string;
  preventionStrategies: ReactQuill.Value[];
  reinforcementStrategies: ReactQuill.Value[];
  extinguishStrategies: ReactQuill.Value[];
  studentId: FIREBASE_ID;
  organizationId: FIREBASE_ID;
  frequencyNumerator: number;
  frequencyDenominator: "Day" | "Hour";
  measureMethod: "Frequency" | "Interval" | "";
};

export type BehaviorPlanRecord = BehaviorPlan & BaseRecord;

export type ReplacementBehavior = {
  content: ReactQuill.Value;
  order: number;
  title: string;
  targetBehaviorIds: FIREBASE_ID[];
  functionsOfBehavior: FUNCTIONS_OF_BEHAVIOR[];
};

export type ReplacementBehaviorRecord = ReplacementBehavior & BaseRecord;

export type Strategy = {
  title: string;
  toolTip: ReactQuill.Value;
  content: ReactQuill.Value;
  antecedentIds: FIREBASE_ID[];
  consequenceIds: FIREBASE_ID[];
  targetBehaviorsIds: FIREBASE_ID[];
  replacementBehaviorIds: FIREBASE_ID[];
  organizationId: FIREBASE_ID;
  functionsOfBehavior: FUNCTIONS_OF_BEHAVIOR[];
  authorId: FIREBASE_ID;
  type: "PREVENTION" | "EXTINGUISH" | "REINFORCE";
};

export type StrategyRecord = Strategy & BaseRecord;

export type FunctionSurveyQuestion = {
  label: string;
  functionOfBehavior: string;
  order: number;
};

export type FunctionSurveyQuestionRecord = FunctionSurveyQuestion & BaseRecord;

export type FunctionSurveyResult = {
  submitter: string;
  relationship: string;
  studentId: FIREBASE_ID;
  behaviorId: FIREBASE_ID;
  descriptionOfBehavior: string;
  responses: { [key: string]: string };
};

export type FunctionSurveyResultRecord = FunctionSurveyResult & BaseRecord;

export type SurveyLink = {
  studentId: FIREBASE_ID;
  passcode: string;
  email: string;
  compleated: boolean;
};

export type SurveyLinkRecord = SurveyLink & BaseRecord;

export type StudentFile = {
  studentId: FIREBASE_ID;
  filePath: string;
  fileName: string;
  authorId: FIREBASE_ID;
  fileType: string;
};

export type StudentFileRecord = StudentFile & BaseRecord;

export type Permission = {
  access: "developer" | "organization" | "site" | "group";
  label: string;
  role: "user" | "admin" | "super-admin";
};

export type PermissionRecord = Permission & BaseRecord;
