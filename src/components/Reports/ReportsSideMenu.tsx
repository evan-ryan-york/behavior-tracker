import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { ReportsSections } from "../../libraries/objects";

type Props = {
  setActiveSettingSection: (newValue: string) => void;
};

export default function ReportsSideMenu({ setActiveSettingSection }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <nav>
        <List>
          <Typography sx={{ fontWeight: 700, backgroundColor: "#eee", fontSize: 17, pl: 1, pt: 2 }}>
            Behavior Reports
          </Typography>
          <ListItem disablePadding sx={{ pl: 1 }}>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(ReportsSections.ANTECEDENT_REPORTS);
              }}
            >
              <ListItemText primary={ReportsSections.ANTECEDENT_REPORTS} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ pl: 1 }}>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(ReportsSections.FUNCTIONS_OF_BEHAVIOR_REPORTS);
              }}
            >
              <ListItemText primary={ReportsSections.FUNCTIONS_OF_BEHAVIOR_REPORTS} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ pl: 1 }}>
            <ListItemButton
              onClick={() => {
                setActiveSettingSection(ReportsSections.BEHAVIOR_FREQUENCY);
              }}
            >
              <ListItemText primary={ReportsSections.BEHAVIOR_FREQUENCY} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </nav>
    </Box>
  );
}
