import { useState, useCallback } from "react";
import { AppBar, Box, Toolbar, Typography, IconButton, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuDropdown from "./MenuDropdown";
import { organizationAtom } from "../../recoil/organizationAtoms";
import { useRecoilValue } from "recoil";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
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
          <Typography sx={{ flexGrow: 1, fontWeight: 700 }}>{organization?.name}</Typography>
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
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{ style: { width: 400 } }}
            >
              <MenuDropdown handleClose={handleClose} />
            </Menu>
          </>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
