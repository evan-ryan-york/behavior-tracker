import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { loggedInStaffAtom } from "../../recoil/staffAtoms";
// import { useRecoilValue } from "recoil";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { availableSitesAtom, selectedSiteIdAtom } from "../../recoil/sitesAtoms";
import { availableGroupsAtom, selectedGroupIdAtom } from "../../recoil/groupAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { GroupRecord } from "../../types/types";
import { organizationAtom } from "../../recoil/organizationAtoms";

type ButtonState = EventTarget & {
  name: string;
};

function SelectOptions() {
  //const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const navigate = useNavigate();
  const organization = useRecoilValue(organizationAtom);
  const availableSites = useRecoilValue(availableSitesAtom);
  const availableGroups = useRecoilValue(availableGroupsAtom);
  const [filteredGroups, setFilteredGroups] = useState<GroupRecord[]>([]);
  const [selectedSiteId, setSelectedSiteId] = useRecoilState(selectedSiteIdAtom);
  const [selectedGroupId, setSelectedGroupId] = useRecoilState(selectedGroupIdAtom);

  useEffect(() => {
    if (!availableSites || !selectedSiteId || !availableGroups) return;
    setFilteredGroups(availableGroups.filter((group) => group.siteId === selectedSiteId));
  }, [availableSites, availableGroups, selectedSiteId]);

  useEffect(() => {
    if (!availableSites || availableSites.length === 0 || selectedSiteId.length > 0) return;
    setSelectedSiteId(availableSites[0].id);
  });

  useEffect(() => {
    if (!availableGroups || availableGroups.length === 0 || selectedGroupId.length > 0) return;
    setSelectedGroupId(availableGroups[0].id);
  });

  const handleRoute = (event: React.SyntheticEvent) => {
    const buttonState = event.target as ButtonState;
    navigate(`/${buttonState.name}`);
  };

  const handleSiteChange = (event: SelectChangeEvent) => {
    setSelectedSiteId(event.target.value);
  };

  const handleGroupChange = (event: SelectChangeEvent) => {
    setSelectedGroupId(event.target.value);
  };

  return (
    <>
      {organization && (
        <>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="campus-select-label">Select Campus</InputLabel>
            <Select
              variant="outlined"
              label={"Select Campus"}
              labelId="campus-select-label"
              onChange={handleSiteChange}
              value={selectedSiteId}
              fullWidth
            >
              {availableSites &&
                availableSites.map((site) => (
                  <MenuItem key={site.id} value={site.id}>
                    {site.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="class-select-label">Select Class</InputLabel>
            <Select
              onChange={handleGroupChange}
              value={selectedGroupId}
              label={"Select Class"}
              labelId="campus-select-label"
            >
              {filteredGroups &&
                filteredGroups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </>
      )}
    </>
  );
}

export default SelectOptions;
