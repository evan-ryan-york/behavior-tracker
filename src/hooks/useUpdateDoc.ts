import { useState, useCallback } from "react";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

interface SendRequestProps {
  col: string;
  data: {};
  id: string;
}

const useUpdateDoc = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async ({ col, data, id }: SendRequestProps): Promise<string | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const finalData = { ...data, lastUpdatedAt: Timestamp.now() };
        const docRef = doc(db, col, id);
        await updateDoc(docRef, finalData);
        setIsLoading(false);
        return null;
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
        console.log(err);
        setIsLoading(false);
        return null;
      }
    },
    []
  );
  return { isLoading, error, sendRequest };
};

export default useUpdateDoc;
