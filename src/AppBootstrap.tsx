import { BrowserRouter as Router } from "react-router-dom";
import useBootstrapEffect from "./hooks/useBootstrapEffect";
import { ThemeProvider } from "@mui/material/styles";
import AuthProvider from "./providers/AuthProvider";
import { theme } from "./Theme";
import { routes } from "./Routes";
import useBootstrapAPIEffect from "./hooks/useBootstrapAPIEffect";

function AppBootstrap() {
  useBootstrapEffect();
  useBootstrapAPIEffect();
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <main className="root">{routes}</main>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default AppBootstrap;
