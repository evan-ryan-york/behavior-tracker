import { Box, Typography } from "@mui/material";
import StudentSelect from "../shared/StudentSelect";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function StudentDashboardHeader() {
  const { width } = useWindowDimensions();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: width < 682 ? "center" : "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ mb: width < 682 ? 2 : 0, pr: width < 682 ? 2 : 0, pl: width < 682 ? 2 : 0 }} variant={width < 1000 ? "h4" : "h2"}>
          Student Dashboard
        </Typography>
        <StudentSelect />
      </Box>
    </>
  );
}

export default StudentDashboardHeader;
