import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import StartMaster from "./components/start/StartMaster";
import HomePage from "./components/home/HomePage";
import ChangeAvatar from "./components/changeAvatar/ChangeAvatar";
import LoginMaster from "./components/login/LoginMaster";
import RegisterMaster from "./components/register/RegisterMaster";
import UnitAphabet from "./components/unit-aphabet/UnitAphabet";
import LearnAlphabet from "./components/unit-aphabet/LearnAlphabet";
import LearnNumber from "./components/UnitNumber/LearnNumber";
import UnitNumber from "./components/UnitNumber/UnitNumber";
import Learn_color from "./components/Unit_Color/Learn_color";
import UnitColor from "./components/Unit_Color/UnitColor";
import Learn_animal from "./components/Unit_Animal/Learn_animal";
import UnitAnimal from "./components/Unit_Animal/UnitAnimal";
import AdminPage from "./components/admin/AdminPage";
import Home from "./components/admin/Home";
import LessonManagePage from "./components/admin/LessonManagePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<StartMaster />} />
        <Route path="/login" element={<LoginMaster />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/change-avatar" element={<ChangeAvatar />} />
        <Route path="/register" element={<RegisterMaster />} />
        <Route path="/unit-aphabet" element={<UnitAphabet />} />
        <Route path="/learn-aphabet" element={<LearnAlphabet />} />
        <Route path="/learn-number" element={<LearnNumber />} />
        <Route path="/unit-number" element={<UnitNumber />} />
        <Route path="/learn-color" element={<Learn_color />} />
        <Route path="/unit-color" element={<UnitColor />} />
        <Route path="/learn-animal" element={<Learn_animal />} />
        <Route path="/unit-animal" element={<UnitAnimal />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route path="/admin/dashboard" element={<Home />} />
          <Route path="/admin/game" element={<LessonManagePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
