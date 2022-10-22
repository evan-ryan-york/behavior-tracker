import { useState, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

interface SendRequestProps {
  col: string;
  id: string;
}

type DBRecord = {
  id: string;
};

type SendRequest = <T extends DBRecord>(sendRequest: SendRequestProps) => Promise<T | null>

type GetDocType = {
  sendRequest: SendRequest;
  isLoading: boolean;
  error: string | null;
};

const useGetDoc = (): GetDocType => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback<SendRequest>(
    async <TS>({ col, id }: SendRequestProps) => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = doc(db, col, id);
        const results = await getDoc(docRef);

        if (!results.data()) {
          return null;
        } else {
          return { ...results.data(), id: results.id } as TS;
        }
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

export default useGetDoc;
