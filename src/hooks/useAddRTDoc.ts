import { useState, useCallback } from "react";
import { getDatabase, ref, push } from "firebase/database";

interface SendRequestProps {
  path: string;
  data: {};
}

type SendRequestType = (props: SendRequestProps) => Promise<string | null>;

type AddDocType = {
  isLoading: boolean;
  error: string | null;
  sendRequest: SendRequestType;
};

const useAddRTDoc = (): AddDocType => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback<SendRequestType>(async ({ data, path }) => {
    setIsLoading(true);
    setError(null);
    try {
      const db = getDatabase();
      const entryRef = ref(db, path);
      const newEntry = await push(entryRef, data);
      setIsLoading(false);
      return newEntry.key;
    } catch (error: any) {
      setError(error);
      return "";
    }
  }, []);
  return { isLoading, error, sendRequest };
};

export default useAddRTDoc;
