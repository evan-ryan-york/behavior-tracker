import { useState } from "react";
import { Typography, Grid, Box } from "@mui/material";
import SettingsSideMenu from "./SettingsSideMenu";
import { SettingsSections } from "../../libraries/objects";

export default function SettingsContainer() {
  const [activeSettingSection, setActiveSettingSection] = useState<string>(
    SettingsSections.OBJECTIVES
  );
  const sideMenuHeight = window.innerHeight - 64;
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <Box sx={{ height: sideMenuHeight, backgroundColor: "#eee" }}>
            <SettingsSideMenu setActiveSettingSection={setActiveSettingSection} />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ height: sideMenuHeight, overflow: "scroll", pl: 2, pr: 2 }}>
            <Typography sx={{ textAlign: "center", pt: 2, marginBottom: "8px" }} variant="h2">
              Settings
            </Typography>
            {activeSettingSection === SettingsSections.SECTIONS && (
              <>
                <Typography sx={{ pt: 2 }} variant="h4">
                  Menu Section
                </Typography>
                <div>Insert Component Here</div>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
