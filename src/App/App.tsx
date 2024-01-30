import { ThemeProvider } from "providers";
import { PublicRoutes } from "./routes";

function App() {
  return (
    <div className="app">
      <ThemeProvider>
        <PublicRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;
