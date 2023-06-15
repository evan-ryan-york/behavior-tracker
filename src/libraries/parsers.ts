import {
  AntecedentRecord,
  BehaviorPlanRecord,
  BehaviorRecord,
  ConsequenceRecord,
  EnrollStatusRecord,
  GroupRecord,
  ObservationRecord,
  OrganizationRecord,
  SettingRecord,
  ReplacementBehaviorRecord,
  SiteRecord,
  StaffRecord,
  StrategyRecord,
  StudentRecord,
  FunctionSurveyQuestionRecord,
  FunctionSurveyResultRecord,
  StudentFileRecord,
  PermissionRecord,
  LeadRecord,
} from "../types/types";

export const parseStaffResponse = (response: StaffRecord[]): StaffRecord[] =>
  response.map((staff: StaffRecord) => ({
    id: staff?.id ?? "",
    firstName: staff?.firstName ?? "",
    lastName: staff?.lastName ?? "",
    email: staff?.email ?? "",
    permissionId: staff?.permissionId ?? "",
    groupIds: staff?.groupIds ?? [],
    siteIds: staff?.siteIds ?? [],
    createdAt: staff?.createdAt ?? null,
    lastUpdatedAt: staff?.lastUpdatedAt ?? null,
    organizationId: staff?.organizationId ?? null,
    avatar: staff?.avatar ?? "",
    accountType: staff?.accountType ?? "individual",
  }));

export const parseStudentResponse = (response: StudentRecord[]): StudentRecord[] =>
  response.map((record: StudentRecord) => ({
    id: record?.id ?? "",
    firstName: record?.firstName ?? "",
    lastName: record?.lastName ?? "",
    enrollStatus: record?.enrollStatus ?? "",
    groupIds: record?.groupIds ?? [],
    siteIds: record?.siteIds ?? [],
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
    organizationId: record?.organizationId ?? null,
    avatar: record?.avatar ?? "",
    birthday: record?.birthday ?? "",
    localId: record?.localId ?? "",
    activeBehaviorPlan: record?.activeBehaviorPlan ?? null,
  }));

export const parseAntecedentResponse = (response: AntecedentRecord[]): AntecedentRecord[] =>
  response.map((record: AntecedentRecord) => ({
    id: record?.id ?? "",
    label: record?.label ?? "",
    order: record?.order ?? 0,
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
    functionOfBehavior: record?.functionOfBehavior ?? "",
  }));

export const parseBehaviorResponse = (response: BehaviorRecord[]): BehaviorRecord[] =>
  response.map((record: BehaviorRecord) => ({
    id: record?.id ?? "",
    label: record?.label ?? "",
    order: record?.order ?? 0,
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
  }));

export const parseConsequenceResponse = (response: ConsequenceRecord[]): ConsequenceRecord[] =>
  response.map((record: ConsequenceRecord) => ({
    id: record?.id ?? "",
    label: record?.label ?? "",
    order: record?.order ?? 0,
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
    functionOfBehavior: record?.functionOfBehavior ?? "",
  }));

export const parseBehaviorPlanResponse = (response: BehaviorPlanRecord[]): BehaviorPlanRecord[] =>
  response.map((record: BehaviorPlanRecord) => ({
    id: record?.id ?? "",
    targetBehavior: record?.targetBehavior ?? "",
    behaviorDefinition: record?.behaviorDefinition ?? "",
    functionsOfBehavior: record?.functionsOfBehavior ?? [],
    replacementBehaviors: record?.replacementBehaviors ?? [],
    antecedents: record?.antecedents ?? [],
    antecedentNotes: record?.antecedentNotes ?? "",
    preventionStrategies: record?.preventionStrategies ?? [],
    reinforcementStrategies: record?.reinforcementStrategies ?? [],
    extinguishStrategies: record?.extinguishStrategies ?? [],
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
    studentId: record?.studentId ?? "",
    organizationId: record?.organizationId ?? "",
    measureMethod: record?.measureMethod ?? "Frequency",
    frequencyDenominator: record?.frequencyDenominator ?? "Hour",
    frequencyNumerator: record?.frequencyNumerator ?? 0,
  }));

export const parseReplacementBehaviorsResponse = (
  response: ReplacementBehaviorRecord[]
): ReplacementBehaviorRecord[] =>
  response.map((record: ReplacementBehaviorRecord) => ({
    id: record?.id ?? "",
    content: record?.content ?? "",
    title: record?.title ?? "",
    order: record?.order ?? 0,
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
    targetBehaviorIds: record?.targetBehaviorIds ?? [],
    functionsOfBehavior: record?.functionsOfBehavior ?? [],
  }));

export const parseObservationResponse = (response: ObservationRecord[]): ObservationRecord[] =>
  response.map((record: ObservationRecord) => ({
    antecedents: record?.antecedents ?? [],
    behaviors: record?.behaviors ?? [],
    consequences: record?.consequences ?? [],
    functionsOfBehavior: record?.functionsOfBehavior ?? [],
    notes: record?.notes ?? [],
    duration: record?.duration ?? "",
    intensity: record?.intensity ?? "",
    authorId: record?.authorId ?? "",
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
    id: record?.id ?? "",
    studentId: record?.studentId ?? "",
    settingId: record?.settingId ?? "",
    observationPeriodId: record.observationPeriodId ?? "",
  }));

