import { useContext } from "react";
import { MenuItem, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { loggedInStaffAtom } from "../../recoil/staffAtoms";
import { useRecoilValue } from "recoil";
import { AuthContext } from "../../providers/AuthProvider";
import SelectOptions from "./SelectOptions";

type Props = {
  handleClose: () => void;
};

export default function MenuDropdown({ handleClose }: Props) {
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  const { logout } = useContext(AuthContext);

  return (
    <>
      {/* can set permissions here */}
      {loggedInStaff && (
        <>
          <Box sx={{ padding: 2 }}>
            <SelectOptions />
            <MenuItem onClick={handleClose} sx={{mt: 1}}>
              <Link to="/settings" className="navLinkMenu">
                Settings
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/student-dashboard" className="navLinkMenu">
                Student Dashboard
              </Link>
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Box>
        </>
      )}
    </>
  );
}
