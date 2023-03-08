import { Container } from "@mui/material";
import Navbar from "../components/Navigation/Navbar";
import StudentReportsContainer from "../components/StudentReports/StudentReportsContainer";

const LogsPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ minHeight: "100vh", mt: 8, pt: 2 }}>
        <StudentReportsContainer />
      </Container>
    </>
  );
};

export default LogsPage;
