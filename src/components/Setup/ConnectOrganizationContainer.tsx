import { Box, Typography } from "@mui/material";
import React from "react";
import ConnectOrganizationForm from "./ConnectOrganizationForm";

function ConnectOrganizationContainer() {
  return (
    <Box sx={{ width: "100VW", height: "100VH", backgroundColor: "#012", margin: "0 auto" }}>
      <Box sx={{ width: 150, margin: "0 auto", pt: 8 }}>
        <img width="100%" src="/white_check_hex.png" alt="Behavior Plan Maker Logo" />
      </Box>
      <Typography sx={{ mt: 2, color: "white" }} variant="h2" textAlign="center">
        Behavior Plan Maker
      </Typography>
      <Typography
        id="typed-text-container"
        sx={{ color: "white" }}
        variant="h4"
        textAlign="center"
      ></Typography>
      <ConnectOrganizationForm />
    </Box>
  );
}

export default ConnectOrganizationContainer;
