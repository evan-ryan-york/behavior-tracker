import { Box, Typography } from "@mui/material";
import StudentSelect from "../shared/StudentSelect";

function StudentDashboardHeader() {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        <Typography variant="h2">Student Dashboard</Typography>
        <StudentSelect />
      </Box>
    </>
  );
}

export default StudentDashboardHeader;
