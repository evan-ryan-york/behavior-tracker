import { Container } from "@mui/material";
import Navbar from "../components/Navigation/Navbar";
import StudentDashboardContainer from "../components/StudentDashboard/StudentDashboardContainer";

const StudentDashboardPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ minHeight: "100vh", mt: 8, pt: 2 }}>
        <StudentDashboardContainer />
      </Container>
    </>
  );
};

export default StudentDashboardPage;
