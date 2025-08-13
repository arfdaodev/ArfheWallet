import { Routes, Route } from "react-router"
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import Splash from "./pages/Splash";

import './AppRouter.css';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />

      <Route element={<AppLayout />}>
        <Route path="home" element={<Home />} />
      </Route>
      
    </Routes>
  );
};

export default AppRouter;


