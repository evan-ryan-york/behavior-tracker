import React, { useState, useEffect, useCallback } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { staffFormAtom } from "../../recoil/staffAtoms";
import { Divider, TextField, Autocomplete, Typography } from "@mui/material";
import { GroupRecord } from "../../types/types";
import { groupsAtom, groupsObjAtom } from "../../recoil/groupAtoms";

export default function SetStaffGroups() {
  const [staffForm, setStaffForm] = useRecoilState(staffFormAtom);
  const groups = useRecoilValue(groupsAtom);
  const [selectedGroups, setSelectedGroups] = useState<GroupRecord[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<GroupRecord[]>([]);
  const groupsObj = useRecoilValue(groupsObjAtom);

  useEffect(() => {
    if (!groups || !groupsObj) return;
    const tempGroups = groups.filter((group) => staffForm.siteIds.includes(group.siteId));
    setFilteredGroups(tempGroups);
  }, [groups, groupsObj, staffForm]);

  useEffect(() => {
    if (!staffForm || !groupsObj) return;
    const tempGroups: GroupRecord[] = [];
    staffForm.groupIds.forEach((groupId) => {
      tempGroups.push(groupsObj[groupId]);
    });
    setSelectedGroups(tempGroups);
  }, [groupsObj, staffForm]);

  const handleGroupSelect = useCallback(
    (event: any, values: GroupRecord[]) => {
      const currentSelectedGroups: GroupRecord[] = [];
      const groupIdsArray: string[] = [];
      values.forEach((s) => {
        currentSelectedGroups.push(s);
        groupIdsArray.push(s.id);
      });
      setSelectedGroups(currentSelectedGroups);
      setStaffForm((pV) => ({ ...pV, groupIds: groupIdsArray }));
    },
    [setStaffForm]
  );

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Staff Groups
      </Typography>
      <Divider />
      <Autocomplete
        multiple
        sx={{ mt: 2 }}
        options={filteredGroups}
        getOptionLabel={(group) => group.name}
        onChange={handleGroupSelect}
        value={selectedGroups}
        filterSelectedOptions
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {`${option.name}`}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Assigned Groups"
            placeholder="Select Groups"
          />
        )}
      />
    </>
  );
}
