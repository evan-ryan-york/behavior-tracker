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
import { periodsAtom } from "../../recoil/periodsAtoms";
import { useRecoilValue } from "recoil";

type Props = {
  duration: string;
  intensity: string;
  periodId: string | null;
  setDuration: (value: string) => void;
  setIntensity: (value: string) => void;
  setPeriodId: (value: string) => void;
};

function Details({ duration, intensity, setDuration, setIntensity, periodId, setPeriodId }: Props) {
  const periods = useRecoilValue(periodsAtom);
  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value);
  };
  const handleIntensityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntensity(event.target.value);
  };
  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriodId(event.target.value);
  };

  useEffect(() => {
    if (!periods || periods.length === 0 || periodId) return;
    setPeriodId(periods[0].id);
  }, [periods, periodId, setPeriodId]);
  return (
    <>
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h4">Details</Typography>
        <Divider />
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
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
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Box sx={{ backgroundColor: "#fff", padding: 1, margin: 0 }}>
            <Typography variant="h6">Part of Day</Typography>
            <Divider />
            <FormControl>
              <RadioGroup row name="part-of-day" value={periodId} onChange={handlePeriodChange}>
                {periods.map((period) => (
                  <FormControlLabel
                    value={period.id}
                    key={period.id}
                    control={<Radio />}
                    label={<Typography variant="body2">{period.name}</Typography>}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Box sx={{ backgroundColor: "#fff", padding: 1, margin: 0 }}>
            <Typography variant="h6">Intensity</Typography>
            <Divider />
            <FormControl>
              <RadioGroup row name="intensity" value={intensity} onChange={handleIntensityChange}>
                {INTENSITIES.map((intensity) => (
                  <FormControlLabel
                    value={intensity}
                    key={intensity}
                    control={<Radio />}
                    label={<Typography variant="body2">{intensity}</Typography>}
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
