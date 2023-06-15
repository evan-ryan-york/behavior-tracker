import {
  BehaviorPlan,
  FunctionSurveyQuestion,
  FunctionSurveyResult,
  Staff,
  Strategy,
} from "../types/types";

export const BLANK_LABEL_FORM = {
  label: "",
  order: 0,
};

export const BLANK_ANTECEDENT_FORM = {
  label: "",
  order: 0,
  functionOfBehavior: "NONE",
};

export const BLANK_CONSEQUENCE_FORM = {
  label: "",
  order: 0,
  functionOfBehavior: "NONE",
};

export const BLANK_REPLACEMENT_BEHAVIOR_FORM = {
  content: "",
  title: "",
  order: 0,
  targetBehaviorIds: [],
  functionsOfBehavior: [],
};

export const BLANK_SITE_FORM = {
  name: "",
  organizationId: "",
  order: 0,
};

export const BLANK_GROUP_FORM = {
  name: "",
  organizationId: "",
  order: 0,
  siteId: "",
};

export const BLANK_STAFF_FORM: Staff = {
  firstName: "",
  lastName: "",
  email: "",
  permissionId: "",
  groupIds: [],
  siteIds: [],
  avatar: "",
  organizationId: null,
  accountType: "individual",
};

export const BLANK_STUDENT_FORM = {
  firstName: "",
  lastName: "",
  birthday: "",
  enrollStatus: "",
  groupIds: [],
  siteIds: [],
  localId: "",
  avatar: "",
  organizationId: "",
  activeBehaviorPlan: null,
};

export const BLANK_ENROLL_STATUS_FORM = {
  name: "",
  organizationId: "",
  order: 0,
  showByDefault: false,
};

export const BLANK_SETTING_FORM = {
  name: "",
  organizationId: "",
  order: 0,
  siteId: "",
};

export const BLANK_PLAN_FORM: BehaviorPlan = {
  targetBehavior: "",
  behaviorDefinition: "",
  functionsOfBehavior: [],
  replacementBehaviors: [],
  antecedents: [],
  antecedentNotes: "",
  preventionStrategies: [],
  reinforcementStrategies: [],
  extinguishStrategies: [],
  studentId: "",
  organizationId: "",
  measureMethod: "",
  frequencyDenominator: "Hour",
  frequencyNumerator: 0,
};

export const BLANK_STRATEGY_FORM: Strategy = {
  title: "",
  content: "",
  antecedentIds: [],
  consequenceIds: [],
  targetBehaviorsIds: [],
  replacementBehaviorIds: [],
  organizationId: "",
  authorId: "",
  type: "EXTINGUISH",
  functionsOfBehavior: [],
  toolTip: "",
};

export const BLANK_FUNCTION_SURVEY_QUESTION_FORM: FunctionSurveyQuestion = {
  label: "",
  functionOfBehavior: "",
  order: 0,
};

export const BLANK_FUNCTION_SURVEY_RESULT_FORM: FunctionSurveyResult = {
  submitter: "",
  relationship: "",
  studentId: "",
  behaviorId: "",
  descriptionOfBehavior: "",
  responses: {},
};

export const BLANK_ORGANIZATTION_FORM = {
  name: "",
  avatar: "",
  description: "",
  states: [],
  primaryPhone: "",
  primaryEmail: "",
  primaryColor: "#ffc032",
  secondaryColor: "#333",
  primaryTextColor: "#222",
  secondaryTextColor: "#fff",
};
