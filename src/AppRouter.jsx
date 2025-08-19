import React from "react";
import { Routes, Route } from "react-router"
import AppLayout from "./AppLayout";
import { AppContext } from "./AppContext";
import Home from "./pages/Home";
import Splash from "./pages/Splash";
import Auth from "./pages/Auth";

import NetworkProvider from "./backend/NetworkProvider";
import { WalletContext } from "./AppContext";
import './AppRouter.css';
import { ArfBarProvider } from "./components/ArfBarContext";

const appContext = new AppContext();

function AppRouter() {
  return (
    <WalletContext.Provider value={appContext}>
      <ArfBarProvider>  
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="auth" element={<Auth />} />

          <Route element={<AppLayout />}>
            <Route path="home" element={<Home />} />
          </Route>        

        </Routes>
      </ArfBarProvider>
    </WalletContext.Provider>
  );
};

export default AppRouter;


