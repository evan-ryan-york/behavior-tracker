import { Box, Paper, Typography, Button, Chip, Grid } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { GroupRecord } from "../../types/types";
import { groupFormAtom } from "../../recoil/groupAtoms";
import { sitesObjAtom } from "../../recoil/sitesAtoms";

type Props = {
  group: GroupRecord;
  setManageOpen: (value: boolean) => void;
  setDeleteOpen: (value: boolean) => void;
  setDeleteId: (value: string | null) => void;
};

function GroupCard({ group, setManageOpen, setDeleteOpen, setDeleteId }: Props) {
  const setGroupForm = useSetRecoilState(groupFormAtom);
  const sitesObj = useRecoilValue(sitesObjAtom);
  const handleFieldEdit = (antecedent: GroupRecord) => {
    setGroupForm(group);
    setManageOpen(true);
  };

  const handleDeleteGroup = () => {
    setDeleteOpen(true);
    setDeleteId(group.id);
  };
  return (
    <>
      {sitesObj && (
        <Box sx={{ mt: 2 }}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">{`Group: ${group.name}`}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Chip label={sitesObj[group.siteId].name} />
                  <Button
                    sx={{ mr: 2, ml: 2 }}
                    variant="outlined"
                    onClick={() => handleFieldEdit(group)}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleDeleteGroup}>
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

export default GroupCard;
