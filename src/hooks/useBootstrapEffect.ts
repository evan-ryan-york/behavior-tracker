import { useEffect } from "react";
import useGetDocs from "./useGetDocs";
import useGetDoc from "./useGetDoc";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { filterPermissions } from "../libraries/functions";
import {
  staffAtom,
  loggedInStaffAtom,
  staffResetAtom,
  selectPermissionsAtom,
  allPermissionsAtom,
} from "../recoil/staffAtoms";
import {
  parseAntecedentResponse,
  parseBehaviorResponse,
  parseConsequenceResponse,
  parseEnrollStatusesResponse,
  parseGroupResponse,
  parseOrganization,
  parseSettingResponse,
  parseReplacementBehaviorsResponse,
  parseSiteResponse,
  parseStaffResponse,
  parseStrategyResponse,
  parseStudentResponse,
  parseFunctionSurveyQuestionResponse,
  parsePermissionsResponse,
} from "../libraries/parsers";
import {
  AntecedentRecord,
  BehaviorRecord,
  ConsequenceRecord,
  StaffRecord,
  OrganizationRecord,
  SiteRecord,
  GroupRecord,
  EnrollStatusRecord,
  StudentRecord,
  SettingRecord,
  ReplacementBehaviorRecord,
  StrategyRecord,
  FunctionSurveyQuestionRecord,
  PermissionRecord,
} from "../types/types";
import { antecedentsAtom, antecedentsResetAtom } from "../recoil/antecedentsAtoms";
import { behaviorsAtom, behaviorsResetAtom } from "../recoil/behaviorsAtoms";
import { consequencesAtom, consequencesResetAtom } from "../recoil/consequencesAtoms";
import { organizationAtom, organizationResetAtom } from "../recoil/organizationAtoms";
import { sitesAtom, sitesResetAtom } from "../recoil/sitesAtoms";
import { groupsAtom, groupsResetAtom } from "../recoil/groupAtoms";
import { enrollStatusesAtom, enrollStatusesResetAtom } from "../recoil/enrollStatusAtoms";
import { studentsAtom, studentsResetAtom } from "../recoil/studentAtoms";
import { settingsAtom, settingsResetAtom } from "../recoil/settingsAtoms";
import {
  replacementBehaviorsAtom,
  replacementBehaviorsResetAtom,
} from "../recoil/replacementBehaviorsAtoms";
import { strategiesAtom, strategiesResetAtom } from "../recoil/strategiesAtoms";
import {
  functionSurveyQuestionsAtom,
  functionSurveyQuestionsResetAtom,
} from "../recoil/functionSurveyAtoms";

