import { useEffect } from "react";
import useGetDocs from "./useGetDocs";
import useGetDoc from "./useGetDoc";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { staffAtom, loggedInStaffAtom, staffResetAtom } from "../recoil/staffAtoms";
import { observationsAtom, observationsResetAtom } from "../recoil/observationAtoms";
import {
  parseAntecedentResponse,
  parseBehaviorPlanResponse,
  parseBehaviorResponse,
  parseConsequenceResponse,
  parseEnrollStatusesResponse,
  parseGroupResponse,
  parseObservationResponse,
  parseOrganization,
  parsePeriodResponse,
  parseReplacementBehaviorsResponse,
  parseSiteResponse,
  parseStaffResponse,
  parseStudentResponse,
} from "../libraries/parsers";
import {
  AntecedentRecord,
  BehaviorRecord,
  ConsequenceRecord,
  ObservationRecord,
  StaffRecord,
  OrganizationRecord,
  SiteRecord,
  GroupRecord,
  EnrollStatusRecord,
  StudentRecord,
  PeriodRecord,
  ReplacementBehaviorRecord,
  BehaviorPlanRecord,
} from "../types/types";
import { antecedentsAtom, antecedentsResetAtom } from "../recoil/antecedentsAtoms";
import { behaviorsAtom, behaviorsResetAtom } from "../recoil/behaviorsAtoms";
import { consequencesAtom, consequencesResetAtom } from "../recoil/consequencesAtoms";
import { organizationAtom, organizationResetAtom } from "../recoil/organizationAtoms";
import { sitesAtom, sitesResetAtom } from "../recoil/sitesAtoms";
import { groupsAtom, groupsResetAtom } from "../recoil/groupAtoms";
import { enrollStatusesAtom, enrollStatusesResetAtom } from "../recoil/enrollStatusAtoms";
import { studentsAtom, studentsResetAtom } from "../recoil/studentAtoms";
import { periodsAtom, periodsResetAtom } from "../recoil/periodsAtoms";
import {
  replacementBehaviorsAtom,
  replacementBehaviorsResetAtom,
} from "../recoil/replacementBehaviorsAtoms";
import { behaviorPlansAtom } from "../recoil/behaviorPlansAtoms";

const useBootstrapEffect = () => {
  const { sendRequest: getDocs } = useGetDocs();
  const { sendRequest: getDoc } = useGetDoc();
  const setStaff = useSetRecoilState<StaffRecord[]>(staffAtom);
  const setStudents = useSetRecoilState<StudentRecord[]>(studentsAtom);
  const setAntecedents = useSetRecoilState<AntecedentRecord[]>(antecedentsAtom);
  const setBehaviors = useSetRecoilState<BehaviorRecord[]>(behaviorsAtom);
  const setConsequences = useSetRecoilState<ConsequenceRecord[]>(consequencesAtom);
  const setObservations = useSetRecoilState<ObservationRecord[]>(observationsAtom);
  const setOrganization = useSetRecoilState<OrganizationRecord | null>(organizationAtom);
  const setBehaviorPlans = useSetRecoilState<BehaviorPlanRecord[]>(behaviorPlansAtom);
  const setSites = useSetRecoilState<SiteRecord[]>(sitesAtom);
  const setGroups = useSetRecoilState<GroupRecord[]>(groupsAtom);
  const setPeriods = useSetRecoilState<PeriodRecord[]>(periodsAtom);
  const setEnrollStatuses = useSetRecoilState<EnrollStatusRecord[]>(enrollStatusesAtom);
  const setReplacementBehaviors =
    useSetRecoilState<ReplacementBehaviorRecord[]>(replacementBehaviorsAtom);

  //RESETS
  const antecedentsReset = useRecoilValue(antecedentsResetAtom);
  const behaviorsReset = useRecoilValue(behaviorsResetAtom);
  const consequencesReset = useRecoilValue(consequencesResetAtom);
  const replacementBehaviorsReset = useRecoilValue(replacementBehaviorsResetAtom);
  const staffReset = useRecoilValue(staffResetAtom);
  const studentsReset = useRecoilValue(studentsResetAtom);
  const observationsReset = useRecoilValue(observationsResetAtom);
  const organizationReset = useRecoilValue(organizationResetAtom);
  const sitesReset = useRecoilValue(sitesResetAtom);
  const groupsReset = useRecoilValue(groupsResetAtom);
  const enrollStatusesReset = useRecoilValue(enrollStatusesResetAtom);
  const periodsReset = useRecoilValue(periodsResetAtom);
  const behaviorPlansReset = useRecoilValue(behaviorsResetAtom);

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
    const getBehaviorPlans = async () => {
      const response = await getDocs<BehaviorPlanRecord>({
        col: "behaviorPlans",
        config: {
          where: ["organizationId", "==", loggedInStaff.organizationId],
          orderBy: ["createdAt", "desc"],
        },
      });
      if (response) {
        setBehaviorPlans(parseBehaviorPlanResponse(response));
      }
    };
    getBehaviorPlans();
  }, [setBehaviorPlans, getDocs, behaviorPlansReset, loggedInStaff]);

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
    const getObservations = async () => {
      const response = await getDocs<ObservationRecord>({
        col: "observations",
      });
      if (response) {
        setObservations(parseObservationResponse(response));
      }
    };
    getObservations();
  }, [setObservations, getDocs, observationsReset]);

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
    const getPeriods = async () => {
      const response = await getDocs<PeriodRecord>({
        col: "periods",
        config: {
          where: ["organizationId", "==", loggedInStaff?.organizationId],
          orderBy: ["order"],
        },
      });
      if (response) {
        setPeriods(parsePeriodResponse(response));
      }
    };
    getPeriods();
  }, [setPeriods, getDocs, periodsReset, loggedInStaff]);

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
    if (!loggedInStaff) return;
    const getOrganization = async () => {
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
};

export default useBootstrapEffect;
