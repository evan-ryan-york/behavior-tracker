import { BrowserRouter as Router } from "react-router-dom";
import useBootstrapEffect from "./hooks/useBootstrapEffect";
import { ThemeProvider } from "@mui/material/styles";
import { routes } from "./Routes";
import { createTheme } from "@mui/material/styles";
import { organizationAtom } from "./recoil/organizationAtoms";
import { useRecoilValue } from "recoil";
import { Backdrop, CircularProgress } from "@mui/material";
import { AuthContext } from "./providers/AuthProvider";
import { useContext } from "react";
import { LicenseInfo } from "@mui/x-license-pro";

const KEY = process.env.REACT_APP_DATATABLE_KEY ?? "";
LicenseInfo.setLicenseKey(KEY);

declare module "@mui/material/styles" {
  interface TypographyVariants {
    cardTitle: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    cardTitle?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    cardTitle: true;
    h3: false;
  }
}

function AppBootstrap() {
  useBootstrapEffect();
  const organization = useRecoilValue(organizationAtom);
  const loading = !Boolean(organization);
  const { currentAuthUser } = useContext(AuthContext);

  const theme = createTheme({
    palette: {
      primary: {
        main: organization?.primaryColor ?? "#ffffff",
        contrastText: organization?.primaryTextColor ?? "#ffffff",
      },
      secondary: {
        main: organization?.secondaryColor ?? "#ffffff",
        contrastText: organization?.secondaryTextColor ?? "#ffffff",
      },
    },
    typography: {
      fontFamily: "Source Sans Pro",
      cardTitle: {
        fontSize: 24,
      },
    },
  });
  return (
    <>
      {currentAuthUser && loading ? (
        <Backdrop open={loading}>
          <CircularProgress />
        </Backdrop>
      ) : (
        <ThemeProvider theme={theme}>
          <Router>
            <main className="root">{routes}</main>
          </Router>
        </ThemeProvider>
      )}
    </>
  );
}

export default AppBootstrap;
