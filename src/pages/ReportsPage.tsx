import { Container, Box } from "@mui/material";
import Navbar from "../components/Navigation/Navbar";
import ReportsContainer from "../components/Reports/ReportsContainer";
const ReportsPage = () => {
  return (
    <>
      <Box sx={{ mt: 8 }}>
        <Navbar />
        <ReportsContainer />
      </Box>
    </>
  );
};

export default ReportsPage;
