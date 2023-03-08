import React from "react";
import { Box, Container, Chip } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { organizationAtom, organizationResetAtom } from "../../recoil/organizationAtoms";
import { getLuma } from "../../libraries/functions";
import useUpdateDoc from "../../hooks/useUpdateDoc";

type FormState = EventTarget & {
  value: string;
  name: string;
};

function OrganiationColors() {
  const organization = useRecoilValue(organizationAtom);
  const setOrganizationReset = useSetRecoilState(organizationResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();

  const changeColor = async (event: React.SyntheticEvent) => {
    if (!organization) return;
    const formState = event.target as FormState;
    const luma = getLuma(formState.value);
    const textName = formState.name === "primaryColor" ? "primaryTextColor" : "secondaryTextColor";
    const textColor = luma > 130 ? "#333333" : "#ffffff";

    await updateDoc({
      col: "organizations",
      id: organization.id,
      data: { [formState.name]: formState.value, [textName]: textColor },
    });
    setOrganizationReset((pV) => !pV);
  };
  return (
    <>
      {organization && (
        <Container maxWidth="xs">
          <Box
            sx={{
              mb: 2,
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Chip
              sx={{ fontSize: 18, padding: 2, width: 200 }}
              color="primary"
              label="Primary Color"
            />
            <input
              type="color"
              value={organization.primaryColor}
              onChange={changeColor}
              name="primaryColor"
              className="colorInput"
            />
          </Box>
          <Box
            sx={{
              mb: 2,
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Chip
              sx={{ fontSize: 18, padding: 2, width: 200 }}
              color="secondary"
              label="Secondary Color"
            />
            <input
              type="color"
              value={organization.secondaryColor}
              onChange={changeColor}
              name="secondaryColor"
              className="colorInput"
            />
          </Box>
        </Container>
      )}
    </>
  );
}

export default OrganiationColors;
