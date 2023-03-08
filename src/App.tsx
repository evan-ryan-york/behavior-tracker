import { RecoilRoot } from "recoil";
import AppBootstrap from "./AppBootstrap";
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <RecoilRoot>
      <AuthProvider>
        <AppBootstrap />
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;
