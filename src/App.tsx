import React from "react";
import "./App.css";
import { LoadingProvider } from "./Context/LoadingContext/LoadingContext";
import LoadingSpinner from "./Components/Commons/LoadingSpinner/LoadingSpinner";
import { AppRoutes } from "./Routes/routes";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <LoadingProvider>
          <AppRoutes />
          <LoadingSpinner />
        </LoadingProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
