import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  functionSurveyResultsAtom,
  functionSurveyResultsResetAtom,
} from "../../recoil/functionSurveyAtoms";
import SurveyCard from "./SurveyCard";
import { FunctionSurveyResultRecord } from "../../types/types";
import ManageSurveyDialog from "../ManageSurvey/ManageSurveyDialog";
import SurveyDialog from "../Surveys/SurveyDialog";
import DeleteDialog from "../shared/DeleteDialog";

function SurveysSection() {
  const organization = useRecoilValue(organizationAtom);
  const functionSurveyResults = useRecoilValue(functionSurveyResultsAtom);
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [selectedSurvey, setSelectedSurvey] = useState<FunctionSurveyResultRecord | null>(null);
  const setFunctionSurveyResultsReset = useSetRecoilState(functionSurveyResultsResetAtom);

  const handleNewOpen = () => {
    setManageOpen(true);
  };

  return (
    <>
      {organization && (
        <Paper sx={{ height: "95%" }}>
          <Box
            sx={{
              padding: 1,
              backgroundColor: organization.primaryColor,
              color: organization.primaryTextColor,
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4">Behavior Surveys</Typography>
            <Button variant="contained" color="secondary" onClick={handleNewOpen}>
              New
            </Button>
          </Box>
          <Box sx={{ padding: 2, height: 350, overflow: "scroll" }}>
            {functionSurveyResults &&
              functionSurveyResults.map((surveyResult) => (
                <SurveyCard
                  key={surveyResult.id}
                  surveyResult={surveyResult}
                  setSelectedSurvey={setSelectedSurvey}
                  setDeleteOpen={setDeleteOpen}
                  setDeleteId={setDeleteId}
                  selectedSurvey={selectedSurvey}
                />
              ))}
          </Box>
        </Paper>
      )}
      <ManageSurveyDialog open={manageOpen} setOpen={setManageOpen} />
      <SurveyDialog selectedSurvey={selectedSurvey} setSelectedSurvey={setSelectedSurvey} />
      <DeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        message={
          "Are you sure you want to delete this Survey? This can not be undone and the results of the survey will be removed from the system."
        }
        collection="functionSurveyResults"
        id={deleteId}
        setReset={setFunctionSurveyResultsReset}
      />
    </>
  );
}

export default SurveysSection;
