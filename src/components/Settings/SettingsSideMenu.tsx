import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { SettingsSections } from "../../libraries/objects";

type Props = {
  setActiveSettingSection: (newValue: string) => void;
};

export default function SettingsSideMenu({ setActiveSettingSection }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <nav>
        <List>
          <Typography sx={{ fontWeight: 700, backgroundColor: "#eee", fontSize: 17, pl: 1, pt: 2 }}>
            Behavior Settings
          </Typography>
          <ListItem disablePadding sx={{ pl: 1 }}>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.ANTECEDENTS);
              }}
            >
              <ListItemText primary={SettingsSections.ANTECEDENTS} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ pl: 1 }}>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.BEHAVIORS);
              }}
            >
              <ListItemText primary={SettingsSections.BEHAVIORS} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ pl: 1 }}>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.CONSEQUENCES);
              }}
            >
              <ListItemText primary={SettingsSections.CONSEQUENCES} />
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem disablePadding sx={{ pl: 1 }}>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.REPLACEMENT_BEHAVIORS);
              }}
            >
              <ListItemText primary={SettingsSections.REPLACEMENT_BEHAVIORS} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <Typography sx={{ fontWeight: 700, backgroundColor: "#eee", fontSize: 17, pl: 1, pt: 2 }}>
            School Settings
          </Typography>
          <ListItem disablePadding sx={{ pl: 1 }}>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.ORG_PROFILE);
              }}
            >
              <ListItemText primary={SettingsSections.ORG_PROFILE} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ pl: 1 }}>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.STAFF);
              }}
            >
              <ListItemText primary={SettingsSections.STAFF} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ pl: 1 }}>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.STUDENTS);
              }}
            >
              <ListItemText primary={SettingsSections.STUDENTS} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ pl: 1 }}>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.GROUPS);
              }}
            >
              <ListItemText primary={SettingsSections.GROUPS} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ pl: 1 }}>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.SITES);
              }}
            >
              <ListItemText primary={SettingsSections.SITES} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ pl: 1 }}>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.ENROLL_STATUSES);
              }}
            >
              <ListItemText primary={SettingsSections.ENROLL_STATUSES} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ pl: 1 }}>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(SettingsSections.PERIODS);
              }}
            >
              <ListItemText primary={SettingsSections.PERIODS} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </nav>
    </Box>
  );
}
