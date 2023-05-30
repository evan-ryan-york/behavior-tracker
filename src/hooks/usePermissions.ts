import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { userPermissionAtom } from "../recoil/staffAtoms";

interface SendRequestProps {
  allowedAccess: string[];
}

const usePermissions = () => {
  const userPermission = useRecoilValue(userPermissionAtom);
  const editor = userPermission?.role !== "user" ?? false;
  const developer = userPermission?.access === "developer" ?? false;
  const superAdmin = userPermission?.role === "super-admin";

  const checkAccess = useCallback(
    ({ allowedAccess }: SendRequestProps) => {
      if (!userPermission) return;
      return allowedAccess.includes(userPermission.access);
    },
    [userPermission]
  );
  return { checkAccess, editor, developer, superAdmin };
};

export default usePermissions;
