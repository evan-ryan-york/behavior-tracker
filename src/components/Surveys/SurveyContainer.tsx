import React, { useState } from "react";
import { FunctionSurveyQuestionRecord, FunctionSurveyResultRecord } from "../../types/types";
import { Box, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { behaviorsObjAtom } from "../../recoil/behaviorsAtoms";
import { functionSurveyQuestionsAtom } from "../../recoil/functionSurveyAtoms";
import Question from "./Question";
import FunctionOfBehaviorContainer from "./FunctionOfBehaviorContainer";
import EditAnswerDialog from "./EditAnswerDialog";

type Props = {
  selectedSurvey: FunctionSurveyResultRecord | null;
};

function SurveyContainer({ selectedSurvey }: Props) {
  const behaviorsObj = useRecoilValue(behaviorsObjAtom);
  const questions = useRecoilValue(functionSurveyQuestionsAtom);
  const [selectedQuestion, setSelectedQuestion] = useState<FunctionSurveyQuestionRecord | null>(
    null
  );
  const [editOpen, setEditOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState<string | null>(null);
  return (
    <>
      {questions && selectedSurvey && behaviorsObj && (
        <Box sx={{ mt: 1, textAlign: "center" }}>
          <Typography variant="h5">{behaviorsObj[selectedSurvey.behaviorId].label}</Typography>
          <Box sx={{overflow: "scroll"}}>
          <FunctionOfBehaviorContainer selectedSurvey={selectedSurvey} />
          </Box>
          {questions.map((question, index) => (
            <Question
              key={question.id}
              question={question}
              index={index}
              selectedSurvey={selectedSurvey}
              setCurrentOption={setCurrentOption}
              setSelectedQuestion={setSelectedQuestion}
              setOpen={setEditOpen}
            />
          ))}
        </Box>
      )}
      <EditAnswerDialog
        question={selectedQuestion}
        currentOption={currentOption}
        open={editOpen}
        setOpen={setEditOpen}
        selectedSurvey={selectedSurvey}
      />
    </>
  );
}

export default SurveyContainer;
