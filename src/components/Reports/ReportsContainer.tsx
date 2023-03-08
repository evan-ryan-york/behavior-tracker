import { useState } from "react";
import { Grid, Box } from "@mui/material";
import ReportsSideMenu from "./ReportsSideMenu";
import { ReportsSections } from "../../libraries/objects";
import AntecedentsReports from "./AntecedentsReports";
import ReportsHeader from "./ReportsHeader";
import FilterContainer from "../Filter/FilterContainer";
import BehaviorFrequency from "./BehaviorFrequency";
import InferredFunctionOfBehaviorReports from "./InferredFunctionOfBehaviorReports";

export default function ReportsContainer() {
  const [activeReportsSection, setActiveReportsSection] = useState<string>(
    ReportsSections.ANTECEDENT_REPORTS
  );
  const sideMenuHeight = window.innerHeight - 64;
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={4} sm={3} md={3} lg={2}>
          <Box sx={{ height: sideMenuHeight, backgroundColor: "#eee" }}>
            <ReportsSideMenu setActiveSettingSection={setActiveReportsSection} />
          </Box>
        </Grid>
        <Grid item xs={8} sm={9} md={9} lg={10}>
          <ReportsHeader />
          <Box sx={{ height: sideMenuHeight, overflow: "scroll", pl: 2, pr: 2 }}>
            <FilterContainer />
            {activeReportsSection === ReportsSections.ANTECEDENT_REPORTS && <AntecedentsReports />}
            {activeReportsSection === ReportsSections.FUNCTIONS_OF_BEHAVIOR_REPORTS && (
              <InferredFunctionOfBehaviorReports />
            )}
            {activeReportsSection === ReportsSections.BEHAVIOR_FREQUENCY && <BehaviorFrequency />}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
