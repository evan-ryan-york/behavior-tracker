import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { observationsGroupedByBehaviorAtom } from "../../recoil/observationAtoms";
import { behaviorsAtom } from "../../recoil/behaviorsAtoms";
import { antecedentsAtom } from "../../recoil/antecedentsAtoms";
import BehaviorReportChart from "./BehaviorReportChart";

type ChartData = {
  name: string;
  amt: number;
};

type ChartReport = {
  behaviorLabel: string;
  bars: ChartData[];
};

function AntecedentsReports() {
  const observationsGroupedByBehavior = useRecoilValue(observationsGroupedByBehaviorAtom);
  const behaviors = useRecoilValue(behaviorsAtom);
  const antecedents = useRecoilValue(antecedentsAtom);
  const [chartData, setChartData] = useState<ChartReport[]>([]);

  useEffect(() => {
    if (!observationsGroupedByBehavior || !behaviors) return;
    const tempChartReports: ChartReport[] = [];
    behaviors.forEach((behavior) => {
      const tempChartReport: ChartReport = { behaviorLabel: behavior.label, bars: [] };
      if (observationsGroupedByBehavior[behavior.id]) {
        antecedents.forEach((antecedent) => {
          const amt = observationsGroupedByBehavior[behavior.id].antecedentIds.filter(
            (antecedentId) => antecedentId === antecedent.id
          ).length;
          if (amt > 0) {
            tempChartReport.bars.push({ name: antecedent.label, amt: amt });
          }
        });
        if (tempChartReport.bars.length > 0) {
          tempChartReports.push(tempChartReport);
        }
      }
    });
    setChartData(tempChartReports);
  }, [observationsGroupedByBehavior, behaviors, antecedents]);

  return (
    <>
      {chartData &&
        chartData.map((chart) => <BehaviorReportChart key={chart.behaviorLabel} chart={chart} />)}
    </>
  );
}

export default AntecedentsReports;
