import { BrowserRouter as Router } from "react-router-dom";
import useBootstrapEffect from "./hooks/useBootstrapEffect";
import { routes } from "./Routes";

function AppBootstrap() {
  useBootstrapEffect();
  return (
    <Router>
      <main className="root">{routes}</main>
    </Router>
  );
}

export default AppBootstrap;
