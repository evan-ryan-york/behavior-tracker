import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginContainer from "./components/Login/LoginContainer";
import SettingsPage from "./pages/SettingsPage";
import CustomRoute from "./CustomRoute";
import { PERMISSION } from "./libraries/objects";
import ReportsPage from "./pages/ReportsPage";
import LogsPage from "./pages/LogsPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import SurveyLinkPage from "./pages/SurveyLinkPage";

export const routes = (
  <Routes>
    <Route path="/login" element={<LoginContainer />} />
    <Route path="/behavior-survey" element={<SurveyLinkPage />} />
    <Route
      path="/settings"
      element={
        <CustomRoute permission={PERMISSION.EDIT_SETTINGS}>
          <SettingsPage />
        </CustomRoute>
      }
    />
    <Route
      path="/logs"
      element={
        <CustomRoute permission={PERMISSION.EDIT_SETTINGS}>
          <LogsPage />
        </CustomRoute>
      }
    />
    <Route
      path="/reports"
      element={
        <CustomRoute permission={PERMISSION.EDIT_SETTINGS}>
          <ReportsPage />
        </CustomRoute>
      }
    />
    <Route
      path="/student-dashboard"
      element={
        <CustomRoute permission={PERMISSION.EDIT_SETTINGS}>
          <StudentDashboardPage />
        </CustomRoute>
      }
    />
    <Route
      path="/"
      element={
        <CustomRoute permission={PERMISSION.EDIT_STAFF}>
          <SettingsPage />
        </CustomRoute>
      }
    />
  </Routes>
);
