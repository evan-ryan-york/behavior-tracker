import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { observationsGroupedByBehaviorAtom } from "../../recoil/observationAtoms";
import { behaviorsAtom } from "../../recoil/behaviorsAtoms";
import BehaviorReportChart from "./BehaviorReportChart";
import { antecedentsObjAtom } from "../../recoil/antecedentsAtoms";
import { consequencesObjAtom } from "../../recoil/consequencesAtoms";
import { FUNCTIONS_OF_BEHAVIOR } from "../../libraries/objects";

type ChartData = {
  name: string;
  amt: number;
};

type ChartReport = {
  behaviorLabel: string;
  bars: ChartData[];
};

function InferredFunctionOfBehaviorReports() {
  const observationsGroupedByBehavior = useRecoilValue(observationsGroupedByBehaviorAtom);
  const behaviors = useRecoilValue(behaviorsAtom);
  const antecedentsObj = useRecoilValue(antecedentsObjAtom);
  const consequencesObj = useRecoilValue(consequencesObjAtom);
  const [chartData, setChartData] = useState<ChartReport[]>([]);

  useEffect(() => {
    if (!observationsGroupedByBehavior || !behaviors || !antecedentsObj || !consequencesObj) return;
    const tempChartReports: ChartReport[] = [];
    behaviors.forEach((behavior) => {
      const tempChartReport: ChartReport = { behaviorLabel: behavior.label, bars: [] };
      if (observationsGroupedByBehavior[behavior.id]) {
        const antecedentIds = observationsGroupedByBehavior[behavior.id].antecedentIds;
        const consequenceIds = observationsGroupedByBehavior[behavior.id].consequenceIds;
        const functionsOfBehaviorArray = Object.values(FUNCTIONS_OF_BEHAVIOR);
        functionsOfBehaviorArray.forEach((functionOfBehavior) => {
          let count = 0;
          antecedentIds.forEach((antecedentId) => {
            if (!antecedentsObj[antecedentId]) return;
            const functionOfBehaviorName = antecedentsObj[antecedentId].functionOfBehavior;
            if (functionOfBehaviorName === functionOfBehavior) {
              count++;
            }
          });
          consequenceIds.forEach((consequenceId) => {
            if (!consequencesObj[consequenceId]) return;
            const functionOfBehaviorName = consequencesObj[consequenceId].functionOfBehavior;
            if (functionOfBehaviorName === functionOfBehavior) {
              count++;
            }
          });
          if (count > 0) {
            tempChartReport.bars.push({ name: functionOfBehavior, amt: count });
          }
        });
        console.log(tempChartReport.bars);
        if (tempChartReport.bars.length > 0) {
          tempChartReports.push(tempChartReport);
        }
      }
    });
    setChartData(tempChartReports);
  }, [observationsGroupedByBehavior, behaviors, antecedentsObj, consequencesObj]);

  return (
    <>
      {chartData &&
        chartData.map((chart) => <BehaviorReportChart key={chart.behaviorLabel} chart={chart} />)}
    </>
  );
}

export default InferredFunctionOfBehaviorReports;
