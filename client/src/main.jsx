import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "./context/ThemeContext";
import axios from "axios";

// Configure global Axios API Base URL for local & production deployment
axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const RootApp = () => {
  return (
    <ClerkProvider
      publishableKey={
        PUBLISHABLE_KEY ||
        "pk_test_ZXhhbXBsZS1jbGVyay1rZXkuY2xlcmsuYWNjb3VudHMuZGV2JA"
      }
    >
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ClerkProvider>
  );
};

createRoot(document.getElementById("root")).render(<RootApp />);


