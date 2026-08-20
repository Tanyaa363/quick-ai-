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
  if (!PUBLISHABLE_KEY) {
    return (
      <div style={{ padding: "40px", fontFamily: "sans-serif", textAlign: "center" }}>
        <h2>Configuration Missing</h2>
        <p>
          <code>VITE_CLERK_PUBLISHABLE_KEY</code> environment variable is not defined.
        </p>
        <p style={{ color: "#666" }}>
          Please add <strong>VITE_CLERK_PUBLISHABLE_KEY</strong> in your Vercel Project Settings &gt; Environment Variables and redeploy.
        </p>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ClerkProvider>
  );
};

createRoot(document.getElementById("root")).render(<RootApp />);


