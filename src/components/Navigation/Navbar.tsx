import { FC } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../hooks/useAuth";
import { PERMISSION } from "../../libraries/objects";
import { loggedInStaffAtom } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";

const Navbar: FC = () => {
  const { logout } = useAuth();
  const loggedInStaff = useRecoilValue(loggedInStaffAtom);
  console.log(loggedInStaff)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TGP Student Data Tracker
          </Typography>
          {loggedInStaff && loggedInStaff.permissions?.includes(PERMISSION.EDIT_STAFF) && (
            <Link className="webLink" to="/staff">
              Staff
            </Link>
          )}
          <Button color="inherit" onClick={logout}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
