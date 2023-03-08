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
  Divider,
  Chip,
} from "@mui/material";
import { StudentRecord } from "../../types/types";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import useUploadAvatar from "../../hooks/useUploadAvatar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import EditIcon from "@mui/icons-material/Edit";
import { studentFormAtom, studentsResetAtom } from "../../recoil/studentAtoms";
import { enrollStatusesObjAtom } from "../../recoil/enrollStatusAtoms";
import { groupsObjAtom } from "../../recoil/groupAtoms";
import { sitesObjAtom } from "../../recoil/sitesAtoms";
import { getAge } from "../../libraries/functions";

type Props = {
  student: StudentRecord;
  setManageOpen: (value: boolean) => void;
  setDeleteOpen: (value: boolean) => void;
  setDeleteId: (value: string | null) => void;
};

type ImageState = EventTarget & {
  files: File[];
};

export default function StudentCard({ student, setManageOpen, setDeleteOpen, setDeleteId }: Props) {
  const storage = getStorage();
  const [avatarURL, setAvatarURL] = useState("");
  const { uploadAvatar } = useUploadAvatar();
  const setStudentsReset = useSetRecoilState(studentsResetAtom);
  const setStudentForm = useSetRecoilState(studentFormAtom);
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

  const handleFieldEdit = (student: StudentRecord) => {
    setStudentForm(student);
    setManageOpen(true);
  };

  const handleDeleteStudent = () => {
    setDeleteOpen(true);
    setDeleteId(student.id);
  };

  return (
    <>
      {avatarURL && enrollStatusesObj && groupsObj && sitesObj && (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
            <CardContent sx={{ textAlign: "center" }}>
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
                  {enrollStatusesObj[student.enrollStatus].name}
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
                    label={`${sitesObj[groupsObj[groupId].siteId].name}: ${
                      groupsObj[groupId].name
                    }`}
                    key={groupId}
                    sx={{ margin: 1 }}
                  />
                ))}
              </Box>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button sx={{ mr: 2 }} variant="outlined" onClick={() => handleFieldEdit(student)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={handleDeleteStudent}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )}
    </>
  );
}
