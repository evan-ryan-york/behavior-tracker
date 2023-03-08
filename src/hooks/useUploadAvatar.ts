import { useState, useCallback } from "react";
import { doc, updateDoc, FirestoreError } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase";

interface SendRequestProps {
  col: string;
  id: string | null;
  image: File | null;
}

const useUploadAvatar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const storage = getStorage();

  const uploadAvatar = useCallback(
    async ({ image, col, id }: SendRequestProps): Promise<string | null> => {
      if (image && id) {
        setIsLoading(true);
        const fileName = Number(new Date()).toString();
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, image);
        try {
          console.log("the file name is: ", fileName);
          const docRef = doc(db, col, id);
          await updateDoc(docRef, { avatar: fileName });
          setIsLoading(false);
        } catch (error) {
          const firebaseError = error as FirestoreError;
          setError(firebaseError.message);
        }
        setIsLoading(false);
      }
      return null;
    },
    [storage]
  );
  return { isLoading, error, uploadAvatar };
};

export default useUploadAvatar;
