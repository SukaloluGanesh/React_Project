import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import { shadesOfPurple } from "@clerk/themes";
import { BrowserRouter } from "react-router-dom";
import ContextWrapper from "./Context/ContextWrapper";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key. Check your .env file.");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider
    publishableKey={clerkPubKey}
    appearance={{
      baseTheme: shadesOfPurple,
    }}
  >
    <BrowserRouter>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </BrowserRouter>
  </ClerkProvider>
);
