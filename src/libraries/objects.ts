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
  PERIODS = "Narrative Periods",
  SECTIONS = "Narrative Sections",
  OBJECTIVES = "Narrative Objectives",
  OVERRIDE = "Roster Override",
}

export enum COLLECTION {
  daysPerWeek = "daysPerWeek",
  incidentTypes = "incidentTypes",
  reports = "reports",
  staff = "staff",
}

export const COLLECTIONS = Object.values(COLLECTION);
