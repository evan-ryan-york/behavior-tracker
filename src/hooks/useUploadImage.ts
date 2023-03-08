import { useState, useCallback } from "react";
import { doc, updateDoc, FirestoreError } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase";
import { ImageProps } from "../types/types";

interface SendRequestProps {
  col: string;
  id: string;
  image: File | null;
  existingImages: ImageProps[];
  caption: string;
  imageDimensions: { width: number | null; height: number | null };
}

const useUploadImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const storage = getStorage();

  const uploadImage = useCallback(
    async ({
      image,
      col,
      id,
      existingImages,
      caption,
      imageDimensions,
    }: SendRequestProps): Promise<string | null> => {
      if (image) {
        setIsLoading(true);
        const fileName = Number(new Date()).toString();
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, image);
        try {
          const docRef = doc(db, col, id);
          const tempArray = [];
          if (existingImages) {
            tempArray.push(...existingImages);
          }
          tempArray.push({ fileName: fileName, caption: caption, dimensions: imageDimensions });
          await updateDoc(docRef, { images: tempArray });
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
  return { isLoading, error, uploadImage };
};

export default useUploadImage;
