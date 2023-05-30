import { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DeleteDialog from "../shared/DeleteDialog";
import { staffAtom, staffResetAtom } from "../../recoil/staffAtoms";
import ManageStaff from "./ManageStaff";
import StaffCard from "./StaffCard";
import usePermissions from "../../hooks/usePermissions";

function StaffContainer() {
  const staff = useRecoilValue(staffAtom);
  const [manageOpen, setManageOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const setStaffReset = useSetRecoilState(staffResetAtom);
  const { editor } = usePermissions();

  const handleManageClick = () => {
    setManageOpen(true);
  };

  return (
    <>
      <Box sx={{ mt: 2, ml: 4, mr: 4 }}>
        {editor && (
          <Button
            onClick={handleManageClick}
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ padding: 1, fontSize: 16 }}
          >
            Add New Staff Member
          </Button>
        )}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {staff &&
            staff.map((staffMember) => (
              <StaffCard
                key={staffMember.id}
                staffMember={staffMember}
                setManageOpen={setManageOpen}
                setDeleteOpen={setDeleteOpen}
                setDeleteId={setDeleteId}
              />
            ))}
        </Grid>
      </Box>
      {editor && (
        <>
          <ManageStaff open={manageOpen} setOpen={setManageOpen} />
          {deleteId && deleteOpen && (
            <DeleteDialog
              open={deleteOpen}
              setOpen={setDeleteOpen}
              message={"Are you sure you want to delete this staff member? This cannot be undone."}
              collection="staff"
              id={deleteId}
              setReset={setStaffReset}
            />
          )}
        </>
      )}
    </>
  );
}

export default StaffContainer;
