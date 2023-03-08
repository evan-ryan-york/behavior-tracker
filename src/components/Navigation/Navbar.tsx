import { useContext, useState, useCallback } from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../providers/AuthProvider";
import Weblinks from "./Weblinks";
import MobileLinks from "./MobileLinks";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { useRecoilValue } from "recoil";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { width } = useWindowDimensions();
  const collapse = width > 1000 ? false : true;
  const organization = useRecoilValue(organizationAtom);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {collapse && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="collapse-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MobileLinks handleClose={handleClose} />
              </Menu>
            </>
          )}
          <Typography sx={{ flexGrow: 1, fontWeight: 700 }}>{organization?.name}</Typography>
          {!collapse && <Weblinks />}
          <Button className="webLink" color="inherit" onClick={logout} sx={{ fontWeight: 700 }}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
