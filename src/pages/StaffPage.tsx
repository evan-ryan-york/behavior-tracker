import { Container } from "@mui/material";
import Navbar from "../components/Navigation/Navbar";
import StaffContainer from "../components/Staff/StaffContainer";

const StaffPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ minHeight: "100vh", mt: 8, pt: 2 }}>
        <StaffContainer />
      </Container>
    </>
  );
};

export default StaffPage;
