import { useEffect } from "react";
import useGetDocs from "./useGetDocs";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { loggedInStaffAtom } from "../recoil/staffAtoms";
import {
  observationPeriodsAtom,
  observationsAtom,
  observationsResetAtom,
} from "../recoil/observationAtoms";
import {
  parseBehaviorPlanResponse,
  parseFunctionSurveyResultsResponse,
  parseLeadsResponse,
  parseObservationResponse,
  parseStudentFilesResponse,
} from "../libraries/parsers";
import {
  ObservationRecord,
  BehaviorPlanRecord,
  FunctionSurveyResultRecord,
  StudentFileRecord,
  ObservationPeriodRecord,
  LeadRecord,
} from "../types/types";
import { behaviorsResetAtom } from "../recoil/behaviorsAtoms";
import { behaviorPlansAtom } from "../recoil/behaviorPlansAtoms";
import {
  selectedStudentAtom,
  studentFilesAtom,
  studentFilesResetAtom,
} from "../recoil/studentAtoms";
import {
  functionSurveyResultsAtom,
  functionSurveyResultsResetAtom,
} from "../recoil/functionSurveyAtoms";
import { organizationAtom } from "../recoil/organizationAtoms";
import { getDatabase, ref, onValue } from "firebase/database";
import { leadsAtom } from "../recoil/signupAtoms";

const useSignupBootstrapEffect = () => {
  const { sendRequest: getDocs } = useGetDocs();
  const setLeads = useSetRecoilState(leadsAtom);

  //RESETS

  //VALUES

  useEffect(() => {
    const getLeads = async () => {
      const response = await getDocs<LeadRecord>({
        col: "leads",
      });
      if (response) {
        setLeads(parseLeadsResponse(response));
      }
    };
    getLeads();
  }, [getDocs, setLeads]);
};

export default useSignupBootstrapEffect;
