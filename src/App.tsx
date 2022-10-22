import { ThemeProvider } from "@mui/material/styles";
import { RecoilRoot } from "recoil";
import { theme } from "./Theme";
import AppBootstrap from "./AppBootstrap";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <AppBootstrap />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
