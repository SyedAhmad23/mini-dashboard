import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Shared/Layout";
import Dashboard from "./pages/Dashboard";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
