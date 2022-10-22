import { useState, useCallback } from "react";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

interface SendRequestProps {
  col: string;
  data: {};
  id: string;
}

const useSetDoc = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async ({ col, data, id }: SendRequestProps): Promise<string | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const finalData = { ...data, timestamp: Timestamp.now(), active: true };
        const docRef = doc(db, col, id);
        await setDoc(docRef, finalData);
        return null;
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
        setIsLoading(false);
        return null;
      }
    },
    []
  );
  return { isLoading, error, sendRequest };
};

export default useSetDoc;
