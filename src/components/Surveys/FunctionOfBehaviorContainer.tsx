import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { behaviorsObjAtom } from "../../recoil/behaviorsAtoms";
import { FUNCTIONS_OF_BEHAVIOR, FUNCTION_SURVEY_OPTIONS } from "../../libraries/objects";
import FunctionOfBehaviorChart from "./FunctionOfBehaviorChart";
import { BehaviorRecord, FunctionSurveyResultRecord } from "../../types/types";
import { functionSurveyQuestionsAtom } from "../../recoil/functionSurveyAtoms";

type ChartData = {
  name: string;
  amt: number;
};

type ChartReport = {
  behaviorLabel: string;
  bars: ChartData[];
};

type Props = {
  selectedSurvey: FunctionSurveyResultRecord;
};

function FunctionOfBehaviorContainer({ selectedSurvey }: Props) {
  const questions = useRecoilValue(functionSurveyQuestionsAtom);
  const [chartData, setChartData] = useState<ChartReport | null>();
  const behaviorsObj = useRecoilValue(behaviorsObjAtom);
  const [selectedBehavior, setSelectedBehavior] = useState<BehaviorRecord | null>(null);

  useEffect(() => {
    if (!behaviorsObj || !selectedSurvey) return;
    setSelectedBehavior(behaviorsObj[selectedSurvey.behaviorId]);
  }, [behaviorsObj, selectedSurvey]);

  useEffect(() => {
    if (!selectedBehavior || !questions) return;
    const tempCounter: { [key: string]: number } = {
      [FUNCTIONS_OF_BEHAVIOR.ACCESS]: 0,
      [FUNCTIONS_OF_BEHAVIOR.ATTENTION]: 0,
      [FUNCTIONS_OF_BEHAVIOR.ESCAPE]: 0,
      [FUNCTIONS_OF_BEHAVIOR.SENSORY]: 0,
    };
    questions.forEach((question) => {
      const result = selectedSurvey.responses[question.id];
      switch (result) {
        case FUNCTION_SURVEY_OPTIONS.AGREE:
          tempCounter[question.functionOfBehavior]++;
          break;
        case FUNCTION_SURVEY_OPTIONS.STRONGLY_AGREE:
          tempCounter[question.functionOfBehavior] = tempCounter[question.functionOfBehavior] + 2;
          break;
        default:
          break;
      }
    });

    const tempChartReport: ChartReport = {
      behaviorLabel: selectedBehavior.label,
      bars: [
        {
          name: FUNCTIONS_OF_BEHAVIOR.ACCESS,
          amt: tempCounter[FUNCTIONS_OF_BEHAVIOR.ACCESS],
        },
        {
          name: FUNCTIONS_OF_BEHAVIOR.ATTENTION,
          amt: tempCounter[FUNCTIONS_OF_BEHAVIOR.ATTENTION],
        },
        { name: FUNCTIONS_OF_BEHAVIOR.ESCAPE, amt: tempCounter[FUNCTIONS_OF_BEHAVIOR.ESCAPE] },
        {
          name: FUNCTIONS_OF_BEHAVIOR.SENSORY,
          amt: tempCounter[FUNCTIONS_OF_BEHAVIOR.SENSORY],
        },
      ],
    };
    setChartData(tempChartReport);
  }, [selectedBehavior, selectedSurvey, questions]);

  return (
    <>{chartData && <FunctionOfBehaviorChart key={chartData.behaviorLabel} chart={chartData} />}</>
  );
}

export default FunctionOfBehaviorContainer;
