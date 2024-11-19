import React from "react";
import { createRoot } from "react-dom/client";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./Client"; // Your Supabase client
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
