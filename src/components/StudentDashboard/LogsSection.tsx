import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { useRecoilValue } from "recoil";
import { observationPeriodsAtom } from "../../recoil/observationAtoms";
import LogCard from "./LogCard";
import ObservationPeriodDialog from "../ObservationPeriods/ObservationPeriodDialog";

function LogsSection() {
  const organization = useRecoilValue(organizationAtom);
  const observationPeriods = useRecoilValue(observationPeriodsAtom);
  const [periodDialogOpen, setPeriodDialogOpen] = useState(false);


  const handlePeriodDialogClick = () => {
    setPeriodDialogOpen(true);
  };

  return (
    <>
      {organization && (
        <Paper>
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
            <Typography variant="h4">ABC Observation Periods</Typography>
            <Button variant="contained" color="secondary" onClick={handlePeriodDialogClick}>
              Manage
            </Button>
          </Box>
          <Box sx={{ padding: 2, height: 400, overflow: "scroll" }}>
            <Box sx={{ mt: 4 }}>
              {observationPeriods &&
                observationPeriods.map((observationPeriod) => (
                  <LogCard
                    key={observationPeriod.startTime}
                    observationPeriod={observationPeriod}
                  />
                ))}
            </Box>
          </Box>
        </Paper>
      )}
      <ObservationPeriodDialog setOpen={setPeriodDialogOpen} open={periodDialogOpen} />
    </>
  );
}

export default LogsSection;
