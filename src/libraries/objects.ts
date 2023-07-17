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

export enum BEHAVIOR_PLAN_STAGES {
  SELECT_BEHAVIOR = 1,
  DEFINE_BEHAVIOR = 2,
  SELECT_REPLACEMENT_BEHAVIOR = 3,
  SELECT_PREVENTATIVE_STRATEGIES = 4,
  SELECT_REINFORCEMENT_STRATEGIES = 5,
  SELECT_EXTINGUISH_STRATEGIES = 6,
  SELECT_MEASURES_OF_SUCCESS = 7,
  SUCCESS = 8,
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

export enum PERMISSION_ACCESS_LEVELS {
  ORGANIZATION = "organization",
  SITE = "site",
  GROUP = "group",
  DEVELOPER = "developer",
}

export enum PERMISSION_ROLES {
  SUPER_ADMIN = "super-admin",
  ADMIN = "admin",
  USER = "user",
}

export const STATES = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Federated States of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Island",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export const FUNCTION_COLORS = {
  [FUNCTIONS_OF_BEHAVIOR.ACCESS]: "#C42847",
  [FUNCTIONS_OF_BEHAVIOR.ATTENTION]: "#000022",
  [FUNCTIONS_OF_BEHAVIOR.ESCAPE]: "#E28413",
  [FUNCTIONS_OF_BEHAVIOR.SENSORY]: "#4D2619",
};
