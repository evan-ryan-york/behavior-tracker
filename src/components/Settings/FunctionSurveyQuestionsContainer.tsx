import { useState, useCallback, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { antecedentsAtom, antecedentsResetAtom } from "../../recoil/antecedentsAtoms";
import AntecedentCard from "./AntecedentCard";
import ManageAntecedent from "./ManageAntecedent";
import DeleteDialog from "../shared/DeleteDialog";
import { AntecedentRecord, DropResult, FunctionSurveyQuestionRecord } from "../../types/types";
import { Container, Draggable } from "react-smooth-dnd";
import { updateDragArray } from "../../libraries/functions";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import {
  functionSurveyQuestionsAtom,
  functionSurveyQuestionsResetAtom,
} from "../../recoil/functionSurveyAtoms";
import FunctionSurveyQuestionCard from "./FunctionSurveyQuestionCard";
import ManageFunctionSurveyQuestion from "./ManageFunctionSurveyQuestion";

function FunctionSurveyQuestionsContainer() {
  const functionSurveyQuestions = useRecoilValue(functionSurveyQuestionsAtom);
  const [functionSurveyQuestionsForDisplay, setFunctionSurveyQuestionsForDisplay] = useState<
    FunctionSurveyQuestionRecord[]
  >([]);
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const setFunctionSurveyQuestionsReset = useSetRecoilState(functionSurveyQuestionsResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();

  useEffect(() => {
    if (!functionSurveyQuestions) return;
    setFunctionSurveyQuestionsForDisplay(functionSurveyQuestions);
  }, [functionSurveyQuestions]);

  const handleManageClick = () => {
    setManageOpen(true);
  };

  const handleDrop = useCallback(
    async (dropResult: DropResult) => {
      if (!functionSurveyQuestions) return;
      const result = updateDragArray<FunctionSurveyQuestionRecord>({
        dropResult,
        arr: functionSurveyQuestions,
      });
      if (!result) return;
      setFunctionSurveyQuestionsForDisplay(result);
      const promises: Array<Promise<string | null>> = [];

      result.forEach((functionSurveyQuestion, index) => {
        promises.push(
          updateDoc({
            col: "functionSurveyQuestions",
            data: { order: index },
            id: functionSurveyQuestion.id,
          })
        );
      });
      await Promise.all(promises);

      setFunctionSurveyQuestionsReset((pV) => !pV);
    },
    [functionSurveyQuestions, setFunctionSurveyQuestionsReset, updateDoc]
  );

  const handleOnDrop = (dropResult: DropResult) => {
    handleDrop(dropResult);
  };
  return (
    <>
      <Box sx={{ mt: 2, ml: 4, mr: 4 }}>
        <Button
          onClick={handleManageClick}
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ padding: 1, fontSize: 16 }}
        >
          Add New Function Survey Question
        </Button>
        <Container style={{ minHeight: 40 }} lockAxis="y" onDrop={handleOnDrop}>
          {functionSurveyQuestionsForDisplay &&
            functionSurveyQuestionsForDisplay.map((functionSurveyQuestion) => (
              <Draggable key={functionSurveyQuestion.id} className="overflowVisible">
                <FunctionSurveyQuestionCard
                  key={functionSurveyQuestion.id}
                  functionSurveyQuestion={functionSurveyQuestion}
                  setManageOpen={setManageOpen}
                  setDeleteOpen={setDeleteOpen}
                  setDeleteId={setDeleteId}
                />
              </Draggable>
            ))}
        </Container>
      </Box>
      <ManageFunctionSurveyQuestion open={manageOpen} setOpen={setManageOpen} />
      {deleteId && deleteOpen && (
        <DeleteDialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          message={"Are you sure you want to delete this Survey Question? This can not be undone."}
          collection="functionSurveyQuestions"
          id={deleteId}
          setReset={setFunctionSurveyQuestionsReset}
        />
      )}
    </>
  );
}

export default FunctionSurveyQuestionsContainer;
