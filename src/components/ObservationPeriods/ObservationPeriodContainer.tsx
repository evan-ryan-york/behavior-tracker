import React from "react";
import { useRecoilValue } from "recoil";
import { observationPeriodsAtom } from "../../recoil/observationAtoms";
import ObservationPeriodAccordion from "./ObservationPeriodAccordion";

function ObservationPeriodContainer() {
  const observationPeriods = useRecoilValue(observationPeriodsAtom);

  return (
    <>
      {observationPeriods &&
        observationPeriods.map((observationPeriod) => (
          <ObservationPeriodAccordion
            key={observationPeriod.startTime}
            observationPeriod={observationPeriod}
          />
        ))}
    </>
  );
}

export default ObservationPeriodContainer;
