import React, { useState, useEffect, useCallback } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { staffFormAtom } from "../../recoil/staffAtoms";
import {
  Divider,
  TextField,
  Autocomplete,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { GroupRecord } from "../../types/types";
import { groupsAtom, groupsObjAtom } from "../../recoil/groupAtoms";
import { sitesAtom } from "../../recoil/sitesAtoms";

export default function SetStaffGroups() {
  const [staffForm, setStaffForm] = useRecoilState(staffFormAtom);
  const groups = useRecoilValue(groupsAtom);
  const [selectedGroups, setSelectedGroups] = useState<GroupRecord[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<GroupRecord[]>([]);
  const groupsObj = useRecoilValue(groupsObjAtom);
  const sites = useRecoilValue(sitesAtom);
  const [selectedSiteId, setSelectedSiteId] = useState(
    staffForm.siteIds.length > 0 ? staffForm.siteIds[0] : ""
  );

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

  const handleSelectChange = (event: SelectChangeEvent) => {
    setStaffForm((pV) => ({ ...pV, siteIds: [event.target.value] }));
    setSelectedSiteId(event.target.value);
  };

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Staff Groups
      </Typography>
      <Divider />
      <FormControl sx={{ width: "100%", mt: 2 }}>
        <InputLabel id="site-label">Select Assigned Site</InputLabel>
        <Select
          name="siteSelect"
          onChange={handleSelectChange}
          value={selectedSiteId}
          fullWidth
          labelId="site-label"
          label="Select Assigned Site"
        >
          {sites.map((site) => (
            <MenuItem key={site.id} value={site.id}>
              {site.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider sx={{ mt: 2 }} />
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
