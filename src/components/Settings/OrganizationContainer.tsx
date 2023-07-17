import React, { useEffect, useState } from "react";
import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { organizationAtom, organizationResetAtom } from "../../recoil/organizationAtoms";
import EditIcon from "@mui/icons-material/Edit";
import useUploadAvatar from "../../hooks/useUploadAvatar";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import OrganiationColors from "./OrganiationColors";
import { userPermissionAtom } from "../../recoil/staffAtoms";

type ImageState = EventTarget & {
  files: File[];
};

function OrganizationContainer() {
  const organization = useRecoilValue(organizationAtom);
  const setOrganizationReset = useSetRecoilState(organizationResetAtom);
  const { uploadAvatar } = useUploadAvatar();
  const storage = getStorage();
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const userPermission = useRecoilValue(userPermissionAtom);
  const editor = userPermission?.role !== "user" ?? false;

  useEffect(() => {
    if (!organization) return;
    const getImageURL = async () => {
      if (organization.avatar.length > 5) {
        let url = await getDownloadURL(ref(storage, organization.avatar));
        setAvatarURL(url + "_2000x2000");
      }
    };
    getImageURL();
  }, [organization, storage]);

  const handleSelectImage = async (event: React.SyntheticEvent) => {
    const ImageState = event.target as ImageState;
    await uploadAvatar({
      image: ImageState.files[0],
      col: "organizations",
      id: organization?.id ?? null,
    });
    setOrganizationReset((pV) => !pV);
  };

  return (
    <>
      {organization && (
        <>
          <Box sx={{ textAlign: "center", margin: "0 auto" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
                textAlign: "center",
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                badgeContent={
                  <>
                    {editor && (
                      <label htmlFor="icon-button-file">
                        <input
                          hidden
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          onChange={handleSelectImage}
                        />
                        <IconButton aria-label="upload picture" component="span">
                          <EditIcon sx={{ width: 15, height: 15 }} />
                        </IconButton>
                      </label>
                    )}
                  </>
                }
              >
                <Avatar
                  alt={organization.name}
                  src={avatarURL ? avatarURL : ""}
                  sx={{ width: 150, height: 150 }}
                />
              </Badge>
            </Box>

            <Typography variant="h4">{organization.name}</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {organization.description}
            </Typography>
            <OrganiationColors />
          </Box>
        </>
      )}
    </>
  );
}

export default OrganizationContainer;
