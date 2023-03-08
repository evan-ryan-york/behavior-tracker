import { useState, useEffect, useCallback } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Divider, TextField, Autocomplete, Typography } from "@mui/material";
import { sitesAtom, sitesObjAtom } from "../../recoil/sitesAtoms";
import { SiteRecord } from "../../types/types";
import { studentFormAtom } from "../../recoil/studentAtoms";

export default function SetStudentSites() {
  const [studentForm, setStudentForm] = useRecoilState(studentFormAtom);
  const sites = useRecoilValue(sitesAtom);
  const [selectedSites, setSelectedSites] = useState<SiteRecord[]>([]);
  const sitesObj = useRecoilValue(sitesObjAtom);

  useEffect(() => {
    if (!studentForm || !sitesObj) return;
    const tempSites: SiteRecord[] = [];
    studentForm.siteIds.forEach((siteId) => {
      tempSites.push(sitesObj[siteId]);
    });
    setSelectedSites(tempSites);
  }, [sitesObj, studentForm]);

  const handleSiteSelect = useCallback(
    (event: any, values: SiteRecord[]) => {
      const currentSelectedSites: SiteRecord[] = [];
      const siteArray: string[] = [];
      values.forEach((s) => {
        currentSelectedSites.push(s);
        siteArray.push(s.id);
      });
      setSelectedSites(currentSelectedSites);
      setStudentForm((pV) => ({ ...pV, siteIds: siteArray }));
    },
    [setStudentForm]
  );

  return (
    <>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Student Sites
      </Typography>
      <Divider />
      <Autocomplete
        multiple
        sx={{ mt: 2 }}
        options={sites}
        getOptionLabel={(site) => site.name}
        onChange={handleSiteSelect}
        value={selectedSites}
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
            label="Assigned Sites"
            placeholder="Select Sites"
          />
        )}
      />
    </>
  );
}
