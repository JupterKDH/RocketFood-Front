import { Routes, Route } from "react-router-dom";

import { New } from "../pages/New";
import { Edit } from "../pages/Edit";
import { Home } from "../pages/Home";
import { Dishes } from "../pages/Dishes";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New isAdmin />} />
      <Route path="/edit/:id" element={<Edit isAdmin />} />
      <Route path="/dishes/:id" element={<Dishes isAdmin />} />
    </Routes>
  );
}