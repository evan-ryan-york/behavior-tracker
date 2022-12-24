import { Box, List, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material";
import { SettingsSections } from "../../libraries/objects";

type Props = {
  setActiveSettingSection: (newValue: string) => void;
};

export default function SettingsSideMenu({ setActiveSettingSection }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.PERIODS);
              }}
            >
              <ListItemText primary="Narrative Periods" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.SECTIONS);
              }}
            >
              <ListItemText primary="Narrative Sections" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.OBJECTIVES);
              }}
            >
              <ListItemText primary="Narrative Objectives" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.OVERRIDE);
              }}
            >
              <ListItemText primary="Roster Override" />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </nav>
    </Box>
  );
}
