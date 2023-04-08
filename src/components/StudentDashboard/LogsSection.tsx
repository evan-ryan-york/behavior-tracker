import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { useRecoilValue } from "recoil";
import ObservationPeriodAccordion from "../StudentReports/ObservationPeriodAccordion";
import { observationPeriodsAtom } from "../../recoil/observationAtoms";

function LogsSection() {
  const organization = useRecoilValue(organizationAtom);
  const observationPeriods = useRecoilValue(observationPeriodsAtom);
  console.log(observationPeriods);

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
            <Typography variant="h4">ABC Data</Typography>
            <Button variant="contained" color="secondary">
              New
            </Button>
          </Box>
          <Box sx={{ padding: 2, height: 400, overflow: "scroll" }}>
            <Box sx={{ mt: 4 }}>
              {observationPeriods &&
                observationPeriods.map((observationPeriod) => (
                  <ObservationPeriodAccordion
                    key={observationPeriod.startTime}
                    observationPeriod={observationPeriod}
                  />
                ))}
            </Box>
          </Box>
        </Paper>
      )}
    </>
  );
}

export default LogsSection;
