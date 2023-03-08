import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { loggedInStaffAtom } from "../../recoil/staffAtoms";
// import { useRecoilValue } from "recoil";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { sitesObjAtom } from "../../recoil/sitesAtoms";
import { groupsObjAtom } from "../../recoil/groupAtoms";
import { availableSitesAtom, selectedSiteIdAtom } from "../../recoil/sitesAtoms";
import { availableGroupsAtom, selectedGroupIdAtom } from "../../recoil/groupAtoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { GroupRecord } from "../../types/types";
import { organizationAtom } from "../../recoil/organizationAtoms";

type ButtonState = EventTarget & {
  name: string;
};

function Weblinks() {
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
          <Select
            variant="outlined"
            sx={{ color: organization.primaryTextColor, ml: 2, mr: 1 }}
            className="menuSelect"
            onChange={handleSiteChange}
            value={selectedSiteId}
          >
            {availableSites &&
              availableSites.map((site) => (
                <MenuItem key={site.id} value={site.id}>
                  {site.name}
                </MenuItem>
              ))}
          </Select>
          <Select
            sx={{ color: organization.primaryTextColor, ml: 1, mr: 1 }}
            className="menuSelect"
            onChange={handleGroupChange}
            value={selectedGroupId}
          >
            {filteredGroups &&
              filteredGroups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
          </Select>
          <Button className="webLink" color="inherit" name="settings" onClick={handleRoute}>
            SETTINGS
          </Button>
          <Button className="webLink" color="inherit" name="reports" onClick={handleRoute}>
            REPORTS
          </Button>
          <Button className="webLink" color="inherit" name="logs" onClick={handleRoute}>
            LOGS
          </Button>
          <Button className="webLink" color="inherit" name="plans" onClick={handleRoute}>
            Plans
          </Button>
        </>
      )}
    </>
  );
}

export default Weblinks;
