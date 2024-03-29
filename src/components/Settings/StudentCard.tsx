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
import StudentCardProfile from "./StudentCardProfile";

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
            <CardContent sx={{ textAlign: "center" }}>
              <StudentCardProfile student={student} />
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
