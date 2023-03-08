import React from "react";
import { Box, Chip, Divider, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { StaffRecord } from "../../types/types";
import { groupsObjAtom } from "../../recoil/groupAtoms";

type Props = {
  staffMember: StaffRecord;
};

function StaffGroups({ staffMember }: Props) {
  const groupsObj = useRecoilValue(groupsObjAtom);
  return (
    <>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Assigned Groups
      </Typography>
      <Divider />
      <Box>
        {groupsObj && staffMember && staffMember.groupIds.length > 0 ? (
          <>
            {staffMember.groupIds.map((groupId) => (
              <Chip label={groupsObj[groupId].name} key={groupId} sx={{ margin: 1 }} />
            ))}
          </>
        ) : (
          <Typography>No Assigned Groups</Typography>
        )}
      </Box>
    </>
  );
}

export default StaffGroups;
