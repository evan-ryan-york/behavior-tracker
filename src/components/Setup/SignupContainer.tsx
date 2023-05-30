import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import SignupForm from "./SignupForm";

type Plan = "individual" | "organization" | null;

type Props = {
  selectedPlan: Plan;
};

function SignupContainer({ selectedPlan }: Props) {
  return (
    <Box sx={{ width: "100VW", height: "100VH", backgroundColor: "#012", margin: "0 auto" }}>
      <Box sx={{ width: 150, margin: "0 auto", pt: 8 }}>
        <img width="100%" src="/white_check_hex.png" alt="Behavior Plan Maker Logo" />
      </Box>
      <Typography sx={{ mt: 2, color: "white" }} variant="h2" textAlign="center">
        Behavior Plan Maker
      </Typography>
      <Typography sx={{ color: "white" }} variant="h4" textAlign="center">{`Create Your ${
        selectedPlan && selectedPlan === "individual" ? "Individual" : "Organization"
      } Account`}</Typography>
      <SignupForm selectedPlan={selectedPlan} />
    </Box>
  );
}

export default SignupContainer;
