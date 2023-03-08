import React, { useState, useEffect, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { staffResetAtom } from "../../recoil/staffAtoms";
import { Divider, FormControlLabel, Switch, Typography } from "@mui/material";
import { PERMISSIONS } from "../../libraries/objects";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { StaffRecord } from "../../types/types";

type Props = {
  staffMember: StaffRecord;
};

export default function SetStaffPermissions({ staffMember }: Props) {
  const { sendRequest: updateDoc } = useUpdateDoc();
  const [permissions, setPermissions] = useState<string[]>([]);
  const setStaffReset = useSetRecoilState(staffResetAtom);

  useEffect(() => {
    if (!staffMember || permissions.length > 0) return;
    setPermissions(staffMember.permissions || []);
  }, [staffMember, permissions]);

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!permissions) return;
      let currentPermissions = [...permissions];
      if (event.target.checked && !currentPermissions.includes(event.target.name)) {
        currentPermissions.push(event.target.name);
      } else if (!event.target.checked && currentPermissions.includes(event.target.name)) {
        currentPermissions = currentPermissions.filter(
          (permission) => permission !== event.target.name
        );
      }
      setPermissions(currentPermissions);
      await updateDoc({
        col: "staff",
        id: staffMember.id,
        data: { permissions: currentPermissions },
      });
      setStaffReset((pV) => !pV);
    },
    [permissions, staffMember, updateDoc, setStaffReset]
  );

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Staff Permissions
      </Typography>
      <Divider />
      {PERMISSIONS.map((permission) => (
        <FormControlLabel
          key={permission}
          control={
            <Switch
              onChange={handleChange}
              name={permission}
              checked={permissions?.includes(permission) || false}
            />
          }
          label={permission}
        />
      ))}
    </>
  );
}
