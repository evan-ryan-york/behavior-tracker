import React from "react";
import { Box, Chip, Divider, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { sitesObjAtom } from "../../recoil/sitesAtoms";
import { StaffRecord } from "../../types/types";

type Props = {
  staffMember: StaffRecord;
};

function StaffSites({ staffMember }: Props) {
  const sitesObj = useRecoilValue(sitesObjAtom);
  return (
    <>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Assigned Sites
      </Typography>
      <Divider />
      <Box>
        {sitesObj && staffMember && staffMember.siteIds.length > 0 ? (
          <>
            {staffMember.siteIds.map((site) => (
              <Chip label={sitesObj[site].name} key={site} sx={{ margin: 1 }} />
            ))}
          </>
        ) : (
          <Typography>No Assigned Sites</Typography>
        )}
      </Box>
    </>
  );
}

export default StaffSites;
