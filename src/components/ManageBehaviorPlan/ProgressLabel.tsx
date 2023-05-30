import * as React from "react";
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type Props = {
  value: number;
};

export function ProgressLabel({ value }: Props) {
  console.log(value);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress color="secondary" variant="determinate" value={Math.round(((value - 1) / 7) * 100)} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography sx={{ color: "#fff" }} variant="body2" color="text.secondary">{`${Math.round(
          ((value - 1) / 7) * 100
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
