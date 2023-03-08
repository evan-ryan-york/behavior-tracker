import { createTheme } from "@mui/material/styles";

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

export const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#26C6F5",
      contrastText: "#fff",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#B930E6",
    },
  },
  typography: {
    cardTitle: {
      fontSize: 24,
    },
  },
});
