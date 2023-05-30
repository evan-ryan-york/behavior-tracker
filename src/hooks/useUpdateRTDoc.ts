import { useState, useCallback } from "react";
import { getDatabase, ref, set } from "firebase/database";

interface SendRequestProps {
  path: string;
  data: {};
}

const useUpdateRTDoc = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async ({ path, data }: SendRequestProps): Promise<string | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const db = getDatabase();
        const noId: any = { ...data };
        delete noId.id;
        await set(ref(db, path), noId);
        setIsLoading(false);
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

export default useUpdateRTDoc;
