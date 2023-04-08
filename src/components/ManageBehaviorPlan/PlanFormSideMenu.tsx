import { Box, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { BEHAVIOR_PLAN_STEPS } from "../../libraries/objects";

type Props = {
  setSelectedMenuItem: (value: string) => void;
};

function PlanFormSideMenu({ setSelectedMenuItem }: Props) {
  const handleMenuClick = (menuItem: string) => {
    console.log(menuItem);
    setSelectedMenuItem(menuItem);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleMenuClick(BEHAVIOR_PLAN_STEPS.STEP_ONE);
              }}
            >
              <ListItemText primary={BEHAVIOR_PLAN_STEPS.STEP_ONE} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleMenuClick(BEHAVIOR_PLAN_STEPS.STEP_TWO);
              }}
            >
              <ListItemText primary={BEHAVIOR_PLAN_STEPS.STEP_TWO} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleMenuClick(BEHAVIOR_PLAN_STEPS.STEP_THREE);
              }}
            >
              <ListItemText primary={BEHAVIOR_PLAN_STEPS.STEP_THREE} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleMenuClick(BEHAVIOR_PLAN_STEPS.STEP_FOUR);
              }}
            >
              <ListItemText primary={BEHAVIOR_PLAN_STEPS.STEP_FOUR} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </nav>
    </Box>
  );
}

export default PlanFormSideMenu;
