import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { FunctionSurveyResultRecord } from "../../types/types";
import SurveyContainer from "./SurveyContainer";

type Props = {
  selectedSurvey: FunctionSurveyResultRecord | null;
  setSelectedSurvey: (pV: FunctionSurveyResultRecord | null) => void;
};

function SurveyDialog({ selectedSurvey, setSelectedSurvey }: Props) {
  const handleClose = () => {
    setSelectedSurvey(null);
  };
  return (
    <>
      {selectedSurvey && (
        <Dialog open={Boolean(selectedSurvey)} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle sx={{ fontSize: 44, textAlign: "center" }}>Survey Result</DialogTitle>
          <DialogContent>
            <SurveyContainer selectedSurvey={selectedSurvey} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default SurveyDialog;
