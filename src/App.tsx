import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./common/Error";
import { AuthProvider } from "./common/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ErrorBoundary>
          <Navbar />
          <Outlet />
        </ErrorBoundary>
      </AuthProvider>
    </>
  );
}

export default App;
