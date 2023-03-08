import React, { useState } from "react";
import ObservationFormDialog from "../ObservationForm/ObservationFormDialog";
import StudentReportsHeader from "./StudentReportsHeader";
import TimerContainer from "../Timer/TimerContainer";
import ObservationPeriodContainer from "./ObservationPeriodContainer";

function StudentReportsContainer() {
  const [newObservationOpen, setNewObservationOpen] = useState(false);

  return (
    <>
      <StudentReportsHeader setNewObservationOpen={setNewObservationOpen} />
      <TimerContainer />
      <ObservationPeriodContainer />
      <ObservationFormDialog open={newObservationOpen} setOpen={setNewObservationOpen} />
    </>
  );
}

export default StudentReportsContainer;
