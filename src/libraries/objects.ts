export enum PERMISSION {
  EDIT_STAFF = "Edit Staff",
  EDIT_SETTINGS = "Edit Settings",
  SEE_ALL_ROASTER = "See All Roasters",
}

export const PERMISSIONS: Array<PERMISSION> = [
  PERMISSION.EDIT_STAFF,
  PERMISSION.EDIT_SETTINGS,
  PERMISSION.SEE_ALL_ROASTER,
];

export enum SettingsSections {
  ANTECEDENTS = "Antecedents",
  BEHAVIORS = "Behaviors",
  CONSEQUENCES = "Consequences",
  ORG_PROFILE = "Organization Profile",
  STAFF = "Staff",
  STUDENTS = "Students",
  GROUPS = "Groups",
  SITES = "Sites",
  ENROLL_STATUSES = "Enrollment Statuses",
  SETTINGS = "Environment Settings",
  REPLACEMENT_BEHAVIORS = "Replacement Behaviors",
  STRATEGIES = "Strategies",
  FUNCTION_SURVEY_QUESTIONS = "Function Survey Questions",
}

export enum BEHAVIOR_PLAN_STEPS {
  STEP_ONE = "Step 1",
  STEP_TWO = "Step 2",
  STEP_THREE = "Step 3",
  STEP_FOUR = "Step 4",
}

export enum FUNCTION_SURVEY_OPTIONS {
  DISAGREE = "Disagree",
  AGREE = "Agree",
  STRONGLY_AGREE = "Strongly Agree",
  NA = "N/A",
}

export enum FUNCTIONS_OF_BEHAVIOR {
  ACCESS = "Access to Item or Activity",
  ESCAPE = "Escape or Avoidance",
  ATTENTION = "Attention",
  SENSORY = "Sensory",
}

export enum ReportsSections {
  ANTECEDENT_REPORTS = "Antecedent Reports",
  FUNCTIONS_OF_BEHAVIOR_REPORTS = "Functions Reports",
  BEHAVIOR_FREQUENCY = "Behavior Frequency",
}

export enum COLLECTION {
  daysPerWeek = "daysPerWeek",
  incidentTypes = "incidentTypes",
  reports = "reports",
  staff = "staff",
}
export const COLLECTIONS = Object.values(COLLECTION);

export const DURATIONS = [
  "<1 min",
  "1-5 min",
  "5-15 min",
  "15-30 min",
  "30-60 min",
  "1-2 hours",
  "2+ hours",
];

export const INTENSITIES = ["low", "medium", "high", "N/A"];

export const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons

  [{ list: "ordered" }, { list: "bullet" }],
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],

  ["clean"], // remove formatting button
];

export enum STRATEGY_TYPES {
  PREVENTION = "Prevent Target Behavior Strategies",
  EXTINGUISH = "Extinguish Target Behavior Strategies",
  REINFORCE = "Reinforce Replacement Behavior Strategies",
}
