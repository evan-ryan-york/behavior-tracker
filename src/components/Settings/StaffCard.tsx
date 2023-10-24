import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Badge,
  IconButton,
  Box,
  CardActions,
  Button,
} from "@mui/material";
import { StaffRecord } from "../../types/types";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import useUploadAvatar from "../../hooks/useUploadAvatar";
import { staffFormAtom, staffResetAtom } from "../../recoil/staffAtoms";
import { useSetRecoilState } from "recoil";
import EditIcon from "@mui/icons-material/Edit";
import StaffSites from "./StaffSites";
import StaffGroups from "./StaffGroups";
import usePermissions from "../../hooks/usePermissions";

type Props = {
  staffMember: StaffRecord;
  setManageOpen: (value: boolean) => void;
  setDeleteOpen: (value: boolean) => void;
  setDeleteId: (value: string | null) => void;
};

type ImageState = EventTarget & {
  files: File[];
};

export default function StaffCard({
  staffMember,
  setManageOpen,
  setDeleteOpen,
  setDeleteId,
}: Props) {
  const storage = getStorage();
  const [avatarURL, setAvatarURL] = useState("");
  const { uploadAvatar } = useUploadAvatar();
  const setStaffReset = useSetRecoilState(staffResetAtom);
  const setStaffForm = useSetRecoilState(staffFormAtom);
  const { editor } = usePermissions();

  useEffect(() => {
    if (!staffMember || !staffMember.avatar) return;
    const getImageURL = async () => {
      let url = await getDownloadURL(ref(storage, staffMember.avatar));
      setAvatarURL(url + "_2000x2000");
    };
    getImageURL();
  }, [staffMember, storage]);

  const handleSelectImage = async (event: React.SyntheticEvent) => {
    const ImageState = event.target as ImageState;
    await uploadAvatar({
      image: ImageState.files[0],
      col: "staff",
      id: staffMember?.id ?? null,
    });
    setStaffReset((pV) => !pV);
  };

  const handleFieldEdit = (staffMember: StaffRecord) => {
    setStaffForm(staffMember);
    setManageOpen(true);
  };

  const handleDeleteStaff = () => {
    setDeleteOpen(true);
    setDeleteId(staffMember.id);
  };

  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
      <Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 2,
            textAlign: "center",
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            badgeContent={
              <>
                {editor && (
                  <label htmlFor={`icon-button-file-${staffMember.id}`}>
                    <input
                      hidden
                      accept="image/*"
                      id={`icon-button-file-${staffMember.id}`}
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
            <Avatar alt={staffMember.firstName} src={avatarURL} sx={{ width: 100, height: 100 }} />
          </Badge>
        </Box>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h4">{`${staffMember.firstName} ${staffMember.lastName}`}</Typography>

          <StaffSites staffMember={staffMember} />
          <StaffGroups staffMember={staffMember} />
        </CardContent>
        {editor && (
          <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button sx={{ mr: 2 }} variant="outlined" onClick={() => handleFieldEdit(staffMember)}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={handleDeleteStaff}>
              Delete
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}
