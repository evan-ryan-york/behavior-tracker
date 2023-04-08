import { FunctionSurveyQuestionRecord, FunctionSurveyResultRecord } from "../../types/types";
import { Box, Grid, Paper, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRecoilValue } from "recoil";
import { selectedStudentAtom } from "../../recoil/studentAtoms";
import { FUNCTION_SURVEY_OPTIONS } from "../../libraries/objects";

type Props = {
  question: FunctionSurveyQuestionRecord;
  index: number;
  selectedSurvey: FunctionSurveyResultRecord;
  setSelectedQuestion: (pV: FunctionSurveyQuestionRecord) => void;
  setCurrentOption: (pV: string) => void;
  setOpen: (pV: boolean) => void;
};

function Question({
  question,
  index,
  selectedSurvey,
  setSelectedQuestion,
  setCurrentOption,
  setOpen,
}: Props) {
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const formatTextWithName = (questionString: string) => {
    if (!selectedStudent) return;
    return questionString.replaceAll("*child*", `${selectedStudent.firstName}`);
  };
  const formatResults = (result: string) => {
    let color = "#fff";
    switch (result) {
      case FUNCTION_SURVEY_OPTIONS.AGREE:
        color = "#D0F2C4";
        break;
      case FUNCTION_SURVEY_OPTIONS.DISAGREE:
        color = "#FFD6D9";
        break;
      case FUNCTION_SURVEY_OPTIONS.STRONGLY_AGREE:
        color = "#D6EDFF";
        break;
      case FUNCTION_SURVEY_OPTIONS.NA:
        color = "#eee";
        break;
      default:
        color = "#fff";
    }
    return color;
  };
  const color = formatResults(selectedSurvey.responses[question.id]);

  const handleEditClick = () => {
    console.log(selectedSurvey.responses[question.id]);
    setCurrentOption(selectedSurvey.responses[question.id]);
    setSelectedQuestion(question);
    setOpen(true);
  };

  return (
    <>
      <Paper sx={{ mt: 2, padding: 1 }}>
        <Grid container spacing={1} sx={{ minHeight: 50 }}>
          <Grid item xs={12} sm={6} md={7} lg={9}>
            <Typography sx={{ textAlign: "left" }}>{`${index + 1}: ${formatTextWithName(
              question.label
            )}`}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={3}>
            <Box
              sx={{
                backgroundColor: color,
                height: "100%",
                display: "flex",
                verticalAlign: "middle",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "3px",
                position: "relative",
              }}
            >
              <Typography>{selectedSurvey.responses[question.id]}</Typography>
              <IconButton
                size="small"
                sx={{ position: "absolute", top: 2, right: 2 }}
                onClick={handleEditClick}
              >
                <EditIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default Question;