export const parseOrganization = (response: OrganizationRecord): OrganizationRecord => {
  return {
    name: response?.name ?? "",
    description: response?.description ?? "",
    avatar: response?.avatar ?? "",
    id: response?.id ?? "",
    createdAt: response?.createdAt ?? null,
    lastUpdatedAt: response?.lastUpdatedAt ?? null,
    primaryColor: response?.primaryColor ?? null,
    secondaryColor: response?.secondaryColor ?? null,
    primaryTextColor: response?.primaryTextColor ?? null,
    secondaryTextColor: response?.secondaryTextColor ?? null,
    states: response?.states ?? [],
    primaryPhone: response?.primaryPhone ?? "",
    primaryEmail: response?.primaryEmail ?? "",
    primaryDomain: response?.primaryDomain ?? "",
  };
};

export const parseSiteResponse = (response: SiteRecord[]): SiteRecord[] =>
  response.map((record: SiteRecord) => ({
    id: record?.id ?? "",
    name: record?.name ?? "",
    organizationId: record?.organizationId ?? 0,
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
    order: record?.order ?? 0,
  }));

export const parseEnrollStatusesResponse = (response: EnrollStatusRecord[]): EnrollStatusRecord[] =>
  response.map((record: EnrollStatusRecord) => ({
    id: record?.id ?? "",
    name: record?.name ?? "",
    organizationId: record?.organizationId ?? 0,
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
    order: record?.order ?? 0,
    showByDefault: record?.showByDefault ?? false,
  }));

export const parseGroupResponse = (response: GroupRecord[]): GroupRecord[] =>
  response.map((record: GroupRecord) => ({
    id: record?.id ?? "",
    name: record?.name ?? "",
    organizationId: record?.organizationId ?? 0,
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
    order: record?.order ?? 0,
    siteId: record?.siteId ?? "",
  }));

export const parseSettingResponse = (response: SettingRecord[]): SettingRecord[] =>
  response.map((record: SettingRecord) => ({
    id: record?.id ?? "",
    name: record?.name ?? "",
    organizationId: record?.organizationId ?? 0,
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
    order: record?.order ?? 0,
    siteId: record?.siteId ?? "",
  }));

export const parseStrategyResponse = (response: StrategyRecord[]): StrategyRecord[] =>
  response.map((record: StrategyRecord) => ({
    id: record?.id ?? "",
    title: record?.title ?? "",
    content: record?.content ?? "",
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
    antecedentIds: record?.antecedentIds ?? [],
    consequenceIds: record?.consequenceIds ?? [],
    targetBehaviorsIds: record?.targetBehaviorsIds ?? [],
    replacementBehaviorIds: record?.replacementBehaviorIds ?? [],
    organizationId: record?.organizationId ?? "",
    authorId: record?.authorId ?? "",
    type: record?.type ?? "EXTINGUISH",
    functionsOfBehavior: record?.functionsOfBehavior ?? [],
    toolTip: "",
  }));

export const parseFunctionSurveyQuestionResponse = (
  response: FunctionSurveyQuestionRecord[]
): FunctionSurveyQuestionRecord[] =>
  response.map((record: FunctionSurveyQuestionRecord) => ({
    id: record?.id ?? "",
    label: record?.label ?? "",
    functionOfBehavior: record?.functionOfBehavior ?? "",
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
    order: record?.order ?? 0,
  }));

export const parseFunctionSurveyResultsResponse = (
  response: FunctionSurveyResultRecord[]
): FunctionSurveyResultRecord[] =>
  response.map((record: FunctionSurveyResultRecord) => ({
    id: record?.id ?? "",
    submitter: record?.submitter ?? "",
    relationship: record?.relationship ?? "",
    studentId: record?.studentId ?? "",
    behaviorId: record?.behaviorId ?? "",
    descriptionOfBehavior: record?.descriptionOfBehavior ?? "",
    responses: record?.responses ?? "",
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
  }));

export const parseStudentFilesResponse = (response: StudentFileRecord[]): StudentFileRecord[] =>
  response.map((record: StudentFileRecord) => ({
    id: record?.id ?? "",
    authorId: record?.authorId ?? "",
    filePath: record?.filePath ?? "",
    fileName: record?.fileName ?? "",
    studentId: record?.studentId ?? "",
    fileType: record?.fileType ?? "",
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
  }));

export const parsePermissionsResponse = (response: PermissionRecord[]): PermissionRecord[] =>
  response.map((record: PermissionRecord) => ({
    id: record?.id ?? "",
    access: record?.access ?? "site",
    role: record?.role ?? "user",
    label: record?.label ?? "",
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
  }));

export const parseLeadsResponse = (response: LeadRecord[]): LeadRecord[] =>
  response.map((record: LeadRecord) => ({
    id: record?.id ?? "",
    firstName: record?.firstName ?? "",
    lastName: record?.lastName ?? "",
    email: record?.email ?? "",
    createdAt: record?.createdAt ?? null,
    lastUpdatedAt: record?.lastUpdatedAt ?? null,
  }));
