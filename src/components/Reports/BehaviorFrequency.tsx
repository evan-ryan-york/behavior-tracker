import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { selectedStudentObservationsAtom } from "../../recoil/observationAtoms";
import { behaviorsAtom } from "../../recoil/behaviorsAtoms";
import BehaviorReportChart from "./BehaviorReportChart";

type ChartData = {
  name: string;
  amt: number;
};

type ChartReport = {
  behaviorLabel: string;
  bars: ChartData[];
};

function BehaviorFrequency() {
  const observations = useRecoilValue(selectedStudentObservationsAtom);
  const behaviors = useRecoilValue(behaviorsAtom);
  const [chartData, setChartData] = useState<ChartReport[]>([]);

  useEffect(() => {
    if (!observations || !behaviors) return;
    const behaviorsObj: { [key: string]: number } = {};
    observations.forEach((observation) => {
      observation.behaviors.forEach((behavior) => {
        if (behaviorsObj[behavior]) {
          behaviorsObj[behavior]++;
        } else {
          behaviorsObj[behavior] = 1;
        }
      });
    });
    const chartBars: ChartData[] = [];
    behaviors.forEach((behavior) => {
      chartBars.push({ name: behavior.label, amt: behaviorsObj[behavior.id] });
      setChartData([{ behaviorLabel: "Behaviors", bars: chartBars }]);
    });
  }, [observations, behaviors]);

  return (
    <>
      {chartData &&
        chartData.map((chart) => <BehaviorReportChart key={chart.behaviorLabel} chart={chart} />)}
    </>
  );
}

export default BehaviorFrequency;
