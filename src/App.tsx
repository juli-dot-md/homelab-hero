import { Route, Routes } from "react-router-dom";
import { EditorPage } from "./pages/EditorPage";
import { LandingPage } from "./pages/LandingPage";
import { ViewPage } from "./pages/ViewPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/edit" element={<EditorPage />} />
      <Route path="/view" element={<ViewPage />} />
    </Routes>
  );
}
