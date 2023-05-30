import { Typography, TextField, Box, Dialog, DialogTitle, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateTime } from "luxon";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  filteredObservationPeriodsByDateAtom,
  filteredObservationsByPeriodsAtom,
  observationPeriodsAtom,
  observationsAtom,
} from "../../recoil/observationAtoms";
import {
  FunctionSurveyResult,
  FunctionSurveyResultRecord,
  ObservationPeriodRecord,
  ObservationRecord,
} from "../../types/types";
import {
  filteredSurveysByDateAtom,
  functionSurveyResultsAtom,
} from "../../recoil/functionSurveyAtoms";
import { behaviorDataDateRangeAtom } from "../../recoil/behaviorPlansAtoms";

type Props = {
  open: boolean;
  setOpen: (pV: boolean) => void;
};

function DataSelectDialog({ open, setOpen }: Props) {
  const filteredObservationPeriods = useRecoilValue(filteredObservationPeriodsByDateAtom);
  const filteredObservations = useRecoilValue(filteredObservationsByPeriodsAtom);
  const filteredSurveyResults = useRecoilValue(filteredSurveysByDateAtom);
  const [dateRange, setDateRange] = useRecoilState(behaviorDataDateRangeAtom);

  const handleChange = (dateRange: [DateTime | null, DateTime | null]) => {
    setDateRange([dateRange[0], dateRange[1]]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filter Data To Inform Behavior Plan</DialogTitle>
        <DialogContent>
          <Box sx={{ margin: "0 auto", textAlign: "center" }}>
            <Typography>
              If you want to use ABC data collected in this app, set the date range for teh data you
              want to use below.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography>{`There are ${filteredObservations.length} ABC observation logs and ${filteredSurveyResults.length} behavior survey responses in this date range.`}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DateRangePicker
                  value={dateRange}
                  onChange={handleChange}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField {...endProps} />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DataSelectDialog;
