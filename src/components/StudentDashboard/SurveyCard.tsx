import React, { useEffect } from "react";
import { FunctionSurveyResultRecord } from "../../types/types";
import { Box, IconButton, Grid, Paper, Typography } from "@mui/material";
import { behaviorsObjAtom } from "../../recoil/behaviorsAtoms";
import { useRecoilValue } from "recoil";
import { timestampToDisplay } from "../../libraries/functions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type Props = {
  surveyResult: FunctionSurveyResultRecord;
  setSelectedSurvey: (pV: FunctionSurveyResultRecord) => void;
  setDeleteOpen: (pV: boolean) => void;
  setDeleteId: (pV: string) => void;
  selectedSurvey: FunctionSurveyResultRecord | null;
};

function SurveyCard({
  surveyResult,
  setSelectedSurvey,
  setDeleteOpen,
  setDeleteId,
  selectedSurvey,
}: Props) {
  const behaviorsObj = useRecoilValue(behaviorsObjAtom);

  const handleSurveyClick = () => {
    setSelectedSurvey(surveyResult);
  };

  useEffect(() => {
    if (!selectedSurvey || !surveyResult) return;
    if (surveyResult.id === selectedSurvey.id) {
      setSelectedSurvey(surveyResult);
    }
  }, [surveyResult, selectedSurvey, setSelectedSurvey]);

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setDeleteOpen(true);
    setDeleteId(surveyResult.id);
  };
  return (
    <>
      {behaviorsObj && (
        <Paper
          sx={{
            mt: 2,
            ":hover": {
              boxShadow: 3,
            },
          }}
          key={surveyResult.id}
        >
          <Box sx={{ cursor: "pointer", position: "relative" }} onClick={handleSurveyClick}>
            <IconButton
              sx={{ position: "absolute", top: 2, right: 2, zIndex: 1000 }}
              onClick={handleDeleteClick}
            >
              <DeleteForeverIcon color="error" />
            </IconButton>
            <Grid container spacing={1} sx={{padding: 2}}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6">{`Target Behavior: ${
                  behaviorsObj[surveyResult.behaviorId].label
                }`}</Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography>{`Submitted By: ${surveyResult.submitter} on ${timestampToDisplay(
                  surveyResult.createdAt
                )}`}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      )}
    </>
  );
}

export default SurveyCard;
