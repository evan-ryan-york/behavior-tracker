import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import SelectAccountType from "./SelectAccountType";

type Plan = "individual" | "organization" | null;

type Props = {
  setSelectedPlan: (pV: Plan) => void;
};

function SelectAccountTypeContainer({ setSelectedPlan }: Props) {
  let i = 0;
  var txt = "Create Behavior Plans That Work."; /* The text */
  var speed = 80; /* The speed/duration of the effect in milliseconds */

  useEffect(() => {
    const element = document.getElementById("typed-text-container");
    if (!element) return;
    element.innerHTML = "";
    const typeWriter = () => {
      if (i < txt.length) {
        element.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    };
    typeWriter();
  }, [i, speed, txt]);
  return (
    <Box
      sx={{ width: "100VW", minHeight: "100VH", backgroundColor: "#012", margin: " auto", pb: 4 }}
    >
      <Box sx={{ width: 150, margin: "0 auto", pt: 2 }}>
        <img width="100%" src="/white_check_hex.png" alt="Behavior Plan Maker Logo" />
      </Box>
      <Typography sx={{ mt: 1, color: "white" }} variant="h2" textAlign="center">
        Behavior Plan Maker
      </Typography>
      <Typography
        id="typed-text-container"
        sx={{ color: "white" }}
        variant="h4"
        textAlign="center"
      ></Typography>
      <SelectAccountType setSelectedPlan={setSelectedPlan} />
    </Box>
  );
}

export default SelectAccountTypeContainer;
