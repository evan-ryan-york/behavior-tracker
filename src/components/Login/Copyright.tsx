import { FC } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Copyright: FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="primary" to="tgpk12.org">
        The Gathering Place
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
