import { BehaviorPlan } from "../types/types";

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
  label: "",
  order: 0,
  behaviorId: "",
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

export const BLANK_STAFF_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  permissions: [],
  groupIds: [],
  siteIds: [],
  avatar: "",
  organizationId: "",
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
};

export const BLANK_ENROLL_STATUS_FORM = {
  name: "",
  organizationId: "",
  order: 0,
  showByDefault: false,
};

export const BLANK_PERIOD_FORM = {
  name: "",
  organizationId: "",
  order: 0,
  siteIds: [],
};

export const BLANK_PLAN_FORM: BehaviorPlan = {
  targetBehavior: "",
  behaviorDefinition: "",
  functionsOfBehavior: [],
  replacementBehavior: "",
  antecedents: [],
  antecedentNotes: "",
  preventionStrategies: [],
  reinforcementStrategies: [],
  extinguishStrategies: [],
  studentId: "",
  organizationId: "",
};
