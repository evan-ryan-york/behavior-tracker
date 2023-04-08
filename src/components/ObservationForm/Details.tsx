import React, { useEffect } from "react";
import {
  Box,
  Divider,
  Typography,
  Grid,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
} from "@mui/material";
import { DURATIONS, INTENSITIES } from "../../libraries/objects";
import { settingsAtom } from "../../recoil/settingsAtoms";
import { useRecoilValue } from "recoil";

type Props = {
  duration: string;
  intensity: string;
  settingId: string | null;
  setDuration: (value: string) => void;
  setIntensity: (value: string) => void;
  setSettingId: (value: string) => void;
};

function Details({
  duration,
  intensity,
  setDuration,
  setIntensity,
  settingId,
  setSettingId,
}: Props) {
  const settings = useRecoilValue(settingsAtom);
  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value);
  };
  const handleIntensityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntensity(event.target.value);
  };
  const handleSettingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettingId(event.target.value);
  };

  useEffect(() => {
    if (!settings || settings.length === 0 || settingId) return;
    setSettingId(settings[0].id);
  }, [settings, settingId, setSettingId]);
  return (
    <>
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h4">Details</Typography>
        <Divider />
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box sx={{ backgroundColor: "#fff", padding: 1, margin: 0 }}>
            <Typography variant="h6">Duration</Typography>
            <Divider />
            <FormControl>
              <RadioGroup row name="duration" value={duration} onChange={handleDurationChange}>
                {DURATIONS.map((duration) => (
                  <FormControlLabel
                    key={duration}
                    value={duration}
                    control={<Radio />}
                    label={<Typography variant="body2">{duration}</Typography>}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box sx={{ backgroundColor: "#fff", padding: 1, margin: 0 }}>
            <Typography variant="h6">Part of Day</Typography>
            <Divider />
            <FormControl>
              <RadioGroup row name="part-of-day" value={settingId} onChange={handleSettingChange}>
                {settings.map((setting) => (
                  <FormControlLabel
                    value={setting.id}
                    key={setting.id}
                    control={<Radio />}
                    label={<Typography variant="body2">{setting.name}</Typography>}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Details;
