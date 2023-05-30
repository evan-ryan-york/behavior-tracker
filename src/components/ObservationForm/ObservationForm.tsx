import { useState } from "react";
import { Button } from "@mui/material";
import { Note } from "../../types/types";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import { selectedStudentIdAtom } from "../../recoil/studentAtoms";
import {
  activeObservationPeriodIdAtom,
  manageObservationOpenAtom,
  observationsResetAtom,
  selectedObservationPeriodIdAtom,
} from "../../recoil/observationAtoms";
import ObservationNotesContainer from "./ObservationNotesContainer";
import ABCData from "./ABCData";
import Details from "./Details";
import useAddDoc from "../../hooks/useAddDoc";
import { useRecoilValue, useSetRecoilState } from "recoil";

type Props = {
  setOpen: (value: boolean) => void;
};

function ObservationForm({ setOpen }: Props) {
  const [antecedentsArray, setAntecedentsArray] = useState<string[]>([]);
  const [behaviorsArray, setBehaviorsArray] = useState<string[]>([]);
  const [consequencesArray, setConsequencesArray] = useState<string[]>([]);
  const [functionsOfBehaviorArray, setFunctionsOfBehaviorArray] = useState<string[]>([]);
  const [duration, setDuration] = useState("<1 min");
  const [intensity, setIntensity] = useState("low");
  const [notesArray, setNotesArray] = useState<Note[]>([]);
  const [settingId, setSettingId] = useState<string | null>(null);
  const { sendRequest: addDoc } = useAddDoc();
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const selectedStudentId = useRecoilValue(selectedStudentIdAtom);
  const setObservationsReset = useSetRecoilState(observationsResetAtom);
  const activeObservationPeriodId = useRecoilValue(activeObservationPeriodIdAtom);
  const setManageObservationOpen = useSetRecoilState(manageObservationOpenAtom);
  const selectedObservationPeriodId = useRecoilValue(selectedObservationPeriodIdAtom);

  const resetForm = () => {
    setAntecedentsArray([]);
    setBehaviorsArray([]);
    setConsequencesArray([]);
    setFunctionsOfBehaviorArray([]);
    setDuration("<1 min");
    setIntensity("low");
    setNotesArray([]);
    setOpen(false);
    setSettingId(null);
  };

  const handleSubmit = async () => {
    if (!loggedInStaff || !selectedObservationPeriodId) return;
    const data = {
      antecedents: antecedentsArray,
      behaviors: behaviorsArray,
      consequences: consequencesArray,
      functionsOfBehavior: functionsOfBehaviorArray,
      notes: notesArray,
      duration: duration,
      intensity: intensity,
      authorId: loggedInStaff.id,
      studentId: selectedStudentId,
      settingId: settingId,
      observationPeriodId: selectedObservationPeriodId,
    };
    await addDoc({ col: "observations", data: data });
    resetForm();
    setObservationsReset((pV) => !pV);
    setManageObservationOpen(false);
  };

  return (
    <>
      <ABCData
        antecedentsArray={antecedentsArray}
        behaviorsArray={behaviorsArray}
        consequencesArray={consequencesArray}
        setAntecedentsArray={setAntecedentsArray}
        setBehaviorsArray={setBehaviorsArray}
        setConsequencesArray={setConsequencesArray}
      />
      <Details
        duration={duration}
        intensity={intensity}
        setDuration={setDuration}
        setIntensity={setIntensity}
        settingId={settingId}
        setSettingId={setSettingId}
      />

      <ObservationNotesContainer notesArray={notesArray} setNotesArray={setNotesArray} />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ padding: 2, mb: 1, mt: 2 }}
        onClick={handleSubmit}
      >
        Submit Observation
      </Button>
    </>
  );
}

export default ObservationForm;
