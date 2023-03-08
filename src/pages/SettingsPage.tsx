import { Container, Box } from "@mui/material";
import Navbar from "../components/Navigation/Navbar";
import SettingsContainer from "../components/Settings/SettingsContainer";

const SettingsPage = () => {
  return (
    <>
      <Box sx={{ mt: 8 }}>
        <Navbar />
        <SettingsContainer />
      </Box>
    </>
  );
};

export default SettingsPage;
