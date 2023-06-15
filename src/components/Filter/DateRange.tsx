import React, { useEffect, useState } from "react";
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
  const [dtDateRange, setDTDateRange] = useState<[DateTime | null, DateTime | null]>([null, null]);

  useEffect(() => {
    setDTDateRange([
      filters.dateRange[0] ? DateTime.fromFormat("D", filters.dateRange[0]) : null,
      filters.dateRange[1] ? DateTime.fromFormat("D", filters.dateRange[1]) : null,
    ]);
  }, [filters.dateRange]);

  const handleDateChange = (dateRange: [DateTime | null, DateTime | null]) => {
    let startDate: string | null = null;
    let endDate: string | null = null;
    if (dateRange[0] !== null) {
      startDate = dateRange[0].toLocaleString();
    }
    if (dateRange[1] !== null) {
      endDate = dateRange[1].toLocaleString();
    }
    setFilters((pV) => ({ ...pV, dateRange: [startDate, endDate] }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DateRangePicker
        value={dtDateRange}
        onChange={handleDateChange}
        slotProps={{ fieldSeparator: { children: "to" } }}
      />
    </LocalizationProvider>
  );
}
