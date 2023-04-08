import { Typography, TextField, Box } from "@mui/material";
import React from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

type SetterFunction = (pV: [string | null, string | null]) => [string | null, string | null];

type Props = {
  dataDateRange: [string | null, string | null];
  setDataDateRange: (prevValue: [string | null, string | null]) => void;
};

function DataSelectForm({ dataDateRange, setDataDateRange }: Props) {
  const handleChange = (dateRange: any) => {
    const startDate = dateRange[0] ? new Date(dateRange[0]).toLocaleDateString() : null;
    const endDate = dateRange[1] ? new Date(dateRange[1]).toLocaleDateString() : null;
    setDataDateRange([startDate, endDate]);
  };
  return (
    <>
      <Typography sx={{ textAlign: "center", mb: 2 }} variant="h5">
        Step 1: Select the Data You Want to Use To Build Your Behavior Plan
      </Typography>
      <Box sx={{ margin: "0 auto", textAlign: "center" }}>
        <Typography>
          If you want to use ABC data collected in this app, set the date range for teh data you
          want to use below.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DateRangePicker
              value={dataDateRange}
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
    </>
  );
}

export default DataSelectForm;
