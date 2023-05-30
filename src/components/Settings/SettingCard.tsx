import { Box, Paper, Typography, Button, Chip, Grid } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SettingRecord } from "../../types/types";
import { settingFormAtom } from "../../recoil/settingsAtoms";
import { sitesObjAtom } from "../../recoil/sitesAtoms";

type Props = {
  setting: SettingRecord;
  setManageOpen: (value: boolean) => void;
  setDeleteOpen: (value: boolean) => void;
  setDeleteId: (value: string | null) => void;
};

function SettingCard({ setting, setManageOpen, setDeleteOpen, setDeleteId }: Props) {
  const setSettingForm = useSetRecoilState(settingFormAtom);
  const sitesObj = useRecoilValue(sitesObjAtom);
  const handleFieldEdit = (antecedent: SettingRecord) => {
    setSettingForm(setting);
    setManageOpen(true);
  };

  const handleDeleteSetting = () => {
    setDeleteOpen(true);
    setDeleteId(setting.id);
  };
  return (
    <>
      {sitesObj && (
        <Box sx={{ mt: 2 }}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">{`Setting: ${setting.name}`}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    sx={{ mr: 2, ml: 2 }}
                    variant="outlined"
                    onClick={() => handleFieldEdit(setting)}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleDeleteSetting}>
                    Delete
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </>
  );
}

export default SettingCard;
