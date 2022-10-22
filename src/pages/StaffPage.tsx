import { FC } from "react";
import Navbar from "../components/Navigation/Navbar";
import StaffContainer from "../components/Staff/StaffContainer";

const StaffPage: FC = () => {
  return (
    <>
      <Navbar />
      <StaffContainer />
    </>
  );
};

export default StaffPage;
