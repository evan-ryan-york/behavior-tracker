import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginContainer from "./components/Login/LoginContainer";
import SettingsPage from "./pages/SettingsPage";
import CustomRoute from "./CustomRoute";
import ReportsPage from "./pages/ReportsPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import SurveyLinkPage from "./pages/SurveyLinkPage";
import Setup from "./pages/Setup";

export const routes = (
  <Routes>
    <Route path="/login" element={<LoginContainer />} />
    <Route path="/setup" element={<Setup />} />
    <Route path="/behavior-survey" element={<SurveyLinkPage />} />
    <Route
      path="/settings"
      element={
        <CustomRoute>
          <SettingsPage />
        </CustomRoute>
      }
    />
    <Route
      path="/reports"
      element={
        <CustomRoute>
          <ReportsPage />
        </CustomRoute>
      }
    />
    <Route
      path="/student-dashboard"
      element={
        <CustomRoute>
          <StudentDashboardPage />
        </CustomRoute>
      }
    />
    <Route path="/" element={<LoginContainer />} />
  </Routes>
);
