import { useState, useCallback } from "react";
import { collection, addDoc, Timestamp, FirestoreError } from "firebase/firestore";
import { db } from "../firebase";

interface SendRequestProps {
  col: string;
  data: {};
}

type SendRequestType = (props: SendRequestProps) => Promise<string | null>;

type AddDocType = {
  isLoading: boolean;
  error: string | null;
  sendRequest: SendRequestType;
};

const useAddDoc = (): AddDocType => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback<SendRequestType>(async ({ col, data }) => {
    setIsLoading(true);
    setError(null);
    try {
      const finalData = { ...data, createdAt: Timestamp.now(), active: true };
      const docRef = collection(db, col);
      const results = await addDoc(docRef, finalData);

      setIsLoading(false);
      if (!results.id) {
        setError("No firebase Id");
      }
      return results.id || null;
    } catch (error: unknown) {
      const firebaseError = error as FirestoreError;
      setError(firebaseError.message);
      return null;
    }
  }, []);
  return { isLoading, error, sendRequest };
};

export default useAddDoc;
