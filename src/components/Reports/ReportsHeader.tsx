import { Typography, Box } from "@mui/material";
import StudentSelect from "../shared/StudentSelect";

function ReportsHeader() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          pl: 2,
          pr: 2,
        }}
      >
        <Typography variant="h2">Student Reports</Typography>
        <StudentSelect />
      </Box>
    </>
  );
}

export default ReportsHeader;
