import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { BrowserRouter } from "react-router-dom";
import ContextWrapper from "./Context/ContextWrapper";



ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </BrowserRouter>
 
);
