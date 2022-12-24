import { useState } from "react";
import { Container } from "@mui/material";
import NavBar from "../components/Navigation/Navbar";

import AddActiveToCollection from "./AddActiveToCollection";
import PasswordProtections from "./PasswordProtections";

function DBChanges() {
  const [passwordApproved, setPasswordApproved] = useState(false);
  return (
    <>
      <NavBar></NavBar>
      <Container maxWidth="lg" sx={{ minHeight: "100vh", mt: 8, pt: 2 }}>
        {passwordApproved ? (
          <>
            <AddActiveToCollection />
          </>
        ) : (
          <PasswordProtections setPasswordApproved={setPasswordApproved} />
        )}
      </Container>
    </>
  );
}

export default DBChanges;
