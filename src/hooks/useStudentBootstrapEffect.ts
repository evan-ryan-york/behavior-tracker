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
  parseObservationResponse,
  parseStudentFilesResponse,
} from "../libraries/parsers";
import {
  ObservationRecord,
  BehaviorPlanRecord,
  FunctionSurveyResultRecord,
  StudentFileRecord,
  ObservationPeriodRecord,
} from "../types/types";
import { behaviorPlansAtom, behaviorPlansResetAtom } from "../recoil/behaviorPlansAtoms";
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

const useStudentBootstrapEffect = () => {
  const { sendRequest: getDocs } = useGetDocs();
  const setObservations = useSetRecoilState<ObservationRecord[]>(observationsAtom);
  const setBehaviorPlans = useSetRecoilState<BehaviorPlanRecord[]>(behaviorPlansAtom);
  const setFunctionSurveyResults =
    useSetRecoilState<FunctionSurveyResultRecord[]>(functionSurveyResultsAtom);
  const setObservationPeriods = useSetRecoilState(observationPeriodsAtom);
  const setStudentFiles = useSetRecoilState(studentFilesAtom);

  //RESETS
  const observationsReset = useRecoilValue(observationsResetAtom);
  const behaviorPlansReset = useRecoilValue(behaviorPlansResetAtom);
  const functionSurveyResultsReset = useRecoilValue(functionSurveyResultsResetAtom);
  const studentFilesReset = useRecoilValue(studentFilesResetAtom);

  //VALUES
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const organization = useRecoilValue(organizationAtom);

  useEffect(() => {
    if (!loggedInStaff || !selectedStudent) return;
    const getBehaviorPlans = async () => {
      const response = await getDocs<BehaviorPlanRecord>({
        col: "behaviorPlans",
        config: {
          where: ["studentId", "==", selectedStudent.id],
          orderBy: ["createdAt", "desc"],
        },
      });
      if (response) {
        setBehaviorPlans(parseBehaviorPlanResponse(response));
      }
    };
    getBehaviorPlans();
  }, [setBehaviorPlans, getDocs, behaviorPlansReset, loggedInStaff, selectedStudent]);

  useEffect(() => {
    if (!loggedInStaff || !selectedStudent) return;
    const getFunctionSurveyResults = async () => {
      const response = await getDocs<FunctionSurveyResultRecord>({
        col: "functionSurveyResults",
        config: {
          where: ["studentId", "==", selectedStudent.id],
          orderBy: ["createdAt", "desc"],
        },
      });
      if (response) {
        setFunctionSurveyResults(parseFunctionSurveyResultsResponse(response));
      }
    };
    getFunctionSurveyResults();
  }, [
    setFunctionSurveyResults,
    getDocs,
    functionSurveyResultsReset,
    loggedInStaff,
    selectedStudent,
  ]);

  useEffect(() => {
    if (!loggedInStaff || !selectedStudent) return;
    const getObservations = async () => {
      const response = await getDocs<ObservationRecord>({
        col: "observations",
        config: {
          where: ["studentId", "==", selectedStudent.id],
          orderBy: ["createdAt", "desc"],
        },
      });
      if (response) {
        setObservations(parseObservationResponse(response));
      }
    };
    getObservations();
  }, [setObservations, getDocs, observationsReset, selectedStudent, loggedInStaff]);

  useEffect(() => {
    if (!loggedInStaff || !selectedStudent) return;
    const getStudentFiles = async () => {
      const response = await getDocs<StudentFileRecord>({
        col: "studentFiles",
        config: {
          where: ["studentId", "==", selectedStudent.id],
          orderBy: ["createdAt", "desc"],
        },
      });
      if (response) {
        setStudentFiles(parseStudentFilesResponse(response));
      }
    };
    getStudentFiles();
  }, [setStudentFiles, getDocs, studentFilesReset, selectedStudent, loggedInStaff]);

  useEffect(() => {
    if (!selectedStudent || !organization || !loggedInStaff) return;
    const db = getDatabase();
    const observationPeriodsRef = ref(
      db,
      `observationPeriods/${organization.id}/${selectedStudent.id}`
    );
    onValue(observationPeriodsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setObservationPeriods([]);
        return;
      }
      const keysArray = Object.keys(data);
      const tempArray: ObservationPeriodRecord[] = [];
      keysArray.forEach((key) => {
        tempArray.push({
          ...data[key],
          id: key,
        });
      });
      tempArray.sort((a, b) => b.endTime - a.endTime);
      setObservationPeriods(tempArray);
    });
  }, [selectedStudent, organization, loggedInStaff, setObservationPeriods]);
};

export default useStudentBootstrapEffect;
