import { useState, useCallback } from "react";
import { collection, addDoc, FirestoreError, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase";
import { useRecoilValue } from "recoil";
import { loggedInStaffAtom } from "../recoil/staffAtoms";
import { selectedStudentAtom } from "../recoil/studentAtoms";

interface SendRequestProps {
  col: string;
  file: File | null;
}

const useUploadFile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const selectedStudent = useRecoilValue(selectedStudentAtom);
  const storage = getStorage();

  const uploadFile = useCallback(
    async ({ file, col }: SendRequestProps): Promise<string | null> => {
      if (file && loggedInStaff && selectedStudent) {
        setIsLoading(true);
        let extension = "";
        if (file.type === "application/pdf") {
          extension = ".pdf";
        }
        const filePath = Number(new Date()).toString() + extension;
        const storageRef = ref(storage, filePath);
        await uploadBytes(storageRef, file);
        try {
          const docRef = collection(db, col);
          await addDoc(docRef, {
            fileName: file.name,
            authorId: loggedInStaff.id,
            filePath: filePath,
            studentId: selectedStudent.id,
            createdAt: Timestamp.now(),
            active: true,
            fileType: file.type,
          });
          setIsLoading(false);
        } catch (error) {
          const firebaseError = error as FirestoreError;
          setError(firebaseError.message);
        }
        setIsLoading(false);
      }
      return null;
    },
    [storage, loggedInStaff, selectedStudent]
  );
  return { isLoading, error, uploadFile };
};

export default useUploadFile;
