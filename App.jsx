import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts";

import {
  Home,
  Login,
  UserLogin,
  Pets,
  UserPets,
  AddPet,
  EditPet,
  UserSignup,
  PetDetail
} from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PAGES WITH NAVBAR */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/pets" element={<MainLayout><Pets /></MainLayout>} />
        <Route path="/pets/:id" element={<MainLayout><PetDetail /></MainLayout>} />
        <Route path="/user/pets" element={<MainLayout><UserPets /></MainLayout>} />
        <Route path="/user/signup" element={<UserSignup />} />


        {/* PAGES WITHOUT NAVBAR */}
        <Route path="/login" element={<Login />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/pets/add" element={<AddPet />} />
        <Route path="/pets/:id/edit" element={<EditPet />} />

      </Routes>
    </BrowserRouter>
  );
}
