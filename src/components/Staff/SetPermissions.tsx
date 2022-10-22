import React, { useState, useEffect, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { staffResetAtom } from "../../recoil/atoms";
import { FormControlLabel, Switch } from "@mui/material";
import { PERMISSIONS } from "../../libraries/objects";
import { StaffInterface } from "../../interfaces/interfaces";
import useUpdateDoc from "../../hooks/useUpdateDoc";

type Props = {
  staff: StaffInterface;
};

export default function SetPermissions({ staff }: Props) {
  const { sendRequest: updateDoc } = useUpdateDoc();
  const [permissions, setPermissions] = useState<string[]>([]);
  const setStaffReset = useSetRecoilState(staffResetAtom);

  useEffect(() => {
    if (!staff || permissions.length > 0) return;
    setPermissions(staff.permissions || []);
  }, [staff, permissions]);

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
        id: staff.id,
        data: { permissions: currentPermissions },
      });
      setStaffReset((pV) => !pV);
    },
    [permissions, staff, updateDoc, setStaffReset]
  );

  return (
    <>
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
