import { Box, Container, FormControlLabel, Grid, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import IndividualAccountCard from "./IndividualAccountCard";
import OrganizationAccountCard from "./OrganizationAccountCard";

type Plan = "individual" | "organization" | null;

type Props = {
  setSelectedPlan: (pV: Plan) => void;
};

function SelectAccountType({ setSelectedPlan }: Props) {
  const [annual, setAnnual] = useState(true);
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 1, textAlign: "center" }}>
        <FormControlLabel
          sx={{
            color: "#fff",
            mt: 2,
            backgroundColor: "#222",
            padding: "1px 8px 1px 2px",
            borderRadius: 3,
          }}
          control={<Switch checked={annual} />}
          label={annual ? "Annual" : "Monthly"}
          onChange={() => setAnnual(!annual)}
        />
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <IndividualAccountCard annual={annual} setSelectedPlan={setSelectedPlan} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <OrganizationAccountCard annual={annual} setSelectedPlan={setSelectedPlan} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default SelectAccountType;