const useBootstrapEffect = () => {
  const { sendRequest: getDocs } = useGetDocs();
  const { sendRequest: getDoc } = useGetDoc();
  const setStaff = useSetRecoilState<StaffRecord[]>(staffAtom);
  const setStudents = useSetRecoilState<StudentRecord[]>(studentsAtom);
  const setAntecedents = useSetRecoilState<AntecedentRecord[]>(antecedentsAtom);
  const setBehaviors = useSetRecoilState<BehaviorRecord[]>(behaviorsAtom);
  const setConsequences = useSetRecoilState<ConsequenceRecord[]>(consequencesAtom);
  const setOrganization = useSetRecoilState<OrganizationRecord | null>(organizationAtom);
  const setStrategies = useSetRecoilState<StrategyRecord[]>(strategiesAtom);
  const setSites = useSetRecoilState<SiteRecord[]>(sitesAtom);
  const setGroups = useSetRecoilState<GroupRecord[]>(groupsAtom);
  const setSettings = useSetRecoilState<SettingRecord[]>(settingsAtom);
  const setEnrollStatuses = useSetRecoilState<EnrollStatusRecord[]>(enrollStatusesAtom);
  const setReplacementBehaviors =
    useSetRecoilState<ReplacementBehaviorRecord[]>(replacementBehaviorsAtom);
  const setFunctionSurveyQuestions = useSetRecoilState<FunctionSurveyQuestionRecord[]>(
    functionSurveyQuestionsAtom
  );
  const setSelectPermissions = useSetRecoilState<PermissionRecord[]>(selectPermissionsAtom);
  const setAllPermissions = useSetRecoilState<PermissionRecord[]>(allPermissionsAtom);

  //RESETS
  const antecedentsReset = useRecoilValue(antecedentsResetAtom);
  const behaviorsReset = useRecoilValue(behaviorsResetAtom);
  const consequencesReset = useRecoilValue(consequencesResetAtom);
  const replacementBehaviorsReset = useRecoilValue(replacementBehaviorsResetAtom);
  const staffReset = useRecoilValue(staffResetAtom);
  const studentsReset = useRecoilValue(studentsResetAtom);
  const organizationReset = useRecoilValue(organizationResetAtom);
  const sitesReset = useRecoilValue(sitesResetAtom);
  const groupsReset = useRecoilValue(groupsResetAtom);
  const enrollStatusesReset = useRecoilValue(enrollStatusesResetAtom);
  const settingsReset = useRecoilValue(settingsResetAtom);
  const strategiesReset = useRecoilValue(strategiesResetAtom);
  const functionSurveyQuestionReset = useRecoilValue(functionSurveyQuestionsResetAtom);

  //VALUES
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);

  useEffect(() => {
    if (!loggedInStaff) return;
    const getAntecedents = async () => {
      const response = await getDocs<AntecedentRecord>({
        col: "antecedents",
        config: {
          where: ["organizationId", "==", loggedInStaff.organizationId],
          orderBy: ["order"],
        },
      });
      if (response) {
        setAntecedents(parseAntecedentResponse(response));
      }
    };
    getAntecedents();
  }, [setAntecedents, getDocs, antecedentsReset, loggedInStaff]);

  useEffect(() => {
    if (!loggedInStaff) return;
    const getBehaviors = async () => {
      const response = await getDocs<BehaviorRecord>({
        col: "behaviors",
        config: {
          where: ["organizationId", "==", loggedInStaff.organizationId],
          orderBy: ["order"],
        },
      });
      if (response) {
        setBehaviors(parseBehaviorResponse(response));
      }
    };
    getBehaviors();
  }, [setBehaviors, getDocs, behaviorsReset, loggedInStaff]);

  useEffect(() => {
    if (!loggedInStaff) return;
    const getPermissions = async () => {
      const response = await getDocs<PermissionRecord>({
        col: "permissions",
      });
      if (response) {
        const filteredPermissions = filterPermissions({ permissions: response, loggedInStaff });
        setSelectPermissions(parsePermissionsResponse(filteredPermissions));
        setAllPermissions(parsePermissionsResponse(response));
      }
    };
    getPermissions();
  }, [setSelectPermissions, setAllPermissions, getDocs, loggedInStaff]);

  useEffect(() => {
    if (!loggedInStaff) return;
    const getConsequences = async () => {
      const response = await getDocs<ConsequenceRecord>({
        col: "consequences",
        config: {
          where: ["organizationId", "==", loggedInStaff.organizationId],
          orderBy: ["order"],
        },
      });
      if (response) {
        setConsequences(parseConsequenceResponse(response));
      }
    };
    getConsequences();
  }, [setConsequences, getDocs, consequencesReset, loggedInStaff]);

  useEffect(() => {
    if (!loggedInStaff) return;
    const getReplacementBehaviors = async () => {
      const response = await getDocs<ReplacementBehaviorRecord>({
        col: "replacementBehaviors",
        config: {
          where: ["organizationId", "==", loggedInStaff.organizationId],
          orderBy: ["order"],
        },
      });
      if (response) {
        setReplacementBehaviors(parseReplacementBehaviorsResponse(response));
      }
    };
    getReplacementBehaviors();
  }, [setReplacementBehaviors, getDocs, replacementBehaviorsReset, loggedInStaff]);

  useEffect(() => {
    if (!loggedInStaff) return;
    const getStrategies = async () => {
      const response = await getDocs<StrategyRecord>({
        col: "strategies",
        config: {
          where: ["organizationId", "==", loggedInStaff.organizationId],
        },
      });
      if (response) {
        setStrategies(parseStrategyResponse(response));
      }
    };
    getStrategies();
  }, [setStrategies, getDocs, strategiesReset, loggedInStaff]);

  useEffect(() => {
    if (!loggedInStaff) return;
    const getStaff = async () => {
      const response = await getDocs<StaffRecord>({
        col: "staff",
        config: {
          where: ["organizationId", "==", loggedInStaff.organizationId],
          orderBy: ["lastName"],
        },
      });
      if (response) {
        setStaff(parseStaffResponse(response));
      }
    };
    getStaff();
  }, [setStaff, getDocs, staffReset, loggedInStaff]);

  useEffect(() => {
    if (!loggedInStaff) return;
    const getStudents = async () => {
      const response = await getDocs<StudentRecord>({
        col: "students",
        config: {
          where: ["organizationId", "==", loggedInStaff.organizationId],
          orderBy: ["lastName"],
        },
      });
      if (response) {
        setStudents(parseStudentResponse(response));
      }
    };
    getStudents();
  }, [setStudents, getDocs, studentsReset, loggedInStaff]);

  useEffect(() => {
    if (!loggedInStaff) return;
    const getSites = async () => {
      const response = await getDocs<SiteRecord>({
        col: "sites",
        config: {
          where: ["organizationId", "==", loggedInStaff?.organizationId],
          orderBy: ["order"],
        },
      });
      if (response) {
        setSites(parseSiteResponse(response));
      }
    };
    getSites();
  }, [setSites, getDocs, sitesReset, loggedInStaff]);

  useEffect(() => {
    if (!loggedInStaff) return;
    const getSettings = async () => {
      const response = await getDocs<SettingRecord>({
        col: "settings",
        config: {
          where: ["organizationId", "==", loggedInStaff?.organizationId],
          orderBy: ["order"],
        },
      });
      if (response) {
        setSettings(parseSettingResponse(response));
      }
    };
    getSettings();
  }, [setSettings, getDocs, settingsReset, loggedInStaff]);

  useEffect(() => {
    if (!loggedInStaff) return;
    const getGroups = async () => {
      const response = await getDocs<GroupRecord>({
        col: "groups",
        config: {
          where: ["organizationId", "==", loggedInStaff?.organizationId],
          orderBy: ["order"],
        },
      });
      if (response) {
        setGroups(parseGroupResponse(response));
      }
    };
    getGroups();
  }, [setGroups, getDocs, groupsReset, loggedInStaff]);

  useEffect(() => {
    const getOrganization = async () => {
      if (!loggedInStaff || !loggedInStaff.organizationId) return;
      const response = await getDoc<OrganizationRecord>({
        col: "organizations",
        id: loggedInStaff.organizationId,
      });
      if (response) {
        setOrganization(parseOrganization(response));
      }
    };
    getOrganization();
  }, [setOrganization, getDoc, organizationReset, loggedInStaff]);

  useEffect(() => {
    if (!loggedInStaff) return;
    const getEnrollStatuses = async () => {
      const response = await getDocs<EnrollStatusRecord>({
        col: "enrollStatuses",
        config: {
          where: ["organizationId", "==", loggedInStaff?.organizationId],
          orderBy: ["order"],
        },
      });
      if (response) {
        setEnrollStatuses(parseEnrollStatusesResponse(response));
      }
    };
    getEnrollStatuses();
  }, [setEnrollStatuses, getDocs, enrollStatusesReset, loggedInStaff]);

  useEffect(() => {
    if (!loggedInStaff) return;
    const getFunctionSurveyQuestions = async () => {
      const response = await getDocs<FunctionSurveyQuestionRecord>({
        col: "functionSurveyQuestions",
        config: {
          where: ["organizationId", "==", loggedInStaff?.organizationId],
          orderBy: ["order"],
        },
      });
      if (response) {
        setFunctionSurveyQuestions(parseFunctionSurveyQuestionResponse(response));
      }
    };
    getFunctionSurveyQuestions();
  }, [setFunctionSurveyQuestions, getDocs, functionSurveyQuestionReset, loggedInStaff]);
};

export default useBootstrapEffect;
