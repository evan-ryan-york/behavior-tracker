import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { filtersAtom } from "../../recoil/filtersAtoms";
import { useRecoilState } from "recoil";

export default function DateFilter() {
  const [filters, setFilters] = useRecoilState(filtersAtom);

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DateRangePicker
        value={filters.dateRange}
        onChange={(dateRange: any) => {
          setFilters({ ...filters, dateRange });
        }}
        slotProps={{ fieldSeparator: { children: "to" } }}
      />
    </LocalizationProvider>
  );
}
