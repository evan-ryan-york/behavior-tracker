import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import { selectPermissionsAtom, staffFormAtom, userPermissionAtom } from "../../recoil/staffAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { PERMISSION_ROLES } from "../../libraries/objects";

function SetStaffPermissions() {
  const [staffForm, setStaffForm] = useRecoilState(staffFormAtom);
  const selectPermissions = useRecoilValue(selectPermissionsAtom);
  const userPermission = useRecoilValue(userPermissionAtom);
  const componentAccess = userPermission?.role !== PERMISSION_ROLES.USER ?? false;
  const handleSelectChange = (event: SelectChangeEvent) => {
    setStaffForm((pV) => ({ ...pV, permissionId: event.target.value }));
  };
  return (
    <>
      {componentAccess && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Staff Permissions
          </Typography>
          <Divider />
          <FormControl sx={{ width: "100%", mt: 2 }}>
            <InputLabel id="permissions-label">Permissions</InputLabel>
            <Select
              name="permissionsSelect"
              onChange={handleSelectChange}
              value={staffForm.permissionId}
              fullWidth
              labelId="permissions-label"
              label="Permissions"
            >
              {selectPermissions.map((permission) => (
                <MenuItem key={permission.id} value={permission.id}>
                  {permission.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
    </>
  );
}

export default SetStaffPermissions;
