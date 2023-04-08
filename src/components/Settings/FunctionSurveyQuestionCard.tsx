import { Box, Paper, Typography, Button, Grid } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { FunctionSurveyQuestionRecord } from "../../types/types";
import { functionSurveyQuestionFormAtom } from "../../recoil/functionSurveyAtoms";

type Props = {
  functionSurveyQuestion: FunctionSurveyQuestionRecord;
  setManageOpen: (value: boolean) => void;
  setDeleteOpen: (value: boolean) => void;
  setDeleteId: (value: string | null) => void;
};

function FunctionSurveyQuestionCard({
  functionSurveyQuestion,
  setManageOpen,
  setDeleteOpen,
  setDeleteId,
}: Props) {
  const setFunctionSurveyQuestionForm = useSetRecoilState(functionSurveyQuestionFormAtom);
  const handleFieldEdit = (functionSurveyQuestion: FunctionSurveyQuestionRecord) => {
    setFunctionSurveyQuestionForm(functionSurveyQuestion);
    setManageOpen(true);
  };

  const handleDeleteFunctionSurveyQuestion = () => {
    setDeleteOpen(true);
    setDeleteId(functionSurveyQuestion.id);
  };
  return (
    <>
      <Box sx={{ mt: 2, cursor: "pointer" }}>
        <Paper sx={{ padding: 2 }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={9} lg={10}>
              <Box sx={{ padding: 1 }}>
                <Typography>{`${functionSurveyQuestion.label}`}</Typography>
                <Typography variant="body2">{`Target Function: ${functionSurveyQuestion.functionOfBehavior}`}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "100%",
                  ml: 1,
                  mr: 1,
                  maxWidth: 100,
                }}
              >
                <Button
                  sx={{ mr: 2 }}
                  variant="outlined"
                  onClick={() => handleFieldEdit(functionSurveyQuestion)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteFunctionSurveyQuestion}
                >
                  Delete
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

export default FunctionSurveyQuestionCard;
