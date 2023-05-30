import { useCallback } from "react";
import {
  collection,
  getDocs,
  where,
  orderBy,
  limit,
  query,
  WhereFilterOp,
  OrderByDirection,
} from "firebase/firestore";
import { db } from "../firebase";

interface SendRequestProps {
  col: string;
  config?: {
    where?: [string, WhereFilterOp, any];
    orderBy?: [string, OrderByDirection?];
    limit?: number;
  };
}

type DBRecord = {
  id: string;
};

type GetDocsType = {
  sendRequest: <T extends DBRecord>(requestProps: SendRequestProps) => Promise<T[]>;
};

const useGetDocs = (): GetDocsType => {
  const sendRequest = useCallback(
    async <T extends DBRecord>({ col, config }: SendRequestProps): Promise<T[]> => {
      const conditions = [where("active", "==", true)];
      if (config?.where) {
        conditions.push(where(config.where[0], config.where[1], config.where[2]));
      }
      if (config?.orderBy) {
        conditions.push(orderBy(config.orderBy[0], config.orderBy[1] ? config.orderBy[1] : "asc"));
      }
      if (config?.limit) {
        conditions.push(limit(config.limit));
      }
      const docRef = collection(db, col);
      let snapshot;
      try {
        if (conditions.length > 0) {
          snapshot = await getDocs(query(docRef, ...conditions));
        } else {
          snapshot = await getDocs(docRef);
        }
      } catch (err) {
        console.log(`[ERROR] useGetDocs: ${err} - ${col} collection`);
      }
      const tempArray: T[] = [];
      if (snapshot) {
        snapshot.forEach((s) => {
          tempArray.push({ ...s.data(), id: s.id } as DBRecord as T);
        });
      }

      return tempArray;
    },
    []
  );
  return { sendRequest };
};

export default useGetDocs;
