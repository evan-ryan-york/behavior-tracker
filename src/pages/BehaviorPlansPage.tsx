import { Container } from "@mui/material";
import Navbar from "../components/Navigation/Navbar";
import BehaviorPlansContainer from "../components/BehaviorPlans/BehaviorPlansContainer";

const PlansPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ minHeight: "100vh", mt: 8, pt: 2 }}>
        <BehaviorPlansContainer />
      </Container>
    </>
  );
};

export default PlansPage;
