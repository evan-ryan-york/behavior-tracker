import { FC } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Copyright: FC = () => {
  return (
    <Typography variant="body2" color="#ccc" align="center">
      {"Copyright © "}
      <Link style={{ color: "#ccc" }} to="">
        Firestarters LLC
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
