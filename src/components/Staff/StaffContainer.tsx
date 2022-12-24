import { useState, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { staffAtom } from "../../recoil/atoms";
import { Fab, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StaffCard from "./StaffCard";
import CreateDialog from "../Staff/CreateDialog";

const StaffContainer = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const staff = useRecoilValue(staffAtom);

  const handleNewStaff = useCallback(() => {
    setCreateOpen(true);
  }, []);

  return (
    <>
      <Typography variant="h1" sx={{ mt: 3 }}>
        Staff
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {staff && staff.map((s) => <StaffCard key={s.id} staff={s} />)}
      </Grid>
      <Fab
        sx={{ position: "fixed", bottom: "5vh", right: "5vw" }}
        color="primary"
        aria-label="add"
        onClick={() => handleNewStaff()}
      >
        <AddIcon />
      </Fab>
      <CreateDialog open={createOpen} onOpen={setCreateOpen} />
    </>
  );
};

export default StaffContainer;
