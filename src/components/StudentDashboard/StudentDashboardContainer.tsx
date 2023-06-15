import { Box, Grid } from "@mui/material";
import React from "react";
import StudentDashboardHeader from "./StudentDashboardHeader";
import SurveysSection from "./SurveysSection";
import FilesSection from "./FilesSection";
import BehaviorPlansSection from "./BehaviorPlansSection";
import ProfileSection from "./ProfileSection";
import LogsSection from "./LogsSection";
import GoalTrackingSection from "./GoalTrackingSection";

function StudentDashboardContainer() {
  return (
    <>
      <Box sx={{ pl: 2, pr: 2, pb: 3 }}>
        <StudentDashboardHeader />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={4}>
            <ProfileSection />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <BehaviorPlansSection />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={12}>
            <GoalTrackingSection />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={6}>
            <LogsSection />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <SurveysSection />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12}>
            <FilesSection />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default StudentDashboardContainer;
