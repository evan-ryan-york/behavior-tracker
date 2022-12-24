import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { loggedInStaffAtom } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";

type Props = {
  handleClose: () => void;
};

export default function MobileLinks({ handleClose }: Props) {
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);

  return (
    <>
      {/* can set permissions here */}
      {loggedInStaff && (
        <>
          <MenuItem onClick={handleClose}>
            <Link to="/staff" className="navLinkMenu">
              Staff
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/all-reports" className="navLinkMenu">
              All Reports
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/rollups" className="navLinkMenu">
              Roll Ups
            </Link>
          </MenuItem>
        </>
      )}
      <MenuItem onClick={handleClose}>
        <Link to="/form" className="navLinkMenu">
          Submit Incident Report
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link to="/user-reports" className="navLinkMenu">
          My Reports
        </Link>
      </MenuItem>
    </>
  );
}
