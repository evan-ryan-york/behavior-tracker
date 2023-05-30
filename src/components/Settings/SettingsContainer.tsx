import { useState } from "react";
import { Typography, Grid, Box } from "@mui/material";
import SettingsSideMenu from "./SettingsSideMenu";
import { SettingsSections } from "../../libraries/objects";
import AntecedentsContainer from "./AntecedentsContainer";
import BehaviorsContainer from "./BehaviorsContainer";
import ConsequencesContainer from "./ConsequencesContainer";
import OrganizationContainer from "./OrganizationContainer";
import SitesContainer from "./SitesContainer";
import StaffContainer from "./StaffContainer";
import GroupsContainer from "./GroupsContainer";
import StudentsContainer from "./StudentsContainer";
import EnrollStatusContainer from "./EnrollStatusContainer";
import ObservationSettingsContainer from "./ObservationSettingsContainer";
import ReplacementBehaviorsContainer from "./ReplacementBehaviorsContainer";
import StrategiesContainer from "./StrategiesContainer";
import FunctionSurveyQuestionsContainer from "./FunctionSurveyQuestionsContainer";

export default function SettingsContainer() {
  const [activeSettingSection, setActiveSettingSection] = useState<string>(
    SettingsSections.ORG_PROFILE
  );
  const sideMenuHeight = window.innerHeight - 64;
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={4} sm={3} md={3} lg={2}>
          <Box sx={{ height: sideMenuHeight, backgroundColor: "#eee" }}>
            <SettingsSideMenu setActiveSettingSection={setActiveSettingSection} />
          </Box>
        </Grid>
        <Grid item xs={8} sm={9} md={9} lg={10}>
          <Box sx={{ height: sideMenuHeight, overflow: "scroll", pl: 2, pr: 2 }}>
            <Typography sx={{ textAlign: "center", pt: 2, marginBottom: "8px" }} variant="h2">
              Settings
            </Typography>
            {activeSettingSection === SettingsSections.ANTECEDENTS && <AntecedentsContainer />}
            {activeSettingSection === SettingsSections.BEHAVIORS && <BehaviorsContainer />}
            {activeSettingSection === SettingsSections.CONSEQUENCES && <ConsequencesContainer />}
            {activeSettingSection === SettingsSections.ORG_PROFILE && <OrganizationContainer />}
            {activeSettingSection === SettingsSections.SITES && <SitesContainer />}
            {activeSettingSection === SettingsSections.GROUPS && <GroupsContainer />}
            {activeSettingSection === SettingsSections.STAFF && <StaffContainer />}
            {activeSettingSection === SettingsSections.STUDENTS && <StudentsContainer />}
            {activeSettingSection === SettingsSections.REPLACEMENT_BEHAVIORS && (
              <ReplacementBehaviorsContainer />
            )}
            {activeSettingSection === SettingsSections.ENROLL_STATUSES && <EnrollStatusContainer />}
            {activeSettingSection === SettingsSections.SETTINGS && <ObservationSettingsContainer />}
            {activeSettingSection === SettingsSections.STRATEGIES && <StrategiesContainer />}
            {activeSettingSection === SettingsSections.FUNCTION_SURVEY_QUESTIONS && (
              <FunctionSurveyQuestionsContainer />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
