import { Box, Container, Chip, Grid } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { organizationAtom, organizationResetAtom } from "../../recoil/organizationAtoms";
import { getLuma } from "../../libraries/functions";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { TwitterPicker } from "react-color";
import { userPermissionAtom } from "../../recoil/staffAtoms";

function OrganiationColors() {
  const organization = useRecoilValue(organizationAtom);
  const setOrganizationReset = useSetRecoilState(organizationResetAtom);
  const { sendRequest: updateDoc } = useUpdateDoc();
  const userPermission = useRecoilValue(userPermissionAtom);
  const editor = userPermission?.role !== "user" ?? false;

  const changePrimaryColor = async (event: any) => {
    if (!organization) return;
    const luma = getLuma(event.hex);
    const textColor = luma > 130 ? "#333333" : "#ffffff";

    await updateDoc({
      col: "organizations",
      id: organization.id,
      data: { primaryColor: event.hex, primaryTextColor: textColor },
    });
    setOrganizationReset((pV) => !pV);
  };

  const changeSecondaryColor = async (event: any) => {
    if (!organization) return;
    const luma = getLuma(event.hex);
    const textColor = luma > 130 ? "#333333" : "#ffffff";

    await updateDoc({
      col: "organizations",
      id: organization.id,
      data: { secondaryColor: event.hex, secondaryTextColor: textColor },
    });
    setOrganizationReset((pV) => !pV);
  };
  return (
    <>
      {organization && (
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <Box
                sx={{
                  mb: 2,
                  mt: 2,
                }}
              >
                <Chip
                  sx={{ fontSize: 18, padding: 2, width: 200 }}
                  color="primary"
                  label="Primary Color"
                />
                {editor && (
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <TwitterPicker
                      triangle="hide"
                      color={organization.primaryColor}
                      onChange={changePrimaryColor}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box
                sx={{
                  mb: 2,
                  mt: 2,
                }}
              >
                <Chip
                  sx={{ fontSize: 18, padding: 2, width: 200 }}
                  color="secondary"
                  label="Secondary Color"
                />
                {editor && (
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <TwitterPicker
                      color={organization.secondaryColor}
                      onChange={changeSecondaryColor}
                      triangle="hide"
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}

export default OrganiationColors;
