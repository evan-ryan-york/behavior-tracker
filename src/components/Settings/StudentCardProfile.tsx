import { useState, useEffect } from "react";
import { Typography, Avatar, Badge, IconButton, Box, Divider, Chip } from "@mui/material";
import { StudentRecord } from "../../types/types";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import EditIcon from "@mui/icons-material/Edit";
import { studentsResetAtom } from "../../recoil/studentAtoms";
import { enrollStatusesObjAtom } from "../../recoil/enrollStatusAtoms";
import { groupsObjAtom } from "../../recoil/groupAtoms";
import { sitesObjAtom } from "../../recoil/sitesAtoms";
import { getAge } from "../../libraries/functions";
import useUploadAvatar from "../../hooks/useUploadAvatar";

type Props = {
  student: StudentRecord;
};

type ImageState = EventTarget & {
  files: File[];
};

export default function StudentCardProfile({ student }: Props) {
  const storage = getStorage();
  const [avatarURL, setAvatarURL] = useState("");
  const { uploadAvatar } = useUploadAvatar();
  const setStudentsReset = useSetRecoilState(studentsResetAtom);
  const age = getAge(student.birthday);
  const birthday = new Date(student.birthday);
  const enrollStatusesObj = useRecoilValue(enrollStatusesObjAtom);
  const groupsObj = useRecoilValue(groupsObjAtom);
  const sitesObj = useRecoilValue(sitesObjAtom);

  useEffect(() => {
    if (!student || !student.avatar) return;
    const getImageURL = async () => {
      let url = await getDownloadURL(ref(storage, student.avatar));
      setAvatarURL(url + "_200x200");
    };
    getImageURL();
  }, [student, storage]);

  const handleSelectImage = async (event: React.SyntheticEvent) => {
    const ImageState = event.target as ImageState;
    await uploadAvatar({
      image: ImageState.files[0],
      col: "students",
      id: student.id,
    });
    setStudentsReset((pV) => !pV);
  };

  return (
    <>
      {avatarURL && enrollStatusesObj && groupsObj && sitesObj && (
        <>
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
                  <label htmlFor={`icon-button-${student.id}`}>
                    <input
                      hidden
                      accept="image/*"
                      id={`icon-button-${student.id}`}
                      type="file"
                      onChange={handleSelectImage}
                    />
                    <IconButton aria-label="upload picture" component="span">
                      <EditIcon sx={{ width: 15, height: 15 }} />
                    </IconButton>
                  </label>
                </>
              }
            >
              <Avatar alt={student.firstName} src={avatarURL} sx={{ width: 100, height: 100 }} />
            </Badge>
          </Box>
          <Typography variant="h4">{`${student.firstName} ${student.lastName}`}</Typography>
          <Box>
            <Typography variant="body1" component="span" sx={{ fontWeight: 800 }}>
              Age:{" "}
            </Typography>
            <Typography variant="body1" component="span">
              {age}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" component="span" sx={{ fontWeight: 800 }}>
              Birthday:{" "}
            </Typography>
            <Typography variant="body1" component="span">
              {birthday.toLocaleDateString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" component="span" sx={{ fontWeight: 800 }}>
              Enrollment Status:{" "}
            </Typography>
            <Typography variant="body1" component="span">
              {enrollStatusesObj[student.enrollStatus]?.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Sites
            </Typography>
            <Divider />
            {student.siteIds.map((siteId) => (
              <Chip label={sitesObj[siteId].name} key={siteId} sx={{ margin: 1 }} />
            ))}
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Groups
            </Typography>
            <Divider />
            {student.groupIds.map((groupId) => (
              <Chip
                label={`${sitesObj[groupsObj[groupId].siteId].name}: ${groupsObj[groupId].name}`}
                key={groupId}
                sx={{ margin: 1 }}
              />
            ))}
          </Box>
        </>
      )}
    </>
  );
}
