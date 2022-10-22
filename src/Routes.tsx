import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginContainer from "./Login/LoginContainer";
import StaffPage from "./pages/StaffPage";
import CustomRoute from "./CustomRoute";
import { PERMISSION } from "./libraries/objects";

export const routes = (
  <Routes>
    <Route path="/login" element={<LoginContainer />} />
    <Route
      path="/staff"
      element={
        <CustomRoute permission={PERMISSION.EDIT_SETTINGS}>
          <StaffPage />
        </CustomRoute>
      }
    />
    <Route
      path="/"
      element={
        <CustomRoute permission={PERMISSION.EDIT_STAFF}>
          <StaffPage />
        </CustomRoute>
      }
    />
  </Routes>
);
