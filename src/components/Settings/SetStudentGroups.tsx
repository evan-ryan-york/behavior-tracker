import { useState, useEffect, useCallback } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Divider, TextField, Autocomplete, Typography } from "@mui/material";
import { GroupRecord } from "../../types/types";
import { studentFormAtom } from "../../recoil/studentAtoms";
import { groupsAtom, groupsObjAtom } from "../../recoil/groupAtoms";

export default function SetStudentGroups() {
  const [studentForm, setStudentForm] = useRecoilState(studentFormAtom);
  const groups = useRecoilValue(groupsAtom);
  const [selectedGroups, setSelectedGroups] = useState<GroupRecord[]>([]);
  //students can not be added to groups at sites they are not assigned to
  const [filteredGroups, setFilteredGroups] = useState<GroupRecord[]>([]);
  const groupsObj = useRecoilValue(groupsObjAtom);

  useEffect(() => {
    if (!groups || !groupsObj) return;
    const tempGroups = groups.filter((group) => studentForm.siteIds.includes(group.siteId));
    setFilteredGroups(tempGroups);
  }, [groups, groupsObj, studentForm]);

  useEffect(() => {
    if (!studentForm || !groupsObj) return;
    const tempGroups: GroupRecord[] = [];
    studentForm.groupIds.forEach((groupId) => {
      tempGroups.push(groupsObj[groupId]);
    });
    setSelectedGroups(tempGroups);
  }, [groupsObj, studentForm]);

  const handleGroupSelect = useCallback(
    (event: any, values: GroupRecord[]) => {
      const currentSelectedGroups: GroupRecord[] = [];
      const groupArray: string[] = [];
      values.forEach((s) => {
        currentSelectedGroups.push(s);
        groupArray.push(s.id);
      });
      setSelectedGroups(currentSelectedGroups);
      setStudentForm((pV) => ({ ...pV, groupIds: groupArray }));
    },
    [setStudentForm]
  );

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Student Groups
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
