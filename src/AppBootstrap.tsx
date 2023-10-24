import { BrowserRouter as Router } from "react-router-dom";
import useBootstrapEffect from "./hooks/useBootstrapEffect";
import useStudentBootstrapEffect from "./hooks/useStudentBootstrapEffect";
import { ThemeProvider } from "@mui/material/styles";
import { routes } from "./Routes";
import { createTheme } from "@mui/material/styles";
import { organizationAtom } from "./recoil/organizationAtoms";
import { useRecoilValue } from "recoil";
import { Backdrop, CircularProgress } from "@mui/material";
import { AuthContext } from "./providers/AuthProvider";
import { useContext } from "react";
import { LicenseInfo } from "@mui/x-license-pro";
import LoadingBackdrop from "./components/shared/LoadingBackdrop";

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
  const { currentAuthUser } = useContext(AuthContext);
  useBootstrapEffect();
  useStudentBootstrapEffect();
  const organization = useRecoilValue(organizationAtom);
  const loading = currentAuthUser ? !Boolean(organization) : false;

  const theme = createTheme({
    palette: {
      primary: {
        main: organization?.primaryColor ?? "#ffc032",
        contrastText: organization?.primaryTextColor ?? "#222",
      },
      secondary: {
        main: organization?.secondaryColor ?? "#333",
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
      {!loading ? (
        <ThemeProvider theme={theme}>
          <Router>
            <main className="root">{routes}</main>
          </Router>
        </ThemeProvider>
      ) : (
        <LoadingBackdrop open={loading} message="Loading" />
      )}
    </>
  );
}

export default AppBootstrap;
