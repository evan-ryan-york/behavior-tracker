import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { filtersAtom } from "../../recoil/filtersAtoms";
import { useRecoilState } from "recoil";
import { DateTime } from "luxon";

export default function DateRange() {
  const [filters, setFilters] = useRecoilState(filtersAtom);

  const handleDateChange = (dateRange: [DateTime | null, DateTime | null]) => {
    let startDate: string | null = null;
    let endDate: string | null = null;
    if (dateRange[0] !== null) {
      startDate = dateRange[0].toLocaleString();
    }
    if (dateRange[1] !== null) {
      endDate = dateRange[1].toLocaleString();
    }
    console.log(filters)
    setFilters((pV) => ({ ...pV, dateRange: [startDate, endDate] }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DateRangePicker
        value={filters.dateRange}
        onChange={handleDateChange}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
